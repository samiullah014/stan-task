# CRUD API with PostgreSQL and Drizzle ORM

A simple, production-ready CRUD API built with Node.js, Express, TypeScript, PostgreSQL, and Drizzle ORM.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ PostgreSQL database with Drizzle ORM
- ✅ TypeScript for type safety
- ✅ Input validation with Zod
- ✅ RESTful API design
- ✅ Error handling

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up PostgreSQL Database

Create a PostgreSQL database:

```bash
createdb stan_db
```

Or using psql:

```sql
CREATE DATABASE stan_db;
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/stan_db
PORT=3000
```

Replace `username` and `password` with your PostgreSQL credentials.

### 4. Run Database Migrations

Push the schema to your database:

```bash
npm run db:push
```

Alternatively, you can generate and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Get All Tasks
```http
GET /api/tasks
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Complete assignment",
    "description": "Finish the CRUD app",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 2. Get Task by ID
```http
GET /api/tasks/:id
```

**Example:**
```http
GET /api/tasks/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Complete assignment",
  "description": "Finish the CRUD app",
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 3. Create Task
```http
POST /api/tasks
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description (optional)",
  "status": "pending"
}
```

**Status values:** `pending`, `in_progress`, `completed`

**Response:**
```json
{
  "id": 1,
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 4. Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json
```

**Example:**
```http
PUT /api/tasks/1
```

**Request Body (all fields optional):**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "in_progress"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated description",
  "status": "in_progress",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T01:00:00.000Z"
}
```

#### 5. Delete Task
```http
DELETE /api/tasks/:id
```

**Example:**
```http
DELETE /api/tasks/1
```

**Response:**
```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": 1,
    "title": "Task Title",
    "description": "Task description",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Example API Calls

### Using cURL

**Create a task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Drizzle ORM", "description": "Study the documentation", "status": "in_progress"}'
```

**Get all tasks:**
```bash
curl http://localhost:3000/api/tasks
```

**Get a specific task:**
```bash
curl http://localhost:3000/api/tasks/1
```

**Update a task:**
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Project Structure

```
.
├── src/
│   ├── db/
│   │   ├── index.ts          # Database connection
│   │   └── schema.ts         # Database schema
│   ├── routes/
│   │   └── tasks.ts          # Task routes
│   ├── validations/
│   │   └── task.ts           # Zod validation schemas
│   └── index.ts              # Express app entry point
├── drizzle/                  # Migration files (generated)
├── drizzle.config.ts         # Drizzle configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Postman Collection

A Postman collection is included in the project: `Stan-Assignment-API.postman_collection.json`

**To use it:**
1. Open Postman
2. Click "Import" button
3. Select the `Stan-Assignment-API.postman_collection.json` file
4. The collection will be imported with all endpoints ready to test
5. Make sure your server is running on `http://localhost:3000` (or update the `baseUrl` variable in the collection)

The collection includes:
- Get All Tasks
- Get Task by ID
- Create Task (full example)
- Create Task (minimal example)
- Update Task
- Update Task Status Only
- Delete Task
- Health Check

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database (recommended for development)
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a JSON object with an `error` field:

```json
{
  "error": "Task not found"
}
```

Validation errors include detailed information:

```json
{
  "error": "Validation error",
  "details": [...]
}
```

## Database Schema

The `tasks` table has the following structure:

- `id` (serial, primary key)
- `title` (varchar, required)
- `description` (text, optional)
- `status` (varchar, default: "pending")
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Notes

- The app uses Drizzle ORM's zero-sync migrations for fast schema updates
- All endpoints are validated using Zod schemas
- The API follows RESTful conventions
- TypeScript ensures type safety throughout the application

