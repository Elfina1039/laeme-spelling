import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitConstraintsComponent } from './lit-constraints.component';

describe('LitConstraintsComponent', () => {
  let component: LitConstraintsComponent;
  let fixture: ComponentFixture<LitConstraintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitConstraintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitConstraintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
