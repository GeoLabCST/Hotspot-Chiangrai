import { ServiceService } from './service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { from } from 'rxjs';
import { AmphoePageModule } from './amphoe/amphoe.module';
import { TambonPageModule } from './tambon/tambon.module';
import { FullmapPageModule } from './fullmap/fullmap.module';
import { Report7dayPageModule } from './report7day/report7day.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AmphoePageModule,
    TambonPageModule,
    FullmapPageModule,
    Report7dayPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ServiceService,
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
