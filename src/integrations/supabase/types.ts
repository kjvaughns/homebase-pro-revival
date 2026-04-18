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
      app_reviews: {
        Row: {
          comment: string
          created_at: string
          email: string | null
          id: string
          is_published: boolean
          name: string
          rating: number
          role: string | null
          title: string | null
        }
        Insert: {
          comment: string
          created_at?: string
          email?: string | null
          id?: string
          is_published?: boolean
          name: string
          rating: number
          role?: string | null
          title?: string | null
        }
        Update: {
          comment?: string
          created_at?: string
          email?: string | null
          id?: string
          is_published?: boolean
          name?: string
          rating?: number
          role?: string | null
          title?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          cancelled_at: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          estimated_price: number | null
          final_price: number | null
          home_id: string | null
          id: string
          is_recurring: boolean | null
          job_size: Database["public"]["Enums"]["job_size"] | null
          job_summary: string | null
          notes: string | null
          provider_diagnosis: string | null
          provider_id: string
          recurring_frequency: string | null
          scheduled_date: string
          scheduled_time: string | null
          service_id: string | null
          service_name: string
          status: Database["public"]["Enums"]["appointment_status"] | null
          status_history: string | null
          updated_at: string
          urgency: Database["public"]["Enums"]["urgency"] | null
          user_id: string | null
        }
        Insert: {
          cancelled_at?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          estimated_price?: number | null
          final_price?: number | null
          home_id?: string | null
          id?: string
          is_recurring?: boolean | null
          job_size?: Database["public"]["Enums"]["job_size"] | null
          job_summary?: string | null
          notes?: string | null
          provider_diagnosis?: string | null
          provider_id: string
          recurring_frequency?: string | null
          scheduled_date: string
          scheduled_time?: string | null
          service_id?: string | null
          service_name: string
          status?: Database["public"]["Enums"]["appointment_status"] | null
          status_history?: string | null
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency"] | null
          user_id?: string | null
        }
        Update: {
          cancelled_at?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          estimated_price?: number | null
          final_price?: number | null
          home_id?: string | null
          id?: string
          is_recurring?: boolean | null
          job_size?: Database["public"]["Enums"]["job_size"] | null
          job_summary?: string | null
          notes?: string | null
          provider_diagnosis?: string | null
          provider_id?: string
          recurring_frequency?: string | null
          scheduled_date?: string
          scheduled_time?: string | null
          service_id?: string | null
          service_name?: string
          status?: Database["public"]["Enums"]["appointment_status"] | null
          status_history?: string | null
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_home_id_homes_id_fk"
            columns: ["home_id"]
            isOneToOne: false
            referencedRelation: "homes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_services_id_fk"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_links: {
        Row: {
          availability_rules: string | null
          brand_color: string | null
          confirmation_message: string | null
          created_at: string
          custom_description: string | null
          custom_title: string | null
          deposit_amount: number | null
          deposit_percentage: number | null
          deposit_required: boolean | null
          id: string
          instant_booking: boolean | null
          intake_questions: string | null
          is_active: boolean | null
          logo_url: string | null
          provider_id: string
          service_catalog: string | null
          show_pricing: boolean | null
          slug: string
          status: Database["public"]["Enums"]["booking_link_status"] | null
          updated_at: string
          welcome_message: string | null
        }
        Insert: {
          availability_rules?: string | null
          brand_color?: string | null
          confirmation_message?: string | null
          created_at?: string
          custom_description?: string | null
          custom_title?: string | null
          deposit_amount?: number | null
          deposit_percentage?: number | null
          deposit_required?: boolean | null
          id?: string
          instant_booking?: boolean | null
          intake_questions?: string | null
          is_active?: boolean | null
          logo_url?: string | null
          provider_id: string
          service_catalog?: string | null
          show_pricing?: boolean | null
          slug: string
          status?: Database["public"]["Enums"]["booking_link_status"] | null
          updated_at?: string
          welcome_message?: string | null
        }
        Update: {
          availability_rules?: string | null
          brand_color?: string | null
          confirmation_message?: string | null
          created_at?: string
          custom_description?: string | null
          custom_title?: string | null
          deposit_amount?: number | null
          deposit_percentage?: number | null
          deposit_required?: boolean | null
          id?: string
          instant_booking?: boolean | null
          intake_questions?: string | null
          is_active?: boolean | null
          logo_url?: string | null
          provider_id?: string
          service_catalog?: string | null
          show_pricing?: boolean | null
          slug?: string
          status?: Database["public"]["Enums"]["booking_link_status"] | null
          updated_at?: string
          welcome_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_links_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: true
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_requests: {
        Row: {
          appointment_id: string | null
          created_at: string | null
          customer_address: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
          notes: string | null
          preferred_date: string | null
          preferred_time: string | null
          provider_category: string | null
          provider_id: string | null
          provider_name: string | null
          service_summary: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string | null
          customer_address?: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          id?: string
          notes?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          provider_category?: string | null
          provider_id?: string | null
          provider_name?: string | null
          service_summary?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_id?: string | null
          created_at?: string | null
          customer_address?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          notes?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          provider_category?: string | null
          provider_id?: string | null
          provider_name?: string | null
          service_summary?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string | null
          first_name: string
          home_data: string | null
          home_id: string | null
          id: string
          last_name: string | null
          notes: string | null
          phone: string | null
          provider_id: string
          state: string | null
          stripe_connect_customer_id: string | null
          stripe_customer_id: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          home_data?: string | null
          home_id?: string | null
          id?: string
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          provider_id: string
          state?: string | null
          stripe_connect_customer_id?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          home_data?: string | null
          home_id?: string | null
          id?: string
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          provider_id?: string
          state?: string | null
          stripe_connect_customer_id?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_home_id_fkey"
            columns: ["home_id"]
            isOneToOne: false
            referencedRelation: "homes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_ledger: {
        Row: {
          created_at: string
          delta_cents: number
          id: string
          invoice_id: string | null
          reason: string
          user_id: string
        }
        Insert: {
          created_at?: string
          delta_cents: number
          id?: string
          invoice_id?: string | null
          reason: string
          user_id: string
        }
        Update: {
          created_at?: string
          delta_cents?: number
          id?: string
          invoice_id?: string | null
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_ledger_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      homes: {
        Row: {
          bathrooms: number | null
          bedrooms: number | null
          city: string
          county_name: string | null
          created_at: string
          estimated_value: number | null
          formatted_address: string | null
          housefax_data: string | null
          housefax_enriched_at: string | null
          housefax_score: number | null
          id: string
          is_default: boolean | null
          label: string
          last_sold_date: string | null
          last_sold_price: number | null
          latitude: number | null
          longitude: number | null
          lot_size: number | null
          neighborhood_name: string | null
          place_id: string | null
          property_type: Database["public"]["Enums"]["property_type"] | null
          square_feet: number | null
          state: string
          street: string
          tax_assessed_value: number | null
          updated_at: string
          user_id: string
          year_built: number | null
          zillow_id: string | null
          zillow_url: string | null
          zip: string
        }
        Insert: {
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          county_name?: string | null
          created_at?: string
          estimated_value?: number | null
          formatted_address?: string | null
          housefax_data?: string | null
          housefax_enriched_at?: string | null
          housefax_score?: number | null
          id?: string
          is_default?: boolean | null
          label: string
          last_sold_date?: string | null
          last_sold_price?: number | null
          latitude?: number | null
          longitude?: number | null
          lot_size?: number | null
          neighborhood_name?: string | null
          place_id?: string | null
          property_type?: Database["public"]["Enums"]["property_type"] | null
          square_feet?: number | null
          state: string
          street: string
          tax_assessed_value?: number | null
          updated_at?: string
          user_id: string
          year_built?: number | null
          zillow_id?: string | null
          zillow_url?: string | null
          zip: string
        }
        Update: {
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          county_name?: string | null
          created_at?: string
          estimated_value?: number | null
          formatted_address?: string | null
          housefax_data?: string | null
          housefax_enriched_at?: string | null
          housefax_score?: number | null
          id?: string
          is_default?: boolean | null
          label?: string
          last_sold_date?: string | null
          last_sold_price?: number | null
          latitude?: number | null
          longitude?: number | null
          lot_size?: number | null
          neighborhood_name?: string | null
          place_id?: string | null
          property_type?: Database["public"]["Enums"]["property_type"] | null
          square_feet?: number | null
          state?: string
          street?: string
          tax_assessed_value?: number | null
          updated_at?: string
          user_id?: string
          year_built?: number | null
          zillow_id?: string | null
          zillow_url?: string | null
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "homes_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      housefax_entries: {
        Row: {
          ai_summary: string | null
          appointment_id: string | null
          completed_at: string
          cost_cents: number | null
          created_at: string
          home_id: string
          id: string
          job_id: string | null
          notes: string | null
          photos: Json | null
          provider_id: string | null
          provider_name: string | null
          service_category: string
          service_name: string
          system_affected: string | null
        }
        Insert: {
          ai_summary?: string | null
          appointment_id?: string | null
          completed_at: string
          cost_cents?: number | null
          created_at?: string
          home_id: string
          id?: string
          job_id?: string | null
          notes?: string | null
          photos?: Json | null
          provider_id?: string | null
          provider_name?: string | null
          service_category?: string
          service_name: string
          system_affected?: string | null
        }
        Update: {
          ai_summary?: string | null
          appointment_id?: string | null
          completed_at?: string
          cost_cents?: number | null
          created_at?: string
          home_id?: string
          id?: string
          job_id?: string | null
          notes?: string | null
          photos?: Json | null
          provider_id?: string | null
          provider_name?: string | null
          service_category?: string
          service_name?: string
          system_affected?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "housefax_entries_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "housefax_entries_home_id_fkey"
            columns: ["home_id"]
            isOneToOne: false
            referencedRelation: "homes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "housefax_entries_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "housefax_entries_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_submissions: {
        Row: {
          address: string | null
          answers_json: string | null
          booking_link_id: string
          category_id: string | null
          client_email: string | null
          client_name: string
          client_phone: string | null
          converted_at: string | null
          converted_client_id: string | null
          converted_job_id: string | null
          created_at: string
          deposit_amount: number | null
          deposit_paid: boolean | null
          deposit_payment_id: string | null
          homeowner_user_id: string | null
          id: string
          photos_json: string | null
          preferred_times_json: string | null
          problem_description: string
          provider_id: string
          quote_fixed: number | null
          quote_high: number | null
          quote_low: number | null
          quote_mode: Database["public"]["Enums"]["quote_mode"] | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["intake_status"] | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          answers_json?: string | null
          booking_link_id: string
          category_id?: string | null
          client_email?: string | null
          client_name: string
          client_phone?: string | null
          converted_at?: string | null
          converted_client_id?: string | null
          converted_job_id?: string | null
          created_at?: string
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          deposit_payment_id?: string | null
          homeowner_user_id?: string | null
          id?: string
          photos_json?: string | null
          preferred_times_json?: string | null
          problem_description: string
          provider_id: string
          quote_fixed?: number | null
          quote_high?: number | null
          quote_low?: number | null
          quote_mode?: Database["public"]["Enums"]["quote_mode"] | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["intake_status"] | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          answers_json?: string | null
          booking_link_id?: string
          category_id?: string | null
          client_email?: string | null
          client_name?: string
          client_phone?: string | null
          converted_at?: string | null
          converted_client_id?: string | null
          converted_job_id?: string | null
          created_at?: string
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          deposit_payment_id?: string | null
          homeowner_user_id?: string | null
          id?: string
          photos_json?: string | null
          preferred_times_json?: string | null
          problem_description?: string
          provider_id?: string
          quote_fixed?: number | null
          quote_high?: number | null
          quote_low?: number | null
          quote_mode?: Database["public"]["Enums"]["quote_mode"] | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["intake_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "intake_submissions_booking_link_id_booking_links_id_fk"
            columns: ["booking_link_id"]
            isOneToOne: false
            referencedRelation: "booking_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_submissions_category_id_service_categories_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_submissions_converted_client_id_clients_id_fk"
            columns: ["converted_client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_submissions_converted_job_id_jobs_id_fk"
            columns: ["converted_job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_submissions_deposit_payment_id_fkey"
            columns: ["deposit_payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_submissions_homeowner_user_id_users_id_fk"
            columns: ["homeowner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_submissions_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_line_items: {
        Row: {
          amount_cents: number
          created_at: string
          description: string | null
          id: string
          invoice_id: string
          metadata: string | null
          name: string
          quantity: number | null
          unit_price_cents: number
        }
        Insert: {
          amount_cents: number
          created_at?: string
          description?: string | null
          id?: string
          invoice_id: string
          metadata?: string | null
          name: string
          quantity?: number | null
          unit_price_cents: number
        }
        Update: {
          amount_cents?: number
          created_at?: string
          description?: string | null
          id?: string
          invoice_id?: string
          metadata?: string | null
          name?: string
          quantity?: number | null
          unit_price_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_invoice_id_invoices_id_fk"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          client_id: string
          created_at: string
          currency: string | null
          deposit_amount: number | null
          deposit_paid: boolean | null
          discount_amount: number | null
          discount_cents: number | null
          due_date: string | null
          homeowner_user_id: string | null
          hosted_invoice_url: string | null
          id: string
          invoice_number: string
          job_id: string | null
          line_items: string | null
          notes: string | null
          paid_at: string | null
          payment_methods_allowed: string | null
          platform_fee_cents: number | null
          provider_id: string
          sent_at: string | null
          status: Database["public"]["Enums"]["invoice_status"] | null
          stripe_checkout_session_id: string | null
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          stripe_payment_link_id: string | null
          subtotal_cents: number
          tax: number | null
          tax_cents: number | null
          tax_rate: number | null
          total: number
          total_cents: number
          updated_at: string
          viewed_at: string | null
        }
        Insert: {
          amount?: number
          client_id: string
          created_at?: string
          currency?: string | null
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          discount_amount?: number | null
          discount_cents?: number | null
          due_date?: string | null
          homeowner_user_id?: string | null
          hosted_invoice_url?: string | null
          id?: string
          invoice_number: string
          job_id?: string | null
          line_items?: string | null
          notes?: string | null
          paid_at?: string | null
          payment_methods_allowed?: string | null
          platform_fee_cents?: number | null
          provider_id: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          stripe_checkout_session_id?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_payment_link_id?: string | null
          subtotal_cents?: number
          tax?: number | null
          tax_cents?: number | null
          tax_rate?: number | null
          total?: number
          total_cents?: number
          updated_at?: string
          viewed_at?: string | null
        }
        Update: {
          amount?: number
          client_id?: string
          created_at?: string
          currency?: string | null
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          discount_amount?: number | null
          discount_cents?: number | null
          due_date?: string | null
          homeowner_user_id?: string | null
          hosted_invoice_url?: string | null
          id?: string
          invoice_number?: string
          job_id?: string | null
          line_items?: string | null
          notes?: string | null
          paid_at?: string | null
          payment_methods_allowed?: string | null
          platform_fee_cents?: number | null
          provider_id?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          stripe_checkout_session_id?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_payment_link_id?: string | null
          subtotal_cents?: number
          tax?: number | null
          tax_cents?: number | null
          tax_rate?: number | null
          total?: number
          total_cents?: number
          updated_at?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_clients_id_fk"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_homeowner_user_id_fkey"
            columns: ["homeowner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_job_id_jobs_id_fk"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          address: string | null
          appointment_id: string | null
          checklist: Json | null
          client_id: string | null
          completed_at: string | null
          created_at: string
          custom_service_id: string | null
          description: string | null
          estimated_duration: number | null
          estimated_price: number | null
          final_price: number | null
          id: string
          notes: string | null
          provider_id: string
          scheduled_date: string
          scheduled_time: string | null
          service_id: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          appointment_id?: string | null
          checklist?: Json | null
          client_id?: string | null
          completed_at?: string | null
          created_at?: string
          custom_service_id?: string | null
          description?: string | null
          estimated_duration?: number | null
          estimated_price?: number | null
          final_price?: number | null
          id?: string
          notes?: string | null
          provider_id: string
          scheduled_date: string
          scheduled_time?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          appointment_id?: string | null
          checklist?: Json | null
          client_id?: string | null
          completed_at?: string | null
          created_at?: string
          custom_service_id?: string | null
          description?: string | null
          estimated_duration?: number | null
          estimated_price?: number | null
          final_price?: number | null
          id?: string
          notes?: string | null
          provider_id?: string
          scheduled_date?: string
          scheduled_time?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_client_id_clients_id_fk"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_custom_service_id_fkey"
            columns: ["custom_service_id"]
            isOneToOne: false
            referencedRelation: "provider_custom_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_service_id_services_id_fk"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          message: string | null
          name: string
          phone: string | null
          provider_id: string
          service: string | null
          source: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          provider_id: string
          service?: string | null
          source?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          provider_id?: string
          service?: string | null
          source?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_reminders: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          frequency:
            | Database["public"]["Enums"]["maintenance_reminder_frequency"]
            | null
          home_id: string
          id: string
          is_active: boolean | null
          last_completed_at: string | null
          next_due_at: string
          title: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          frequency?:
            | Database["public"]["Enums"]["maintenance_reminder_frequency"]
            | null
          home_id: string
          id?: string
          is_active?: boolean | null
          last_completed_at?: string | null
          next_due_at: string
          title: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          frequency?:
            | Database["public"]["Enums"]["maintenance_reminder_frequency"]
            | null
          home_id?: string
          id?: string
          is_active?: boolean | null
          last_completed_at?: string | null
          next_due_at?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_reminders_home_id_homes_id_fk"
            columns: ["home_id"]
            isOneToOne: false
            referencedRelation: "homes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_reminders_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          body: string
          channel: Database["public"]["Enums"]["message_channel"]
          created_at: string
          id: string
          name: string
          provider_id: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          body: string
          channel?: Database["public"]["Enums"]["message_channel"]
          created_at?: string
          id?: string
          name: string
          provider_id: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          body?: string
          channel?: Database["public"]["Enums"]["message_channel"]
          created_at?: string
          id?: string
          name?: string
          provider_id?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_templates_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_deliveries: {
        Row: {
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at: string
          error: string | null
          event_type: string
          external_message_id: string | null
          id: string
          metadata: string | null
          recipient_email: string | null
          recipient_user_id: string | null
          related_record_id: string | null
          related_record_type: string | null
          status:
            | Database["public"]["Enums"]["notification_delivery_status"]
            | null
          updated_at: string
        }
        Insert: {
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          error?: string | null
          event_type: string
          external_message_id?: string | null
          id?: string
          metadata?: string | null
          recipient_email?: string | null
          recipient_user_id?: string | null
          related_record_id?: string | null
          related_record_type?: string | null
          status?:
            | Database["public"]["Enums"]["notification_delivery_status"]
            | null
          updated_at?: string
        }
        Update: {
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          error?: string | null
          event_type?: string
          external_message_id?: string | null
          id?: string
          metadata?: string | null
          recipient_email?: string | null
          recipient_user_id?: string | null
          related_record_id?: string | null
          related_record_type?: string | null
          status?:
            | Database["public"]["Enums"]["notification_delivery_status"]
            | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_deliveries_recipient_user_id_fkey"
            columns: ["recipient_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string
          email_booking_cancelled: boolean | null
          email_booking_confirmation: boolean | null
          email_booking_reminder: boolean | null
          email_invoice_created: boolean | null
          email_invoice_paid: boolean | null
          email_invoice_reminder: boolean | null
          email_payment_failed: boolean | null
          email_review_request: boolean | null
          id: string
          in_app_enabled: boolean | null
          push_enabled: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_booking_cancelled?: boolean | null
          email_booking_confirmation?: boolean | null
          email_booking_reminder?: boolean | null
          email_invoice_created?: boolean | null
          email_invoice_paid?: boolean | null
          email_invoice_reminder?: boolean | null
          email_payment_failed?: boolean | null
          email_review_request?: boolean | null
          id?: string
          in_app_enabled?: boolean | null
          push_enabled?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_booking_cancelled?: boolean | null
          email_booking_confirmation?: boolean | null
          email_booking_reminder?: boolean | null
          email_invoice_created?: boolean | null
          email_invoice_paid?: boolean | null
          email_invoice_reminder?: boolean | null
          email_payment_failed?: boolean | null
          email_review_request?: boolean | null
          id?: string
          in_app_enabled?: boolean | null
          push_enabled?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          data: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          amount_cents: number
          created_at: string
          id: string
          invoice_id: string
          method: Database["public"]["Enums"]["payment_method"] | null
          notes: string | null
          provider_id: string
          reference: string | null
          stripe_charge_id: string | null
          stripe_payment_intent_id: string | null
        }
        Insert: {
          amount: number
          amount_cents?: number
          created_at?: string
          id?: string
          invoice_id: string
          method?: Database["public"]["Enums"]["payment_method"] | null
          notes?: string | null
          provider_id: string
          reference?: string | null
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Update: {
          amount?: number
          amount_cents?: number
          created_at?: string
          id?: string
          invoice_id?: string
          method?: Database["public"]["Enums"]["payment_method"] | null
          notes?: string | null
          provider_id?: string
          reference?: string | null
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_invoices_id_fk"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          amount_cents: number
          arrival_date: string | null
          created_at: string
          id: string
          provider_id: string
          status: Database["public"]["Enums"]["payout_status"] | null
          stripe_payout_id: string | null
          stripe_transfer_id: string | null
        }
        Insert: {
          amount_cents: number
          arrival_date?: string | null
          created_at?: string
          id?: string
          provider_id: string
          status?: Database["public"]["Enums"]["payout_status"] | null
          stripe_payout_id?: string | null
          stripe_transfer_id?: string | null
        }
        Update: {
          amount_cents?: number
          arrival_date?: string | null
          created_at?: string
          id?: string
          provider_id?: string
          status?: Database["public"]["Enums"]["payout_status"] | null
          stripe_payout_id?: string | null
          stripe_transfer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_custom_services: {
        Row: {
          add_ons_json: string | null
          ai_pricing_insight: string | null
          base_price: number | null
          booking_mode: string | null
          category: string
          created_at: string
          description: string | null
          duration: number | null
          id: string
          intake_questions_json: string | null
          is_addon: boolean
          is_published: boolean | null
          is_recurring: boolean
          name: string
          price_from: number | null
          price_tiers_json: string | null
          price_to: number | null
          pricing_type: Database["public"]["Enums"]["pricing_type"]
          provider_id: string
          recurring_frequency: string | null
          recurring_price: number | null
          updated_at: string
        }
        Insert: {
          add_ons_json?: string | null
          ai_pricing_insight?: string | null
          base_price?: number | null
          booking_mode?: string | null
          category?: string
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          intake_questions_json?: string | null
          is_addon?: boolean
          is_published?: boolean | null
          is_recurring?: boolean
          name: string
          price_from?: number | null
          price_tiers_json?: string | null
          price_to?: number | null
          pricing_type?: Database["public"]["Enums"]["pricing_type"]
          provider_id: string
          recurring_frequency?: string | null
          recurring_price?: number | null
          updated_at?: string
        }
        Update: {
          add_ons_json?: string | null
          ai_pricing_insight?: string | null
          base_price?: number | null
          booking_mode?: string | null
          category?: string
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          intake_questions_json?: string | null
          is_addon?: boolean
          is_published?: boolean | null
          is_recurring?: boolean
          name?: string
          price_from?: number | null
          price_tiers_json?: string | null
          price_to?: number | null
          pricing_type?: Database["public"]["Enums"]["pricing_type"]
          provider_id?: string
          recurring_frequency?: string | null
          recurring_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_custom_services_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_message_templates: {
        Row: {
          body: string
          created_at: string
          event_type: string | null
          id: string
          is_default: boolean | null
          name: string
          provider_id: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          event_type?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          provider_id: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          event_type?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          provider_id?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_message_templates_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_messages: {
        Row: {
          body: string
          channel: Database["public"]["Enums"]["message_channel"]
          client_id: string
          created_at: string
          id: string
          invoice_id: string | null
          job_id: string | null
          provider_id: string
          resend_message_id: string | null
          status: Database["public"]["Enums"]["message_status"]
          subject: string | null
        }
        Insert: {
          body: string
          channel?: Database["public"]["Enums"]["message_channel"]
          client_id: string
          created_at?: string
          id?: string
          invoice_id?: string | null
          job_id?: string | null
          provider_id: string
          resend_message_id?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          subject?: string | null
        }
        Update: {
          body?: string
          channel?: Database["public"]["Enums"]["message_channel"]
          client_id?: string
          created_at?: string
          id?: string
          invoice_id?: string | null
          job_id?: string | null
          provider_id?: string
          resend_message_id?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_messages_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_messages_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_messages_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_plans: {
        Row: {
          created_at: string
          current_period_end: string | null
          first_paid_booking_at: string | null
          grace_period_ends_at: string | null
          id: string
          is_subscribed: boolean
          plan_tier: Database["public"]["Enums"]["provider_plan_tier"] | null
          platform_fee_fixed_cents: number | null
          platform_fee_percent: number | null
          provider_id: string
          revenuecat_product_id: string | null
          stripe_subscription_id: string | null
          subscription_ended_at: string | null
          subscription_source: string | null
          subscription_started_at: string | null
          subscription_status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          first_paid_booking_at?: string | null
          grace_period_ends_at?: string | null
          id?: string
          is_subscribed?: boolean
          plan_tier?: Database["public"]["Enums"]["provider_plan_tier"] | null
          platform_fee_fixed_cents?: number | null
          platform_fee_percent?: number | null
          provider_id: string
          revenuecat_product_id?: string | null
          stripe_subscription_id?: string | null
          subscription_ended_at?: string | null
          subscription_source?: string | null
          subscription_started_at?: string | null
          subscription_status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          first_paid_booking_at?: string | null
          grace_period_ends_at?: string | null
          id?: string
          is_subscribed?: boolean
          plan_tier?: Database["public"]["Enums"]["provider_plan_tier"] | null
          platform_fee_fixed_cents?: number | null
          platform_fee_percent?: number | null
          provider_id?: string
          revenuecat_product_id?: string | null
          stripe_subscription_id?: string | null
          subscription_ended_at?: string | null
          subscription_source?: string | null
          subscription_started_at?: string | null
          subscription_status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_plans_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_services: {
        Row: {
          category_id: string
          id: string
          price: number | null
          provider_id: string
          service_id: string
        }
        Insert: {
          category_id: string
          id?: string
          price?: number | null
          provider_id: string
          service_id: string
        }
        Update: {
          category_id?: string
          id?: string
          price?: number | null
          provider_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_services_category_id_service_categories_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_services_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_services_service_id_services_id_fk"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          avatar_url: string | null
          average_rating: number | null
          booking_policies: Json | null
          business_hours: Json | null
          business_name: string
          capability_tags: string[] | null
          created_at: string
          description: string | null
          email: string | null
          hourly_rate: number | null
          id: string
          is_active: boolean | null
          is_public: boolean | null
          is_verified: boolean | null
          license_number: string | null
          phone: string | null
          rating: number | null
          review_count: number | null
          service_area: string | null
          service_cities: string[] | null
          service_radius: number | null
          service_zip_codes: string[] | null
          slug: string | null
          stripe_account_id: string | null
          stripe_onboarding_complete: boolean | null
          user_id: string | null
          website: string | null
          years_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          average_rating?: number | null
          booking_policies?: Json | null
          business_hours?: Json | null
          business_name: string
          capability_tags?: string[] | null
          created_at?: string
          description?: string | null
          email?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          is_public?: boolean | null
          is_verified?: boolean | null
          license_number?: string | null
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          service_area?: string | null
          service_cities?: string[] | null
          service_radius?: number | null
          service_zip_codes?: string[] | null
          slug?: string | null
          stripe_account_id?: string | null
          stripe_onboarding_complete?: boolean | null
          user_id?: string | null
          website?: string | null
          years_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          average_rating?: number | null
          booking_policies?: Json | null
          business_hours?: Json | null
          business_name?: string
          capability_tags?: string[] | null
          created_at?: string
          description?: string | null
          email?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          is_public?: boolean | null
          is_verified?: boolean | null
          license_number?: string | null
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          service_area?: string | null
          service_cities?: string[] | null
          service_radius?: number | null
          service_zip_codes?: string[] | null
          slug?: string | null
          stripe_account_id?: string | null
          stripe_onboarding_complete?: boolean | null
          user_id?: string | null
          website?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "providers_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      push_tokens: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          platform: string
          token: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          platform: string
          token: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          platform?: string
          token?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      refunds: {
        Row: {
          amount_cents: number
          created_at: string
          id: string
          payment_id: string | null
          provider_id: string
          reason: string | null
          status: Database["public"]["Enums"]["refund_status"] | null
          stripe_charge_id: string | null
          stripe_refund_id: string | null
        }
        Insert: {
          amount_cents?: number
          created_at?: string
          id?: string
          payment_id?: string | null
          provider_id: string
          reason?: string | null
          status?: Database["public"]["Enums"]["refund_status"] | null
          stripe_charge_id?: string | null
          stripe_refund_id?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string
          id?: string
          payment_id?: string | null
          provider_id?: string
          reason?: string | null
          status?: Database["public"]["Enums"]["refund_status"] | null
          stripe_charge_id?: string | null
          stripe_refund_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "refunds_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          appointment_id: string
          comment: string | null
          created_at: string
          id: string
          provider_id: string
          rating: number
          user_id: string
        }
        Insert: {
          appointment_id: string
          comment?: string | null
          created_at?: string
          id?: string
          provider_id: string
          rating: number
          user_id: string
        }
        Update: {
          appointment_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          provider_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_appointment_id_appointments_id_fk"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      service_categories: {
        Row: {
          description: string | null
          icon: string | null
          id: string
          name: string
          sort_order: number | null
        }
        Insert: {
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          sort_order?: number | null
        }
        Update: {
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      services: {
        Row: {
          base_price: number | null
          category_id: string
          description: string | null
          id: string
          is_public: boolean | null
          name: string
        }
        Insert: {
          base_price?: number | null
          category_id: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
        }
        Update: {
          base_price?: number | null
          category_id?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_service_categories_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_connect_accounts: {
        Row: {
          charges_enabled: boolean | null
          created_at: string
          details_submitted: boolean | null
          id: string
          livemode: boolean | null
          onboarding_status:
            | Database["public"]["Enums"]["connect_onboarding_status"]
            | null
          payouts_enabled: boolean | null
          provider_id: string
          stripe_account_id: string
          updated_at: string
        }
        Insert: {
          charges_enabled?: boolean | null
          created_at?: string
          details_submitted?: boolean | null
          id?: string
          livemode?: boolean | null
          onboarding_status?:
            | Database["public"]["Enums"]["connect_onboarding_status"]
            | null
          payouts_enabled?: boolean | null
          provider_id: string
          stripe_account_id: string
          updated_at?: string
        }
        Update: {
          charges_enabled?: boolean | null
          created_at?: string
          details_submitted?: boolean | null
          id?: string
          livemode?: boolean | null
          onboarding_status?:
            | Database["public"]["Enums"]["connect_onboarding_status"]
            | null
          payouts_enabled?: boolean | null
          provider_id?: string
          stripe_account_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_connect_accounts_provider_id_providers_id_fk"
            columns: ["provider_id"]
            isOneToOne: true
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_webhook_events: {
        Row: {
          event_type: string
          id: string
          payload: string | null
          processed_at: string
          stripe_event_id: string
        }
        Insert: {
          event_type: string
          id?: string
          payload?: string | null
          processed_at?: string
          stripe_event_id: string
        }
        Update: {
          event_type?: string
          id?: string
          payload?: string | null
          processed_at?: string
          stripe_event_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          category: string
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          balance_cents: number | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance_cents?: number | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance_cents?: number | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_credits_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          default_payment_method_id: string | null
          email: string
          first_name: string | null
          id: string
          is_provider: boolean | null
          last_name: string | null
          password: string
          phone: string | null
          role: string | null
          stripe_customer_id: string | null
          token_version: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          default_payment_method_id?: string | null
          email: string
          first_name?: string | null
          id?: string
          is_provider?: boolean | null
          last_name?: string | null
          password: string
          phone?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          token_version?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          default_payment_method_id?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_provider?: boolean | null
          last_name?: string | null
          password?: string
          phone?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          token_version?: number
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
      appointment_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      booking_link_status: "active" | "paused" | "disabled"
      connect_onboarding_status: "not_started" | "pending" | "complete"
      intake_status:
        | "submitted"
        | "confirmed"
        | "reviewed"
        | "converted"
        | "declined"
        | "expired"
      invoice_status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
      job_size: "small" | "medium" | "large"
      job_status: "scheduled" | "in_progress" | "completed" | "cancelled"
      maintenance_reminder_frequency:
        | "monthly"
        | "quarterly"
        | "biannually"
        | "annually"
        | "custom"
      message_channel: "email" | "sms"
      message_status: "sent" | "failed" | "pending_sms"
      notification_channel: "email" | "push" | "in_app" | "sms"
      notification_delivery_status:
        | "queued"
        | "sent"
        | "delivered"
        | "failed"
        | "pending_sms"
      payment_method: "cash" | "card" | "bank_transfer" | "check" | "other"
      payment_status:
        | "requires_payment"
        | "processing"
        | "succeeded"
        | "failed"
        | "refunded"
      payout_status: "pending" | "in_transit" | "paid" | "failed"
      pricing_type: "fixed" | "variable" | "service_call" | "quote"
      property_type:
        | "single_family"
        | "condo"
        | "townhouse"
        | "apartment"
        | "multi_family"
      provider_plan_tier: "free" | "starter" | "professional" | "enterprise"
      quote_mode: "range" | "fixed" | "estimate_after_review"
      refund_status: "pending" | "succeeded" | "failed" | "canceled"
      urgency: "flexible" | "soon" | "urgent"
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
      appointment_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      booking_link_status: ["active", "paused", "disabled"],
      connect_onboarding_status: ["not_started", "pending", "complete"],
      intake_status: [
        "submitted",
        "confirmed",
        "reviewed",
        "converted",
        "declined",
        "expired",
      ],
      invoice_status: ["draft", "sent", "paid", "overdue", "cancelled"],
      job_size: ["small", "medium", "large"],
      job_status: ["scheduled", "in_progress", "completed", "cancelled"],
      maintenance_reminder_frequency: [
        "monthly",
        "quarterly",
        "biannually",
        "annually",
        "custom",
      ],
      message_channel: ["email", "sms"],
      message_status: ["sent", "failed", "pending_sms"],
      notification_channel: ["email", "push", "in_app", "sms"],
      notification_delivery_status: [
        "queued",
        "sent",
        "delivered",
        "failed",
        "pending_sms",
      ],
      payment_method: ["cash", "card", "bank_transfer", "check", "other"],
      payment_status: [
        "requires_payment",
        "processing",
        "succeeded",
        "failed",
        "refunded",
      ],
      payout_status: ["pending", "in_transit", "paid", "failed"],
      pricing_type: ["fixed", "variable", "service_call", "quote"],
      property_type: [
        "single_family",
        "condo",
        "townhouse",
        "apartment",
        "multi_family",
      ],
      provider_plan_tier: ["free", "starter", "professional", "enterprise"],
      quote_mode: ["range", "fixed", "estimate_after_review"],
      refund_status: ["pending", "succeeded", "failed", "canceled"],
      urgency: ["flexible", "soon", "urgent"],
    },
  },
} as const
