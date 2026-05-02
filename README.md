<div align="center">

# 🖤 GetBio

**A minimal, high-aesthetic link-in-bio & portfolio platform.**  
Built for creators, developers, and brands who value design.

</div>

---

## What is GetBio?

GetBio is a self-hosted, fully customizable **link-in-bio and personal profile platform** powered by Next.js and Supabase. It gives you a single, beautiful public page to share all your links, social accounts, and GitHub repositories — managed entirely through a private admin panel.

Unlike third-party services like Linktree or Bento, GetBio is **yours**. You own the code, the data, and the design.

### Use Cases
- Personal developer portfolio with pinned GitHub repositories
- Creator page with social links and content links
- Brand profile with curated links and social presence
- Restaurant, artist, or business landing page

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Public profile page — links, bio, socials |
| `/git` | Public GitHub repositories page |
| `/login` | Admin login |
| `/admin/bio` | Admin panel — profile, links, social accounts |
| `/admin/git` | Admin panel — GitHub repository management |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** (App Router) | Framework — SSR, routing, Server Actions, Middleware |
| **TypeScript** | Type safety across all components |
| **Supabase (PostgreSQL)** | Cloud database — stores all profile data as JSONB |
| **Framer Motion** | Smooth staggered animations on public pages |
| **React Icons** (`react-icons/fi`) | Feather icon set used across the admin panel |
| **Geist Font** | Vercel's typeface, loaded via `next/font/google` |
| **Vanilla CSS** | Custom design system — no Tailwind, no UI libraries |
| **Next.js Middleware** | Server-side route protection for `/admin/*` |
| **HTTP-Only Cookies** | Secure, bypass-proof authentication sessions |

---

## UI Design System

GetBio uses a custom **CrazyUI**-inspired design language:

- **True Black (`#000000`)** backgrounds — no greys, no gradients
- **Geist** typeface with tight `letter-spacing` (`-0.04em`) for headings
- Ultra-thin `1px` borders at `rgba(255, 255, 255, 0.05)` opacity
- All shadows and glows removed for a flat, editorial feel
- Micro-animations via `framer-motion` for staggered content entry
- Hover states use `scale()` transforms instead of color shifts

---

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/your-username/thron.git
cd thron
npm install
```

### 2. Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **Project Settings → API** and copy your **Project URL** and **anon public key**
3. In the Supabase **SQL Editor**, run:

```sql
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO profiles (id, data)
VALUES (
  'admin',
  '{"name":"","badge":"","bio":"","avatarUrl":"","links":[],"socials":[],"gitRepos":[]}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
GRANT ALL ON profiles TO anon;
GRANT ALL ON profiles TO authenticated;
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Session
SESSION_SECRET=your_random_secret_string

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
```

> **Important:** Never commit `.env.local` to version control. It is already in `.gitignore`.

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Usage

### Logging In
Navigate to `/login` and enter the credentials you set in `.env.local`.

### Managing Your Profile (`/admin/bio`)
- Edit your **name**, **badge**, and **bio**
- Upload an **avatar** image
- Add, edit, delete, and toggle **links**
- Configure **social media accounts** (Instagram, GitHub, YouTube, etc.)
- Changes are only saved when you click **"Save Changes"**

### Managing GitHub Repositories (`/admin/git`)
- Add repositories with name, description, URL, last commit message, and update date
- **Pin** important repositories to display them at the top of `/git`
- Toggle repositories as **Active** or **Deactive**
- Changes are only saved when you click **"Save Changes"**

---

## Security

GetBio uses a **server-side authentication** model:

- Credentials are stored in `.env.local`, never in source code
- Login is handled via a **Next.js Server Action** — credentials never touch the browser
- Successful login sets an **HTTP-Only cookie** (`thron_session`) that cannot be read or forged via JavaScript
- **Next.js Middleware** protects all `/admin/*` routes at the edge — unauthenticated requests are redirected to `/login` before any page content loads

---

## Deployment (Vercel)

1. Push your project to GitHub
2. Import the repository at [vercel.com](https://vercel.com)
3. In Vercel project settings, add all variables from `.env.local` under **Environment Variables**
4. Deploy

> Supabase data is global — all changes made via the admin panel will be instantly visible to all visitors worldwide.

---

## License

MIT — feel free to use, fork, and customize.

---

<div align="center">
  <sub>Powered by <strong>Svetra</strong></sub>
</div>
