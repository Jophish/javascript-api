import gateway, { Response } from '../http/gateway';

import { IIdentity } from '../dtos/Identity';

export default class IdentityClient {
  /**
   * Save an identity
   */
  save(identity: IIdentity) {
    return gateway.put(
      identity, 
      `/trafficTypes/${identity.trafficTypeId}/environments/${identity.environmentId}/identities/${identity.key}`
    );
  };
  /**
   * Save a list of identities
   */
  saveBulk(identities: Array<IIdentity>) {
    let groups: {
      [groupName: string]: Array<IIdentity>
    } = {};
    let promises: Array<Promise<Response>> = [];

    // Group the identities
    identities.forEach((i) => {
      const key = `${i.trafficTypeId}+${i.environmentId}`;
      if (!groups[key]) {
        groups[key] = [i];
      } else {
        groups[key].push(i);
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
        )
      );
    }

    return Promise.all(promises);
  };
  /**
   * Update an identity
   */
  update(identity: IIdentity) {
    return gateway.post(
      identity, 
      `/trafficTypes/${identity.trafficTypeId}/environments/${identity.environmentId}/identities/${identity.key}/patch`
    );
  };
  /**
   * Delete an identity
   */
  delete(identity: IIdentity) {
    return gateway.del(`/trafficTypes/${identity.trafficTypeId}/environments/${identity.environmentId}/identities/${identity.key}`);
  };
}