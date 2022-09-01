import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import mermaid from 'mermaid';
declare var jsPlumb: any;
@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements AfterViewInit
{
  @ViewChild('mermaid', { static: true }) mermaid: ElementRef;

  config = {
    startOnLoad: true,
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'cardinal',
},
securityLevel: 'loose',
};

  ngAfterViewInit(){
    mermaid.initialize(this.config);

  }
}
