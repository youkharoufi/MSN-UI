import { InjectionToken } from '@angular/core';

/**
 * @const MESSAGE_API_ENDPOINT
 * Injection token for the bookmark API URL interface to be provided by the applications.
 */
export const MESSAGE_API_ENDPOINT: InjectionToken<string> = new InjectionToken(
  'MESSAGE_API_ENDPOINT'
);
