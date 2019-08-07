import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';
import { ServiceService } from '../service.service';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report7day',
  templateUrl: './report7day.page.html',
  styleUrls: ['./report7day.page.scss'],
})
export class Report7dayPage {

  public rawHP: any;
  public ampHP: any = [];
  public categories: any = [];
  public data: any = [];


  constructor(
    public service: ServiceService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) { }

  ionViewDidEnter() {
    this.loadData();
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({
      message: 'ดาวน์โหลดข้อมูล...'
    });
    await loading.present();

    this.service.getAmpHP7d().then((res: any) => {
      console.log(res);
      this.rawHP = res.data.features;
      this.hpCount(this.rawHP);
    });
  }

  async hpCount(hp: any) {
    // const current = new Date();
    // const formatted = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    // console.log(formatted);
    // console.log(new Date('2019-04-10'));
    this.service.getAmpName().then(async (res: any) => {
      const ampArr = res.data;
      ampArr.forEach((e: any) => {
        const datArr = [];
        let i = 0;
        hp.forEach((em: any) => {
          if (e.ap_code === em.properties.admin.ap_code) {
            datArr.push(em);
            // this.proHP.push(em);
            i += 1;
          }
        });
        e.count = i;
        e.data = datArr;
        this.ampHP.push(e);
        this.loadingCtrl.dismiss();
      });
      // console.log(this.ampHP)
      this.ampHP.forEach((e: any) => {
        this.categories.push(e.ap_tn);
        this.data.push(e.count);
      });
      await this.chart();
    });
  }

  chart() {
    HighCharts.chart('container', {
      chart: {
        backgroundColor: 'rgba(20, 20, 20, 0.6)',
        style: {
          fontFamily: 'Tahoma',
          color: '#ffffff'
        },
        type: 'column'
      },
      title: {
        text: 'จำนวน hotspot 7 วันที่ผ่านมา',
        style: {
          fontFamily: 'Tahoma',
          color: '#ffffff'
        },
      },
      xAxis: {
        categories: this.categories,
        labels: {
          style: {
            fontFamily: 'Tahoma',
            color: '#ffffff'
          },
        }
      },
      yAxis: {
        min: 0,
        labels: {
          style: {
            fontFamily: 'Tahoma',
            color: '#ffffff'
          },
        },
        title: {
          text: 'hotspot (จุด)',
          style: {
            fontFamily: 'Tahoma',
            color: '#ffffff'
          },
        }
      },
      series: [{
        name: 'hotspot',
        type: undefined,
        data: this.data
      }]
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
