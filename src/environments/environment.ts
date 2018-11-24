// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    production: false,
    firekey: {
        apiKey: "AIzaSyCuIVSfJGgJuah2D2KkxN7rSRrvuYqS-Gc",
        authDomain: "habpap-10004.firebaseapp.com",
        databaseURL: "https://habpap-10004.firebaseio.com",
        projectId: "habpap-10004",
        storageBucket: "habpap-10004.appspot.com",
        messagingSenderId: "712496104192"
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
