import { Injectable, ApplicationRef } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  from,
  of,
  catchError,
  switchMap,
} from 'rxjs';
import { ethers } from 'ethers';

declare let window: any;

export interface Chain {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private provider: ethers.providers.Web3Provider | undefined;
  private signer: ethers.Signer | undefined;
  public selectedNetwork$ = new BehaviorSubject<string>('');
  public selectedAddress$ = new BehaviorSubject<string>('');
  public balance$ = new BehaviorSubject<string>('');

  constructor(private appRef: ApplicationRef) {
    this.initializeProvider();
  }

  private initializeProvider() {
    from(this.connectToMetamask()).subscribe(async () => {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();

      this.getAccountInfo();

      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        const [account] = accounts;

        this.getAccountInfo(account);
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        this.selectedNetwork$.next(chainId);

        window.location.reload();
      });
    });
  }

  private async getAccountInfo(account?: string) {
    if (this.signer && this.provider) {
      const address = await this.signer.getAddress();
      const balance = await this.provider.getBalance(account ?? address);

      this.selectedAddress$.next(address);
      this.balance$.next(ethers.utils.formatEther(balance));

      this.appRef.tick();
    }
  }

  private async connectToMetamask() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return true;
    } catch (error) {
      console.error('Metamask connection error:', error);
      return false;
    }
  }

  public switchNetwork(chainId: string): Observable<boolean> {
    if (!this.signer) {
      return of(false);
    }

    return from(
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
    ).pipe(
      switchMap(() => of(true)),
      catchError((error) => {
        console.error("Couldn't switch network error:", error);

        return of(false);
      })
    );
  }

  public sendTransaction(
    to: string,
    value: string
  ): Observable<ethers.providers.TransactionResponse> {
    if (!this.signer) {
      return of();
    }

    return from(this.signer.sendTransaction({ to, value }));
  }
}
