import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from './services/api/api.module';
import { BaseService } from './services/api/base-service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: 'http://localhost:3000' }),
  ],
  providers: [BaseService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
