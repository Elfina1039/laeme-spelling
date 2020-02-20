import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitInventoryComponent } from './lit-inventory.component';

describe('LitInventoryComponent', () => {
  let component: LitInventoryComponent;
  let fixture: ComponentFixture<LitInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
