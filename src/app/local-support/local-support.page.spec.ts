import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalSupportPage } from './local-support.page';

describe('LocalSupportPage', () => {
  let component: LocalSupportPage;
  let fixture: ComponentFixture<LocalSupportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
