import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaAddComponent } from './noticia-add.component';

describe('NoticiaAddComponent', () => {
  let component: NoticiaAddComponent;
  let fixture: ComponentFixture<NoticiaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiaAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
