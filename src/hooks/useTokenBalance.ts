import { useContext, useEffect } from 'react'
import TokenBalanceContext from '../context/tokenBalance/TokenBalanceContext'

const useTokenBalance = (symbol: string) => {
  const ctx = useContext(TokenBalanceContext)

  if (!ctx) {
    throw new Error('useTokenBalance must be used within a TokenBalanceProvider')
  }

  const { balances, refreshBalance, setLocalBalance } = ctx
  const state = balances[symbol] ?? { amount: 0, status: 'idle' as const }

  useEffect(() => {
    if (state.status === 'idle') {
      void refreshBalance(symbol)
    }
  }, [state.status, symbol, refreshBalance])

  return {
    ...state,
    refresh: () => refreshBalance(symbol),
    setLocalBalance: (updater: (prev: number) => number) => setLocalBalance(symbol, updater),
  }
}

export default useTokenBalance
