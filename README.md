# Baemin Clone Application

This repository contains two applications: a NestJS backend (`nest_baemin`) and a Next.js frontend (`next_baemin`).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (for PostgreSQL, if needed)

---

## NestJS App (`nest_baemin`)

### Setup and Installation

1. **Navigate to the Nest app directory**:

   ```bash
   cd nest_baemin
   ```

2. **Install dependencies**:

   ```bash
   yarn
   ```

3. **Initialize Prisma**:

   ```bash
   npx prisma init
   ```

4. **Configure Environment Variables**:

   - Open `.env` and fill in the database URL:
     ```env
     DATABASE_URL="postgresql://postgres:1234@localhost:5432/db_baemin"
     ```

5. **Sync Database**:

   ```bash
   npx prisma db pull
   ```

6. **Generate Prisma Client**:

   ```bash
   npx prisma generate
   ```

7. **Configure JWT Environment Variables**::

   - Open `.env` and fill in the JWT secret:
     ```env
     JWT_SECRET="651898e3a62aa7c71973a772ab1d1c5e8f6fb8ef83cc0820888ce58c24defcd9"
     ```

8. **Start the Server**:
   ```bash
   yarn start:dev
   ```
   The server should now be running at [http://localhost:3456](http://localhost:3456).

### API Documentation

Swagger is used for API documentation. To view it:

- **Swagger UI**: [http://localhost:3456/swagger](http://localhost:3456/swagger)
- **Swagger JSON**: [http://localhost:3456/swagger-json](http://localhost:3456/swagger-json)

---

## Next.js App (`next_baemin`)

### Setup and Installation

1. **Navigate to the Next app directory**:

   ```bash
   cd next_baemin
   ```

2. **Install dependencies**:

   ```bash
   yarn
   ```

3. **Start the Development Server**:
   ```bash
   yarn start
   ```
   The Next.js app should now be running on its designated port (e.g., [http://localhost:9269](http://localhost:9269)).
