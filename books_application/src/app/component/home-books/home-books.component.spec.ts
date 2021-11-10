import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBooksComponent } from './home-books.component';

describe('HomeBooksComponent', () => {
  let component: HomeBooksComponent;
  let fixture: ComponentFixture<HomeBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
