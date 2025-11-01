import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orderstats } from './orderstats';

describe('Orderstats', () => {
  let component: Orderstats;
  let fixture: ComponentFixture<Orderstats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orderstats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orderstats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
