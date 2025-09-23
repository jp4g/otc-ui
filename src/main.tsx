import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App'
import { WalletProvider } from './context/wallet/WalletContext'
import { TokenBalanceProvider } from './context/tokenBalance/TokenBalanceContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <TokenBalanceProvider>
          <App />
        </TokenBalanceProvider>
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>,
)
