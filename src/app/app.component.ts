import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() pageTitle = 'Estimate Logic Mobility';
  public gridColumns_1;
  public gridData_1;

  constructor () {
  //   this.gridColumns_1 = [{
  //     key: 'key', label: 'Key'
  //   },
  //   {
  //     key: 'type', label: 'Type'
  //   }
  // ];
  //   this.gridData_1 = [
  //     {key: 'hello', type: 'fuck'}
  //   ];
  }

  public setDataArray(data) {
    this.gridData_1 = data;
  }

  public setColumnsArray(data) {
    this.gridColumns_1 = data;
  }
}
