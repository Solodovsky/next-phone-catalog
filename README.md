## Getting started

```bash
npm install
cp .env.example .env
# set DATABASE_URL and JWT_SECRET in .env
npx prisma migrate deploy
npm run dev
npm run build    # production build
npm run start    # production server
```

## Project structure

```
next-phone-catalog/
├── data/                   # product JSON (phones, tablets, accessories)
├── prisma/                 # database schema and migrations
├── public/                 # static assets (fonts, images)
└── src/
    ├── app/                # Next.js routes
    ├── components/         # shared UI (header, footer, home, ui, icons)
    ├── features/
    │   ├── catalog/        # category pages
    │   ├── home/           # home page sliders
    │   └── product-details/ # product detail page
    ├── hooks/              # TanStack Query hooks
    ├── lib/                # API, prisma, jwt, rate-limit
    ├── providers/          # AppProviders
    ├── store/
    │   ├── client/         # Zustand (cart, favorites, auth)
    │   └── context/        # StoreHydrationContext
    └── styles/             # global SCSS
```
