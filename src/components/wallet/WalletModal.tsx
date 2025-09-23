import { useMemo, useState } from 'react'
import Modal from '../primitives/Modal'
import Button from '../primitives/Button'
import Dropdown from '../primitives/dropdown/Dropdown'
import ProviderLogos, { type ProviderLogoId } from '../icons/ProviderLogos'
import useWallet from '../../hooks/useWallet'
import './WalletModal.css'

type WalletModalProps = {
  open: boolean
  onClose: () => void
}

type ProviderOption = {
  id: string
  name: string
  description: string
  available: boolean
  logoId: ProviderLogoId
}

const providerOptions: ProviderOption[] = [
  {
    id: 'aztec-native',
    name: 'Aztec Native Wallet',
    description: 'Shielded wallet with native Aztec sync',
    available: true,
    logoId: 'aztec-native',
  },
  {
    id: 'ledger-shield',
    name: 'Ledger Shield',
    description: 'Hardware signing for institutional desks',
    available: false,
    logoId: 'ledger-shield',
  },
  {
    id: 'browser-bridge',
    name: 'Browser Bridge',
    description: 'Connect an external wallet via secure bridge',
    available: false,
    logoId: 'browser-bridge',
  },
]

const WalletModal = ({ open, onClose }: WalletModalProps) => {
  const { status, connect, disconnect, accounts, activeAccount, setActiveAccount } = useWallet()
  const [pendingProviderId, setPendingProviderId] = useState<string | null>(null)
  const isConnected = status === 'connected'

  const modalMeta = useMemo(() => {
    if (isConnected) {
      return {
        title: 'Wallet connected',
        description: 'Manage the active account or disconnect from the OTC desk session.',
      }
    }

    return {
      title: 'Connect your wallet',
      description:
        'Choose a provider to begin a private session. Options marked coming soon are placeholders.',
    }
  }, [isConnected])

  const handleProviderSelect = async (option: ProviderOption) => {
    if (!option.available || status === 'connecting') {
      return
    }

    setPendingProviderId(option.id)
    try {
      await connect()
      onClose()
    } finally {
      setPendingProviderId(null)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        if (status !== 'connecting') {
          onClose()
        }
      }}
      title={modalMeta.title}
      description={modalMeta.description}
    >
      {isConnected ? (
        <div className="wallet-modal__connected">
          <div className="wallet-modal__status-chip">Session active</div>
          <dl className="wallet-modal__details">
            <div>
              <dt>Active account</dt>
              <dd>
                <div className="wallet-modal__account-select">
                  <Dropdown
                    label="Active account"
                    options={accounts.map((account) => ({
                      label: `${account.label} · ${account.address.slice(0, 6)}…${account.address.slice(-4)}`,
                      value: account.address,
                    }))}
                    value={activeAccount?.address}
                    onChange={setActiveAccount}
                  />
                </div>
              </dd>
            </div>
            <div>
              <dt>Full address</dt>
              <dd className="wallet-modal__address">{activeAccount?.address}</dd>
            </div>
          </dl>
          <div className="wallet-modal__connected-actions">
            <Button variant="secondary" block onClick={handleDisconnect}>
              Disconnect
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="wallet-modal__providers" role="list">
            {providerOptions.map((option) => {
              const isPending = pendingProviderId === option.id && status === 'connecting'
              const isDisabled = !option.available || status === 'connecting'

              return (
                <button
                  key={option.id}
                  type="button"
                  role="listitem"
                  className={`wallet-modal__provider${
                    !option.available ? ' wallet-modal__provider--disabled' : ''
                  }${isPending ? ' wallet-modal__provider--pending' : ''}`}
                  onClick={() => handleProviderSelect(option)}
                  disabled={isDisabled}
                >
                  <div className="wallet-modal__provider-main">
                    <span className="wallet-modal__provider-logo-wrapper">
                      <ProviderLogos id={option.logoId} />
                    </span>
                    <div className="wallet-modal__provider-content">
                      <div className="wallet-modal__provider-headline">
                        <span className="wallet-modal__provider-name">{option.name}</span>
                        {!option.available ? (
                          <span className="wallet-modal__provider-pill">Soon</span>
                        ) : null}
                      </div>
                      <p className="wallet-modal__provider-description">{option.description}</p>
                    </div>
                  </div>
                  {isPending ? (
                    <span className="wallet-modal__provider-loading">Connecting…</span>
                  ) : null}
                </button>
              )
            })}
          </div>
          <div className="wallet-modal__actions">
            <Button variant="ghost" onClick={onClose} disabled={status === 'connecting'}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </Modal>
  )
}

export default WalletModal
