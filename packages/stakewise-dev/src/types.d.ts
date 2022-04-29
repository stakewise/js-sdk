interface Window {
  web3: any
  uniqueIdsPaths: any
  ethereum: {
    isMetaMask: boolean
    networkVersion?: string
    on: (event: string, callback: (chainId: string) => void) => void
    request: (params: any) => Promise<any>
    enable: () => Promise<[ string ]>
  }
}

// ENV variables
declare const ETHERSCAN_KEY: string

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module App {
  type Form = {
    currency: string
    network: string
    theme: string
    overlay: string
    customStyles: boolean
    withReferrer: boolean
    referrer: string
  }
}
