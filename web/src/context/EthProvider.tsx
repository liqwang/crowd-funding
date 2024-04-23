// https://wagmi.sh/react/getting-started#setup-tanstack-query
'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { config } from '@/../wagmi.config'


const queryClient = new QueryClient() 

export default function EthProvider({
  children // https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
