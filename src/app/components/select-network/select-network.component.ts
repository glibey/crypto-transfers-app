import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ethers } from 'ethers';
import { ToastrService } from 'ngx-toastr';
import { Web3Service } from '../../web3.service';
import { ApiService } from '../../api.service';
import { Chain, Network } from 'src/app/app.interfaces';

@Component({
  selector: 'app-select-network',
  templateUrl: './select-network.component.html',
  styleUrls: ['./select-network.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectNetworkComponent implements OnInit, OnDestroy {
  includeTest: boolean = true;
  selected?: string;
  allChain: Chain[] = [];
  filteredChains: Chain[] = [];

  private subscriptions = new Subscription();

  constructor(
    private web3Service: Web3Service,
    private api: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.api.getChainList().subscribe((networks: Network[]) => {
        this.filteredChains = this.allChain = networks.map((item: Network) => {
          return {
            title: item.title,
            chainId: item.chainId,
            name: item.name,
            isTestnet:
              item?.title?.toLowerCase()?.includes('test') ||
              item?.name?.toLowerCase()?.includes('test')
                ? true
                : false,
          } as Chain;
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  includeTestChangeHandler(showTestChain: boolean) {
    this.includeTest = !this.includeTest;
    this.filteredChains = showTestChain
      ? this.allChain
      : this.allChain.filter((chain: Chain) => !chain.isTestnet);
  }

  switchNetwork(chainId: number) {
    this.subscriptions.add(
      this.web3Service
        .switchNetwork(ethers.utils.hexValue(Number(chainId)))
        .subscribe((success) => {
          if (success) {
            this.toastr.success(`Network switched successfully`);
          } else {
            this.toastr.error(`Network switched failed`);
          }
        })
    );
  }
}
