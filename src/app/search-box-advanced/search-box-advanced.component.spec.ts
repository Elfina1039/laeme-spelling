import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxAdvancedComponent } from './search-box-advanced.component';

describe('SearchBoxAdvancedComponent', () => {
  let component: SearchBoxAdvancedComponent;
  let fixture: ComponentFixture<SearchBoxAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
