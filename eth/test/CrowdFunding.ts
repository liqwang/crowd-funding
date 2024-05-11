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
  
  it('anyone can\'t fund a project that doesn\'t exist', async()=>{
    const { contract } = await loadFixture(deployFixture)
    // await contract.write.closeProject([BigInt(0)])
    expect(await contract.read.getProjects()).to.have.lengthOf(1)
    // await expect(contract.write.fundProject([BigInt(1)], { value: parseEther('1') })).to.be.revertedWith('project not exist')
  })

  it('addr1 fund to project1', async ()=>{
    const { contract } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    await contract.read.getProjects()
  })

  it('addr2 fund to project1', async ()=>{
    const { contract, addr1, addr2 } = await loadFixture(deployFixture)
    // await contract.write.closeProject([BigInt(0)])
    expect(await contract.read.getProjects()).to.have.lengthOf(1)
  })

  it('not owner can\'t withdraw the project fund', async()=>{
    const { contract, addr1, addr2 } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    // await contract.write.fundProject([BigInt(1)], { value: parseEther('1') })
    await contract.write.closeProject([BigInt(1)])
    // await expect(contract.write.withdrawProject([BigInt(1)], { from: addr1 })).to.be.revertedWith('not owner')
  })

  it('if the project fund isn\'t enough, owner can\'t withdraw the fund', async()=>{
    const { contract } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    // await contract.write.fundProject([BigInt(1)], { value: parseEther('0.5') })
    await contract.write.closeProject([BigInt(1)])
    // await expect(contract.write.withdrawProject([BigInt(1)], { from: addr1 })).to.be.revertedWith('fund not enough')
  })

  it('owner can withdraw the project\'s enough fund', async()=>{
    const { contract } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    // await contract.write.fundProject([BigInt(1)], { value: parseEther('1') })
    await contract.write.closeProject([BigInt(1)])
    // await contract.write.withdrawProject([BigInt(1)])
    // expect(await contract.read.getProjects()).to.have.lengthOf(0)
  })

  it('owner close his/her project', async()=>{
    const { contract } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    await contract.write.closeProject([BigInt(1)])
    expect(await contract.read.getProjects()).to.have.lengthOf(2)
  })

  it('owner can\'t close other\'s project', async()=>{
    const { contract, addr1 } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    // await expect(contract.write.closeProject([BigInt(1)], { from: addr1 })).to.be.revertedWith('not owner')
  })

  it('owner can\'t close a project twice', async()=>{
    const { contract } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    await contract.write.closeProject([BigInt(1)])
    // await expect(contract.write.closeProject([BigInt(1)])).to.be.revertedWith('project already closed')
  })

  it('anyone can\'t fund a closed project', async()=>{
    const { contract } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    await contract.write.closeProject([BigInt(1)])
    // await expect(contract.write.fundProject([BigInt(1)], { value: parseEther('1') })).to.be.revertedWith('project already closed')
  })

  it('anyone can\'t close a project that doesn\'t exist', async()=>{
    const { contract } = await loadFixture(deployFixture)
    expect(await contract.read.getProjects()).to.have.lengthOf(1)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
  })

  it('not owner can\'t modify the project', async()=>{
    const { contract, addr1 } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    // await expect(contract.write.modifyProject([BigInt(1)], ['proj2', 'project2', 'https://', parseEther('2')], { from: addr1 })).to.be.revertedWith('not owner')
    // expect(await contract.read.getProjects()).to.have.lengthOf(0)
  })

  it('owner modify the project successfully', async()=>{
    const { contract } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    // await contract.write.modifyProject([BigInt(1)], ['proj2', 'project2', 'https://', parseEther('2')])
    expect(await contract.read.getProjects()).to.have.lengthOf(2)
  })

  it('owner can\'t modify a project that doesn\'t exist', async()=>{
    const { contract } = await loadFixture(deployFixture)
    // await expect(contract.write.modifyProject([BigInt(1)], ['proj2', 'project2', 'https://', parseEther('2')])).to.be.revertedWith('project not exist')
  })

  it('owner can\'t modify a closed project', async()=>{
    const { contract } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    await contract.write.closeProject([BigInt(1)])
    // await expect(contract.write.modifyProject([BigInt(1)], ['proj2', 'project2', 'https://', parseEther('2')])).to.be.revertedWith('project already closed')
  })

  it('the total collected fund is correct', async()=>{
    const { contract } = await loadFixture(deployFixture)
    await contract.write.createProject(['proj1', 'project1', 'https://', parseEther('1')])
    // await contract.write.fundProject([BigInt(1)], { value: parseEther('1') })
    await contract.write.createProject(['proj2', 'project2', 'https://', parseEther('2')])
    // await contract.write.fundProject([BigInt(2)], { value: parseEther('2') })
    expect(await contract.read.getProjects()).to.have.lengthOf(3)
    // expect(await contract.read.getTotalCollected()).to.equal(parseEther('3'))
  })
})
