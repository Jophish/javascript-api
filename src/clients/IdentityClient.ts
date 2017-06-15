import Client from './Client';
import Identity, { IIdentity } from '../dtos/Identity';
import ResultDTO from '../dtos/result/ResultDTO';
import FailureDTO from '../dtos/result/FailureDTO';

export default class IdentityClient extends Client {
  /**
   * Saves an identity. It will return a promise resolving to the reason
   * if an error occurs, or an Identity otherwise.
   */
  save(identity: IIdentity): Promise<Identity> {
    try {
      const ident = new Identity(identity);
      return this.gateway.put(
        ident,
        `/trafficTypes/${ident.trafficTypeId}/environments/${ident.environmentId}/identities/${ident.key}`
      ).then((res) => {
        return new Identity(<any> res);
      });
    } catch (err) {
      return <any> this.gateway.rejectedReq(err);
    }
  };
  /**
   * Save a list of identities. It will return a promise resolving an object containing the results, of the form:
   *    {
   *      objects: // The list of identities that could been saved
   *      failed: // The list of failed results, containing the status (0 for non-identity objects), the object that failed, and a message
   *      metadata: // Metadata of the operation
   *    }
   * NOTE: Entities error results would be at the beginning of the resulting array
   */
  saveBulk(identities: Array<IIdentity>): Promise<ResultDTO<Identity>> {
    let groups: {
      [groupName: string]: Array<IIdentity>
    } = {};
    let promises: Promise<ResultDTO<Identity>>[] = [];
    const result = new ResultDTO<Identity>();

    // Group the identities
    identities.forEach((i) => {
      let ident;
      let key;

      try {
        ident = new Identity(i);
        key = `${i.trafficTypeId}+${i.environmentId}`;
      } catch (err) {
        ident = i;
        key = 'incorrect_format';
      }

      if (!groups[key]) {
        groups[key] = [i];
      } else {
        groups[key].push(i);
      }
    });
    // Save each group and keep promise reference.
    for (var key in groups) {
      let group = groups[key];

      if (key !== 'incorrect_format') {
        const ttId = group[0].trafficTypeId;
        const envId = group[0].environmentId;

        promises.push(
          this.gateway.post(
            group,
            `/trafficTypes/${ttId}/environments/${envId}/identities`
          ).then((res: ResultDTO<IIdentity>) => {
            const saved = res.objects.map(e => new Identity(e));
            const failed = res.failed.map(e => new FailureDTO<any>(e.object, e.status, e.message));

            Array.prototype.push.apply(result.objects, saved);
            Array.prototype.push.apply(result.failed, failed);

            return res;
          })
        );
      } else {
        const failed = group.map(e => {
          return new FailureDTO<any>(e, 0, 'This object is not Identity-like, try using our public entities.');
        });
        Array.prototype.push.apply(result.failed, failed);
      }
    }

    return Promise.all(promises).then((res) => {
      return result;
    });
  };
  /**
   * Update an identity. It will return a promise resolving to the reason
   * if an error occurs, or an Identity otherwise.
   */
  update(identity: IIdentity): Promise<Identity> {
    try {
      const ident = new Identity(identity);
      return this.gateway.post(
        ident,
        `/trafficTypes/${ident.trafficTypeId}/environments/${ident.environmentId}/identities/${ident.key}/patch`
      ).then((res) => {
        return new Identity(<any> res);
      });
    } catch (err) {
      return <any> this.gateway.rejectedReq(err);
    }
  };
  /**
   * Delete an identity. It will return a promise resolving to the reason
   * if an error occurs, or a boolean otherwise.
   */
  delete(identity: IIdentity): Promise<boolean> {
    try {
      const ident = new Identity(identity);
      return this.gateway.del(`/trafficTypes/${identity.trafficTypeId}/environments/${identity.environmentId}/identities/${identity.key}`);
    } catch (err) {
      return <any> this.gateway.rejectedReq(err);
    }
  };
}
