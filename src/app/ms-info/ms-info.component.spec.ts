import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsInfoComponent } from './ms-info.component';

describe('MsInfoComponent', () => {
  let component: MsInfoComponent;
  let fixture: ComponentFixture<MsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
