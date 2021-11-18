import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlogComponent } from './userlog.component';

describe('UserlogComponent', () => {
  let component: UserlogComponent;
  let fixture: ComponentFixture<UserlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
