# next-phone-catalog

E-commerce catalog demo: Next.js 16, React 19, Zustand (client state), TanStack Query (server state), Prisma, PostgreSQL, JWT auth.

## Setup

```bash
npm install
cp .env.example .env
# Set DATABASE_URL and JWT_SECRET in .env
npx prisma migrate deploy
npm run dev
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Prisma) |
| `JWT_SECRET` | Secret for signing session JWTs (**required in production**) |
| `NEXT_PUBLIC_APP_URL` | Optional public app URL for SSR fetches |

Never commit `.env`. Use `.env.example` as a template only.

## Security

### Implemented

- **Passwords:** bcrypt hashing; hashes are never returned in API responses
- **Sessions:** JWT stored in `httpOnly` cookies (`SameSite=Lax`, `Secure` in production)
- **Secrets:** `JWT_SECRET` required in production; dev-only fallback is disabled outside `NODE_ENV=development`
- **Auth routes:** rate limiting (10 requests / 15 min per IP on login & register)
- **Protected routes:** middleware verifies JWT before serving `/account`
- **JWT verification:** HS256 algorithm explicitly enforced
- **Database:** Prisma ORM (parameterized queries)
- **Errors:** public API responses do not expose internal error details
- **Headers:** `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`

### Demo limitations

This is a portfolio / learning project, not production-hardened:

- Rate limiting is in-memory (resets on server restart; not shared across serverless instances)
- No refresh tokens or server-side session revocation
- Cart and favorites are stored in `localStorage` on the client
- No CAPTCHA or email verification on registration
- Password policy is minimal (6+ characters)

## State management

- **TanStack Query** (`src/hooks/use-catalog-queries.ts`, `src/lib/catalog-api.ts`) — catalog, search, product details (cached server data)
- **Zustand** (`src/store/client/`) — cart, favorites, auth session UI

## Project structure

```
src/
├── app/                    # Next.js routes only (thin pages)
├── components/             # shared UI (header, footer, home, ui, icons)
├── features/
│   ├── catalog/            # category listing pages
│   ├── home/               # home page sliders
│   └── product-details/    # product detail page
├── hooks/                  # TanStack Query hooks
├── lib/                    # catalog API, query client, prisma, jwt, rate-limit
├── providers/              # AppProviders (QueryClient + hydration)
├── store/
│   ├── client/             # Zustand stores (cart, favorites, auth)
│   └── context/            # StoreHydrationContext
└── styles/                 # global SCSS, variables, mixins
```

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # production server
npm run db:migrate
```
