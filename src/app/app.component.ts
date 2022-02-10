import { Component, OnDestroy } from '@angular/core';
import { catchError, of, Subject, Subscription, switchMap, timer } from 'rxjs';
import { environment } from './../environments/environment';
import { NSEData, NSEResponse } from './models/nse-response.interface';
import { NseService } from './services/nse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title: string = 'screener';
  response: NSEResponse = {};
  sources: string[] = Object.keys(environment.sources);
  sSource: string = '';
  indexTypes: string[] = [];
  sIndexType: string = '';
  indexes: { name: string; value: string }[] = [];
  sIndex: string = '';
  nseResponse: NSEResponse | undefined = {};
  nseData: NSEData[] = [];
  gridRefreshSubject: Subject<NSEData[]> = new Subject();
  gridRefresh$ = this.gridRefreshSubject.asObservable();
  minutes: number = 0.5 * 60 * 1000;
  sub!: Subscription;

  constructor(private _nseService: NseService) {}

  setIndexTypes() {
    const sources: Record<
      string,
      { indexes: Record<string, { name: string; value: string }[]> }
    > = environment.sources;
    this.indexTypes = Object.keys(sources[`${this.sSource}`].indexes);
  }
  setIndices() {
    const sources: Record<
      string,
      { indexes: Record<string, { name: string; value: string }[]> }
    > = environment.sources;
    this.indexes = Object.values(
      sources[this.sSource].indexes[this.sIndexType]
    );
  }
  getData() {
    this.sub && this.sub.unsubscribe();
    this.sub = timer(0, this.minutes)
      .pipe(
        switchMap(() => {
          return this._nseService.getData(this.sSource, this.sIndex);
        })
      )
      .subscribe((response: NSEResponse | undefined) => {
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
              x.dayHigh - x.lastPrice
                ? x.lastPrice - x.dayHigh
                : x.lastPrice - x.dayLow;
            const one = 0.382 * highMinusLow;
            const two = 0.618 * highMinusLow;
            return {
              ...x,
              ohl,
              pp,
              ppColor: `rgba(60, 179, 113,${(x.lastPrice - pp) / x.lastPrice})`,
              s1: pp - one,
              s1Color: `rgba(60, 179, 113,${
                1 - ((x.lastPrice - (pp - one)) / x.lastPrice) * 100
              })`,
              s2: pp - two,
              s2Color: `rgba(60, 179, 113,${
                1 - ((x.lastPrice - (pp - two)) / x.lastPrice) * 100
              })`,
              s3: pp - highMinusLow,
              s3Color: `rgba(60, 179, 113,${
                1 - ((x.lastPrice - (pp - highMinusLow)) / x.lastPrice) * 100
              })`,
              r1: pp + one,
              r1Color: `rgba(255, 0, 0,${
                ((x.lastPrice - (pp + one)) / x.lastPrice) * 100
              })`,
              r2: pp + two,
              r2Color: `rgba(255, 0, 0,${
                ((x.lastPrice - (pp + two)) / x.lastPrice) * 100
              })`,
              r3: pp + highMinusLow,
              r3Color: `rgba(255, 0, 0,${
                ((x.lastPrice - (pp + highMinusLow)) / x.lastPrice) * 100
              })`,
              callStrength,
              call: callStrength > 0 ? 'Buy' : 'Sell',
            };
          }),
        ];
        this.nseData.sort(
          (a, b) =>
            b.totalTradedVolume - a.totalTradedVolume ||
            b.pChange - a.pChange ||
            a.lastPrice - b.lastPrice
        );
        console.log('Records: ' + this.nseData.length);
        this.refreshGrid();
      });
  }
  // getData() {
  //   this._nseService
  //     .getData(this.sSource, this.sIndex)
  //     .subscribe((response: NSEResponse | undefined) => {
  //       this.nseResponse = response;
  //       const data = response?.data || [];
  //       this.nseData = [
  //         ...data.map((x) => {
  //           const ohl =
  //             x.open === x.dayHigh
  //               ? 'Short'
  //               : x.open === x.dayLow
  //               ? 'Long'
  //               : '';
  //           const pp = (x.open + x.dayHigh + x.dayLow) / 3;
  //           const highMinusLow = x.dayHigh - x.dayLow;
  //           const callStrength =
  //             Math.min(x.dayHigh - x.lastPrice, x.lastPrice - x.dayLow) ==
  //             highMinusLow
  //               ? x.lastPrice - x.dayHigh
  //               : x.lastPrice - x.dayLow;
  //           const one = 0.382 * highMinusLow;
  //           const two = 0.618 * highMinusLow;
  //           return {
  //             ...x,
  //             ohl,
  //             pp,
  //             ppColor: `rgba(60, 179, 113,${(x.lastPrice - pp) / x.lastPrice})`,
  //             s1: pp - one,
  //             s1Color: `rgba(60, 179, 113,${
  //               (x.lastPrice - (pp - one)) / x.lastPrice
  //             })`,
  //             s2: pp - two,
  //             s2Color: `rgba(60, 179, 113,${
  //               (x.lastPrice - (pp - two)) / x.lastPrice
  //             })`,
  //             s3: pp - highMinusLow,
  //             s3Color: `rgba(60, 179, 113,${
  //               (x.lastPrice - (pp - highMinusLow)) / x.lastPrice
  //             })`,
  //             r1: pp + one,
  //             r1Color: `rgba(60, 179, 113,${
  //               (x.lastPrice - (pp + one)) / x.lastPrice
  //             })`,
  //             r2: pp + two,
  //             r2Color: `rgba(60, 179, 113,${
  //               (x.lastPrice - (pp + two)) / x.lastPrice
  //             })`,
  //             r3: pp + highMinusLow,
  //             r3Color: `rgba(60, 179, 113,${
  //               (x.lastPrice - (pp + highMinusLow)) / x.lastPrice
  //             })`,
  //             callStrength,
  //             call: callStrength > 0 ? 'Buy' : 'Sell',
  //           };
  //         }),
  //       ];
  //       this.nseData.sort((a, b) => b.totalTradedVolume - a.totalTradedVolume);
  //       this.refreshGrid();
  //     });
  // }
  refreshGrid() {
    // Calling the DT trigger to manually render the table
    this.gridRefreshSubject.next(this.nseData);
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
