import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasAddComponent } from './pessoas-add.component';

describe('PessoasAddComponent', () => {
  let component: PessoasAddComponent;
  let fixture: ComponentFixture<PessoasAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoasAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
