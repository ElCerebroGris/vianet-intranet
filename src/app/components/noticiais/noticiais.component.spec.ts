import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaisComponent } from './noticiais.component';

describe('NoticiaisComponent', () => {
  let component: NoticiaisComponent;
  let fixture: ComponentFixture<NoticiaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
