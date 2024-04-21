import 'dotenv/config'
import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      // https://ethereum.stackexchange.com/questions/145719/understanding-how-metamask-queries-the-balance-of-an-eth-address-from-a-rpc-node
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`${process.env.ACCOUNT1_PRIVATE_KEY}`],
      chainId: 11155111
    }
  },
  paths: { // https://hardhat.org/hardhat-runner/docs/config#path-configuration
    sources: "./contract"
  }
}

export default config
