export interface Action {
  label: string
  onClick: (...args: any) => void
}
