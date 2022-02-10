import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GridComponent } from './grid/grid.component';
import { DataTablesModule } from 'angular-datatables';
import { CacheInterceptor } from './services/cache-interceptor.service';

@NgModule({
  declarations: [AppComponent, GridComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
