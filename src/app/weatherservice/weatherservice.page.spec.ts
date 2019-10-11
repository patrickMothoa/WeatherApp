import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherservicePage } from './weatherservice.page';

describe('WeatherservicePage', () => {
  let component: WeatherservicePage;
  let fixture: ComponentFixture<WeatherservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherservicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
