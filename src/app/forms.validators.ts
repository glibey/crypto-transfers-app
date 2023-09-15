import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ethers } from 'ethers';
import { Web3Service } from './web3.service';

export function addressValidator(
  control: AbstractControl
): Observable<ValidationErrors | null> {
  if (!ethers.utils.isAddress(control.value)) {
    return of({ invalidAddress: true });
  }

  return of(null);
}

export function amountValidator(web3Service: Web3Service): ValidatorFn {
  return (control: AbstractControl) => {
    if (
      isNaN(control?.value) ||
      (web3Service.balance$.getValue() as unknown as number) <= 0
    ) {
      return of({ invalidBalance: true });
    }

    if (
      isNaN(control?.value) ||
      control.value > (web3Service.balance$.getValue() as unknown as number) ||
      control.value < 0.000000000000000001 // Min amount to send 1 wei
    ) {
      return of({ invalidAmount: true });
    }

    return of(null);
  };
}
