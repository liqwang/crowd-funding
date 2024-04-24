import { http, createConfig, type Config } from 'wagmi'
import { sepolia } from 'wagmi/chains'

import CrowdFunding from '@/../../eth/artifacts/contract/CrowdFunding.sol/CrowdFunding.json'

// https://wagmi.sh/react/typescript
declare module 'wagmi' {
  interface Regiser {
    config: typeof config
  }
}

const config: Config = createConfig({
  chains: [sepolia],
  ssr: true, // https://wagmi.sh/react/guides/ssr
  transports: {
    [sepolia.id]: http()
  }
})

const contractConfig = {
  address: '0xDf31F349912dD8EAF4cA033919c0ECF5785C5358',
  abi: CrowdFunding.abi
} as const

export { config, contractConfig }
