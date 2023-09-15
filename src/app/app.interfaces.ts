export interface Chain {
  chainId: number;
  title: string;
  name: string;
  isTestnet: boolean;
}

export interface Network {
  name: string;
  chain: string;
  icon?: string;
  rpc: string[];
  features?: Feature[];
  faucets: string[];
  nativeCurrency: NativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44?: number;
  ens?: Ens;
  explorers?: Explorer[];
  title?: string;
}

export interface Explorer {
  name: string;
  url: string;
  standard: string;
  icon?: string;
}

export interface Ens {
  registry: string;
}

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface Feature {
  name: string;
}
