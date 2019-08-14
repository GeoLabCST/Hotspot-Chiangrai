import { Component } from '@angular/core';

// import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { ServiceService } from './../service.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { AmphoePage } from '../amphoe/amphoe.page';
import { FullmapPage } from '../fullmap/fullmap.page';
import { Report7dayPage } from '../report7day/report7day.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public map: L.Map;
  public rawHP: any;
  public ampHP = [];
  public sumHP: any = 0;
  public proHP = [];

  constructor(
    private router: Router,
    public modalCtrl: ModalController,
    public service: ServiceService,
    public loadingCtrl: LoadingController
  ) { }

  // ngOnInit() {

  // }

  ionViewDidEnter() {
    this.leafletMap();
    this.loadData();
  }


  leafletMap() {
    const pvCode = this.service.getPvCode();
    const pvCentroid = this.service.getCentroid();

    this.map = new L.Map('map', { scrollWheelZoom: true }).setView(pvCentroid, 8);

    L.tileLayer('https://cors-anywhere.herokuapp.com/http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.map);

    const tam = L.tileLayer.wms('https://cors-anywhere.herokuapp.com/http://119.59.125.191/geoserver/omfs/wms?', {
      layers: 'omfs:tambon',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: pvCode
    }).addTo(this.map);

    const amp = L.tileLayer.wms('https://cors-anywhere.herokuapp.com/http://119.59.125.191/geoserver/omfs/wms?', {
      layers: 'omfs:amphoe',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: pvCode
    }).addTo(this.map);

    const pro = L.tileLayer.wms('https://cors-anywhere.herokuapp.com/http://119.59.125.191/geoserver/omfs/wms?', {
      layers: 'omfs:province',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: pvCode
    }).addTo(this.map);
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({
      message: 'ดาวน์โหลดข้อมูล...'
    });
    await loading.present();

    this.service.getAmpHP().then((res: any) => {
      // console.log(res);
      this.rawHP = res.data.features;
      this.hpCount(this.rawHP);
    });
  }

  async hpCount(hp: any) {
    const fireIcon = L.icon({
      iconUrl: await this.service.fireIcon,
      iconSize: [32, 32],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    });
    this.service.getAmpName().then((res: any) => {
      const ampArr = res.data;
      ampArr.forEach((e: any) => {
        const datArr = [];
        let i = 0;
        hp.forEach((em: any) => {
          if (e.ap_code === em.properties.admin.ap_code) {
            datArr.push(em);

            this.proHP.push(em);

            // console.log(em);
            L.marker([em.geometry.coordinates[1], em.geometry.coordinates[0]], {
              icon: fireIcon,
            }).bindPopup(
              '<p>hotspot</p>'
            ).addTo(this.map);

            i += 1;
            this.sumHP += 1;
          }
        });
        e.count = i;
        e.data = datArr;
        this.ampHP.push(e);
        this.loadingCtrl.dismiss();
      });
      // console.log(this.proHP);
    });
  }

  // gotoFullmap() {
  //   this.router.navigateByUrl('/fullmap');
  // }

  async gotoFullmap(amp: any) {
    const modalFullmap = await this.modalCtrl.create({
      component: FullmapPage,
      componentProps: {
        data: this.proHP
      }
    });
    modalFullmap.present();
  }

  // gotoAmphoe(a: any) {
  //   this.router.navigate(['/amphoe', { data: a }]);
  // }

  async gotoAmphoe(amp: any) {
    const modalAmpstat = await this.modalCtrl.create({
      component: AmphoePage,
      componentProps: {
        amp_code: amp
      }
    });
    modalAmpstat.present();
  }

  // gotoReport7day() {
  //   this.router.navigateByUrl('/report7day');
  // }

  async gotoReport7day() {
    const modalAmpstat = await this.modalCtrl.create({
      component: Report7dayPage,
      componentProps: {
        amp_code: 'amp'
      }
    });
    modalAmpstat.present();
  }

}
