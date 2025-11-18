// Supabase Database Types
// This file will be auto-generated. Run: npm run db:types
// After you've set up your Supabase project and created the database schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      prompts: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          prompt_text: string
          category: string
          copy_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          prompt_text: string
          category: string
          copy_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          prompt_text?: string
          category?: string
          copy_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      prompt_likes: {
        Row: {
          id: string
          prompt_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          prompt_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          prompt_id?: string
          user_id?: string
          created_at?: string
        }
      }
      ai_platforms: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      prompt_platforms: {
        Row: {
          id: string
          prompt_id: string
          platform_id: string
          created_at: string
        }
        Insert: {
          id?: string
          prompt_id: string
          platform_id: string
          created_at?: string
        }
        Update: {
          id?: string
          prompt_id?: string
          platform_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      prompts_with_stats: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          prompt_text: string
          category: string
          copy_count: number
          created_at: string
          updated_at: string
          author_email: string | null
          like_count: number
          platforms: Json
        }
      }
    }
    Functions: {}
    Enums: {}
  }
}
