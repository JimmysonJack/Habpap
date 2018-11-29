import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {strict} from "assert";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const user = functions.https.onCall((data, context) => {
    // auth
    admin.auth().createUser({
        email: data.email,
        emailVerified: false,
        password: data.password,
        displayName: data.name,
        disabled: false
    })
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
            return {
                userRecord
            };
        })
        .catch(function (error) {
            console.log("Error creating new user:", error);
            const fa: string = 'fail';
            return {
                fa
            };
        });
    // response.send("Hello from Firebase!");
});

