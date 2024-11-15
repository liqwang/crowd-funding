// https://hardhat.org/tutorial/testing-contracts

import { expect } from 'chai'
import hre from 'hardhat'
import { parseEther } from 'viem'
// https://hardhat.org/hardhat-network-helpers/docs/reference#loadfixture()
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

describe('CrowdFunding', ()=>{
  // https://hardhat.org/tutorial/testing-contracts#reusing-common-test-setups-with-fixtures
  async function deployFixture(){
    // https://hardhat.org/hardhat-runner/docs/advanced/using-viem
    const [owner, addr1, addr2] = await hre.viem.getWalletClients()
    const contract = await hre.viem.deployContract('CrowdFunding')
    return { contract, owner, addr1, addr2 }
  }

  it('owner create project1', async ()=>{
    const { contract } = await loadFixture(deployFixture)
    expect(await contract.read.getProjects()).to.have.lengthOf(1)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    expect(await contract.read.getProjects()).to.have.lengthOf(2)
  })
})
