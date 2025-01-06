import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDetailsComponent } from './consulter-details.component';

describe('ConsulterDetailsComponent', () => {
  let component: ConsulterDetailsComponent;
  let fixture: ComponentFixture<ConsulterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
