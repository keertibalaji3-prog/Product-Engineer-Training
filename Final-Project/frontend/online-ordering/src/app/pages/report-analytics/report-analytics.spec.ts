import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAnalytics } from './report-analytics';

describe('ReportAnalytics', () => {
  let component: ReportAnalytics;
  let fixture: ComponentFixture<ReportAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportAnalytics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAnalytics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
