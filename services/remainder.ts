// services/reminder.ts

import { axiosInstance } from "@/lib/axiosInstance"
// ——————————————————————————————
//  Types
// ——————————————————————————————

/** A single reminder. */
export interface Reminder {
  _id: string
  userId: string
  title: string
  message: string
  remindAt: string        // ISO timestamp, e.g. "2025-07-01T09:00:00.000Z"
  type: string            // e.g. "custom" | "habit" | "goal_deadline"
  relatedId: string | null
  isSent: boolean
  createdAt: string       // ISO timestamp
  updatedAt: string       // ISO timestamp
}

/** Payload when creating or updating a reminder. */
export interface ReminderInput {
  title: string
  message: string
  remindAt: string        // ISO timestamp in the future
  type?: string
  relatedId?: string | null
}

// ——————————————————————————————
//  CRUD FUNCTIONS
// ——————————————————————————————

const BASE_PATH = '/reminders'

/** Fetch all reminders for the current user, sorted by remindAt ascending. */
export const getAllReminders = async (): Promise<Reminder[]> => {
  const { data } = await axiosInstance.get<Reminder[]>(BASE_PATH)
  return data
}

/** Fetch a single reminder by its ID. */
export const getReminderById = async (
  reminderId: string
): Promise<Reminder> => {
  const { data } = await axiosInstance.get<Reminder>(
    `${BASE_PATH}/${reminderId}`
  )
  return data
}

/** Create a new reminder. */
export const createReminder = async (
  payload: ReminderInput
): Promise<Reminder> => {
  const { data } = await axiosInstance.post<Reminder>(BASE_PATH, payload)
  return data
}

/** Update fields on an existing reminder. */
export const updateReminder = async (
  reminderId: string,
  payload: Partial<ReminderInput>
): Promise<Reminder> => {
  const { data } = await axiosInstance.put<Reminder>(
    `${BASE_PATH}/${reminderId}`,
    payload
  )
  return data
}

/** Delete a reminder by its ID. */
export const deleteReminder = async (
  reminderId: string
): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete<{ message: string }>(
    `${BASE_PATH}/${reminderId}`
  )
  return data
}
