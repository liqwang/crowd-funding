// Change to client component can fix problem of Wagmi's React Hooks
// "TypeError: `useReadCrowdFunding` is not a function",
// because `Web3ModalProvider` is client component
'use client'

import { useAccount } from 'wagmi'

import Card from '@/component/card'
import { useReadCrowdFunding } from '@/contract'

export default function MyProjects(){
  const { isConnected, address } = useAccount()
  const { // https://wagmi.sh/cli/why#the-solution
    data: projects,
    isPending
  } = useReadCrowdFunding({functionName: 'getProjects'})
  return (
    !isConnected ?
    <w3m-connect-button/> :
    isPending ? // https://daisyui.com/components/loading
    <span className="loading loading-spinner loading-lg"/> :
    // https://tailwindcss.com/docs/grid-template-columns#breakpoints-and-media-queries
    <div className="grid gap-4 3xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2">
      {projects!.map((project, i) =>
      project.owner !== address ? null:
      <Card key={`card-${i}`} id={i} title={project.title} imageUrl={project.imageUrl}/>)}
    </div>
  )
}
