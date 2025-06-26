// services/chat.ts

import { axiosInstance } from "@/lib/axiosInstance"
// ——————————————————————————————
//  Types
// ——————————————————————————————

/** A chat room. */
export interface ChatRoom {
  _id: string
  name: string
  isPrivate: boolean
  members: string[]       // array of User _id
  createdAt: string       // ISO timestamp
}

/** A message in a chat room. */
export interface Message {
  _id: string
  roomId: string
  userId: string          // sender’s User _id
  text: string
  createdAt: string       // ISO timestamp
}

/** Payload when creating a room. */
export interface ChatRoomInput {
  name: string
  isPrivate?: boolean
  members?: string[]      // optional list of User _id
}

// ——————————————————————————————
//  CRUD & Messaging
// ——————————————————————————————

const BASE_PATH = '/chat/rooms'

/**
 * Create a new chat room.
 * Public if isPrivate=false (default), otherwise invite-only.
 */
export const createChatRoom = async (
  payload: ChatRoomInput
): Promise<ChatRoom> => {
  const { data } = await axiosInstance.post<ChatRoom>(
    BASE_PATH,
    payload
  )
  return data
}

/** Fetch all available chat rooms (public + your private rooms). */
export const getChatRooms = async (): Promise<ChatRoom[]> => {
  const { data } = await axiosInstance.get<ChatRoom[]>(BASE_PATH)
  return data
}

/**
 * Join a private room.
 * Returns a simple message: "Joined room" / "Already a member" / "Joined public room"
 */
export const joinChatRoom = async (
  roomId: string
): Promise<{ message: string }> => {
  const { data } = await axiosInstance.post<{ message: string }>(
    `${BASE_PATH}/${roomId}/join`
  )
  return data
}

/**
 * Fetch message history for a room.
 * @param roomId  ChatRoom _id
 * @param limit   Optional max number of messages (default 50)
 */
export const getRoomMessages = async (
  roomId: string,
  limit?: number
): Promise<Message[]> => {
  const query = limit ? `?limit=${limit}` : ''
  const { data } = await axiosInstance.get<Message[]>(
    `${BASE_PATH}/${roomId}/messages${query}`
  )
  return data
}
