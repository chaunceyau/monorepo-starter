export function conditionallyConcatClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function concatClassNames(...classes: string[]) {
  return classes.filter(v => !!v).join(' ');
}
