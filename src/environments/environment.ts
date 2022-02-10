// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sources: {
    nse: {
      domain: '',
      endpoints: {},
      indexes: {
        market: [
          { value: 'NIFTY%2050', name: 'NIFTY 50' },
          { value: 'NIFTY%20NEXT%2050', name: 'NIFTY NEXT 50' },
          { value: 'NIFTY%20100', name: 'NIFTY 100' },
          { value: 'NIFTY%20200', name: 'NIFTY 200' },
          { value: 'NIFTY%20500', name: 'NIFTY 500' },
          { value: 'NIFTY%20MIDCAP%2050', name: 'NIFTY MIDCAP 50' },
          { value: 'NIFTY%20MIDCAP%20100', name: 'NIFTY MIDCAP 100' },
          { value: 'NIFTY%20MIDCAP%20150', name: 'NIFTY MIDCAP 150' },
          { value: 'NIFTY%20SMALLCAP%20100', name: 'NIFTY SMALLCAP 100' },
          { value: 'INDIA%20VIX', name: 'INDIA VIX' },
          { value: 'NIFTY%20SMALLCAP%2050', name: 'NIFTY SMALLCAP 50' },
          { value: 'NIFTY%20SMALLCAP%20250', name: 'NIFTY SMALLCAP 250' },
          { value: 'NIFTY%20MIDSMALLCAP%20400', name: 'NIFTY MIDSMALLCAP 400' },
          { value: 'NIFTY%20MIDSMALLCAP%20400', name: 'NIFTY MIDSMALLCAP 400' },
          {
            value: 'NIFTY500%20MULTICAP%2050%3A25%3A25',
            name: 'NIFTY500 MULTICAP 50:25:25',
          },
          { value: 'NIFTY%20LARGEMIDCAP%20250', name: 'NIFTY LARGEMIDCAP 250' },
          { value: 'NIFTY%20MIDCAP%20SELECT', name: 'NIFTY MIDCAP SELECT' },
          { value: 'NIFTY%20TOTAL%20MARKET', name: 'NIFTY TOTAL MARKET' },
          { value: 'NIFTY%20MICROCAP%20250', name: 'NIFTY MICROCAP 250' },
        ],
        sectoral: [
          { value: 'NIFTY BANK', name: 'NIFTY BANK' },
          { value: 'NIFTY AUTO', name: 'NIFTY AUTO' },
          { value: 'NIFTY FMCG', name: 'NIFTY FMCG' },
          { value: 'NIFTY IT', name: 'NIFTY IT' },
          { value: 'NIFTY MEDIA', name: 'NIFTY MEDIA' },
          { value: 'NIFTY METAL', name: 'NIFTY METAL' },
          { value: 'NIFTY PHARMA', name: 'NIFTY PHARMA' },
          { value: 'NIFTY REALTY', name: 'NIFTY REALTY' },
          { value: 'NIFTY PSU BANK', name: 'NIFTY PSU BANK' },
          { value: 'NIFTY PRIVATE BANK', name: 'NIFTY PRIVATE BANK' },
          { value: 'NIFTY HEALTHCARE INDEX', name: 'NIFTY HEALTHCARE INDEX' },
          { value: 'NIFTY CONSUMER DURABLES', name: 'NIFTY CONSUMER DURABLES' },
          {
            value: 'NIFTY FINANCIAL SERVICES',
            name: 'NIFTY FINANCIAL SERVICES',
          },
          {
            value: 'NIFTY FINANCIAL SERVICES 25/50',
            name: 'NIFTY FINANCIAL SERVICES 25/50',
          },
          { value: 'NIFTY OIL & GAS', name: 'NIFTY OIL & GAS' },
        ],
      },
    },
    bse: {
      domain: '',
      endpoints: {},
      indexes: {
        market: [],
        sectoral: [],
      },
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
