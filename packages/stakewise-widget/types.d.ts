declare module 'stakewise-widget' {
  import { Options } from 'stakewise-methods'

  export type OpenProps = {
    onSuccess?: () => void
    onError?: () => void
    onClose?: () => void
  }

  export default class Widget {
    constructor(options: Options)
    open(props?: OpenProps): void
    close(): void
  }
}
