import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRankingComponent } from './form-ranking.component';

describe('FormRankingComponent', () => {
  let component: FormRankingComponent;
  let fixture: ComponentFixture<FormRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
