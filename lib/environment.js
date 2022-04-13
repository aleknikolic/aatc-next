// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  salesforce: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL
  },
  stripe: {
    charges: process.env.NEXT_PUBLIC_STRIPE_CHARGES_URL
  },
  registrations: {
    charges: process.env.NEXT_PUBLIC_REGISTRATIONS_CHARGES_URL
  },
  cache: {
    maxAge: process.env.NEXT_PUBLIC_CACHE_MAXAGE
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
