import { NseService } from './services/nse.service';
import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { NSEData, NSEResponse } from './models/nse-response.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'screener';
  response: NSEResponse = {};
  sources: string[] = Object.keys(environment.sources);
  sSource: string = '';
  indexTypes: string[] = [];
  sIndexType: string = '';
  indexes: string[] = [];
  sIndex: string = '';
  nseResponse: NSEResponse = {};
  nseData: NSEData[] = [];
  gridRefreshSubject: Subject<NSEData[]> = new Subject();
  gridRefresh$ = this.gridRefreshSubject.asObservable();

  constructor(private _nseService: NseService) {}

  setIndexTypes() {
    const sources: Record<string, { indexes: Record<string, string[]> }> =
      environment.sources;
    this.indexTypes = Object.keys(sources[`${this.sSource}`].indexes);
  }
  setIndices() {
    const sources: Record<string, { indexes: Record<string, string[]> }> =
      environment.sources;
    this.indexes = Object.values(
      sources[this.sSource].indexes[this.sIndexType]
    );
  }
  getData() {
    this._nseService
      .getData(this.sSource, this.sIndex)
      .subscribe((response: NSEResponse) => {
        this.nseResponse = response;
        const data = response?.data || [];
        this.nseData = [
          ...data.map((x) => {
            const ohl =
              x.open === x.dayHigh
                ? 'Short'
                : x.open === x.dayLow
                ? 'Long'
                : '';
            const pp = (x.open + x.dayHigh + x.dayLow) / 3;
            const highMinusLow = x.dayHigh - x.dayLow;
            const callStrength =
              Math.min(x.dayHigh - x.lastPrice, x.lastPrice - x.dayLow) ==
              highMinusLow
                ? x.lastPrice - x.dayHigh
                : x.lastPrice - x.dayLow;
            return {
              ...x,
              ohl,
              pp,
              s1: pp - 0.382 * highMinusLow,
              s2: pp - 0.618 * highMinusLow,
              s3: pp - highMinusLow,
              r1: pp + 0.382 * highMinusLow,
              r2: pp + 0.618 * highMinusLow,
              r3: pp + highMinusLow,
              callStrength,
              call: callStrength > 0 ? 'Buy' : 'Sell',
            };
          }),
        ];
        this.nseData.sort((a, b) => b.totalTradedVolume - a.totalTradedVolume);
        this.refreshGrid();
      });
  }
  refreshGrid() {
    debugger;
    // Calling the DT trigger to manually render the table
    this.gridRefreshSubject.next(this.nseData);
  }
}
