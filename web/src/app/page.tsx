//card for a project
function Card () {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">Shoes</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Detail</button>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    // https://tailwindcss.com/docs/margin
    <div className="flex justify-center my-8">
      {/* https://tailwindcss.com/docs/grid-template-columns#breakpoints-and-media-queries */}
      <div className="grid gap-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2">
        {Array.from({ length: 12 }).map((_, i) => <Card key={`card-${i}`}/>)}
      </div>
    </div>
  )
}
