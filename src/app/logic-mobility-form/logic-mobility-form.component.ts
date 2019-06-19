import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'logic-mobility-form',
  templateUrl: './logic-mobility-form.component.html',
  styleUrls: ['./logic-mobility-form.component.css']
})
export class LogicMobilityFormComponent implements OnInit {
  private parentForm: any;
  private childForm: any;
  private parentPanelsArray = [];
  private selectedParentPanel;
  constructor(private formsService: FormsService) {}
  ngOnInit() {
    this.formsService.getParentForm().then(response => {
      this.parentForm = response;
      this.getParentPanelArrays(this.parentForm);
    });
    this.formsService.getChildForm().then(response => {
      this.childForm = response;
    });
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

  private getLogicBreakdown(componentIndex) {
    const componentsReference = this.parentForm.components[componentIndex].components;
    const allowedLogicArray = [];
    const barredLogicArray = [];
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
      logicItem['type'] = component.key;
      if (!flag) {
        console.log(component.key, component.type);
      } else {
      }
    }
  }
}
