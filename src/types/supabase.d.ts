export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      entries: {
        Row: {
          bib_number: number | null
          birth_date: string
          birth_place: string | null
          club: string | null
          country: string | null
          email: string | null
          event_id: string | null
          fidal_card: string | null
          first_name: string
          gender: Database["public"]["Enums"]["gender"] | null
          id: number
          last_name: string
          order_id: number | null
          order_item_id: number | null
          phone_number: string | null
          product_id: string | null
          tin: string | null
        }
        Insert: {
          bib_number?: number | null
          birth_date: string
          birth_place?: string | null
          club?: string | null
          country?: string | null
          email?: string | null
          event_id?: string | null
          fidal_card?: string | null
          first_name: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: number
          last_name: string
          order_id?: number | null
          order_item_id?: number | null
          phone_number?: string | null
          product_id?: string | null
          tin?: string | null
        }
        Update: {
          bib_number?: number | null
          birth_date?: string
          birth_place?: string | null
          club?: string | null
          country?: string | null
          email?: string | null
          event_id?: string | null
          fidal_card?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: number
          last_name?: string
          order_id?: number | null
          order_item_id?: number | null
          phone_number?: string | null
          product_id?: string | null
          tin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entries_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entries_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entries_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entries_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number | null
          date: string
          description: string | null
          details: Json | null
          flyer: string | null
          id: string
          name: string
          regulation: string | null
          slug: string
          status: string
          summary: string | null
          summary_image: string | null
          type: string
        }
        Insert: {
          capacity?: number | null
          date: string
          description?: string | null
          details?: Json | null
          flyer?: string | null
          id: string
          name: string
          regulation?: string | null
          slug: string
          status?: string
          summary?: string | null
          summary_image?: string | null
          type: string
        }
        Update: {
          capacity?: number | null
          date?: string
          description?: string | null
          details?: Json | null
          flyer?: string | null
          id?: string
          name?: string
          regulation?: string | null
          slug?: string
          status?: string
          summary?: string | null
          summary_image?: string | null
          type?: string
        }
        Relationships: []
      }
      events_groups: {
        Row: {
          event_id: string
          group_id: number
        }
        Insert: {
          event_id: string
          group_id: number
        }
        Update: {
          event_id?: string
          group_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "events_groups_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      events_products: {
        Row: {
          event_id: string
          product_id: string
        }
        Insert: {
          event_id: string
          product_id: string
        }
        Update: {
          event_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_products_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          id: number
          name: string
          status: string | null
        }
        Insert: {
          id?: number
          name: string
          status?: string | null
        }
        Update: {
          id?: number
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          date: string
          description: string | null
          event_id: string | null
          id: number
          name: string | null
          order_id: number
          payment_date: string | null
          payment_id: string | null
          payment_method: string | null
          payment_status: string | null
          price: number | null
          product_id: string | null
          quantity: number | null
          status: string
          user_id: string | null
        }
        Insert: {
          date?: string
          description?: string | null
          event_id?: string | null
          id?: number
          name?: string | null
          order_id: number
          payment_date?: string | null
          payment_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number | null
          status?: string
          user_id?: string | null
        }
        Update: {
          date?: string
          description?: string | null
          event_id?: string | null
          id?: number
          name?: string | null
          order_id?: number
          payment_date?: string | null
          payment_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number | null
          customer_email: string | null
          customer_first_name: string | null
          customer_last_name: string | null
          date: string
          id: number
          notification_date: string | null
          notification_id: string | null
          notification_status: string | null
          payment_date: string | null
          payment_id: string | null
          payment_method: string | null
          payment_status: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          customer_email?: string | null
          customer_first_name?: string | null
          customer_last_name?: string | null
          date?: string
          id?: number
          notification_date?: string | null
          notification_id?: string | null
          notification_status?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          customer_email?: string | null
          customer_first_name?: string | null
          customer_last_name?: string | null
          date?: string
          id?: number
          notification_date?: string | null
          notification_id?: string | null
          notification_status?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          id: number
          name: string
          status: string | null
        }
        Insert: {
          id?: number
          name: string
          status?: string | null
        }
        Update: {
          id?: number
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          description: string | null
          end_sale_date: string | null
          entry_form: string | null
          id: string
          name: string
          payment_methods: Json | null
          price: number
          start_sale_date: string | null
          status: string
          stock: number | null
          summary: string | null
          type: string
        }
        Insert: {
          description?: string | null
          end_sale_date?: string | null
          entry_form?: string | null
          id: string
          name: string
          payment_methods?: Json | null
          price: number
          start_sale_date?: string | null
          status?: string
          stock?: number | null
          summary?: string | null
          type: string
        }
        Update: {
          description?: string | null
          end_sale_date?: string | null
          entry_form?: string | null
          id?: string
          name?: string
          payment_methods?: Json | null
          price?: number
          start_sale_date?: string | null
          status?: string
          stock?: number | null
          summary?: string | null
          type?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          description: string | null
          id: string
          name: string
          uid: number
          visible: boolean
        }
        Insert: {
          description?: string | null
          id: string
          name: string
          uid: number
          visible?: boolean
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          uid?: number
          visible?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          role: string
          user_id: string
        }
        Insert: {
          role: string
          user_id: string
        }
        Update: {
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          birth_date: string | null
          birth_place: string | null
          country: string | null
          created_at: string | null
          email: string
          fidal_card: string | null
          first_name: string
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          last_name: string
          phone_number: string | null
          team: string | null
          tin: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          birth_date?: string | null
          birth_place?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          fidal_card?: string | null
          first_name: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id: string
          last_name: string
          phone_number?: string | null
          team?: string | null
          tin?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          birth_date?: string | null
          birth_place?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          fidal_card?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          last_name?: string
          phone_number?: string | null
          team?: string | null
          tin?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users_groups: {
        Row: {
          group_id: number
          role: string
          user_id: string
        }
        Insert: {
          group_id: number
          role: string
          user_id: string
        }
        Update: {
          group_id?: number
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_groups_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_groups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_entries: {
        Row: {
          birth_year: number | null
          club: string | null
          date: string | null
          email: string | null
          event_id: string | null
          fidal_card: string | null
          first_name: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          last_name: string | null
          notification_date: string | null
          notification_id: string | null
          notification_status: string | null
          order_id: number | null
          order_item_event_id: string | null
          order_item_id: number | null
          payment_date: string | null
          payment_id: string | null
          payment_method: string | null
          payment_status: string | null
          phone_number: string | null
          product_id: string | null
          product_type: string | null
          tin: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entries_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entries_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entries_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entries_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_event_id_fkey"
            columns: ["order_item_event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      v_entries_carnet: {
        Row: {
          birth_year: number | null
          club: string | null
          date: string | null
          email: string | null
          event_id: string | null
          first_name: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          last_name: string | null
          order_id: number | null
          order_item_id: number | null
          payment_id: string | null
          payment_method: string | null
          payment_status: string | null
          phone_number: string | null
          product_type: string | null
          tin: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entries_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entries_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      v_entries_public: {
        Row: {
          birth_year: number | null
          club: string | null
          event_id: string | null
          first_name: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          last_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entries_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      authorize_event: {
        Args: { _event_id: string }
        Returns: boolean
      }
      authorize_role: {
        Args: { role_id: string }
        Returns: boolean
      }
      create_entry: {
        Args: {
          user_id: string
          date: string
          amount: number
          customer_email: string
          customer_first_name: string
          customer_last_name: string
          payment_method: string
          payment_status: string
        }
        Returns: {
          amount: number | null
          customer_email: string | null
          customer_first_name: string | null
          customer_last_name: string | null
          date: string
          id: number
          notification_date: string | null
          notification_id: string | null
          notification_status: string | null
          payment_date: string | null
          payment_id: string | null
          payment_method: string | null
          payment_status: string | null
          status: string
          user_id: string | null
        }
      }
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
      entry_exist: {
        Args: { _event_id: string; _tin: string }
        Returns: boolean
      }
    }
    Enums: {
      gender: "M" | "F"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gender: ["M", "F"],
    },
  },
} as const
