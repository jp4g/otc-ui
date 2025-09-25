import useWallet from '../../hooks/useWallet'
import './BuyView.css'

const BuyViewContent = () => {
  return (
    <section className="buy-view">
      <h1>Buy Orders</h1>
      <p>
        Placeholder copy describing targeted order matching, negotiation threads, and private trade
        confirmations that will surface here.
      </p>
    </section>
  )
}

const BuyView = () => {
  const { status } = useWallet()

  if (status !== 'connected') {
    return (
      <section className="buy-view buy-view--locked">
        <p>Please connect a wallet to proceed!</p>
      </section>
    )
  }

  return <BuyViewContent />
}

export default BuyView
