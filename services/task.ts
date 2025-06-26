// services/task.ts
import { axiosInstance } from '@/lib/axiosInstance'

// ← change this to wherever your Express API lives
const TASKS_URL = `/tasks`

// ——————————————————————————————
//  Types (optional, tweak to your schema)
// ——————————————————————————————
export interface Task {
  _id: string
  userId: string
  title: string
  description: string
  isCompleted: boolean
  startTime: string
  endTime: string
  category: string
  icon: string
  recurring: 'none' | 'daily' | 'weekly' | 'monthly'
  days: string[]
  priority: 'low' | 'medium' | 'high'
  completedDates: string[]
  createdAt: string
  updatedAt: string
}

export interface TaskInput {
  title: string
  description?: string
  startTime: string
  endTime: string
  category: string
  icon: string
  recurring?: 'none' | 'daily' | 'weekly' | 'monthly'
  days?: string[]
  priority?: 'low' | 'medium' | 'high'
}

// ——————————————————————————————
//  CRUD & extras
// ——————————————————————————————

// 1. Fetch all tasks
export const getAllTasks = async (): Promise<Task[]> => {
  const { data } = await axiosInstance.get<Task[]>(TASKS_URL)
  return data
}

// 2. Fetch analytics
export const getTaskAnalytics = async (): Promise<any> => {
  const { data } = await axiosInstance.get(`${TASKS_URL}/analytics`)
  return data
}

// 3. Fetch one
export const getTaskById = async (id: string): Promise<Task> => {
  const { data } = await axiosInstance.get<Task>(`${TASKS_URL}/${id}`)
  return data
}

// 4. Create
export const createTask = async (payload: TaskInput): Promise<Task> => {
  const { data } = await axiosInstance.post<Task>(TASKS_URL, payload)
  return data
}

// 5. Update
export const updateTask = async (
  id: string,
  payload: Partial<TaskInput>
): Promise<Task> => {
  const { data } = await axiosInstance.patch<Task>(
    `${TASKS_URL}/${id}`,
    payload
  )
  return data
}

// 6. Delete
export const deleteTask = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete<{ message: string }>(
    `${TASKS_URL}/${id}`
  )
  return data
}

// 7. Toggle completion
export const toggleTaskCompletion = async (
  id: string
): Promise<Task> => {
  const { data } = await axiosInstance.patch<Task>(
    `${TASKS_URL}/${id}/toggle`
  )
  return data
}
