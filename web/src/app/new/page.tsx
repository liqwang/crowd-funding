'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'

import { useWriteCrowdFunding } from '@/contract'


export default function NewProject() {
  const [title, setTitle] = useState('')
  const [targetFund, setTargetFund] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [description, setDescription] = useState('')
  const { isConnected } = useAccount()
  const { isPending, writeContract } = useWriteCrowdFunding()
  return (
    <> {/* https://react.dev/reference/react/Fragment */}
      {/* https://github.com/vercel/next.js/discussions/50872#discussioncomment-9067944 */}
      <title>New Project</title>
      {/* https://tailwindcss.com/docs/flex-direction#column */}
      {/* https://tailwindcss.com/docs/width#percentage-widths */}
      <div className="flex flex-col w-1/3 text-sm">
        <label className="font-semibold ml-1 mb-1">Title</label>
        {/* https://daisyui.com/components/input */}
        <input type="text" className="input input-bordered input-sm"
          onChange={(event) => setTitle(event.target.value)}
        />

        <label className="font-semibold ml-1 mb-1 mt-4">Target Fund (ETH)</label>
        <input type="text" className="input input-bordered input-sm w-1/2"
          onChange={(event) => setTargetFund(Number(event.target.value))}
        />

        {/* https://stackoverflow.com/a/33822113 */}
        <label htmlFor="upload-file" className="btn btn-neutral mt-4 w-1/3">{
          uploading ?
          <><span className="loading loading-spinner"/>Uploading...</> :
          <><i className="icon-[icon-park-outline--picture-one] w-6 h-6"/>Upload Image</>
        }</label>
        <input id="upload-file"
          type="file" className="hidden"
          accept=".png,.jpeg,.jpg"
          onChange={async (event) => {
            if(event.target.files){
              const file = event.target.files[0]
              setUploading(true)
              setImageUrl(await uploadImage(file))
              setUploading(false)
            }
          }}
        />
        {imageUrl &&
        <Image src={imageUrl} alt="image"
          className="mt-4 rounded-box"
          width={200} height={200}
        />}

        <label className="font-semibold ml-1 mb-1 mt-4">Description</label>
        <textarea className="textarea textarea-bordered h-64"
          onChange={(event) => setDescription(event.target.value)}
        />

        <div className="mt-4">
        {isConnected ?
          <button className="btn bg-sky-400 hover:bg-sky-500 text-white text-lg w-1/3"
            onClick={()=>{
              console.log([title, description, imageUrl, targetFund])
              writeContract({
                functionName: 'createProject',
                args: [title, description, imageUrl, BigInt(targetFund)]
              })
            }}
          >{isPending ?
              <><span className="loading loading-spinner"/>Creating...</> :
              <><i className="icon-[ic--round-plus] w-7 h-7"/>Create</>
          }</button> :
          <w3m-connect-button/>
        }
        </div>
      </div>
    </>
  )
}

async function uploadImage(image: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', image)
  const res = await fetch('https://imgtp.com/api/upload', {
    method: 'POST',
    body: formData
  })
  const { data } = await res.json()
  return data.url
}
