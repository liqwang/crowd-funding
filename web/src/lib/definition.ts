export type Project = {
  id: number
  name: string
  address?: string
  ens?: string
  description: string
  targetFund: string
  currentFund: string
}

export type User = {
  address: string
  ens: string
  projects: Project[]
}
