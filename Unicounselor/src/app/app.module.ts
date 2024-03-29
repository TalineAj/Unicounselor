import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NgCalendarModule  } from 'ionic2-calendar';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ModalPageModule } from './pages/modal/modal.module';
import { ReviewsmodalPageModule } from './pages/reviewsmodal/reviewsmodal.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularFirestoreModule , LazyLoadImageModule,
    NgCalendarModule,IonicModule.forRoot(), AppRoutingModule,ReviewsmodalPageModule,ModalPageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
     provideAnalytics(() => getAnalytics()),
      provideAuth(() => getAuth()),
       provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
         provideFunctions(() => getFunctions()),
          provideMessaging(() => getMessaging()),
           providePerformance(() => getPerformance()), provideRemoteConfig(() => getRemoteConfig()), provideStorage(() => getStorage())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ScreenTrackingService,UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
