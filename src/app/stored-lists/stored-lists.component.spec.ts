import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredListsComponent } from './stored-lists.component';

describe('StoredListsComponent', () => {
  let component: StoredListsComponent;
  let fixture: ComponentFixture<StoredListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
