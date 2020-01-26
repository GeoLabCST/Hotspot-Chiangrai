import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { ServiceService } from '../service.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { RoutingPage } from '../routing/routing.page';

@Component({
  selector: 'app-tambon',
  templateUrl: './tambon.page.html',
  styleUrls: ['./tambon.page.scss'],
})
export class TambonPage implements OnInit {
  public map: L.Map;
  public tamHP: any;
  public gps: any = [];
  public r: any;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: ServiceService,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation
  ) { }

  ngOnInit() {
    const data = this.navParams.get('data');
    this.tamHP = data.data;
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  async leafletMap() {
    const pvCode = this.service.getPvCode();
    const pvCentroid = this.service.getCentroid();

    this.map = new L.Map('map-tam', { scrollWheelZoom: true }).setView(pvCentroid, 8);

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

    this.r = L.Routing.control({
      // waypoints: [
      //   L.latLng(57.74, 11.94),
      //   L.latLng(57.6792, 11.949)
      // ]
    }).addTo(this.map);

    this.geolocation.watchPosition().subscribe((res: any) => {
      this.service.pushGps([res.coords.latitude, res.coords.longitude])
      // this.gps = [res.coords.latitude, res.coords.longitude];
    });

    const fireIcon = L.icon({
      iconUrl: await this.service.fireIcon,
      iconSize: [32, 32],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    });
    // console.log(this.tamHP);
    this.tamHP.forEach((e: any) => {
      L.marker([e.geometry.coordinates[1], e.geometry.coordinates[0]], {
        icon: fireIcon,
      }).bindPopup(
        '<p>hotspot</p>'
      ).addTo(this.map);
    });
  }

  async routing(a: any) {
    // console.log(a);
    // this.r.setWaypoints([
    //   L.latLng(this.gps[0], this.gps[1]),
    //   L.latLng(Number(a.properties.latitude), Number(a.properties.longitude))
    // ]);

    const latlon = {
      end: {
        lat: Number(a.properties.latitude),
        lng: Number(a.properties.longitude)
      }
    }

    const modalTamHP = await this.modalCtrl.create({
      component: RoutingPage,
      componentProps: {
        latlon: latlon
      }
    });
    modalTamHP.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
