// services/goal.ts

import { axiosInstance } from "@/lib/axiosInstance"


// ——————————————————————————————
//  Types
// ——————————————————————————————

/**
 * Represents a user’s goal.
 */
export interface Goal {
  _id: string
  userId: string
  title: string
  description: string
  targetDate: string        // ISO date string, e.g. "2025-07-01"
  status: 'active' | 'completed' | 'cancelled'
  isCompleted: boolean
  progress: number          // 0–100
  linkedHabits: string[]    // array of Habit IDs
  priority: 'low' | 'medium' | 'high'
  category: string
  missedDays: number
  currentStreak: number
  longestStreak: number
  createdAt: string         // ISO timestamp
  updatedAt: string         // ISO timestamp
}

/**
 * Payload when creating or updating a goal.
 */
export interface GoalInput {
  title: string
  description?: string
  targetDate: string         // e.g. "2025-07-01"
  priority?: 'low' | 'medium' | 'high'
  category?: string
  linkedHabits?: string[]    // Habit IDs
}

/**
 * Stats returned by the “basic” analytics endpoint.
 */
export interface BasicGoalStats {
  totalGoals: number
  activeGoals: number
  completedGoals: number
  cancelledGoals: number
  avgProgress: number              // average of progress across all goals
  upcomingSoon: number             // count of active goals due in next 7 days
  overdueGoals: number             // count of active goals past their targetDate
  avgDaysUntilDeadline: number     // average days until deadline for active goals
}

/**
 * Stats returned by the “premium” analytics endpoint.
 */
export interface PremiumGoalStats {
  categoryDistribution: { _id: string; count: number }[]
  priorityDistribution: { _id: string; count: number }[]
  topProgressGoals: { title: string; progress: number }[]
  goalCompletionRate: number
  goalCompletionTimeline: Record<string, { completed: number }>
  avgCompletionTimeInDays: number
  medianCompletionTimeInDays: number
  avgProgressByCategory: Record<string, number>
  goalsAboutToExpire: { title: string; targetDate: string; status: string }[]
}

// ——————————————————————————————
//  CRUD FUNCTIONS
// ——————————————————————————————

const BASE_PATH = '/goals'

/** Fetch all goals for the current user. */
export const getAllGoals = async (): Promise<Goal[]> => {
  const { data } = await axiosInstance.get<Goal[]>(BASE_PATH)
  return data
}

/** Fetch a single goal by its ID. */
export const getGoalById = async (id: string): Promise<Goal> => {
  const { data } = await axiosInstance.get<Goal>(`${BASE_PATH}/${id}`)
  return data
}

/**
 * Create a new goal.
 * @param payload  Fields defined in GoalInput.
 */
export const createGoal = async (payload: GoalInput): Promise<Goal> => {
  const { data } = await axiosInstance.post<Goal>(BASE_PATH, payload)
  return data
}

/**
 * Update an existing goal.
 * @param id       Goal’s `_id`
 * @param payload  Partial fields to update.
 */
export const updateGoal = async (
  id: string,
  payload: Partial<GoalInput>
): Promise<Goal> => {
  const { data } = await axiosInstance.patch<Goal>(
    `${BASE_PATH}/${id}`,
    payload
  )
  return data
}

/** Delete a goal by its ID. */
export const deleteGoal = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete<{ message: string }>(
    `${BASE_PATH}/${id}`
  )
  return data
}

// ——————————————————————————————
//  ANALYTICS FUNCTIONS
// ——————————————————————————————

/** Fetch “basic” goal stats (free tier). */
export const getBasicGoalAnalytics = async (): Promise<BasicGoalStats> => {
  const { data } = await axiosInstance.get<BasicGoalStats>(
    `${BASE_PATH}/analytics/basic`
  )
  return data
}

/** Fetch “premium” goal stats (requires premium plan). */
export const getPremiumGoalAnalytics = async (): Promise<PremiumGoalStats> => {
  const { data } = await axiosInstance.get<PremiumGoalStats>(
    `${BASE_PATH}/analytics/premium`
  )
  return data
}
