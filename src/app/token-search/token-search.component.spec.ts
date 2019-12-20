import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenSearchComponent } from './token-search.component';

describe('TokenSearchComponent', () => {
  let component: TokenSearchComponent;
  let fixture: ComponentFixture<TokenSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
