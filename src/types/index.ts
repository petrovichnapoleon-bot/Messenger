/**
 * Type Definitions for Messenger Application
 * This file contains all TypeScript type definitions and interfaces
 * Last updated: 2026-01-04
 */

/**
 * User-related types
 */
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  verified: boolean;
}

/**
 * Message-related types
 */
export interface Message {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
  edited: boolean;
  deletedAt?: Date;
}

export interface MessageWithAuthor extends Message {
  author: User;
}

/**
 * Conversation-related types
 */
export interface Conversation {
  id: string;
  name?: string;
  participantIds: string[];
  createdAt: Date;
  updatedAt: Date;
  isGroup: boolean;
}

export interface ConversationWithMessages extends Conversation {
  messages: MessageWithAuthor[];
  lastMessage?: MessageWithAuthor;
}

/**
 * API Response types
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Error types
 */
export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

/**
 * Auth-related types
 */
export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse extends AuthToken {
  user: User;
}

/**
 * Request/Response types
 */
export interface CreateMessageRequest {
  content: string;
  conversationId: string;
}

export interface CreateConversationRequest {
  participantIds: string[];
  name?: string;
  isGroup: boolean;
}

export interface UpdateMessageRequest {
  content: string;
}

/**
 * Event types for real-time updates
 */
export type MessageEvent = 'message:created' | 'message:updated' | 'message:deleted';
export type UserEvent = 'user:online' | 'user:offline' | 'user:typing';
export type ConversationEvent = 'conversation:created' | 'conversation:updated' | 'conversation:deleted';

export interface WebSocketEvent<T = any> {
  type: MessageEvent | UserEvent | ConversationEvent;
  payload: T;
  timestamp: Date;
}

/**
 * Notification types
 */
export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'mention' | 'system';
  title: string;
  message: string;
  read: boolean;
  relatedId?: string;
  createdAt: Date;
}

/**
 * Status types
 */
export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  AWAY = 'away',
  BUSY = 'busy',
}

export enum MessageStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

/**
 * Utility types
 */
export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type AsyncFunction<T = void> = () => Promise<T>;

export interface RequestOptions {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

/**
 * Filter and Sort types
 */
export interface MessageFilter {
  senderId?: string;
  conversationId?: string;
  startDate?: Date;
  endDate?: Date;
  searchTerm?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface QueryOptions<T> {
  filter?: T;
  sort?: SortOptions;
  page?: number;
  pageSize?: number;
}
