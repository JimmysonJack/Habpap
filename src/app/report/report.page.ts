import {Component, OnInit} from '@angular/core';
import {FireServService, ProductItem} from "../fire-serv.service";
import {AngularFireAuth} from '../../../node_modules/@angular/fire/auth';
import {AngularFirestore} from '../../../node_modules/@angular/fire/firestore';
import {Router} from "@angular/router";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

    dat = new Date();
    dateNow = this.dat.getFullYear() + '-' + (this.dat.getMonth() + 1) + '-' + this.dat.getDate();
    search = '2018-11-23';
    isLogin: boolean = false;
    product: ProductItem[];
    sum = 0;
    sum1 = 0;
    cash = 0;
    cash1 = 0;
    mpesa = 0;
    mpesa1 = 0;
    foodSasa = 0;
    foodSasa1 = 0;


    constructor(public fireserv: FireServService,
                private firestore: AngularFirestore,
                private router: Router,
                private fireAuth: AngularFireAuth) {
    }

    ngOnInit() {
        this.onReport();

        this.fireAuth.authState.subscribe(
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

    async onReport() {

        await this.fireserv.getReport().subscribe(results => {
            this.product = results;
            this.sum = 0;
            this.cash = 0;
            this.foodSasa = 0;
            this.mpesa = 0;
            this.mpesa1 = 0;
            this.sum1 = 0;
            this.cash1 = 0;
            this.foodSasa1 = 0;
            for (let i = 0; i < this.product.length; i++) {
                if (this.product[i].itemDate >= this.fireserv.search && this.product[i].itemDate <= this.fireserv.seach2) {
                    this.sum = Number(this.sum) + Number(this.product[i].itemPrice);

                    if (this.product[i].paymentMethod === 'Cash') {
                        this.cash = Number(this.cash) + Number(this.product[i].itemPrice);
                    }
                    if (this.product[i].paymentMethod === 'M-Pesa') {
                        this.mpesa = Number(this.mpesa) + Number(this.product[i].itemPrice);
                    }
                    if (this.product[i].paymentMethod === 'FoodSasa') {
                        this.foodSasa = Number(this.foodSasa) + Number(this.product[i].itemPrice);
                    }
                    this.sum1 = Number(this.sum1) + Number(this.product[i].itemQuantity);

                    if (this.product[i].paymentMethod === 'Cash') {
                        this.cash1 = Number(this.cash1) + Number(this.product[i].itemQuantity);
                    }
                    if (this.product[i].paymentMethod === 'M-Pesa') {
                        this.mpesa1 = Number(this.mpesa1) + Number(this.product[i].itemQuantity);
                    }
                    if (this.product[i].paymentMethod === 'FoodSasa') {
                        this.foodSasa1 = Number(this.foodSasa1) + Number(this.product[i].itemQuantity);
                    }

                }


            }

        });

    }

}

