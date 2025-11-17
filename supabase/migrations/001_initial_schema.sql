-- PromptHub Database Schema
-- v1 Initial Setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. PROMPTS TABLE
-- =====================================================
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  category TEXT NOT NULL,  -- Free text, user can type any category
  copy_count INTEGER DEFAULT 0,  -- Track how many times prompt was copied
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_prompts_user_id ON prompts(user_id);
CREATE INDEX idx_prompts_category ON prompts(category);
CREATE INDEX idx_prompts_created_at ON prompts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prompts
CREATE POLICY "Anyone can view prompts"
  ON prompts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create prompts"
  ON prompts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- v2 policies (for future edit/delete features)
CREATE POLICY "Users can update own prompts"
  ON prompts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own prompts"
  ON prompts FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- 2. LIKES TABLE
-- =====================================================
CREATE TABLE prompt_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(prompt_id, user_id)  -- One like per user per prompt
);

-- Indexes
CREATE INDEX idx_prompt_likes_prompt_id ON prompt_likes(prompt_id);
CREATE INDEX idx_prompt_likes_user_id ON prompt_likes(user_id);

-- Enable Row Level Security
ALTER TABLE prompt_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prompt_likes
CREATE POLICY "Anyone can view likes"
  ON prompt_likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create likes"
  ON prompt_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON prompt_likes FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- 3. AI_PLATFORMS TABLE
-- =====================================================
CREATE TABLE ai_platforms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ai_platforms ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_platforms
CREATE POLICY "Anyone can view ai_platforms"
  ON ai_platforms FOR SELECT
  USING (true);

-- Insert default platforms
INSERT INTO ai_platforms (name) VALUES
  ('ChatGPT'),
  ('Claude'),
  ('Gemini'),
  ('Other');

-- =====================================================
-- 4. PROMPT_PLATFORMS TABLE (Junction)
-- =====================================================
CREATE TABLE prompt_platforms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
  platform_id UUID REFERENCES ai_platforms(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(prompt_id, platform_id)  -- No duplicate links
);

-- Indexes
CREATE INDEX idx_prompt_platforms_prompt_id ON prompt_platforms(prompt_id);
CREATE INDEX idx_prompt_platforms_platform_id ON prompt_platforms(platform_id);

-- Enable Row Level Security
ALTER TABLE prompt_platforms ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prompt_platforms
CREATE POLICY "Anyone can view prompt_platforms"
  ON prompt_platforms FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can link platforms to their prompts"
  ON prompt_platforms FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM prompts
      WHERE id = prompt_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can remove platforms from their prompts"
  ON prompt_platforms FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM prompts
      WHERE id = prompt_id AND user_id = auth.uid()
    )
  );

-- =====================================================
-- 5. HELPFUL VIEWS
-- =====================================================

-- View to get prompts with like counts, platforms, and author info
CREATE OR REPLACE VIEW prompts_with_stats AS
SELECT
  p.*,
  u.email as author_email,
  COUNT(DISTINCT l.id) as like_count,
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object('id', ap.id, 'name', ap.name)
    ) FILTER (WHERE ap.id IS NOT NULL),
    '[]'::json
  ) as platforms
FROM prompts p
LEFT JOIN auth.users u ON p.user_id = u.id
LEFT JOIN likes l ON p.id = l.prompt_id
LEFT JOIN prompt_platforms pp ON p.id = pp.prompt_id
LEFT JOIN ai_platforms ap ON pp.platform_id = ap.id
GROUP BY p.id, u.email;

-- =====================================================
-- DONE!
-- =====================================================
-- Database schema is ready for v1
-- Tables: prompts, likes, ai_platforms, prompt_platforms
-- Security: RLS enabled on all tables
-- Performance: Indexes added for common queries
