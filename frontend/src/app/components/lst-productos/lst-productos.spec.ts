import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstProductos } from './lst-productos';

describe('LstProductos', () => {
  let component: LstProductos;
  let fixture: ComponentFixture<LstProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LstProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LstProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
