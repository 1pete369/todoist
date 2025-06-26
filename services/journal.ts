// services/journal.ts

import { axiosInstance } from "@/lib/axiosInstance"
// ——————————————————————————————
//  Types
// ——————————————————————————————

/**
 * A single journal entry.
 */
export interface JournalEntry {
  _id: string
  userId: string
  title: string
  body: string
  tags: string[]
  createdAt: string   // ISO timestamp
  updatedAt: string   // ISO timestamp
}

/**
 * Payload when creating or updating a journal entry.
 */
export interface JournalInput {
  title: string
  body: string
  tags?: string[]
}

// ——————————————————————————————
//  CRUD
// ——————————————————————————————

const BASE_PATH = '/journals'

/** Fetch all journal entries for the current user. */
export const getAllJournals = async (): Promise<JournalEntry[]> => {
  const { data } = await axiosInstance.get<JournalEntry[]>(BASE_PATH)
  return data
}

/** Fetch a single journal entry by its ID. */
export const getJournalById = async (
  journalId: string
): Promise<JournalEntry> => {
  const { data } = await axiosInstance.get<JournalEntry>(
    `${BASE_PATH}/${journalId}`
  )
  return data
}

/** Create a new journal entry. */
export const createJournal = async (
  payload: JournalInput
): Promise<JournalEntry> => {
  const { data } = await axiosInstance.post<JournalEntry>(
    BASE_PATH,
    payload
  )
  return data
}

/** Update an existing journal entry. */
export const updateJournal = async (
  journalId: string,
  payload: Partial<JournalInput>
): Promise<JournalEntry> => {
  const { data } = await axiosInstance.put<JournalEntry>(
    `${BASE_PATH}/${journalId}`,
    payload
  )
  return data
}

/** Delete a journal entry by its ID. */
export const deleteJournal = async (
  journalId: string
): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete<{ message: string }>(
    `${BASE_PATH}/${journalId}`
  )
  return data
}

// ——————————————————————————————
//  Tagging
// ——————————————————————————————

/**
 * Replace the tags array on a journal entry.
 */
export const updateJournalTags = async (
  journalId: string,
  tags: string[]
): Promise<JournalEntry> => {
  const { data } = await axiosInstance.put<JournalEntry>(
    `${BASE_PATH}/${journalId}/tags`,
    { tags }
  )
  return data
}

/**
 * Fetch all journal entries that include the given tag.
 */
export const getJournalsByTag = async (
  tagName: string
): Promise<JournalEntry[]> => {
  const { data } = await axiosInstance.get<JournalEntry[]>(
    `${BASE_PATH}/tag/${encodeURIComponent(tagName)}`
  )
  return data
}

/**
 * List all distinct tags used by the current user’s journal entries.
 */
export const listJournalTags = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get<string[]>(`${BASE_PATH}/tags`)
  return data
}
