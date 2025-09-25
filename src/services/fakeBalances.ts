const SYMBOL_BASE = {
  ETH: 2.35,
  USDC: 18.4,
  AZS: 123.78,
  PRV: 905.12,
  RLC: 45.67,
} as const

type SupportedSymbol = keyof typeof SYMBOL_BASE

const delay = (min = 450, max = 1200) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * (max - min) + min))

export const fetchTokenBalance = async (symbol: string): Promise<number> => {
  await delay()
  const key = symbol.toUpperCase() as SupportedSymbol
  const base = SYMBOL_BASE[key] ?? 1
  const noise = Math.random() * base
  return parseFloat((base + noise).toFixed(4))
}
