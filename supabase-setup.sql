-- ============================================
-- Ti Bijou Haïti — Database Setup Script
-- Run this in Supabase SQL Editor
-- ============================================

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ht TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  color TEXT DEFAULT '#F4A7BB',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des produits
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ht TEXT NOT NULL,
  description TEXT,
  description_ht TEXT,
  price INT NOT NULL,
  old_price INT,
  category_id UUID REFERENCES categories(id),
  gender TEXT CHECK (gender IN ('fille', 'garcon', 'unisexe')),
  age_range TEXT CHECK (age_range IN ('0-3', '3-6', '6-12')),
  colors TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  badge TEXT CHECK (badge IN ('new', 'popular', 'limited', NULL)),
  is_featured BOOLEAN DEFAULT FALSE,
  is_coup_coeur BOOLEAN DEFAULT FALSE,
  stock INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  views INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des messages de contact
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  product_name TEXT,
  type TEXT DEFAULT 'contact' CHECK (type IN ('contact', 'interest')),
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'handled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des témoignages
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  text_fr TEXT NOT NULL,
  text_ht TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can send messages" ON messages FOR INSERT WITH CHECK (true);

-- Insert demo categories
INSERT INTO categories (name, name_ht, slug, icon, color, sort_order) VALUES
('Vêtements', 'Rad', 'vetements', '👗', '#F4A7BB', 1),
('Chaussures', 'Soulye', 'chaussures', '👟', '#A7D1F4', 2),
('Accessoires', 'Akseswa', 'accessoires', '🎀', '#C4B1D4', 3),
('Soins', 'Swen', 'soins', '🧴', '#A7F4D1', 4),
('Jouets', 'Jwèt', 'jouets', '🧸', '#F4D7A7', 5),
('Literie', 'Dra kabann', 'literie', '🛏️', '#D4A7F4', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert demo testimonials
INSERT INTO testimonials (name, text_fr, text_ht, rating) VALUES
('Marie-Claire J.', 'J''ai trouvé tout ce dont j''avais besoin pour mon bébé au même endroit ! La qualité est excellente.', 'Mwen jwenn tout sa m te bezwen pou tibebe m nan yon sèl kote! Kalite pwodui yo ekselan.', 5),
('Stéphanie P.', 'Le service est rapide et professionnel. Je recommande Ti Bijou à toutes les mamans !', 'Sèvis la rapid e pwofesyonèl. M rekòmande Ti Bijou bay tout manman!', 5),
('Jocelyne D.', 'La robe de baptême de ma fille était tellement belle ! Tout le monde l''a adorée.', 'Wòb batèm pitit fi m nan te tèlman bèl! Tout moun te renmen l.', 5);



https://kvvzpkhnchqscwzlcopx.supabase.co 


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dnpwa2huY2hxc2N3emxjb3B4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NzMzNDEsImV4cCI6MjA5MjA0OTM0MX0.FkcDo82O8jA8j-38ET0vAMNARJQ9TfmV_qE2DPA8LBw