import {Component, OnInit} from '@angular/core';
import {FireServService, ProductItem} from "../fire-serv.service";
import {AngularFireAuth} from '../../../node_modules/@angular/fire/auth';
import {AngularFirestore} from '../../../node_modules/@angular/fire/firestore';
import {Router} from "@angular/router";

declare var google;

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
    prod: ProductItem[];
    sum = 0;
    sum1 = 0;
    cash = 0;
    cash1 = 0;
    mpesa = 0;
    mpesa1 = 0;
    foodSasa = 0;
    foodSasa1 = 0;
    mcheleWakanda = 0;
    mchelePlain = 0;
    uleziWakanda = 0;
    uleziPlain = 0;

    waka: number;




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
        console.log('date one' +this.fireserv.search);
        console.log('date two' +this.fireserv.seach2);

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
                    if (this.product[i].foodSasa === 'FoodSasa') {
                        this.foodSasa = Number(this.foodSasa) + Number(this.product[i].itemPrice);
                    }
                    this.sum1 = Number(this.sum1) + Number(this.product[i].itemQuantity);

                    if (this.product[i].paymentMethod === 'Cash') {
                        this.cash1 = Number(this.cash1) + Number(this.product[i].itemQuantity);
                    }
                    if (this.product[i].paymentMethod === 'M-Pesa') {
                        this.mpesa1 = Number(this.mpesa1) + Number(this.product[i].itemQuantity);
                    }
                    if (this.product[i].foodSasa === 'FoodSasa') {
                        this.foodSasa1 = Number(this.foodSasa1) + Number(this.product[i].itemQuantity);
                    }




                }


            }

        });

    }
    showChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Cash', this.cash1],
            ['M-Pesa', this.mpesa1],
            ['FoodSasa', this.foodSasa1],

        ]);

        // Set chart options
        var options = {
            'title': 'How Much Product i have sold',
            'width': 800,
            'height': 600,
            pieHole: 0.4,
            backgroundColor: '#f0b744',
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        this.showLineChart()

    }

    showLineChart() {
        this.firestore.collection('products', ref => ref
            .where('itemName', '==', 'Mchele')
            .where('itemType', '==', 'WakandaMix')).get().subscribe(data => {
            data.forEach(val => {
                this.waka= val.get('itemQuantity');

            });
        });
                // Some raw data (not necessarily accurate)
        var rowData1 = [['Products', 'Ulezi Plain', ],
            ['ULEZI', 1, ],
            ['MCHELE', 2,],
            ['2006/07', 2,],
            ['2007/08', 3,],
            ['2008/09', 1, ]];


        // Create and populate the data tables.
        var data = [];
        data[0] = google.visualization.arrayToDataTable(rowData1);

        var options = {
            width: 900,
            height: 500,
            vAxis: {title: "Cups"},
            hAxis: {title: "Month"},
            seriesType: "bars",
            backgroundColor: '#f0b744',
            series: {5: {type: "line"}},
            animation:{
                duration: 1000,
                easing: 'out'
            },
        };
        var current = 0;
        // Create and draw the visualization.
        var chart = new google.visualization.ComboChart(document.getElementById('visualization'));
        var button = document.getElementById('b1');
        function drawChart() {
            // Disabling the button while the chart is drawing.
            // @ts-ignore
            // button.disabled = true;
            google.visualization.events.addListener(chart, 'ready',
                function() {
                    // button.disabled = false;
                    // button.value = 'Switch to ' + (current ? 'Tea' : 'Coffee');
                });
            options['title'] = 'Monthly ' + (current ? 'Coffee' : 'Tea') + ' Production by Country';

            chart.draw(data[current], options);
        }
        drawChart();

        // button.onclick = function() {
        //     current = 1 - current;
        //     drawChart();
        // }
           }

}

