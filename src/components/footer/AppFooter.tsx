import './AppFooter.css'

const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <span>Created by Aztec Pioneers</span>
        <nav aria-label="External communities" className="app-footer__links">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://discord.com" target="_blank" rel="noreferrer">
            Discord
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default AppFooter
