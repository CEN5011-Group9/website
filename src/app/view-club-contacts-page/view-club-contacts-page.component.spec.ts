import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClubContactsPageComponent } from './view-club-contacts-page.component';

describe('ViewClubContactsPageComponent', () => {
  let component: ViewClubContactsPageComponent;
  let fixture: ComponentFixture<ViewClubContactsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClubContactsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClubContactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
