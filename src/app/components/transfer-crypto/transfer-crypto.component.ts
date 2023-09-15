import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ethers } from 'ethers';
import { Web3Service } from 'src/app/web3.service';
import { amountValidator, addressValidator } from 'src/app/forms.validators';

@Component({
  selector: 'app-transfer-crypto',
  templateUrl: './transfer-crypto.component.html',
  styleUrls: ['./transfer-crypto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferCryptoComponent {
  balance$ = this.web3Service.balance$;

  modalRef?: BsModalRef;
  sendForm = this.fb.group({
    recipient: ['', Validators.required, addressValidator],
    amount: ['', Validators.required, amountValidator(this.web3Service)],
  });

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private web3Service: Web3Service,
    private toastr: ToastrService
  ) {}

  openConfirmationModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(form: FormGroup): void {
    this.modalRef?.hide();

    this.web3Service
      .sendTransaction(
        form.value.recipient,
        ethers.utils.parseUnits(form.value.amount, 'ether').toHexString()
      )
      .subscribe(
        (result) => {
          console.log(result);

          this.toastr.success(`Success: TX Hash: ${result.hash}`);
        },
        (err) => {
          this.toastr.error(`Error: ${err.message}`);
        }
      );
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
