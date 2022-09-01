import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppComponent } from './app.component';
import { GrapheditorComponent } from './grapheditor/grapheditor.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlowchartComponent } from './flowchart/flowchart.component';

@NgModule({
  declarations: [
    AppComponent,
    GrapheditorComponent,
    FlowchartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    NoopAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
