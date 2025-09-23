import './LandingView.css'

const LandingView = () => {
  return (
    <section className="landing">
      <div className="landing__hero">
        <p className="landing__eyebrow">Private OTC trading for Aztec</p>
        <h1>Aztec OTC Desk</h1>
        <p className="landing__lead">
          Execute private OTC trades with end-to-end confidentiality, from discovery to finality.
        </p>
      </div>

      <div className="landing__features">
        <article className="landing__feature-card">
          <h2>Private matching</h2>
          <p>Discover counterparties without broadcasting intent to the public mempool.</p>
        </article>
        <article className="landing__feature-card">
          <h2>Private execution</h2>
          <p>Execute trades with shielded settlement flows and audit-ready proofs.</p>
        </article>
        <article className="landing__feature-card">
          <h2>Private counterparties</h2>
          <p>Verify counterparties using anonymous credentials and selective disclosures.</p>
        </article>
        <article className="landing__feature-card">
          <h2>Instant finality</h2>
          <p>Confirm trades within seconds with Aztec rollup speed and deterministic settlement.</p>
        </article>
      </div>

      <section className="landing__how-to">
        <h2>How to use</h2>
        <p>
          This section will outline onboarding steps once product copy and flows are finalized. For
          now, placeholders ensure layout validation across the MVP screens.
        </p>
      </section>
    </section>
  )
}

export default LandingView
