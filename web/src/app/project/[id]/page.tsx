'use client'

import { useAccount } from 'wagmi'
import Image from 'next/image'

import { useReadCrowdFunding, useWriteCrowdFunding } from '@/contract'
import { useState } from 'react'
import { parseEther, formatEther } from 'viem'

export default function Project({params}: {params:{id:bigint}}){
  const { // https://wagmi.sh/cli/why#the-solution
    data: project,
    isPending: loading
  } = useReadCrowdFunding({
    functionName: 'projects',
    args: [params.id]
  })
  const { isConnected } = useAccount()
  const [ fundEth, setFundEth ] = useState('')
  const { isPending, writeContract: writeCrowdFunding } = useWriteCrowdFunding()
  return (
    loading ? // https://daisyui.com/components/loading
    <span className="loading loading-spinner loading-lg"/> :
    // https://daisyui.com/components/hero
    <div className="hero mt-10">
      <div className="hero-content flex-col lg:flex-row">
        {/* https://viem.sh/docs/faq.html#why-is-a-contract-function-return-type-returning-an-array-instead-of-an-object
            https://github.com/wevm/wagmi/discussions/2866 */}
        <Image src={project![3]} alt="cover"className="max-w-sm rounded-lg shadow-2xl" width={400} height={400}/>
        <div>
          <h1 className="text-4xl font-bold">{project![1]}</h1>
          <p className="py-6">{project![2]}</p>
          <i className="icon-[charm--person] w-6 h-6"/>
          <label className="font-semibold ml-1">Receiver: {project![0]}</label>

          <div className="flex items-center my-4">
            <h2>{((Number(project![6])/Number(project![5]))*100).toFixed(2)+'%'}</h2>
            <progress className="progress progress-info w-2/3 mx-2" value={project![6]+''} max={project![5]+''}/>
            <h2>{formatEther(project![5])+' ETH'}</h2>
          </div>

          { !isConnected ?
            <w3m-connect-button/> :
            <>
              <div className="flex items-center">
                <h1 className="font-semibold text-xl">ETH:</h1>
                <input type="text" className="ml-1 input input-bordered w-1/5"
                  onChange={(event)=>setFundEth(event.target.value)}
                />
                <button className="btn ml-2 bg-sky-400 hover:bg-sky-500 text-white text-lg"
                  onClick={()=>{
                    writeCrowdFunding({
                      functionName: 'donate',
                      args: [params.id],
                      value: parseEther(fundEth)
                    })
                  }}
                >{
                  isPending ?
                  <><span className="loading loading-spinner"/>Donating...</> :
                  <><i className="icon-[charm--heart] w-6 h-6"/>Donate</>
                }</button>
              </div>

              <div className="flex items-center mt-3">
                <h1 className="font-semibold text-xl">ETH:</h1>
                <input type="text" className="ml-1 input input-bordered w-1/5"/>
                <button className="btn btn-accent ml-2 text-white text-lg">
                  <><i className="icon-[tabler--wallet] w-7 h-7"/>Withdraw</>
                </button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}
