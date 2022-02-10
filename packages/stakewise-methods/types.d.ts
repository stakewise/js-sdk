declare module 'stakewise-methods' {
  export type Options = {
    provider: Record<string, any>
    address: string
    referral: string
  }

  export default class Methods {
    constructor(options: Options)
  }
}
