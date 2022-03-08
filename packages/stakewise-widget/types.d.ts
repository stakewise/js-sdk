declare module 'stakewise-widget' {
  import { Options as MethodsOptions } from 'stakewise-methods'

  export type OpenProps = {
    onSuccess?: () => void
    onError?: () => void
    onClose?: () => void
  }

  export type OnErrorProps = {
    method: string
    error: Error
  }

  export type Options = MethodsOptions & {
    onSuccess?: () => void
    onError?: (props: OnErrorProps) => void
    onClose?: () => void
  }

  export default class Widget {
    constructor(options: Options)
    open(props?: OpenProps): void
    close(): void
  }
}
