import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMemoryComponent } from './search-memory.component';

describe('SearchMemoryComponent', () => {
  let component: SearchMemoryComponent;
  let fixture: ComponentFixture<SearchMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
