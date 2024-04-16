import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  paths: { // https://hardhat.org/hardhat-runner/docs/config#path-configuration
    sources: "./contract"
  }
}

export default config
