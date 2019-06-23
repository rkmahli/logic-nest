import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'logic-mobility-form',
  templateUrl: './logic-mobility-form.component.html',
  styleUrls: ['./logic-mobility-form.component.css']
})
export class LogicMobilityFormComponent implements OnInit {
  @Output() gridDataEvent_1 = new EventEmitter<any>();
  @Output() gridColumnsEvent_1 = new EventEmitter<any>();
  private parentForm: any;
  private childForm: any;
  public parentPanelsArray = [];
  private gridColumnsArray = [];
  private allowedLogicArray = [];
  private barredLogicArray = [];
  public selectedParentPanel;
  constructor(private formsService: FormsService) {}
  ngOnInit() {
    this.formsService.getParentForm().then(response => {
      this.parentForm = response;
      this.getParentPanelArrays(this.parentForm);
    });
    this.formsService.getChildForm().then(response => {
      this.childForm = response;
    });
    this.getGridColumnsArray();
  }

  private getGridColumnsArray(): any {
    const col_1 = new Object();
    col_1['key'] = 'key';
    col_1['label'] = 'Key';
    const col_2 = new Object();
    col_2['key'] = 'type';
    col_2['label'] = 'Type';
    this.gridColumnsArray.push(col_1);
    this.gridColumnsArray.push(col_2);
  }

  private getParentPanelArrays(form: any) {
    const components = form.components;
    let index = 0;
    for (const component of components) {
      if (String(component.type) === 'panel') {
        const selectItem = new Object();
        selectItem['key'] = component.key;
        selectItem['description'] = component.key;
        selectItem['index'] = index;
        this.parentPanelsArray.push(selectItem);
      }
      index++;
    }
  }

  public getLogicBreakdown(componentIndex) {
    this.allowedLogicArray = [];
    this.barredLogicArray = [];
    const componentsReference = this.parentForm.components[componentIndex].components;
    for (const component of componentsReference) {
      let flag = true; // false --> all properties inside child form
      let internalDependencyCount = 0;
      let externalDependencyCount = 0;
      if (String(component.type) === 'decision') {

        flag = false;
        for (const inputProperty of component.linked.inputs) {
          if (inputProperty) {
            if (!this.childForm.fields[inputProperty]) {
              flag = true;
              externalDependencyCount++;
            } else {
              internalDependencyCount++;
            }
          }
        }

        for (const outputProperty of component.linked.outputs) {
          if (outputProperty) {
            if (!this.childForm.fields[outputProperty]) {
              flag = true;
              externalDependencyCount++;
            }
          }
        }
      } else if (String(component.type) === 'integrator') {
        flag = false;
        for (const inputProperty of component.linked.inputs) {
          if (inputProperty) {
            if (!this.childForm.fields[inputProperty]) {
              flag = true;
              externalDependencyCount++;
            }
          }
        }

        for (const outputProperty of component.linked.outputs) {
          if (outputProperty) {
            if (!this.childForm.fields[outputProperty]) {
              flag = true;
              externalDependencyCount++;
            }
          }
        }

      } else if (String(component.type) === 'initializer') {
        flag = false;
        for (const inputProperty of component.linked.inputs) {
          if (inputProperty) {
            if (!this.childForm.fields[inputProperty]) {
              externalDependencyCount++;
              flag = true;
            }
          }
        }

        for (const outputProperty of component.linked.outputs) {
          if (outputProperty) {
            if (!this.childForm.fields[outputProperty]) {
              flag = true;
              externalDependencyCount++;
            }
          }
        }

      } else if (String(component.type) === 'transformer') {
        flag = false;
        for (const inputProperty of component.linked.inputs) {
          if (inputProperty) {
            if (!this.childForm.fields[inputProperty]) {
              flag = true;
              externalDependencyCount++;
            }
          }
        }

        for (const outputProperty of component.linked.outputs) {
          if (outputProperty) {
            if (!this.childForm.fields[outputProperty]) {
              flag = true;
              externalDependencyCount++;
            }
          }
        }

      }
      const logicItem = new Object();
      logicItem['key'] = component.key;
      logicItem['type'] = component.type;
      if (!flag) {
        this.allowedLogicArray.push(logicItem);
      } else {
        this.barredLogicArray.push(logicItem);
      }
    }
    this.gridColumnsEvent_1.emit(this.gridColumnsArray);
    this.gridDataEvent_1.emit(this.allowedLogicArray);
  }
}
