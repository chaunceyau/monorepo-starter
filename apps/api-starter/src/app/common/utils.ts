export const stripeDateToISO = (stripe_date: number) =>
  new Date(stripe_date * 1e3).toISOString()
