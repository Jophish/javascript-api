import gateway, { Response } from '../http/gateway';
import Identity, { IIdentity } from '../dtos/Identity';

export default class IdentityClient {
  /**
   * Saves an identity. It will return a promise resolving to the reason
   * if an error occurs, or an Identity otherwise.
   */
  save(identity: IIdentity) {
    try {
      const ident = new Identity(identity);
      return gateway.put(
        ident, 
        `/trafficTypes/${ident.trafficTypeId}/environments/${ident.environmentId}/identities/${ident.key}`
      ).then((res) => {
        return new Identity(<any> res);
      });
    } catch (err) {
      return gateway.rejectedReq(err);
    }
  };
  /**
   * Save a list of identities. It will return a promise resolving to the array
   * of the results of saving each identity. Each position will have an Identity
   * object, or an object with two properties if an error has occured: {
   *   data: { the identity object that caused the error },
   *   err: 'the error message'
   * }.
   * NOTE: Entities error results would be at the beginning of the resulting array
   */
  saveBulk(identities: Array<IIdentity>): Promise<Array<Identity | {
    data: string,
    err: Error
  }>> {
    let groups: {
      [groupName: string]: Array<IIdentity>
    } = {};
    let promises: Array<Promise<Identity>> = [];

    // Group the identities
    identities.forEach((i) => {
      let ident;
      let key;

      try {
        ident = new Identity(i);
        key = `${i.trafficTypeId}+${i.environmentId}`;
      } catch (err) {
        ident = {
          data: i,
          err
        };
      }
      
      if (key) { // If we have an Identity-like object
        if (!groups[key]) {
          groups[key] = [i];
        } else {
          groups[key].push(i);
        }
      } else { // If we don't have a the necessary data.
        promises.push(ident);
      }
    });
    // Save each group and keep promise reference.
    for (var key in groups) {
      let group = groups[key];

      const ttId = group[0].trafficTypeId;
      const envId = group[0].environmentId;

      promises.push(
        gateway.post(
          group, 
          `/trafficTypes/${ttId}/environments/${envId}/identities`
        ).then((res: any) => {
          return res.objects.map(e => e = new Identity(e));
        })
      );
    }

    return Promise.all(promises);
  };
  /**
   * Update an identity. It will return a promise resolving to the reason
   * if an error occurs, or an Identity otherwise.
   */
  update(identity: IIdentity) {
    try {
      const ident = new Identity(identity);
      return gateway.patch(
        ident, 
        `/trafficTypes/${ident.trafficTypeId}/environments/${ident.environmentId}/identities/${ident.key}`
      ).then((res) => {
        return new Identity(<any> res);
      });
    } catch (err) {
      return gateway.rejectedReq(err);
    }
  };
  /**
   * Delete an identity. It will return a promise resolving to the reason
   * if an error occurs, or a boolean otherwise.
   */
  delete(identity: IIdentity) {
    try {
      const ident = new Identity(identity);
      return gateway.del(`/trafficTypes/${identity.trafficTypeId}/environments/${identity.environmentId}/identities/${identity.key}`);
    } catch (err) {
      return gateway.rejectedReq(err);
    }
  };
}