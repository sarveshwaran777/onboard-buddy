export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      approvals: {
        Row: {
          approval_type: string
          approver_email: string
          id: string
          requested_at: string
          responded_at: string | null
          response_notes: string | null
          status: string
          workflow_id: string
        }
        Insert: {
          approval_type: string
          approver_email: string
          id?: string
          requested_at?: string
          responded_at?: string | null
          response_notes?: string | null
          status?: string
          workflow_id: string
        }
        Update: {
          approval_type?: string
          approver_email?: string
          id?: string
          requested_at?: string
          responded_at?: string | null
          response_notes?: string | null
          status?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approvals_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_receipts: {
        Row: {
          chain_hash: string | null
          executor_id: string | null
          id: string
          input_hash: string
          new_state: Database["public"]["Enums"]["workflow_state"]
          output_hash: string
          policy_decision: Database["public"]["Enums"]["policy_decision"]
          policy_rule: string | null
          previous_state: Database["public"]["Enums"]["workflow_state"] | null
          timestamp: string
          tool_name: string
          workflow_id: string
        }
        Insert: {
          chain_hash?: string | null
          executor_id?: string | null
          id?: string
          input_hash: string
          new_state: Database["public"]["Enums"]["workflow_state"]
          output_hash: string
          policy_decision: Database["public"]["Enums"]["policy_decision"]
          policy_rule?: string | null
          previous_state?: Database["public"]["Enums"]["workflow_state"] | null
          timestamp?: string
          tool_name: string
          workflow_id: string
        }
        Update: {
          chain_hash?: string | null
          executor_id?: string | null
          id?: string
          input_hash?: string
          new_state?: Database["public"]["Enums"]["workflow_state"]
          output_hash?: string
          policy_decision?: Database["public"]["Enums"]["policy_decision"]
          policy_rule?: string | null
          previous_state?: Database["public"]["Enums"]["workflow_state"] | null
          timestamp?: string
          tool_name?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_receipts_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_logs: {
        Row: {
          decision: Database["public"]["Enums"]["policy_decision"]
          evaluated_at: string
          id: string
          policy_bundle: string | null
          reason: string | null
          requested_action: string
          tool_name: string
          workflow_id: string
        }
        Insert: {
          decision: Database["public"]["Enums"]["policy_decision"]
          evaluated_at?: string
          id?: string
          policy_bundle?: string | null
          reason?: string | null
          requested_action: string
          tool_name: string
          workflow_id: string
        }
        Update: {
          decision?: Database["public"]["Enums"]["policy_decision"]
          evaluated_at?: string
          id?: string
          policy_bundle?: string | null
          reason?: string | null
          requested_action?: string
          tool_name?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_logs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          context: Json | null
          created_at: string
          current_state: Database["public"]["Enums"]["workflow_state"]
          employee_email: string
          employee_name: string
          employment_type: Database["public"]["Enums"]["employment_type"]
          id: string
          location: string
          role: string
          start_date: string
          team: string
          updated_at: string
        }
        Insert: {
          context?: Json | null
          created_at?: string
          current_state?: Database["public"]["Enums"]["workflow_state"]
          employee_email: string
          employee_name: string
          employment_type?: Database["public"]["Enums"]["employment_type"]
          id?: string
          location: string
          role: string
          start_date: string
          team: string
          updated_at?: string
        }
        Update: {
          context?: Json | null
          created_at?: string
          current_state?: Database["public"]["Enums"]["workflow_state"]
          employee_email?: string
          employee_name?: string
          employment_type?: Database["public"]["Enums"]["employment_type"]
          id?: string
          location?: string
          role?: string
          start_date?: string
          team?: string
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
      employment_type: "fte" | "contractor" | "intern"
      policy_decision: "allow" | "deny" | "needs_approval"
      workflow_state:
        | "INTENT_PARSED"
        | "HR_VALIDATED"
        | "POLICY_RESOLVED"
        | "APPROVALS_PENDING"
        | "APPROVALS_COMPLETED"
        | "ERROR_APPROVAL_DENIED"
        | "ITSM_CREATED"
        | "IDENTITY_PROVISIONED"
        | "ERROR_IDENTITY_PROVISION"
        | "COMMS_SCHEDULED"
        | "VERIFIED"
        | "COMPLETED"
        | "ERROR"
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
    Enums: {
      employment_type: ["fte", "contractor", "intern"],
      policy_decision: ["allow", "deny", "needs_approval"],
      workflow_state: [
        "INTENT_PARSED",
        "HR_VALIDATED",
        "POLICY_RESOLVED",
        "APPROVALS_PENDING",
        "APPROVALS_COMPLETED",
        "ERROR_APPROVAL_DENIED",
        "ITSM_CREATED",
        "IDENTITY_PROVISIONED",
        "ERROR_IDENTITY_PROVISION",
        "COMMS_SCHEDULED",
        "VERIFIED",
        "COMPLETED",
        "ERROR",
      ],
    },
  },
} as const
