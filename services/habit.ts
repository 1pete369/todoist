// services/habit.ts

import { axiosInstance } from "@/lib/axiosInstance"

// ——————————————————————————————
//  Types
// ——————————————————————————————

/** Represents a habit. */
export interface Habit {
  _id: string
  userId: string
  title: string
  description: string
  frequency: "daily" | "weekly" | "monthly"
  days: string[] // e.g. ["Monday", "Wednesday"]
  startDate: string // ISO date string
  completedDates: string[] // ISO date strings
  streak: number
  longestStreak: number
  lastCompletedAt: string | null // ISO timestamp
  linkedGoalId: string | null
  icon: string
  category: string
  isArchived: boolean
  createdAt: string // ISO timestamp
  updatedAt: string // ISO timestamp
}

/** Payload when creating or updating a habit. */
export interface HabitInput {
  title: string
  description?: string
  frequency: "daily" | "weekly" | "monthly"
  days?: string[]
  startDate: string // e.g. "2025-07-01"
  icon: string
  category?: string
  linkedGoalId?: string | null
}

/** Basic analytics for habits (free tier). */
export interface BasicHabitStats {
  totalHabits: number
  activeHabits: number
  archivedHabits: number
  totalCompleted: number
  avgStreak: number
  categoryDist: { _id: string; count: number }[]
  frequencyDist: { _id: string; count: number }[]
}

/** Premium analytics for habits (premium tier). */
export interface PremiumHabitStats {
  freqDist: { _id: string; count: number }[]
  topStreaks: { title: string; longestStreak: number }[]
  completionRate: number
  totalRemainingAll: number
  habitDetails: {
    _id: string
    title: string
    category: string
    frequency: string
    requiredCount: number
    doneCount: number
    remainingCount: number
    completedDates: string[]
    missedDates: string[]
    streak: number
    longestStreak: number
  }[]
  categoryDetailed: {
    category: string
    totalHabits: number
    totalDone: number
    totalExpected: number
    completionRate: number
  }[]
  frequencyDetailed: {
    frequency: string
    totalHabits: number
    totalDone: number
    totalExpected: number
    completionRate: number
  }[]
  dailyTrend: { date: string; count: number }[]
  perHabitStreakTimeline: {
    habitId: string
    timeline: { date: string; streak: number }[]
  }[]
  perHabitHeatmap: {
    habitId: string
    heatmap: { date: string; completed: boolean }[]
  }[]
  consistency: {
    habitId: string
    consistencyScore: number | null
  }[]
}

// ——————————————————————————————
//  CRUD
// ——————————————————————————————

const BASE_PATH = "/habits"

/** Fetch all habits for the current user. */
export const getAllHabits = async (): Promise<Habit[]> => {
  const { data } = await axiosInstance.get<Habit[]>(BASE_PATH)
  return data
}

/** Fetch a single habit by its ID. */
export const getHabitById = async (id: string): Promise<Habit> => {
  const { data } = await axiosInstance.get<Habit>(`${BASE_PATH}/${id}`)
  return data
}

/**
 * Create a new habit.
 * @param payload  Fields defined in HabitInput.
 */
export const createHabit = async (payload: HabitInput): Promise<Habit> => {
  const { data } = await axiosInstance.post<Habit>(BASE_PATH, payload)
  return data
}

/**
 * Update an existing habit.
 * @param id       Habit’s `_id`
 * @param payload  Partial fields to update.
 */
export const updateHabit = async (
  id: string,
  payload: Partial<HabitInput>
): Promise<Habit> => {
  const { data } = await axiosInstance.patch<Habit>(
    `${BASE_PATH}/${id}`,
    payload
  )
  return data
}

/** Delete a habit by its ID. */
export const deleteHabit = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete<{ message: string }>(
    `${BASE_PATH}/${id}`
  )
  return data
}

/** Toggle completion for today. */
export const toggleHabitCompleted = async (id: string): Promise<Habit> => {
  const { data } = await axiosInstance.patch<Habit>(
    `${BASE_PATH}/${id}/complete`
  )
  return data
}

// ——————————————————————————————
//  ANALYTICS
// ——————————————————————————————

/** Fetch “basic” habit stats (free tier). */
export const getBasicHabitAnalytics = async (): Promise<BasicHabitStats> => {
  const { data } = await axiosInstance.get<BasicHabitStats>(
    `${BASE_PATH}/analytics/basic`
  )
  return data
}

/**
 * Fetch “premium” habit stats (requires premium plan).
 * @param options.fromDate  optional ISO date string "YYYY-MM-DD"
 * @param options.toDate    optional ISO date string "YYYY-MM-DD"
 */
export const getPremiumHabitAnalytics = async (options?: {
  fromDate?: string
  toDate?: string
}): Promise<PremiumHabitStats> => {
  let url = `${BASE_PATH}/analytics/premium`
  if (options?.fromDate || options?.toDate) {
    const params = new URLSearchParams()
    if (options.fromDate) params.append("from", options.fromDate)
    if (options.toDate) params.append("to", options.toDate)
    url += `?${params.toString()}`
  }
  const { data } = await axiosInstance.get<PremiumHabitStats>(url)
  return data
}
