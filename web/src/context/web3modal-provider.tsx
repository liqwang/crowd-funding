// https://docs.walletconnect.com/web3modal/nextjs/about#context-provider
// https://wagmi.sh/react/getting-started#setup-tanstack-query

'use client'

import { ReactNode } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'

import { config, projectId } from '@/../eth.config'


const queryClient = new QueryClient()

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // optional - defaults to your Cloud configuration
  enableOnramp: true, // optional - false as default
  themeMode: 'light',
  // https://docs.walletconnect.com/web3modal/nextjs/theming
  themeVariables: {
    '--w3m-border-radius-master': '1px'
  }
})

export default function Web3ModalProvider({
  children, // https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
