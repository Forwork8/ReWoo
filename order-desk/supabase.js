// ============================================================
//  Order Desk — Smart Client (Production Ready v3.0)
//  DEMO MODE: Works 100% in localStorage with pre-seeded sample data.
//  PRODUCTION MODE: Switch to Supabase by setting DEMO_MODE = false.
//
//  To connect Supabase:
//    1. Go to https://supabase.com → Create a free project
//    2. Project Settings → API → copy Project URL + anon key
//    3. Paste them below and set DEMO_MODE = false
// ============================================================

const DEMO_MODE         = true;   // ← set to false when you add real credentials
const SUPABASE_URL      = 'https://YOUR_PROJECT_REF.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// ── DEMO DATA VERSION — increment this to force-reset cached demo data ──
const DEMO_DATA_VERSION = 'v2.0-anonymized';
(function migrateDemoData() {
  const stored = localStorage.getItem('od_demo_version');
  if (stored !== DEMO_DATA_VERSION) {
    // Clear old cached orders that may have real brand names
    const keysToReset = ['od_demo_orders', 'od_demo_users', 'od_demo_orgs', 'od_demo_org_members', 'od_demo_current_session'];
    keysToReset.forEach(k => localStorage.removeItem(k));
    localStorage.removeItem('od-current-org');
    localStorage.setItem('od_demo_version', DEMO_DATA_VERSION);
  }
})();

