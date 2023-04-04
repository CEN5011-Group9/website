import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClubPageComponent } from './manage-club-page.component';

describe('ManageClubPageComponent', () => {
  let component: ManageClubPageComponent;
  let fixture: ComponentFixture<ManageClubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClubPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
