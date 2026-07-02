import { useAccount, useChainId } from 'wagmi'

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function WalletStatusCard() {
  const { address, isConnected, connector } = useAccount()
  const chainId = useChainId()

  if (!isConnected || !address) {
    return (
      <article className="card">
        <div className="eyebrow">Wallet</div>
        <h2>Not connected</h2>
        <p>Connect a wallet to unlock portfolio, asset, and network-aware app states.</p>
      </article>
    )
  }

  return (
    <article className="card">
      <div className="eyebrow">Wallet</div>
      <h2>{shortenAddress(address)}</h2>
      <p>Connector: {connector?.name || 'Unknown'}</p>
      <p>Chain ID: {chainId}</p>
    </article>
  )
}
