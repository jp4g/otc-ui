const SYMBOL_BASE = {
  ETH: 2.35,
  USDC: 18.4,
  AZS: 123.78,
  PRV: 905.12,
  RLC: 45.67,
} satisfies Record<string, number>

const delay = (min = 450, max = 1200) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * (max - min) + min))

export const fetchTokenBalance = async (symbol: string): Promise<number> => {
  await delay()
  const base = SYMBOL_BASE[symbol] ?? 1
  const noise = Math.random() * base
  return parseFloat((base + noise).toFixed(4))
}
