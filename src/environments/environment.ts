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
          'NIFTY 50',
          'NIFTY NEXT 50',
          'NIFTY 100',
          'NIFTY 200',
          'NIFTY 500',
          'NIFTY MIDCAP 50',
          'NIFTY MIDCAP 100',
          'NIFTY SMALLCAP 100',
          'INDIA VIX',
          'NIFTY MIDCAP 150',
          'NIFTY SMALLCAP 50',
          'NIFTY SMALLCAP 250',
          'NIFTY MIDSMALLCAP 400',
          'NIFTY500 MULTICAP 50:25:25	',
          'NIFTY LARGEMIDCAP 250',
          'NIFTY MIDCAP SELECT',
          'NIFTY TOTAL MARKET',
          'NIFTY MICROCAP 250',
        ],
        sectoral: [
          'NIFTY BANK',
          'NIFTY AUTO',
          'NIFTY FINANCIAL SERVICES',
          'NIFTY FINANCIAL SERVICES 25/50',
          'NIFTY FMCG',
          'NIFTY IT',
          'NIFTY MEDIA',
          'NIFTY METAL',
          'NIFTY PHARMA',
          'NIFTY PSU BANK',
          'NIFTY PRIVATE BANK',
          'NIFTY REALTY',
          'NIFTY HEALTHCARE INDEX',
          'NIFTY CONSUMER DURABLES',
          'NIFTY OIL & GAS',
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
