import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Story } from './customer/core/models/story.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit{
  title = 'Testing Page';
  restItems: any;
  restItemsUrl = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';
  storiesList: Array<Story>;
  displayedColumnsStories: string[] = ['select', 'title', 'url', 
        'created_at', 'author'];
    dataSourceStories: MatTableDataSource<any> = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    selection = new SelectionModel<stories>(true, []);
    selectedElement: Story;
    resultsLength = 0;

  constructor(private http: HttpClient. public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {}

  ngOnInit() {
    this.getRestItems();
  }

  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      )
  }

  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }

  applyFilter(filterValue: string) {
    this.dataSourcestories.filter = filterValue.trim().toLowerCase();
    if (this.dataSourcestories.paginator) {
      this.dataSourcestories.paginator.firstPage();
    }
  }

/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourcestories.data.length;
    return numSelected == numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourcestories.data.forEach(row => this.selection.select(row));
}

onNoClick(): void {
    this.dialogRef.close();
}

}
