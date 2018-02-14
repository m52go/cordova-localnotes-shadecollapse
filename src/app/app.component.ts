import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private localNotifications: LocalNotifications) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
          var that = this;
      
          this.localNotifications.schedule({
                id: 500,
                title: "some title",
                text: "some text",
                trigger: { at: new Date().getTime() },
                actions: [
                    { 
                        id: 'switch-book', 
                        title: 'Load Next Book' ,
                        type: 'button',
                        launch: false
                    }, 
                    { 
                        id: 'stop-clear', 
                        title: 'Stop & Clear',
                        type: 'button',
                        launch: false
                    }
                ],
                sticky: true,
                priority: -2,
                sound: null,
                color: null,
                led: null,
                smallIcon: 'res://ic_stat_notify.png',
                icon: null,
                data: { schedule_action: false }
        });
        
        this.localNotifications.on( 'switch-book', function( note, event ) {
            console.log( note, event );
            that.localNotifications.update({
                id: note.id,
                title: "Loading next book.",
                text: "Just a second...",
                sticky: false,
                autoClear: false,
                actions: [],
                launch: false,
                priority: -2,
                sound: null,
                color: null,
                led: null,
                smallIcon: 'res://ic_stat_notify.png',
                icon: null,
            });
            
            return;
            
        });
      
    });
  }
}

