import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitEditorComponent } from './split-editor.component';

describe('SplitEditorComponent', () => {
  let component: SplitEditorComponent;
  let fixture: ComponentFixture<SplitEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
