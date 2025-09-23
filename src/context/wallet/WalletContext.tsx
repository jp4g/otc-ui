import { createContext, useCallback, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'

export type WalletStatus = 'disconnected' | 'connecting' | 'connected'

export type WalletAccount = {
  address: string
  label: string
}

export type WalletContextValue = {
  status: WalletStatus
  accounts: WalletAccount[]
  activeAccount?: WalletAccount
  connect: () => Promise<void>
  disconnect: () => void
  setActiveAccount: (address: string) => void
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined)

const demoAccounts: WalletAccount[] = [
  { address: '0x8fa4dE1B7C29f5FA04164A1b0296Df2aa451E8cE', label: 'Vault 1' },
  { address: '0x94B1Ea7e3859bf80877f334c4fc702c21440F9D4', label: 'Vault 2' },
  { address: '0xCBc9738a5c22E8cbA43bA29C6140209a9119358f', label: 'Institutional Desk' },
]

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<WalletStatus>('disconnected')
  const [accounts, setAccounts] = useState<WalletAccount[]>([])
  const [activeAccount, setActiveAccountState] = useState<WalletAccount | undefined>(undefined)

  const connect = useCallback(async () => {
    if (status !== 'disconnected') {
      return
    }

    setStatus('connecting')

    // Simulate provider selection + hydration delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    setAccounts(demoAccounts)
    setActiveAccountState(demoAccounts[0])
    setStatus('connected')
  }, [status])

  const disconnect = useCallback(() => {
    setStatus('disconnected')
    setAccounts([])
    setActiveAccountState(undefined)
  }, [])

  const setActiveAccount = useCallback(
    (address: string) => {
      setActiveAccountState((prev) => {
        if (prev?.address === address) {
          return prev
        }

        const nextAccount = accounts.find((account) => account.address === address)
        return nextAccount ?? prev
      })
    },
    [accounts],
  )

  const value = useMemo<WalletContextValue>(
    () => ({ status, accounts, activeAccount, connect, disconnect, setActiveAccount }),
    [status, accounts, activeAccount, connect, disconnect, setActiveAccount],
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export default WalletContext
