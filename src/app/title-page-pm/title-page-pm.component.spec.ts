import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlePagePmComponent } from './title-page-pm.component';

describe('TitlePagePmComponent', () => {
  let component: TitlePagePmComponent;
  let fixture: ComponentFixture<TitlePagePmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitlePagePmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlePagePmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
