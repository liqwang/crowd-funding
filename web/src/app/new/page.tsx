'use client'

import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

export default function NewProject() {
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  return (
    <> {/* https://react.dev/reference/react/Fragment */}
      <Head>
        <title>My New Title</title>
      </Head>
      {/* https://tailwindcss.com/docs/flex-direction#column */}
      {/* https://tailwindcss.com/docs/width#percentage-widths */}
      <div className="flex flex-col w-1/3 text-sm">
        <label className="font-semibold ml-1 mb-1">Title</label>
        {/* https://daisyui.com/components/input */}
        <input type="text" className="input input-bordered input-sm"/>

        <label className="font-semibold ml-1 mb-1 mt-4">ETH address / ENS domain</label>
        <input type="text" className="input input-bordered input-sm w-2/3"/>

        <label className="font-semibold ml-1 mb-1 mt-4">Target Fund (ETH)</label>
        <input type="text" className="input input-bordered input-sm w-1/2"/>

        {/* https://stackoverflow.com/a/33822113 */}
        <label htmlFor="upload-file" className="btn btn-neutral mt-4 w-1/3">{
          uploading ?
          <span className="loading loading-spinner"/> :
          'Upload Image'
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
        <Image src={imageUrl}
          hidden={imageUrl===''} alt="image"
          className="mt-4 rounded-box"
          width={200} height={200}
        />

        <label className="font-semibold ml-1 mb-1 mt-4">Description</label>
        <textarea className="textarea textarea-bordered h-64"/>
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
