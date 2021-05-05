import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluarSkillsComponent } from './evaluar-skills.component';

describe('EvaluarSkillsComponent', () => {
  let component: EvaluarSkillsComponent;
  let fixture: ComponentFixture<EvaluarSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluarSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluarSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
