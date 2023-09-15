import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private web3Service: Web3Service) {}

  address$ = this.web3Service.selectedAddress$;
  balance$ = this.web3Service.balance$;
}
