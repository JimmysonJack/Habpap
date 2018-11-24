import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from "@angular/router";
import {AngularFirestore} from 'angularfire2/firestore';
import {FireServService} from "../fire-serv.service";
import {AngularFireAuth} from '../../../node_modules/@angular/fire/auth';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    loginUserName = '';
    loginUserRole = '';

    selectedPath = '';

    pages = [
        {
            tittle: 'Home',
            url: '/menu/(menucontent:home)'
        },
        {
            tittle: 'Sales',
            url: '/menu/(menucontent:display)'
        }
    ];

    pagesA = [

        {
            Tittle: 'Report',
            url: '/menu/(menucontent:report)'
        },
        {
            Tittle: 'Register',
            url: '/menu/(menucontent:register)'
        }
    ];

    constructor(private router: Router,
                public fireserv: FireServService,
                private fireAuth: AngularFireAuth,
                private firestore: AngularFirestore) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.selectedPath = event.url;
        })
    }

    ngOnInit() {

        this.fireAuth.authState.subscribe(value => {

            if (value!==null){
                this.firestore.collection('users').doc(value.email).get().subscribe(ui => {
                    this.loginUserName = ui.get('userName');
                    this.loginUserRole = ui.get('role');
                    console.log(this.loginUserRole);
                })
            } else {
                this.router.navigateByUrl('').catch(reason => {console.log(reason)});
            }
        }, error1 => {
            console.log(error1);
            this.router.navigateByUrl('').catch(reason => {console.log(reason)})
        });

    }

}
