export function conditionallyConcatClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
