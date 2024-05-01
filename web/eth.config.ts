// https://docs.walletconnect.com/web3modal/nextjs/about#wagmi-config
// https://wagmi.sh/react/getting-started
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'

import CrowdFunding from '@/../../eth/artifacts/contract/CrowdFunding.sol/CrowdFunding.json'


// get projectId at https://cloud.walletconnect.com
// This projectId is visible to the client, so it is no need to hide as an environment variable
export const projectId = '710835cc96450aebc6e5ed0a3c102121'

export const config = defaultWagmiConfig({
  chains: [sepolia],
  projectId,
  metadata: {
    name: 'Crowd Funding',
    description: 'Crowd Funding ÐApp',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  ssr: true, // https://wagmi.sh/react/guides/ssr
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [sepolia.id]: http()
  }
})

export const contractConfig = {
  address: '0x1bbdaC59c6E90E7AFf2CC9607770003644B62822',
  abi: CrowdFunding.abi
} as const
