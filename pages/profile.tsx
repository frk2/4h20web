import React from 'react'
import { useAccount } from 'wagmi'
import { Connect, SignInButton } from '../components'
import { useIsMounted } from '../hooks'

export default function Profile() {
  const { isConnected } = useAccount()
  const isMounted = useIsMounted();

  const [state, setState] = React.useState<{
    address?: string
    error?: Error
    loading?: boolean
  }>({})

  // Fetch user when:
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me')
        const json = await res.json()
        setState((x) => ({ ...x, address: json.address }))
      } catch (_error) {}
    }
    // 1. page loads
    handler()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])

  if (isConnected && isMounted) {
    return (
      <div>
        {/* Account content goes here */}

        {state.address ? (
          <div>
            <div>Signed in as {state.address}</div>
            <button
              onClick={async () => {
                await fetch('/api/logout')
                setState({})
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <SignInButton
            onSuccess={({ address }) => setState((x) => ({ ...x, address }))}
            onError={({ error }) => setState((x) => ({ ...x, error }))}
          />
        )}
        {state.error ? (<div>{String(state.error)}</div>) : null}
      </div>
    )
  }

  return <div><Connect/></div>
}