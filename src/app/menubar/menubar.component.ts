import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
  selector: 'app-menubar'
})
export class MenubarComponent {
  @Input() logoText = 'LogicNest';
}
