import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      // OneSignal Code start:
      // Enable to debug issues:
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      const notificationOpenedCallback = (jsonData) => {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window['plugins'].OneSignal
        .startInit('79500f59-2cca-4a08-bfff-7d36712b6ec8', 'project-543437587024')
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
