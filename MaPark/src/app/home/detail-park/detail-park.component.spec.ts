import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailParkComponent } from './detail-park.component';

describe('DetailParkComponent', () => {
  let component: DetailParkComponent;
  let fixture: ComponentFixture<DetailParkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailParkComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
