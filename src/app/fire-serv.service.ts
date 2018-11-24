import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {AngularFireAuth} from 'angularfire2/auth';
import * as fireb from 'firebase';

export interface ProductItem {
    itemName: string;
    itemDate: any;
    itemPrice: number;
    itemQuantity: number;
    itemType: string;
    paymentMethod: string;
    userId: string;
}

export interface AppUser {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    userName: string;
    emailAddress: string;
    role: string;

}


// export interface Log_in {
//     email: string;
//     password: string;
// }

@Injectable({
    providedIn: 'root'
})
export class FireServService {

    dat = new Date();
    dateNow = this.dat.getFullYear() + '-' + (this.dat.getMonth() + 1) + '-' + this.dat.getDate();
    authState: any = null;
    loginUserName: string;
    loginUserRole: string;
    search = this.dateNow;
    seach2 = this.dateNow;

    private proCollection: AngularFirestoreCollection<ProductItem>;
    private proCol: AngularFirestoreCollection<AppUser>;
    private products: Observable<ProductItem[]>;
    private user: Observable<AppUser[]>;



    constructor(private db: AngularFirestore, private router: Router, private authr: AngularFireAuth,
                private firestore: AngularFirestore) {
        this.authr.authState.subscribe((auth) => {
            this.authState = auth;
        });
        // this.proCol = firestore.collection('products',
        //     ref => ref.where('userId', '==', this.currentUserId));
        // // console.log(this.currentUserId);
        //  this.proCollection = this.db.collection<ProductItem>('products');

    }


    getProducts() {
        this.proCollection = this.db.collection<ProductItem>('products');
        this.products = this.proCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                })
            })
        );
        return this.products;
        console.error()
    }
    getReport() {
        this.proCollection = this.db.collection<ProductItem>('products', ref => ref
            .where('itemDate', '>=', this.search).where('itemDate', '<=', this.seach2));
        this.products = this.proCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                })
            })
        );
        return this.products;
        console.error()
    }

    getProductItem(id) {
        return this.proCollection.doc<ProductItem>(id).valueChanges();
    }

    addProductItem(pro: ProductItem) {
        this.proCollection = this.db.collection<ProductItem>('products');
        return this.proCollection.add(pro)
    }

    get isUserAnonymousLoggedIn(): boolean {
        return (this.authState !== null) ? this.authState.isAnonymous : false
    }

    get currentUserId(): string {
        return (this.authState !== null) ? this.authState.uid : ''
    }

    get currentUserName(): string {
        return this.authState['email']
    }

    get currentUser(): any {
        return (this.authState !== null) ? this.authState : null;
    }

    get isUserEmailLoggedIn(): boolean {
        if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
            return true
        } else {
            return false
        }
    }

    signUpWithEmail(email: string, password: string) {
        return this.authr.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user
            })
            .catch(error => {
                console.log(error);
                throw error
            });
    }

    loginWithEmail(email: string, password: string) {
        return this.authr.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
                this.router.navigateByUrl('/home');
            })
            .catch(error => {
                console.log(error);
                throw error
            });
    }

    signOut(): void {
        this.authr.auth.signOut();
        this.router.navigateByUrl('')
    }

    async userNAME() {
        if (this.currentUserId) {
            await this.firestore.collection('users').doc(this.currentUserId).get().subscribe(ui => {
                this.loginUserName = ui.get('userName');
                this.loginUserRole = ui.get('role');
                console.log(this.loginUserRole);
            })

        }
    }

    resetPassword(email: string) {
        const autht = this.authr.auth;
        return autht.sendPasswordResetEmail(email)
            .then(() => console.log("email sent"))
            .catch((error) => console.log(error))
    }
}

