import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavformComponent } from './navform.component';

describe('NavformComponent', () => {
  let component: NavformComponent;
  let fixture: ComponentFixture<NavformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
