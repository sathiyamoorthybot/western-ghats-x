export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      cricket_players: {
        Row: {
          age: number
          created_at: string
          id: string
          jersey_number: number | null
          name: string
          phone: string
          photo_url: string | null
          player_type: string
          team_id: string
          updated_at: string
        }
        Insert: {
          age: number
          created_at?: string
          id?: string
          jersey_number?: number | null
          name: string
          phone: string
          photo_url?: string | null
          player_type?: string
          team_id: string
          updated_at?: string
        }
        Update: {
          age?: number
          created_at?: string
          id?: string
          jersey_number?: number | null
          name?: string
          phone?: string
          photo_url?: string | null
          player_type?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cricket_players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "cricket_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      cricket_registrations: {
        Row: {
          captain_email: string
          captain_name: string
          captain_phone: string
          created_at: string | null
          id: string
          players: Json
          team_jersey_url: string | null
          team_name: string
        }
        Insert: {
          captain_email: string
          captain_name: string
          captain_phone: string
          created_at?: string | null
          id?: string
          players: Json
          team_jersey_url?: string | null
          team_name: string
        }
        Update: {
          captain_email?: string
          captain_name?: string
          captain_phone?: string
          created_at?: string | null
          id?: string
          players?: Json
          team_jersey_url?: string | null
          team_name?: string
        }
        Relationships: []
      }
      cricket_teams: {
        Row: {
          captain_name: string
          captain_phone: string
          created_at: string
          event_id: string
          id: string
          payment_method: string | null
          payment_status: string
          registration_fee: number
          team_jersey_url: string | null
          team_name: string
          transaction_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          captain_name: string
          captain_phone: string
          created_at?: string
          event_id: string
          id?: string
          payment_method?: string | null
          payment_status?: string
          registration_fee?: number
          team_jersey_url?: string | null
          team_name: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          captain_name?: string
          captain_phone?: string
          created_at?: string
          event_id?: string
          id?: string
          payment_method?: string | null
          payment_status?: string
          registration_fee?: number
          team_jersey_url?: string | null
          team_name?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cricket_teams_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      cricket_tournaments: {
        Row: {
          captain_email: string
          captain_name: string
          captain_phone: string
          created_at: string
          entry_fee: number
          id: string
          payment_id: string | null
          payment_status: string
          players: Json
          team_jersey_url: string | null
          team_name: string
          transaction_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          captain_email: string
          captain_name: string
          captain_phone: string
          created_at?: string
          entry_fee?: number
          id?: string
          payment_id?: string | null
          payment_status?: string
          players?: Json
          team_jersey_url?: string | null
          team_name: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          captain_email?: string
          captain_name?: string
          captain_phone?: string
          created_at?: string
          entry_fee?: number
          id?: string
          payment_id?: string | null
          payment_status?: string
          players?: Json
          team_jersey_url?: string | null
          team_name?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          event_date: string
          event_type: string
          id: string
          location: string | null
          max_participants: number | null
          name: string
          registration_fee: number | null
          registration_open: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date: string
          event_type: string
          id?: string
          location?: string | null
          max_participants?: number | null
          name: string
          registration_fee?: number | null
          registration_open?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string
          event_type?: string
          id?: string
          location?: string | null
          max_participants?: number | null
          name?: string
          registration_fee?: number | null
          registration_open?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      marathon_participants: {
        Row: {
          age: number
          bib_number: number | null
          blood_group: string
          created_at: string
          email: string
          emergency_contact: string
          emergency_phone: string
          full_name: string
          gender: string
          id: string
          phone: string
          race_type: string
          registration_id: string
          tshirt_size: string
          updated_at: string
        }
        Insert: {
          age: number
          bib_number?: number | null
          blood_group: string
          created_at?: string
          email: string
          emergency_contact: string
          emergency_phone: string
          full_name: string
          gender: string
          id?: string
          phone: string
          race_type: string
          registration_id: string
          tshirt_size: string
          updated_at?: string
        }
        Update: {
          age?: number
          bib_number?: number | null
          blood_group?: string
          created_at?: string
          email?: string
          emergency_contact?: string
          emergency_phone?: string
          full_name?: string
          gender?: string
          id?: string
          phone?: string
          race_type?: string
          registration_id?: string
          tshirt_size?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marathon_participants_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "marathon_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      marathon_registrations: {
        Row: {
          created_at: string
          event_id: string
          id: string
          payment_method: string | null
          payment_status: string
          registration_type: string
          total_amount: number
          transaction_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          payment_method?: string | null
          payment_status?: string
          registration_type: string
          total_amount: number
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          payment_method?: string | null
          payment_status?: string
          registration_type?: string
          total_amount?: number
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marathon_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      team_registrations: {
        Row: {
          amount: number
          captain_email: string
          captain_name: string
          captain_phone: string
          created_at: string
          id: string
          jersey_color: string
          payment_id: string | null
          payment_status: string
          players: Json
          special_requests: string | null
          team_name: string
          team_size: number
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          amount?: number
          captain_email: string
          captain_name: string
          captain_phone: string
          created_at?: string
          id?: string
          jersey_color: string
          payment_id?: string | null
          payment_status?: string
          players?: Json
          special_requests?: string | null
          team_name: string
          team_size?: number
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          captain_email?: string
          captain_name?: string
          captain_phone?: string
          created_at?: string
          id?: string
          jersey_color?: string
          payment_id?: string | null
          payment_status?: string
          players?: Json
          special_requests?: string | null
          team_name?: string
          team_size?: number
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
