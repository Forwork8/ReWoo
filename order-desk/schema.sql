-- ============================================================
--  Order Desk — Supabase Database Schema
--  Run this in your Supabase SQL Editor to initialize the database.
--  Dashboard → SQL Editor → New Query → paste & run.
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ORGANISATIONS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS organisations (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  plan         TEXT NOT NULL DEFAULT 'free',   -- 'free' | 'pro' | 'enterprise'
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── ORG MEMBERS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS org_members (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id   UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  user_id           UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  invited_email     TEXT,
  role              TEXT NOT NULL DEFAULT 'member',   -- 'admin' | 'member' | 'viewer'
  accepted_at       TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT org_members_org_user_unique UNIQUE (organisation_id, user_id)
);

-- ── ORDERS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id   UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  created_by        UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Order identity
  order_number      TEXT,
  buyer             TEXT,
  style_ref         TEXT,
  description       TEXT,
  season            TEXT,
  delivery_date     DATE,

  -- Production
  quantity          INTEGER DEFAULT 0,
  currency          TEXT NOT NULL DEFAULT 'USD',
  status            TEXT NOT NULL DEFAULT 'draft',  -- 'draft'|'quoted'|'confirmed'|'shipped'

  -- Cost fields (per unit)
  material_cost     NUMERIC(12, 4) DEFAULT 0,
  trim_cost         NUMERIC(12, 4) DEFAULT 0,
  cm_cost           NUMERIC(12, 4) DEFAULT 0,
  overhead_pct      NUMERIC(6, 2)  DEFAULT 15,
  target_margin     NUMERIC(6, 2)  DEFAULT 20,
  fob_price         NUMERIC(12, 4) DEFAULT 0,
  cif_price         NUMERIC(12, 4) DEFAULT 0,

  -- Extra metadata (JSON blob for extensibility)
  data              JSONB DEFAULT '{}',
  notes             TEXT,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS orders_org_id_idx    ON orders(organisation_id);
CREATE INDEX IF NOT EXISTS orders_status_idx     ON orders(status);
CREATE INDEX IF NOT EXISTS org_members_user_idx  ON org_members(user_id);
CREATE INDEX IF NOT EXISTS org_members_org_idx   ON org_members(organisation_id);

-- ── ROW LEVEL SECURITY ──────────────────────────────────────
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_members   ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders        ENABLE ROW LEVEL SECURITY;

-- Helper: check if the current user is a member of an org
CREATE OR REPLACE FUNCTION is_org_member(org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM org_members
    WHERE organisation_id = org_id
      AND user_id = auth.uid()
  );
$$;

-- Helper: check if the current user is an admin of an org
CREATE OR REPLACE FUNCTION is_org_admin(org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM org_members
    WHERE organisation_id = org_id
      AND user_id = auth.uid()
      AND role = 'admin'
  );
$$;

-- ORGANISATIONS policies
CREATE POLICY "org_select_member" ON organisations
  FOR SELECT USING (is_org_member(id));

CREATE POLICY "org_update_admin" ON organisations
  FOR UPDATE USING (is_org_admin(id));

CREATE POLICY "org_delete_admin" ON organisations
  FOR DELETE USING (is_org_admin(id));

CREATE POLICY "org_insert_authenticated" ON organisations
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ORG_MEMBERS policies
CREATE POLICY "members_select_member" ON org_members
  FOR SELECT USING (is_org_member(organisation_id));

CREATE POLICY "members_insert_admin" ON org_members
  FOR INSERT WITH CHECK (
    is_org_admin(organisation_id) OR auth.uid() IS NOT NULL
  );

CREATE POLICY "members_delete_admin" ON org_members
  FOR DELETE USING (is_org_admin(organisation_id) OR user_id = auth.uid());

-- ORDERS policies
CREATE POLICY "orders_select_member" ON orders
  FOR SELECT USING (is_org_member(organisation_id));

CREATE POLICY "orders_insert_member" ON orders
  FOR INSERT WITH CHECK (is_org_member(organisation_id));

CREATE POLICY "orders_update_member" ON orders
  FOR UPDATE USING (is_org_member(organisation_id));

CREATE POLICY "orders_delete_admin_or_creator" ON orders
  FOR DELETE USING (
    is_org_admin(organisation_id) OR created_by = auth.uid()
  );

-- ── UPDATED_AT trigger ──────────────────────────────────────
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE OR REPLACE TRIGGER set_orgs_updated_at
  BEFORE UPDATE ON organisations
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- ── Done ─────────────────────────────────────────────────────
-- After running this, update supabase.js with your Project URL and Anon Key.
-- Found at: Supabase Dashboard → Project Settings → API
SELECT 'Order Desk schema initialized successfully! ✅' AS status;
