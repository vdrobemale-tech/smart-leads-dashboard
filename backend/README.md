# Smart Leads Dashboard - Backend

A RESTful API built with Node.js, Express, TypeScript, and MongoDB.

## Tech Stack

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Zod Validation
- Docker

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB
- Docker (optional)

### Local Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```

4. Update `.env` file with your values
```env
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

5. Run development server
```bash
npm run dev
```

### Docker Setup

```bash
docker-compose up --build
```


### base url
http://localhost:5000/api/v1

### Auth Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | Register user | No |
| POST | /auth/login | Login user | No |

### Lead Routes

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | /leads | Get all leads | Admin/Sales |
| GET | /leads/:id | Get single lead | Admin/Sales |
| POST | /leads | Create lead | Admin/Sales |
| PUT | /leads/:id | Update lead | Admin/Sales |
| DELETE | /leads/:id | Delete lead | Admin only |
| GET | /leads/export/csv | Export CSV | Admin/Sales |

### Query Parameters for GET /leads

| Param | Type | Description |
|-------|------|-------------|
| status | string | New/Contacted/Qualified/Lost |
| source | string | Website/Instagram/Referral |
| search | string | Search by name or email |
| sort | string | latest or oldest |
| page | number | Page number (default: 1) |
| limit | number | Records per page (default: 10) |

## Role Based Access Control

| Feature | Admin | Sales |
|---------|-------|-------|
| View all leads | ✅ | ❌ |
| View own leads | ✅ | ✅ |
| Create lead | ✅ | ✅ |
| Update lead | ✅ | ✅ own |
| Delete lead | ✅ | ❌ |
| Export CSV | ✅ | ✅ own |