import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentAbookComponent } from './rent-abook.component';

describe('RentAbookComponent', () => {
  let component: RentAbookComponent;
  let fixture: ComponentFixture<RentAbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentAbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentAbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
