// https://wagmi.sh/cli/getting-started
import { defineConfig } from '@wagmi/cli'
import { react, etherscan } from '@wagmi/cli/plugins'
import { sepolia } from 'wagmi/chains'

export default defineConfig({
  out: 'src/contract.ts',
  contracts: [],
  plugins: [
    // not use Hardhat plugin, because Hardhat must be installed previously,
    // which is redundant in frontend CI build process
    
    react(), // https://wagmi.sh/cli/api/plugins/react
    etherscan({ // https://wagmi.sh/cli/api/plugins/etherscan
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: sepolia.id,
      contracts: [
        {
          name: 'CrowdFunding',
          address: '0x1bbdaC59c6E90E7AFf2CC9607770003644B62822'
        }
      ]
    })
  ]
})
