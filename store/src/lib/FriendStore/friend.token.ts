import { InjectionToken } from '@angular/core';

/**
 * @const FRIEND_API_ENDPOINT
 * Injection token for the bookmark API URL interface to be provided by the applications.
 */
export const FRIEND_API_ENDPOINT: InjectionToken<string> = new InjectionToken(
  'FRIEND_API_ENDPOINT'
);
