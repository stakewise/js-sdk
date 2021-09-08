const PREFIX = 'Precondition failed'

export function precondition(condition: unknown, message: string): asserts condition {
  if (condition) {
    return
  }
  throw new Error(`${PREFIX}: ${message}`)
}
