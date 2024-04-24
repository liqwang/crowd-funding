export type Project = {
  owner: string
  title: string
  imageUrl: string
  description: string
  target: number      //wei
  collected: number   //wei
  withdrawed: number  //wei
  deadline: number    //timestamp(second)
}
