import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ThanksComponent } from './thanks/thanks.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'order/:day',
    component: OrderComponent,
  },
  {
    path: 'thank-you',
    component: ThanksComponent,
  },
] as Routes;

@NgModule({
  declarations: [AppComponent, HomeComponent, OrderComponent, ThanksComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
