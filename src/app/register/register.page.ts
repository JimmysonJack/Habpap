import {Component, OnInit} from '@angular/core';
import {AppUser, FireServService} from "../fire-serv.service";
import {AngularFireAuth} from 'angularfire2/auth';
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    isLogin: boolean = false;
    postUser: AppUser = {
        firstName: '',
        lastName: '',
        userName: '',
        role: '',
        phoneNumber: null,
        emailAddress: '',
    };

    fName = '';
    lName = '';
    uName = '';
    rolen = '';
    pNumb = null;

    isNewUser = true;
    email = '';
    password = '';
    errorMessage = '';
    error: { name: any, message: any } = {name: '', message: ''};

    private userColl: AngularFirestoreCollection<AppUser>;

    constructor(public fireserv: FireServService,
                private authr: AngularFireAuth,
                private ht: HttpClient,
                private firestore: AngularFirestore,
                private loadCtrl: LoadingController,
                private router: Router, private db: AngularFirestore, private alet: AlertController) {
    }

    ngOnInit() {
        this.authr.authState.subscribe(
            value => {
                if (value !== null) {
                    this.isLogin = true;
                    //  this.userID = value.uid;
                    this.firestore.collection('users')
                        .doc(value.email)
                        .get()
                        .subscribe(ui => {
                            // this.loginUserName = ui.get('userName');
                            const userRole = ui.get('role');
                            if (userRole === 'Admin') {
                                this.isLogin = true;
                            } else {
                                this.isLogin = false;
                                this.router.navigateByUrl('menu/(menucontent:home)').catch(reason => {
                                    console.log(reason);
                                });
                            }
                            // console.log(this.loginUserRole);
                        }, error1 => {
                            this.isLogin = false;
                            this.router.navigateByUrl('menu/(menucontent:home)').catch(reason => {
                                console.log(reason);
                            });
                            console.log(error1);
                        })
                } else {
                    this.router.navigateByUrl('').catch(reason => {
                        console.log(reason)
                    });
                    this.isLogin = false;
                }
            },
            error1 => {
                console.log(error1);
                this.isLogin = false;
                this.router.navigateByUrl('login').catch(reason => {
                    console.log(reason);
                })
            }
        );
    }

    clearErrorMessage() {
        this.errorMessage = '';
        this.error = {name: '', message: ''};
    }

    async onSignUp() {
        this.clearErrorMessage();
        this.postUser.firstName = this.fName;
        this.postUser.lastName = this.lName;
        this.postUser.userName = this.uName;
        this.postUser.emailAddress = this.email;
        this.postUser.phoneNumber = this.pNumb;
        this.postUser.role = this.rolen;

        if (this.validateForm(this.email, this.password)) {
            const loading = await this.loadCtrl.create({
                message: 'Enrolling..'
            });
            await loading.present();
            this.ht.get('https://us-central1-habpap-10004.cloudfunctions.net/user', {
                params: {
                    username: this.uName,
                    password: this.password,
                    email: this.email,
                    number: this.pNumb,
                    role: this.rolen,
                    firstname: this.fName,
                    lastname: this.lName
                }
            })
                .subscribe(value => {
                    // @ts-ignore
                    loading.dismiss();
                    this.alertShow();
                    // this.db.collection('users').doc(value.email).set(this.postUser)
                    //     .then(value => {
                    //         loading.dismiss();
                    //         this.alertShow();
                    //     }, error => {
                    //         this.error = error;
                    //         if (this.error) {
                    //             loading.dismiss();
                    //         }
                    //     });
                }, error1 => {
                    this.error = error1;
                    loading.dismiss();
                    console.log(error1)
                });
            // this.fireserv.signUpWithEmail(this.email, this.password)
            //     .then(() => {
            //         this.authr.authState.subscribe(data => {
            //
            //         });
            //
            //         // this.router.navigateByUrl('')
            //     }).catch(_error => {
            //     this.error = _error;
            //     if (this.error) {
            //         loading.dismiss();
            //     }
            //
            //     // this.router.navigateByUrl('')
            // });
        }
    }

    validateForm(email: string, password: string): boolean {
        if (email.length === 0) {
            this.errorMessage = 'Please enter Email!';
            return false
        }

        if (password.length === 0) {
            this.errorMessage = 'Please enter Password!';
            return false
        }

        if (password.length < 6) {
            this.errorMessage = 'Password should be at least 6 characters!';
            return false
        }

        this.errorMessage = '';

        return true
    }

    isValidMailFormat(email: string) {
        const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
            return false;
        }

        return true;
    }

    async alertShow() {
        const alert = await this.alet.create({
            message: this.uName,
            subHeader: 'Enrolled',
        });
        await alert.present();
    }

    async orderby() {


    }


}
