import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePage } from './online.page';

describe('OnlinePage', () => {
  let component: OnlinePage;
  let fixture: ComponentFixture<OnlinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
