export type todoTaskType = {
  id: number,
  title: string,
  description: string,
  date: string,
  location: string | null,
  status: 'In Progress' | 'Completed' | 'Cancelled'
}