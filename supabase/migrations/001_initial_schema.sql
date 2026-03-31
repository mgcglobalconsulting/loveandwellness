-- ============================================================
-- Love & Wellness Coaching — Initial Database Schema
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  source TEXT DEFAULT 'newsletter',
  utm_source TEXT,
  utm_campaign TEXT,
  converted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- APPLICATIONS
-- ============================================================
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  relationship_status TEXT,
  biggest_challenge TEXT,
  already_tried TEXT,
  commitment_level INTEGER CHECK (commitment_level BETWEEN 1 AND 10),
  investment_comfort TEXT,
  referral_source TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'not_a_fit', 'follow_up')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES profiles(id)
);

-- ============================================================
-- WEBINARS
-- ============================================================
CREATE TABLE webinars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  webinar_type TEXT DEFAULT 'daily' CHECK (webinar_type IN ('daily', 'masterclass_friday')),
  scheduled_at TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 60,
  max_attendees INTEGER,
  registration_url TEXT,
  replay_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- WEBINAR REGISTRATIONS
-- ============================================================
CREATE TABLE webinar_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webinar_id UUID REFERENCES webinars(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  attended BOOLEAN DEFAULT FALSE,
  source TEXT,
  UNIQUE(webinar_id, email)
);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  images TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'wellness' CHECK (category IN ('merch', 'wellness', 'digital', 'gift')),
  source TEXT DEFAULT 'custom' CHECK (source IN ('alibaba', 'printful', 'custom', 'digital')),
  alibaba_product_id TEXT,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_offer_stacked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_session_id TEXT UNIQUE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'fulfilled', 'refunded')),
  order_type TEXT,
  items JSONB DEFAULT '{}',
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DONATIONS
-- ============================================================
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_email TEXT,
  donor_name TEXT,
  amount DECIMAL(10,2) NOT NULL,
  stripe_payment_intent_id TEXT,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BLOG POSTS
-- ============================================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author_id UUID REFERENCES profiles(id),
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE webinars ENABLE ROW LEVEL SECURITY;
ALTER TABLE webinar_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Leads: public insert, admin read
CREATE POLICY "Anyone can create a lead" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read leads" ON leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Applications: public insert, admin read/update
CREATE POLICY "Anyone can submit application" ON applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read all applications" ON applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update applications" ON applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Webinars: public read if active
CREATE POLICY "Public can read active webinars" ON webinars FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage webinars" ON webinars FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Webinar registrations
CREATE POLICY "Anyone can register for webinar" ON webinar_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can see own registrations" ON webinar_registrations FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Products: public read, admin write
CREATE POLICY "Public can view active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Donations: public insert, admin read
CREATE POLICY "Anyone can donate" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view donations" ON donations FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Posts: public read if published, admin manage all
CREATE POLICY "Public can read published posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage all posts" ON posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================
-- SAMPLE DATA — seed the webinar table
-- ============================================================
INSERT INTO webinars (title, description, webinar_type, duration_minutes, is_active)
VALUES
  (
    'The 3 Secrets to Attracting Lasting Love',
    'A 40–90 minute training experience with Dr. Patricia George revealing the exact framework she uses with private coaching clients.',
    'daily',
    75,
    true
  ),
  (
    'The Love & Wellness Masterclass Experience',
    'A curated 3-hour evening for women ready to transform their love life. Limited to 20 participants.',
    'masterclass_friday',
    180,
    true
  );
