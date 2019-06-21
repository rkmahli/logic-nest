import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
  selector: 'app-menubar'
})
export class MenubarComponent implements OnInit {
  @Input() logoText = 'LogicNest';
  public menuData: any;

  constructor (private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.getMenuData().then(data => this.menuData = data);
  }
}
