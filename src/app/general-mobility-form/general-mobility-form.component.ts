import { Component, OnInit } from '@angular/core';
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
  constructor(private formsService: FormsService) {}
  ngOnInit() {
    this.formsService.getFormData().then(data => {
      this.formData = data;
      this.getPanelReferences(this.formData);
    });
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
  }
  public getMobilityEstimation(panelReference: any) {
    const panelElements = new Object();
    panelElements[panelReference.key] = true;
    this.getPanelElements(panelReference, panelElements);
    console.log(panelElements);
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
  }
}
