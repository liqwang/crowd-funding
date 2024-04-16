import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Project'
}

export default function NewProject() {
  return (
    // https://tailwindcss.com/docs/flex-direction#column
    // https://tailwindcss.com/docs/width#percentage-widths
    <div className="flex flex-col w-1/3 text-sm">
      <label className="font-semibold ml-1 mb-1">Title</label>
      {/* https://daisyui.com/components/input */}
      <input type="text" className="input input-bordered input-sm"/>

      <label className="font-semibold ml-1 mb-1 mt-4">ETH address / ENS domain</label>
      <input type="text" className="input input-bordered input-sm w-2/3"/>

      <label className="font-semibold ml-1 mb-1 mt-4">Target Fund (ETH)</label>
      <input type="text" className="input input-bordered input-sm w-1/2"/>

      <label className="font-semibold ml-1 mb-1 mt-4">Description</label>
      <textarea className="textarea textarea-bordered h-64"/>
    </div>
  )
}
