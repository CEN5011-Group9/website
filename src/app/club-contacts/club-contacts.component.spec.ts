import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubContactsComponent } from './club-contacts.component';

describe('ClubContactsComponent', () => {
  let component: ClubContactsComponent;
  let fixture: ComponentFixture<ClubContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
