import Image from 'next/image'
import Link from 'next/link'

// card for a project
export default function Card ({
  id,
  title,
  imageUrl
}: {
  id: number
  title: string
  imageUrl: string
}) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      {/* https://nextjs.org/docs/messages/no-img-element */}
      <figure><Image src={imageUrl} alt="cover" width={450} height={190}/></figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end">
          <Link href={`/project/${id}`} className="btn btn-primary">Detail</Link>
        </div>
      </div>
    </div>
  )
}
