import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KwicComponent } from './kwic.component';

describe('KwicComponent', () => {
  let component: KwicComponent;
  let fixture: ComponentFixture<KwicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KwicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KwicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
