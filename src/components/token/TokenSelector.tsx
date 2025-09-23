import { useEffect, useMemo, useRef, useState } from 'react'
import { TOKENS, DEFAULT_TOKEN_SYMBOL, type TokenMetadata } from '../../data/tokens'
import TokenIcon from './TokenIcon'
import './TokenSelector.css'

type TokenSelectorProps = {
  value?: string
  onChange?: (symbol: string) => void
  tokens?: TokenMetadata[]
  label?: string
}

const TokenSelector = ({
  value = DEFAULT_TOKEN_SYMBOL,
  onChange,
  tokens = TOKENS,
  label = 'Token',
}: TokenSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const previousSelectionRef = useRef(value)

  const selectedToken = useMemo(
    () => tokens.find((token) => token.symbol === value) ?? tokens[0],
    [tokens, value],
  )

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
        previousSelectionRef.current = value
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setSearchTerm('')
        previousSelectionRef.current = value
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, value])

  useEffect(() => {
    if (isOpen) {
      previousSelectionRef.current = value
      setSearchTerm('')
      requestAnimationFrame(() => {
        searchInputRef.current?.focus()
      })
    }
  }, [isOpen, value])

  const filteredTokens = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase()
    if (!trimmed) {
      return tokens
    }
    return tokens.filter((token) => token.symbol.toLowerCase().includes(trimmed))
  }, [tokens, searchTerm])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleSelect = (symbol: string) => {
    if (symbol !== value) {
      onChange?.(symbol)
    }
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className={`token-selector${isOpen ? ' token-selector--open' : ''}`} ref={containerRef}>
      <span className="token-selector__label">{label}</span>
      {!isOpen ? (
        <button type="button" className="token-selector__selected" onClick={handleOpen}>
          <TokenIcon token={selectedToken} />
          <div className="token-selector__selected-copy">
            <span className="token-selector__selected-symbol">{selectedToken.symbol}</span>
            <span className="token-selector__selected-name">{selectedToken.name}</span>
          </div>
          <svg viewBox="0 0 16 16" aria-hidden className="token-selector__chevron">
            <path d="M4.5 6l3.5 4 3.5-4" />
          </svg>
        </button>
      ) : (
        <div className="token-selector__search">
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value.replace(/\s+/g, ''))}
            maxLength={8}
            placeholder="Search symbol"
            aria-label="Search token symbol"
            className="token-selector__search-input"
          />
        </div>
      )}

      {isOpen ? (
        <div className="token-selector__dropdown">
          {filteredTokens.length === 0 ? (
            <div className="token-selector__empty">No tokens found</div>
          ) : (
            <ul className="token-selector__list" role="listbox">
              {filteredTokens.map((token) => (
                <li key={token.symbol}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={token.symbol === value}
                    className="token-selector__option"
                    onClick={() => handleSelect(token.symbol)}
                  >
                    <TokenIcon token={token} size="sm" />
                    <div className="token-selector__option-copy">
                      <span className="token-selector__option-symbol">{token.symbol}</span>
                      <span className="token-selector__option-name">{token.name}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default TokenSelector
