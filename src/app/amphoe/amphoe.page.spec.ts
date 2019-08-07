import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmphoePage } from './amphoe.page';

describe('AmphoePage', () => {
  let component: AmphoePage;
  let fixture: ComponentFixture<AmphoePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmphoePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmphoePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
