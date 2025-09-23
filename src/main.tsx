import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App'
import { WalletProvider } from './context/wallet/WalletContext'
import { TokenBalanceProvider } from './context/tokenBalance/TokenBalanceContext'
import { ToastProvider } from './context/toast/ToastContext'
import ToastViewport from './components/toast/ToastViewport'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <TokenBalanceProvider>
          <ToastProvider>
            <App />
            <ToastViewport />
          </ToastProvider>
        </TokenBalanceProvider>
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>,
)
