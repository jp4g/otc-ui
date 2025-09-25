import {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import { TOKENS } from '../../data/tokens'
import { fetchTokenBalance } from '../../services/fakeBalances'

export type BalanceStatus = 'idle' | 'loading' | 'success' | 'error'

export type TokenBalanceState = {
  amount: number
  status: BalanceStatus
  error?: string
}

export type TokenBalanceContextValue = {
  balances: Record<string, TokenBalanceState>
  refreshBalance: (symbol: string) => Promise<void>
  setLocalBalance: (symbol: string, updater: (prev: number) => number) => void
}

const TokenBalanceContext = createContext<TokenBalanceContextValue | undefined>(undefined)

const initialState: Record<string, TokenBalanceState> = TOKENS.reduce(
  (acc, token) => {
    acc[token.symbol] = { amount: 0, status: 'idle' }
    return acc
  },
  {} as Record<string, TokenBalanceState>,
)

export const TokenBalanceProvider = ({ children }: PropsWithChildren) => {
  const [balances, setBalances] = useState(initialState)
  const inflightRequests = useRef<Record<string, Promise<void> | undefined>>({})

  const refreshBalance = useCallback(async (symbol: string) => {
    const existing = inflightRequests.current[symbol]
    if (existing) {
      return existing
    }

    const request = (async () => {
      setBalances((prev) => ({
        ...prev,
        [symbol]: {
          ...prev[symbol],
          status: 'loading',
          error: undefined,
        },
      }))

      try {
        const amount = await fetchTokenBalance(symbol)
        setBalances((prev) => ({
          ...prev,
          [symbol]: {
            amount,
            status: 'success',
            error: undefined,
          },
        }))
      } catch (error) {
        setBalances((prev) => ({
          ...prev,
          [symbol]: {
            ...prev[symbol],
            status: 'error',
            error: error instanceof Error ? error.message : 'Failed to fetch balance',
          },
        }))
      } finally {
        delete inflightRequests.current[symbol]
      }
    })()

    inflightRequests.current[symbol] = request
    return request
  }, [])

  const setLocalBalance = useCallback((symbol: string, updater: (prev: number) => number) => {
    setBalances((prev) => ({
      ...prev,
      [symbol]: {
        ...prev[symbol],
        amount: updater(prev[symbol]?.amount ?? 0),
      },
    }))
  }, [])

  const value = useMemo<TokenBalanceContextValue>(
    () => ({ balances, refreshBalance, setLocalBalance }),
    [balances, refreshBalance, setLocalBalance],
  )

  return <TokenBalanceContext.Provider value={value}>{children}</TokenBalanceContext.Provider>
}

export default TokenBalanceContext
