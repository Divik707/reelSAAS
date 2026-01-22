# 🍔 FoodReels – Full-Stack Monorepo Application

A full-stack food discovery platform inspired by short-video reels. Users can scroll through food videos, while food partners (restaurants/cloud kitchens) can register and post food content.

Built using a **monorepo architecture**, **PostgreSQL**, **Prisma ORM**, and modern web technologies.

---

##  Features

###  User Features

* Browse food videos in **reel/short-video format**
* Smooth infinite scrolling experience
* View food details, partner info, and location
* Like / Save food reels *(optional / upcoming)*

### 🍽️ Food Partner Features

* Partner registration & authentication
* Upload food videos
* Add food details (name, price, category, description)
* Manage posted food reels

### 🛠️ Admin / Platform

* Role-based access (User / Partner)
* Secure APIs
* Scalable monorepo structure

---

## 🧱 Tech Stack

### Frontend

* React / Next.js
* TypeScript
* Tailwind CSS
* Reels-style video UI

### Backend

* Node.js
* Express / Next.js API Routes
* TypeScript
* REST APIs

### Database & ORM

* PostgreSQL
* Prisma ORM

### Monorepo Tooling

* Turborepo / Nx *(choose based on setup)*
* Shared packages & configs

---

## 📂 Monorepo Structure

```bash
root/
├── apps/
│   ├── web/            # User & Partner frontend
│   └── backend/            # Backend APIs
│
├── packages/
│   ├── db/             # Prisma schema & client
│   ├── ui/             # Shared UI components
│   └── config/         # Shared ESLint/TS configs
│
├── prisma/
│   └── schema.prisma
│
├── package.json
├── turbo.json
└── README.md
```

---

## 🗄️ Database Schema (Overview)

**User**

* id
* name
* email
* role (USER | PARTNER)

**FoodPartner**

* id
* restaurantName
* location
* userId

**FoodVideo**

* id
* title
* videoUrl
* price
* partnerId
* createdAt

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Divik707/reelSAAS.git
cd reelSAAS
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/foodreels"
```

### 4️⃣ Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### 5️⃣ Run the app

```bash
npm run dev
```

---

## 🔐 Authentication

* JWT / Session-based auth
* Role-based authorization
* Separate flows for Users & Food Partners

---

## 📦 API Endpoints (Sample)

```http
POST   /api/auth/register
POST   /api/auth/login
GET    /api/foods
POST   /api/partner/food
```

---

## 🧪 Testing

```bash
npm run test
```

---

## 📌 Roadmap

* ❤️ Likes & comments on food reels
* 🔍 Search & filters
* 📍 Location-based recommendations
* 📱 Mobile app (React Native)
* ☁️ Video storage using S3 / Cloudinary

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT License

---

## 🙌 Author

**Divi**
Full-Stack Developer

---

🔥 *Scroll. Discover. Eat.*