// ── DEMO STORAGE LAYER (localStorage) ──────────────────────
const DemoStore = {
  _key: k => `od_demo_${k}`,

  get(k, fallback = null) {
    try {
      const v = localStorage.getItem(this._key(k));
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(this._key(k), JSON.stringify(v));
    } catch {}
  },

  // Auto-seed default workspace, user, and realistic orders if brand new
  _ensureSeed() {
    let users = this.get('users');
    let orgs = this.get('orgs');
    let orders = this.get('orders');

    if (!users || Object.keys(users).length === 0) {
      const demoUser = {
        id: 'usr-rewoo-founder',
        email: 'demo@rewoo.tech',
        password: btoa('password123'),
        name: 'Adil Shamim',
        company: 'ReWoo Garments Ltd.'
      };
      users = { [demoUser.email]: demoUser };
      this.set('users', users);

      const demoOrg = {
        id: 'org-rewoo-primary',
        name: 'ReWoo Garments Ltd.',
        slug: 'rewoo-garments-dhaka',
        plan: 'Enterprise Pro',
        created_at: new Date().toISOString()
      };
      orgs = { [demoOrg.id]: demoOrg };
      this.set('orgs', orgs);

      const demoMembers = [
        {
          id: 'mem-founder',
          organisation_id: demoOrg.id,
          user_id: demoUser.id,
          role: 'admin',
          invited_email: null,
          accepted_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      ];
      this.set('org_members', demoMembers);

      orders = [
        {
          id: 'ord-a-001',
          organisation_id: demoOrg.id,
          created_by: demoUser.id,
          order_number: 'PO-88412',
          buyer: 'Buyer A (Demo)',
          style_ref: 'STY-BLZ-2026',
          description: '100% Organic Ring-Spun Cotton 190 GSM Single Jersey',
          season: 'Spring/Summer 2026',
          delivery_date: '2026-06-15',
          quantity: 12000,
          currency: 'USD',
          status: 'confirmed',
          material_cost: 2.75,
          trimCost: 0.45,
          trim_cost: 0.45,
          cmCost: 1.50,
          cm_cost: 1.50,
          testingCost: 0.06,
          packingCost: 0.14,
          freight: 0.35,
          overheadPct: 15,
          overhead_pct: 15,
          targetMargin: 20,
          target_margin: 20,
          fob_price: 6.76,
          fobPrice: 6.76,
          cif_price: 7.11,
          cifPrice: 7.11,
          notes: 'Standard OEKO-TEX certified cotton required.',
          data: {
            category: 'Knit Tops',
            fabric: '100% Organic Ring-Spun Cotton 190 GSM Single Jersey',
            origin: 'FOB Chittagong',
            testingCost: 0.06,
            packingCost: 0.14,
            freight: 0.35
          },
          created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'ord-b-002',
          organisation_id: demoOrg.id,
          created_by: demoUser.id,
          order_number: 'PO-44029',
          buyer: 'Buyer B (Demo)',
          style_ref: 'STY-POLO-991',
          description: 'Honeycomb Pique Knit with Flat-Knit Collar',
          season: 'Fall 2026',
          delivery_date: '2026-08-20',
          quantity: 25000,
          currency: 'USD',
          status: 'draft',
          material_cost: 3.10,
          trimCost: 0.55,
          trim_cost: 0.55,
          cmCost: 1.65,
          cm_cost: 1.65,
          testingCost: 0.08,
          packingCost: 0.12,
          freight: 0.40,
          overheadPct: 15,
          overhead_pct: 15,
          targetMargin: 18,
          target_margin: 18,
          fob_price: 7.49,
          fobPrice: 7.49,
          cif_price: 7.89,
          cifPrice: 7.89,
          notes: 'Color approvals pending for Olive and Navy.',
          data: {
            category: 'Knit Tops',
            fabric: '100% Cotton 220 GSM Pique Knit',
            origin: 'FOB Chittagong',
            testingCost: 0.08,
            packingCost: 0.12,
            freight: 0.40
          },
          created_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'ord-c-003',
          organisation_id: demoOrg.id,
          created_by: demoUser.id,
          order_number: 'PO-77291',
          buyer: 'Buyer C (Demo)',
          style_ref: 'STY-HOOD-DRY',
          description: '80/20 Cotton-Poly 340 GSM Brushed Heavy Fleece',
          season: 'Winter 2026',
          delivery_date: '2026-10-05',
          quantity: 8500,
          currency: 'USD',
          status: 'shipped',
          material_cost: 5.40,
          trimCost: 0.95,
          trim_cost: 0.95,
          cmCost: 2.80,
          cm_cost: 2.80,
          testingCost: 0.15,
          packingCost: 0.25,
          freight: 0.65,
          overheadPct: 16,
          overhead_pct: 16,
          targetMargin: 22,
          target_margin: 22,
          fob_price: 13.56,
          fobPrice: 13.56,
          cif_price: 14.21,
          cifPrice: 14.21,
          notes: 'Completed and shipped. Variance audit available.',
          data: {
            category: 'Fleece & Hoodies',
            fabric: '80/20 Cotton-Poly 340 GSM Heavy Fleece',
            origin: 'FOB Chittagong',
            testingCost: 0.15,
            packingCost: 0.25,
            freight: 0.65
          },
          created_at: new Date(Date.now() - 3600000 * 24 * 12).toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      this.set('orders', orders);

      const defaultSession = {
        user: {
          id: demoUser.id,
          email: demoUser.email,
          user_metadata: { full_name: demoUser.name, company: demoUser.company }
        }
      };
      this.set('current_session', defaultSession);
      localStorage.setItem('od-current-org', demoOrg.id);
    }
  },

  // ── Demo Auth ──────────────────────────────────────────
  _session: null,

  async signIn(email, password) {
    this._ensureSeed();
    const users = this.get('users', {});
    const u = users[email];
    if (!u || u.password !== btoa(password)) throw new Error('Invalid email or password.');
    const session = { user: { id: u.id, email, user_metadata: { full_name: u.name, company: u.company } } };
    this._session = session;
    this.set('current_session', session);
    return session;
  },

  async signUp(email, password, meta) {
    this._ensureSeed();
    const users = this.get('users', {});
    if (users[email]) throw new Error('An account with this email already exists.');
    const id = 'demo-' + Math.random().toString(36).slice(2, 10);
    users[email] = { id, email, password: btoa(password), name: meta.full_name || '', company: meta.company || '' };
    this.set('users', users);
    const session = { user: { id, email, user_metadata: meta } };
    this._session = session;
    this.set('current_session', session);
    return session;
  },

  async getSession() {
    this._ensureSeed();
    if (this._session) return this._session;
    const saved = this.get('current_session');
    if (saved) { this._session = saved; return saved; }
    // In demo mode, provide auto-session
    const users = this.get('users', {});
    const firstUser = Object.values(users)[0];
    if (firstUser) {
      const session = { user: { id: firstUser.id, email: firstUser.email, user_metadata: { full_name: firstUser.name, company: firstUser.company } } };
      this._session = session;
      this.set('current_session', session);
      return session;
    }
    return null;
  },

  async signOut() {
    this._session = null;
    localStorage.removeItem(this._key('current_session'));
  },

  async updatePassword(newPassword) {
    const session = await this.getSession();
    if (!session) throw new Error('Not signed in.');
    const users = this.get('users', {});
    if (users[session.user.email]) {
      users[session.user.email].password = btoa(newPassword);
      this.set('users', users);
    }
  },

  // ── Demo Orgs ──────────────────────────────────────────
  createOrg(name, slug, userId) {
    this._ensureSeed();
    const orgs = this.get('orgs', {});
    const id = 'org-' + Math.random().toString(36).slice(2, 10);
    orgs[id] = { id, name, slug, plan: 'Enterprise Pro', created_at: new Date().toISOString() };
    this.set('orgs', orgs);

    const members = this.get('org_members', []);
    const memId = 'mem-' + Math.random().toString(36).slice(2, 10);
    members.push({ id: memId, organisation_id: id, user_id: userId, role: 'admin', invited_email: null, accepted_at: new Date().toISOString(), created_at: new Date().toISOString() });
    this.set('org_members', members);
    localStorage.setItem('od-current-org', id);
    return { id, name, slug, plan: 'Enterprise Pro' };
  },

  listMemberships(userId) {
    this._ensureSeed();
    const members = this.get('org_members', []);
    const orgs = this.get('orgs', {});
    return members
      .filter(m => m.user_id === userId || !m.user_id)
      .map(m => ({ ...m, organisations: orgs[m.organisation_id] || { id: m.organisation_id, name: 'ReWoo Garments Ltd.', slug: 'rewoo-garments' } }));
  },

  listMembers(orgId) {
    this._ensureSeed();
    return this.get('org_members', []).filter(m => m.organisation_id === orgId);
  },

  inviteMember(orgId, email, role) {
    this._ensureSeed();
    const members = this.get('org_members', []);
    const id = 'mem-' + Math.random().toString(36).slice(2, 10);
    const entry = { id, organisation_id: orgId, user_id: null, invited_email: email, role, accepted_at: null, created_at: new Date().toISOString() };
    members.push(entry);
    this.set('org_members', members);
    return entry;
  },

  removeMember(memberId) {
    const members = this.get('org_members', []).filter(m => m.id !== memberId);
    this.set('org_members', members);
  },

  updateOrg(orgId, name, slug) {
    const orgs = this.get('orgs', {});
    if (orgs[orgId]) { orgs[orgId].name = name; orgs[orgId].slug = slug; }
    this.set('orgs', orgs);
  },

  deleteOrg(orgId) {
    const orgs = this.get('orgs', {});
    delete orgs[orgId];
    this.set('orgs', orgs);
    const members = this.get('org_members', []).filter(m => m.organisation_id !== orgId);
    this.set('org_members', members);
    const orders = this.get('orders', []).filter(o => o.organisation_id !== orgId);
    this.set('orders', orders);
  },

  // ── Demo Orders ────────────────────────────────────────
  listOrders(orgId) {
    this._ensureSeed();
    const all = this.get('orders', []);
    return all
      .filter(o => !orgId || o.organisation_id === orgId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  getOrder(id) {
    this._ensureSeed();
    const o = this.get('orders', []).find(o => o.id === id);
    if (!o) throw new Error('Order not found.');
    return o;
  },

  createOrder(orgId, userId, payload) {
    this._ensureSeed();
    const orders = this.get('orders', []);
    const id = 'ord-' + Math.random().toString(36).slice(2, 10);
    const now = new Date().toISOString();
    const order = {
      id,
      organisation_id: orgId || 'org-rewoo-primary',
      created_by: userId || 'usr-rewoo-founder',
      order_number: payload.orderNumber || payload.order_number || 'PO-' + Math.floor(10000 + Math.random() * 90000),
      buyer: payload.buyer || '',
      style_ref: payload.styleRef || payload.style_ref || '',
      description: payload.description || payload.fabric || '',
      season: payload.season || '2026',
      delivery_date: payload.deliveryDate || payload.delivery_date || null,
      quantity: Number(payload.quantity) || 0,
      currency: payload.currency || 'USD',
      status: payload.status || 'draft',
      material_cost: Number(payload.materialCost ?? payload.material_cost) || 0,
      trim_cost: Number(payload.trimCost ?? payload.trim_cost) || 0,
      cm_cost: Number(payload.cmCost ?? payload.cm_cost) || 0,
      overhead_pct: Number(payload.overheadPct ?? payload.overhead_pct) || 15,
      target_margin: Number(payload.targetMargin ?? payload.target_margin) || 20,
      fob_price: Number(payload.fobPrice ?? payload.fob_price) || 0,
      cif_price: Number(payload.cifPrice ?? payload.cif_price) || 0,
      notes: payload.notes || '',
      data: payload,
      created_at: now,
      updated_at: now
    };
    orders.unshift(order);
    this.set('orders', orders);
    return order;
  },

  updateOrder(id, payload) {
    this._ensureSeed();
    const orders = this.get('orders', []);
    const idx = orders.findIndex(o => o.id === id);
    if (idx < 0) {
      // If not found, create it safely
      return this.createOrder(null, null, payload);
    }
    const now = new Date().toISOString();
    orders[idx] = {
      ...orders[idx],
      order_number: payload.orderNumber || payload.order_number || orders[idx].order_number,
      buyer: payload.buyer || orders[idx].buyer,
      style_ref: payload.styleRef || payload.style_ref || orders[idx].style_ref,
      description: payload.description || payload.fabric || orders[idx].description,
      season: payload.season || orders[idx].season,
      delivery_date: payload.deliveryDate || payload.delivery_date || orders[idx].delivery_date,
      quantity: Number(payload.quantity) || orders[idx].quantity,
      currency: payload.currency || orders[idx].currency,
      status: payload.status || orders[idx].status,
      material_cost: Number(payload.materialCost ?? payload.material_cost) || orders[idx].material_cost,
      trim_cost: Number(payload.trimCost ?? payload.trim_cost) || orders[idx].trim_cost,
      cm_cost: Number(payload.cmCost ?? payload.cm_cost) || orders[idx].cm_cost,
      overhead_pct: Number(payload.overheadPct ?? payload.overhead_pct) || orders[idx].overhead_pct,
      target_margin: Number(payload.targetMargin ?? payload.target_margin) || orders[idx].target_margin,
      fob_price: Number(payload.fobPrice ?? payload.fob_price) || orders[idx].fob_price,
      cif_price: Number(payload.cifPrice ?? payload.cif_price) || orders[idx].cif_price,
      notes: payload.notes ?? orders[idx].notes,
      data: payload,
      updated_at: now
    };
    this.set('orders', orders);
    return orders[idx];
  },

  deleteOrder(id) {
    const orders = this.get('orders', []).filter(o => o.id !== id);
    this.set('orders', orders);
  }
};

// ── UNIFIED API (works seamlessly in both demo and Supabase production) ──
const Auth = {
  async signIn(email, password) {
    if (DEMO_MODE) return DemoStore.signIn(email, password);
    const { data, error } = await db.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.session;
  },
  async signUp(email, password, meta) {
    if (DEMO_MODE) return DemoStore.signUp(email, password, meta);
    const { data, error } = await db.auth.signUp({ email, password, options: { data: meta } });
    if (error) throw error;
    return data.session;
  },
  async signOut() {
    if (DEMO_MODE) return DemoStore.signOut();
    await db.auth.signOut();
  },
  async updatePassword(pw) {
    if (DEMO_MODE) return DemoStore.updatePassword(pw);
    const { error } = await db.auth.updateUser({ password: pw });
    if (error) throw error;
  }
};

async function getSession() {
  if (DEMO_MODE) return DemoStore.getSession();
  const { data: { session } } = await db.auth.getSession();
  return session;
}

async function getUser() {
  const s = await getSession();
  return s?.user || null;
}

async function requireAuth(redirectTo) {
  const session = await getSession();
  if (!session) { window.location.href = redirectTo || 'auth.html'; return null; }
  return session;
}

// Orders API
const OrdersAPI = {
  async list(orgId) {
    if (DEMO_MODE) return DemoStore.listOrders(orgId);
    const { data, error } = await db.from('orders').select('*').eq('organisation_id', orgId).order('created_at', { ascending: false });
    if (error) throw error; return data || [];
  },
  async get(id) {
    if (DEMO_MODE) return DemoStore.getOrder(id);
    const { data, error } = await db.from('orders').select('*').eq('id', id).single();
    if (error) throw error; return data;
  },
  async create(orgId, userId, payload) {
    if (DEMO_MODE) return DemoStore.createOrder(orgId, userId, payload);
    const { data, error } = await db.from('orders').insert({
      organisation_id: orgId,
      created_by: userId,
      order_number: payload.orderNumber || payload.order_number,
      buyer: payload.buyer,
      style_ref: payload.styleRef || payload.style_ref,
      description: payload.description || payload.fabric,
      season: payload.season,
      delivery_date: payload.deliveryDate || payload.delivery_date || null,
      quantity: Number(payload.quantity) || 0,
      currency: payload.currency || 'USD',
      status: payload.status || 'draft',
      material_cost: Number(payload.materialCost ?? payload.material_cost) || 0,
      trim_cost: Number(payload.trimCost ?? payload.trim_cost) || 0,
      cm_cost: Number(payload.cmCost ?? payload.cm_cost) || 0,
      overhead_pct: Number(payload.overheadPct ?? payload.overhead_pct) || 15,
      target_margin: Number(payload.targetMargin ?? payload.target_margin) || 20,
      fob_price: Number(payload.fobPrice ?? payload.fob_price) || 0,
      cif_price: Number(payload.cifPrice ?? payload.cif_price) || 0,
      data: payload
    }).select().single();
    if (error) throw error; return data;
  },
  async update(id, payload) {
    if (DEMO_MODE) return DemoStore.updateOrder(id, payload);
    const { data, error } = await db.from('orders').update({
      order_number: payload.orderNumber || payload.order_number,
      buyer: payload.buyer,
      style_ref: payload.styleRef || payload.style_ref,
      description: payload.description || payload.fabric,
      season: payload.season,
      delivery_date: payload.deliveryDate || payload.delivery_date || null,
      quantity: Number(payload.quantity) || 0,
      currency: payload.currency || 'USD',
      status: payload.status,
      material_cost: Number(payload.materialCost ?? payload.material_cost) || 0,
      trim_cost: Number(payload.trimCost ?? payload.trim_cost) || 0,
      cm_cost: Number(payload.cmCost ?? payload.cm_cost) || 0,
      overhead_pct: Number(payload.overheadPct ?? payload.overhead_pct) || 15,
      target_margin: Number(payload.targetMargin ?? payload.target_margin) || 20,
      fob_price: Number(payload.fobPrice ?? payload.fob_price) || 0,
      cif_price: Number(payload.cifPrice ?? payload.cif_price) || 0,
      data: payload,
      updated_at: new Date().toISOString()
    }).eq('id', id).select().single();
    if (error) throw error; return data;
  },
  async delete(id) {
    if (DEMO_MODE) return DemoStore.deleteOrder(id);
    const { error } = await db.from('orders').delete().eq('id', id);
    if (error) throw error;
  }
};

// Orgs API
const OrgsAPI = {
  async listMemberships(userId) {
    if (DEMO_MODE) return DemoStore.listMemberships(userId);
    const { data, error } = await db.from('org_members').select('organisation_id, role, organisations(id, name, slug, plan)').eq('user_id', userId);
    if (error) throw error; return data || [];
  },
  async create(name, slug, userId) {
    if (DEMO_MODE) return DemoStore.createOrg(name, slug, userId);
    const { data: org, error: orgErr } = await db.from('organisations').insert({ name, slug }).select().single();
    if (orgErr) throw orgErr;
    const { error: memErr } = await db.from('org_members').insert({ organisation_id: org.id, user_id: userId, role: 'admin' });
    if (memErr) throw memErr;
    return org;
  },
  async listMembers(orgId) {
    if (DEMO_MODE) return DemoStore.listMembers(orgId);
    const { data, error } = await db.from('org_members').select('id, user_id, role, invited_email, accepted_at, created_at').eq('organisation_id', orgId);
    if (error) throw error; return data || [];
  },
  async inviteMember(orgId, email, role) {
    if (DEMO_MODE) return DemoStore.inviteMember(orgId, email, role);
    const { data, error } = await db.from('org_members').insert({ organisation_id: orgId, invited_email: email, role }).select().single();
    if (error) throw error; return data;
  },
  async removeMember(memberId) {
    if (DEMO_MODE) return DemoStore.removeMember(memberId);
    const { error } = await db.from('org_members').delete().eq('id', memberId);
    if (error) throw error;
  },
  async updateOrg(orgId, name, slug) {
    if (DEMO_MODE) return DemoStore.updateOrg(orgId, name, slug);
    const { error } = await db.from('organisations').update({ name, slug }).eq('id', orgId);
    if (error) throw error;
  },
  async deleteOrg(orgId) {
    if (DEMO_MODE) return DemoStore.deleteOrg(orgId);
    const { error } = await db.from('organisations').delete().eq('id', orgId);
    if (error) throw error;
  }
};

// ── Supabase client (initialized when not in demo mode) ──
let db;
if (!DEMO_MODE) {
  db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'orderdesk-session' }
  });
}

// Export unified API
window.OD = { db, Auth, getSession, getUser, requireAuth, OrdersAPI, OrgsAPI, DemoStore, DEMO_MODE };
