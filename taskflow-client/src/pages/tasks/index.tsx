import { useTasks } from "./hooks/useTasks"

export function Tasks() {
  const { listTasks } = useTasks();

  listTasks();

  return (
    <h1>Hello</h1>
  )
}