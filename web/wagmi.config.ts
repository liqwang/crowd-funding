import { http, createConfig, type Config } from 'wagmi'
import { sepolia } from 'wagmi/chains'

const config: Config = createConfig({
  chains: [sepolia],
  ssr: true, // https://wagmi.sh/react/guides/ssr
  transports: {
    [sepolia.id]: http()
  }
})

export default config
