import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingPage } from './routing.page';

describe('RoutingPage', () => {
  let component: RoutingPage;
  let fixture: ComponentFixture<RoutingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
