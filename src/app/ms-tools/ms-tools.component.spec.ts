import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsToolsComponent } from './ms-tools.component';

describe('MsToolsComponent', () => {
  let component: MsToolsComponent;
  let fixture: ComponentFixture<MsToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
