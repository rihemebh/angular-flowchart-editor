import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowchartComponent } from './flowchart.component';

describe('GrapheditorComponent', () => {
  let component: FlowchartComponent;
  let fixture: ComponentFixture<FlowchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
