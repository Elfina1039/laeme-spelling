import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSequenceComponent } from './map-sequence.component';

describe('MapSequenceComponent', () => {
  let component: MapSequenceComponent;
  let fixture: ComponentFixture<MapSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
