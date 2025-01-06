import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirProduitsComponent } from './voir-produits.component';

describe('VoirProduitsComponent', () => {
  let component: VoirProduitsComponent;
  let fixture: ComponentFixture<VoirProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoirProduitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
