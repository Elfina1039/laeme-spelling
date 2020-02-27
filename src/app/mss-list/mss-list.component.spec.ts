import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MssListComponent } from './mss-list.component';

describe('MssListComponent', () => {
  let component: MssListComponent;
  let fixture: ComponentFixture<MssListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MssListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MssListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
