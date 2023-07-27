import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosNovoComponent } from './processos-novo.component';

describe('ProcessosNovoComponent', () => {
  let component: ProcessosNovoComponent;
  let fixture: ComponentFixture<ProcessosNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessosNovoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessosNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
