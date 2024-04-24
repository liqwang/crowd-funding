// Change to client component can fix problem of Wagmi's React Hooks
// "TypeError: `useReadContract` is not a function",
// because `EthProvider` is client component
'use client'

import { useReadContract } from 'wagmi'

import Card from '@/component/Card'
import type { Project } from '@/lib/definition'
import { contractConfig } from '@/../wagmi.config'


export default function Projects() {
  const {// https://wagmi.sh/react/guides/read-from-contract
    data: projects,
    isPending
  } = useReadContract({
    ...contractConfig,
    functionName: 'getProjects'
  })
  if (isPending) {
    // https://daisyui.com/components/loading
    return <span className="loading loading-spinner loading-lg"></span>
  }
  return (
    // https://tailwindcss.com/docs/grid-template-columns#breakpoints-and-media-queries
    <div className="grid gap-4 3xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2">
      {(projects as Project[]).map((project, i) =>
      i === 0 ? null: 
      <Card key={`card-${i}`} title={project.title} imageUrl={project.imageUrl}/>)}
    </div>
  )
}
