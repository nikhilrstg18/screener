import { NseService } from './../services/nse.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NSEResponse, NSEData } from '../models/nse-response.interface';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnDestroy {
  @Input() source: string = '';
  @Input() index: string = '';
  @Input() refreshGrid$!: Observable<NSEData[]>;
  nseData: NSEData[] = [];
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  firstLoad: boolean = true;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private _nseService: NseService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      scrollX: true,
      order: [],
      processing: true,
    };
    this.refreshGrid$.subscribe((nseData: NSEData[]) => {
      this.nseData = nseData;
      if (this.firstLoad) {
        this.firstLoad = !this.firstLoad;
        this.dtTrigger.next(0);
      } else {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next(0);
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
