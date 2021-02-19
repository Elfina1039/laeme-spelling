import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiOverviewComponent } from './wiki-overview.component';

describe('WikiOverviewComponent', () => {
  let component: WikiOverviewComponent;
  let fixture: ComponentFixture<WikiOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
