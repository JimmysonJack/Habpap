import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FireServService} from "../fire-serv.service";
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    isLogin: boolean = false;
    isNewUser = true;
    public email = '';
    public password = '';
    errorMessage = '';
    error: { name: any, message: any } = {name: '', message: ''};
    resetPassword = false;

    // logIn = {} as Log_in;

    constructor(private authr: AngularFireAuth,
                private loadCtrl: LoadingController,
                private fireAuth: AngularFireAuth,
                private toast: ToastController,
                public fireserv: FireServService,
                private router: Router,
                private nav: NavController, private alert: AlertController) {
    }

    ngOnInit() {
        this.fireserv.userNAME();
        this.fireAuth.authState.subscribe(
            value => {
                if (value != null) {
                    this.isLogin = false;
                    this.router.navigateByUrl('menu/(menucontent:home)').catch(reason => {
                        console.log(reason);
                    })
                } else {
                    this.isLogin = true;
                    console.log('user is not login');
                }
            }
        )
    }



    async getUser() {

        let user = await this.fireAuth.authState;
        user.subscribe(value => {
            console.log(value.uid);
        }, error => {
            console.log(error);
        });
        // if (user !== null) {
        //     console.log('user id is : ' + user.uid)
        // } else {
        //     console.log('user is null')
        // }
        // subscribe(value => {
        //     console.log(value.uid);
        // }, error1 => {
        //     console.log(error1);
        // });

        console.log("testing");

        // let newVar = await this.fireAuth.auth.currentUser;
        // if (newVar !== null) {
        //     console.log(newVar);
        // } else {
        //     console.log('user is not login');
        // }
    }

    // async login(user: Log_in) {
    //     this.authr.auth.signInWithEmailAndPassword(user.email, user.password);
    //     const loading = await this.loadCtrl.create({message: 'Signing In..'});
    //     await loading.present();
    //    const us = this.authr.authState.subscribe(data => {
    //       console.log(data.email, data.uid);
    //    });
    //    loading.dismiss();
    //         if (us) {
    //           loading.dismiss();
    //           const toas = await this.toast.create({message: 'invalid email or password',
    //           duration: 3000,});
    //           toas.present();
    //         }
    // }

    checkUserInfo() {
        if (this.fireserv.isUserEmailLoggedIn) {
            this.router.navigateByUrl('menu/(menucontent:home)')
        }
    }

    clearErrorMessage() {
        this.errorMessage = '';
        this.error = {name: '', message: ''};
    }

    changeForm() {
        this.isNewUser = !this.isNewUser
    }

    onSignUp(): void {
        this.clearErrorMessage();
        if (this.validateForm(this.email, this.password)) {
            this.fireserv.signUpWithEmail(this.email, this.password)
                .then(() => {
                    this.router.navigateByUrl('')
                }).catch(_error => {
                this.error = _error;
                this.router.navigateByUrl('')
            })
        }
    }

    async onLoginEmail() {
        this.clearErrorMessage();
        if (this.validateForm(this.email, this.password)) {
            const loading = await this.loadCtrl.create({
                message: 'Signing in..'
            });
            await loading.present();
            await this.fireserv.loginWithEmail(this.email, this.password)
                .then(() => {
                    this.fireserv.userNAME();


                    this.router.navigateByUrl('menu/(menucontent:home)')
                        .catch(reason => console.log(reason));

                    // this.nav.navigateForward('home')
                })
                .catch(_error => {
                        this.error = _error;
                        this.router.navigate(['/'])
                    }
                );
            this.password = '';
            this.email = '';

            if (this.errorMessage || this.error) {
                loading.dismiss();
            }
            loading.dismiss();
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

    sendResetEmail() {
        this.clearErrorMessage();

        this.fireserv.resetPassword(this.email)
            .then(() => this.resetPassword = true)
            .catch(_error => {
                this.error = _error
            })
    }

    logout() {
        this.fireserv.signOut();
    }



}