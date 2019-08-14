import { Component, OnInit } from '@angular/core';
// import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import * as L from 'leaflet';
import { ModalController, NavParams } from '@ionic/angular';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-fullmap',
  templateUrl: './fullmap.page.html',
  styleUrls: ['./fullmap.page.scss'],
})
export class FullmapPage implements OnInit {

  public map: L.Map;
  public proHP: any;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: ServiceService,
  ) { }

  ngOnInit() {
    const data = this.navParams.get('data');
    this.proHP = data;
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  async leafletMap() {
    const pvCode = this.service.getPvCode();
    const pvCentroid = this.service.getCentroid();

    this.map = new L.Map('map_full', { scrollWheelZoom: true }).setView(pvCentroid, 9);

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

    const fireIcon = L.icon({
      iconUrl: await this.service.fireIcon,
      iconSize: [32, 32],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    });

    // console.log(this.proHP);

    this.proHP.forEach((e: any) => {
      L.marker([e.geometry.coordinates[1], e.geometry.coordinates[0]], {
        icon: fireIcon,
      }).bindPopup(
        '<p>hotspot</p>'
      ).addTo(this.map);
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
