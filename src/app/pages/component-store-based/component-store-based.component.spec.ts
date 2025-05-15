import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentStoreBasedComponent } from './component-store-based.component';

describe('ComponentStoreBasedComponent', () => {
  let component: ComponentStoreBasedComponent;
  let fixture: ComponentFixture<ComponentStoreBasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentStoreBasedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentStoreBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
