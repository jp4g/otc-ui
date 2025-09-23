export type TokenMetadata = {
  name: string
  symbol: string
  decimals: number
  palette: {
    background: string
    foreground: string
  }
}

export const TOKENS: TokenMetadata[] = [
  {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    palette: {
      background: 'linear-gradient(135deg, #6274ff 0%, #54ffe6 100%)',
      foreground: 'rgba(15, 17, 25, 0.92)',
    },
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    palette: {
      background: 'linear-gradient(135deg, #3671ff 0%, #8fb5ff 100%)',
      foreground: '#ffffff',
    },
  },
  {
    name: 'Aztec Shield',
    symbol: 'AZS',
    decimals: 18,
    palette: {
      background: 'linear-gradient(135deg, #8d4bff 0%, #ff80d0 100%)',
      foreground: '#ffffff',
    },
  },
  {
    name: 'Privacy Dollar',
    symbol: 'PRV',
    decimals: 6,
    palette: {
      background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
      foreground: '#ffffff',
    },
  },
  {
    name: 'Rollup Credit',
    symbol: 'RLC',
    decimals: 9,
    palette: {
      background: 'linear-gradient(135deg, #ff9a44 0%, #ff4c6a 100%)',
      foreground: '#1a192b',
    },
  },
]

export const DEFAULT_TOKEN_SYMBOL = 'ETH'
