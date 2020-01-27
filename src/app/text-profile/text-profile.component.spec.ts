import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextProfileComponent } from './text-profile.component';

describe('TextProfileComponent', () => {
  let component: TextProfileComponent;
  let fixture: ComponentFixture<TextProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
