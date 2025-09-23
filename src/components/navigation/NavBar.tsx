import { NavLink, useNavigate } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  const navigate = useNavigate()

  return (
    <header className="nav-bar">
      <div className="nav-bar__inner">
        <button type="button" className="nav-bar__brand" onClick={() => navigate('/')}>
          <span className="nav-bar__brand-mark" aria-hidden>
            AZ
          </span>
          <span className="nav-bar__brand-text">Aztec OTC Desk</span>
        </button>

        <nav aria-label="Primary">
          <ul className="nav-bar__links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link'
                }
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mint"
                className={({ isActive }) =>
                  isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link'
                }
              >
                Mint
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sell"
                className={({ isActive }) =>
                  isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link'
                }
              >
                Sell
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/buy"
                className={({ isActive }) =>
                  isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link'
                }
              >
                Buy
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="nav-bar__wallet" role="status" aria-live="polite">
          <span className="nav-bar__wallet-indicator" aria-hidden />
          <span>Wallet disconnected</span>
        </div>
      </div>
    </header>
  )
}

export default NavBar
