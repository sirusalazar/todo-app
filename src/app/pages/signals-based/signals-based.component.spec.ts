import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsBasedComponent } from './signals-based.component';

describe('SignalsBasedComponent', () => {
  let component: SignalsBasedComponent;
  let fixture: ComponentFixture<SignalsBasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsBasedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
