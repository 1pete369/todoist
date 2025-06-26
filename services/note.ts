// services/note.ts

import { axiosInstance } from "@/lib/axiosInstance"
// ——————————————————————————————
//  Types
// ——————————————————————————————

/** Represents a single note. */
export interface Note {
  _id: string
  userId: string
  title: string
  content: string
  tags: string[]
  createdAt: string   // ISO timestamp
  updatedAt: string   // ISO timestamp
}

/** Payload when creating or updating a note. */
export interface NoteInput {
  title: string
  content: string
  tags?: string[]
}

// ——————————————————————————————
//  CRUD & Tagging
// ——————————————————————————————

const BASE_PATH = '/notes'

/** Fetch all notes for the current user. */
export const getAllNotes = async (): Promise<Note[]> => {
  const { data } = await axiosInstance.get<Note[]>(BASE_PATH)
  return data
}

/** Fetch a single note by its ID. */
export const getNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await axiosInstance.get<Note>(`${BASE_PATH}/${noteId}`)
  return data
}

/** Create a new note. */
export const createNote = async (
  payload: NoteInput
): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>(BASE_PATH, payload)
  return data
}

/** Update an existing note’s title & content. */
export const updateNote = async (
  noteId: string,
  payload: Partial<NoteInput>
): Promise<Note> => {
  const { data } = await axiosInstance.put<Note>(
    `${BASE_PATH}/${noteId}`,
    payload
  )
  return data
}

/** Delete a note by its ID. */
export const deleteNote = async (
  noteId: string
): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete<{ message: string }>(
    `${BASE_PATH}/${noteId}`
  )
  return data
}

/** Replace a note’s tags array. */
export const updateNoteTags = async (
  noteId: string,
  tags: string[]
): Promise<Note> => {
  const { data } = await axiosInstance.put<Note>(
    `${BASE_PATH}/${noteId}/tags`,
    { tags }
  )
  return data
}

/** Fetch all notes that include the given tag. */
export const getNotesByTag = async (
  tagName: string
): Promise<Note[]> => {
  const { data } = await axiosInstance.get<Note[]>(
    `${BASE_PATH}/tag/${encodeURIComponent(tagName)}`
  )
  return data
}

/** List all distinct tags used by the current user’s notes. */
export const listNoteTags = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get<string[]>(`${BASE_PATH}/tags`)
  return data
}
