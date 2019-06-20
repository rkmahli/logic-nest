import { Component, Input } from "@angular/core";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent {
  @Input() dataArray: any;
  @Input() columnsDescriptionArray: any;

  constructor() {
  }
}
