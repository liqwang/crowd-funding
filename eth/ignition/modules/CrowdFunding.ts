// https://blog.nomic.foundation/introducing-hardhat-ignition-a-refreshed-deployments-experience-9580d2946e10
import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('CrowdFundingModule', (m) => {
  const contract = m.contract('CrowdFunding')
  return { contract }
})
