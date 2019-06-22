import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsService } from '../services/forms.service';

@Component({
  selector: 'app-general-mobility-form',
  templateUrl: './general-mobility-form.component.html',
  styleUrls: ['./general-mobility-form.component.css']
})
export class GeneralMobilityFormComponent implements OnInit {
  private formData: any;
  public panelReferenceArray = [];
  public selectedPanelReference: any;
  private expandPanelList = false;
  private allowedLogicArray: any;
  private barredLogicArray: any;
  private gridColumnsArray: any;
  @Output() gridColumnsEvent_1 : EventEmitter<any> = new EventEmitter<any>();
  @Output() gridDataEvent_1 : EventEmitter<any> = new EventEmitter<any>();
  constructor(private formsService: FormsService) {}
  ngOnInit() {
    this.getGridColumnsArray();
  }
  private getPanelReferences(formObject: any) {
    if (formObject.type && formObject.type === 'panel') {
      this.panelReferenceArray.push(formObject);
    }
    if (formObject.components) {
      for (const component of formObject.components) {
        this.getPanelReferences(component);
      }
    }
    if (formObject.columns) {
      for (const column of formObject.columns) {
        const components = column.components;
        for (const component of components) {
          this.getPanelReferences(component);
        }
      }
    }
  }
  public getMobilityEstimation(panelReference: any) {
    const panelElements = new Object();
    panelElements[panelReference.key] = true;
    this.getPanelElements(panelReference, panelElements);
    const logicComponentsArray = [];
    this.getLogicComponentReferenceArray(panelReference, logicComponentsArray);
    this.getLogicBreakdown(panelElements, logicComponentsArray, this.allowedLogicArray, this.barredLogicArray);
  }

  private getPanelElements(panelReference: any, panelElements: any) {
    if (panelReference.components) {
      const components = panelReference.components;
      for (const component of components) {
        panelElements[component.key] = true;
        this.getPanelElements(component, panelElements);
      }
    }
    if (panelReference.columns) {
      for (const column of panelReference.columns) {
        const components = column.components;
        for (const component of components) {
          panelElements[component.key] = true;
          this.getPanelElements(component, panelElements);
        }
      }
    }
  }
  public setPanelReference(panelReference: any) {
    this.selectedPanelReference = panelReference;
    this.expandPanelList = false;
    this.getMobilityEstimation(panelReference);
  }

  private getLogicComponentReferenceArray(componentReference: any, logicComponentsArray: any) {
    if (componentReference.type ==='transformer' ||
        componentReference.type === 'decision'||
        componentReference.type === 'integrator' ||
        componentReference.type === 'initializer') {
          logicComponentsArray.push(componentReference);
        }
    if (componentReference.components && componentReference.components.length && componentReference.components.length > 0) {
      for (const component of componentReference.components) {
        this.getLogicComponentReferenceArray(component, logicComponentsArray);
      }
    }
    if (componentReference.columns && componentReference.columns.length && componentReference.columns.length > 0) {
      for (const column of componentReference.columns) {
        this.getLogicComponentReferenceArray(column, logicComponentsArray);
      }
    }

    if (componentReference.columns) {
      for (const column of componentReference.columns) {
        const components = column.components;
        for (const component of components) {
          this.getLogicComponentReferenceArray(component, logicComponentsArray);
        }
      }
    }
  }

  private getLogicBreakdown(panelElementsObject, logicComponentsArray, allowedLogicArray, barredLogicArray) {

    allowedLogicArray = [];
    barredLogicArray = [];
    for (const component of logicComponentsArray) {
      let flag = true; // false --> all properties inside child form
      if (String(component.type) === 'decision') {

        flag = false;
        for (const inputProperty of component.linked.inputs) {
          if (inputProperty) {
            if (!panelElementsObject[inputProperty]) {
              flag = true;
            } else {
            }
          }
        }

        for (const outputProperty of component.linked.outputs) {
          if (outputProperty) {
            if (!panelElementsObject[outputProperty]) {
              flag = true;
            }
          }
        }
      } else if (String(component.type) === 'integrator') {
        flag = false;
        for (const inputProperty of component.linked.inputs) {
          if (inputProperty) {
            if (!panelElementsObject[inputProperty]) {
              flag = true;
            }
          }
        }

        for (const outputProperty of component.linked.outputs) {
          if (outputProperty) {
            if (!panelElementsObject[outputProperty]) {
              flag = true;
            }
          }
        }

      } else if (String(component.type) === 'initializer') {
        flag = false;
        for (const inputProperty of component.linked.inputs) {
          if (inputProperty) {
            if (!panelElementsObject[inputProperty]) {
              flag = true;
            }
          }
        }

        for (const outputProperty of component.linked.outputs) {
          if (outputProperty) {
            if (!panelElementsObject[outputProperty]) {
              flag = true;
            }
          }
        }

      } else if (String(component.type) === 'transformer') {
        flag = false;
        for (const inputProperty of component.linked.inputs) {
          if (inputProperty) {
            if (!panelElementsObject[inputProperty]) {
              flag = true;
            }
          }
        }

        for (const outputProperty of component.linked.outputs) {
          if (outputProperty) {
            if (!panelElementsObject[outputProperty]) {
              flag = true;
            }
          }
        }

      }
      const logicItem = new Object();
      logicItem['key'] = component.key;
      logicItem['type'] = component.type;
      if (!flag) {
        allowedLogicArray.push(logicItem);
      } else {
        barredLogicArray.push(logicItem);
      }
    }
    this.gridColumnsEvent_1.emit(this.gridColumnsArray);
    this.gridDataEvent_1.emit(allowedLogicArray);
  }
  private getGridColumnsArray(): any {
    this.gridColumnsArray = [];
    const col_1 = new Object();
    col_1['key'] = 'key';
    col_1['label'] = 'Key';
    const col_2 = new Object();
    col_2['key'] = 'type';
    col_2['label'] = 'Type';
    this.gridColumnsArray.push(col_1);
    this.gridColumnsArray.push(col_2);
  }
  public fileSelectEvent(target: HTMLInputElement) {
    const file: File = target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file, '0UTF-8');
    fileReader.onload = () => {
      this.formData = JSON.parse(fileReader.result.toString());
      this.getPanelReferences(this.formData);
      console.log(this.formData);
    };
    fileReader.onerror = () => alert('Error reading file');
  }
}
