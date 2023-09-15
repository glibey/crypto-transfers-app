import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCryptoComponent } from './transfer-crypto.component';

describe('TransferCryptoComponent', () => {
  let component: TransferCryptoComponent;
  let fixture: ComponentFixture<TransferCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferCryptoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
