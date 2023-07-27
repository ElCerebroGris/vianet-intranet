import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacoComponent } from './espaco.component';

describe('EspacoComponent', () => {
  let component: EspacoComponent;
  let fixture: ComponentFixture<EspacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspacoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
