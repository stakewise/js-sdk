interface Window {
  web3: any
  uniqueIdsPaths: any
  ethereum: {
    isMetaMask: boolean,
    request: (params: any) => Promise<any>
  }
}

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
  }
}