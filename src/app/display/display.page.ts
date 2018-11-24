import {Component, OnInit} from '@angular/core';
import {FireServService, ProductItem} from "../fire-serv.service";
import {NavController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFirestore} from '../../../node_modules/@angular/fire/firestore';
import {AngularFireAuth} from '../../../node_modules/@angular/fire/auth';
import {subscribeOn} from "rxjs/operators";

@Component({
    selector: 'app-display',
    templateUrl: './display.page.html',
    styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

    isLogin: boolean = false;
    dat = new Date();
    dateNow = this.dat.getFullYear() + '-' + (this.dat.getMonth() + 1) + '-' + this.dat.getDate();

    product: ProductItem[];

    sum = 0;
    sum1 = 0;
    cash = 0;
    cash1 = 0;
    mpesa = 0;
    mpesa1 = 0;
    foodSasa = 0;
    foodSasa1 = 0;
    total = 0;
    total1 = 0;


    constructor(public fireserv: FireServService,
                private firestore: AngularFirestore,
                private fireAuth: AngularFireAuth,
                private nav: NavController, private router: Router,
                private root: ActivatedRoute) {
    }

    ngOnInit() {
        this.sum = 0;
        this.sum1 = 0;
        this.cash = 0;
        this.cash1 = 0;
        this.mpesa = 0;
        this.mpesa1 = 0;
        this.foodSasa = 0;
        this.foodSasa1 = 0;
        this.total = 0;
        this.total1 = 0;
        this.fireserv.getProducts().subscribe(res => {
            this.product = res;
            for (let i = 0; i < this.product.length; i++) {
                if (this.product[i].userId === this.fireserv.currentUserId && this.product[i].itemDate === this.dateNow) {
                    this.total = Number(this.total) + Number(this.product[i].itemPrice);
                    this.total1 = Number(this.total1) + Number(this.product[i].itemQuantity);

                    if (this.product[i].paymentMethod === 'Cash' && this.product[i].itemDate === this.dateNow) {
                        this.cash = Number(this.cash) + Number(this.product[i].itemPrice);
                    }
                    if (this.product[i].paymentMethod === 'M-Pesa' && this.product[i].itemDate === this.dateNow) {
                        this.mpesa = Number(this.mpesa) + Number(this.product[i].itemPrice);
                    }
                    if (this.product[i].paymentMethod === 'FoodSasa' && this.product[i].itemDate === this.dateNow) {
                        this.foodSasa = Number(this.foodSasa) + Number(this.product[i].itemPrice);
                    }
                    if (this.product[i].paymentMethod === 'FoodSasa' && this.product[i].itemDate === this.dateNow) {
                        this.foodSasa1 = Number(this.foodSasa1) + Number(this.product[i].itemQuantity);
                    }
                    if (this.product[i].paymentMethod === 'Cash' && this.product[i].itemDate === this.dateNow) {
                        this.cash1 = Number(this.cash1) + Number(this.product[i].itemQuantity);
                    }
                    if (this.product[i].paymentMethod === 'M-Pesa' && this.product[i].itemDate === this.dateNow) {
                        this.mpesa1 = Number(this.mpesa1) + Number(this.product[i].itemQuantity);
                    }

                }
                this.sum = Number(this.sum) + Number(this.product[i].itemPrice);
                this.sum1 = Number(this.sum1) + Number(this.product[i].itemQuantity);
            }


            // this.firestore.collection('products')
            //     .ref.where('userId', '==', this.fireserv.currentUserId)
            //     .get().then(value => {
            //     value.forEach(result => {
            //         this.cash = result.get('itemPrice');
            //     });
            // })
        });

        this.fireAuth.authState.subscribe(
            value => {
                if (value !== null) {
                    this.isLogin = true;
                   // this.userID = value.uid;
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

        // this.firestore.collection('products')
        //     .snapshotChanges()
        //     .subscribe(value => {
        //         let s = 0;
        //         let n = 0;
        //         value.forEach(value1 => {
        //             n = Number(value1.payload.doc.get('itemPrice'));
        //             n = Number(value1.payload.doc.get('itemPrice'));
        //             s = Number(s) + Number(n);
        //             console.log(s);
        //
        //         })
        //     })
    }

    backHome() {
        this.router.navigateByUrl('home')
    }


}
