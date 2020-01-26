import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { ServiceService } from '../service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-routing',
  templateUrl: './routing.page.html',
  styleUrls: ['./routing.page.scss'],
})
export class RoutingPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start: any;
  end: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: ServiceService,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation
  ) {

  }

  ngOnInit() {
    const latlon = this.navParams.get('latlon');
    const gps = this.service.getGps()
    this.start = {
      lat: gps[0],
      lng: gps[1]
    }
    this.end = latlon.end;

    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: 18.85, lng: 100.65 }
    });

    new google.maps.Marker({
      position: this.start,
      title: "point A",
      label: "ตำแหน่งของท่าน",
      map: this.map
    });
    new google.maps.Marker({
      position: this.end,
      title: "point B",
      label: "ตำแหน่ง hotspot",
      map: this.map
    });
    this.directionsDisplay.setMap(this.map);

    this.getRoute();
  }

  getRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (res: any, status: any) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(res);
      } else {
        window.alert('ไม่มีถนนเข้าถึง hotspot นี้');
      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
