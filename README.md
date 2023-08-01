
---

# NestJS Task Management API

This is a simple Task Management API developed using NestJS and Prisma. The API allows to create, read and delete tasks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm/yarn
- NestJS
- Prisma
- PostgreSQL (or other database supported by Prisma)
- Docker (optional)

### Installation

1. Clone the repo:

```bash
git clone https://github.com/<your-github-username>/nestjs-task-management.git
```

2. Install NPM packages:

```bash
npm install
```

or if you use yarn:

```bash
yarn install
```

3. Create a `.env` file in the root directory and add your database connection string from docker-compose.yml:

```bash
DATABASE_URL="postgresql://postgres:123@localhost:5437/proj?schema=public"
```

4. Run Prisma migration to create the database schema:

```bash
npx prisma migrate dev
```

### Usage

To start the server, run:

```bash
npm run start:dev
```

or if you use yarn:

```bash
yarn start:dev
```

## API Endpoints

- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Retrieve a task by its ID
- `DELETE /tasks/:id` - Delete a task by its ID

## Running Tests

To run tests, use the following command:

```bash
npm test
```

or if you use yarn:

```bash
yarn test
```

## Built With

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications.
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.

## Contributing

Any contributions are greatly appreciated.

## License

Distributed under the MIT License.

## Contact

Yuqing Jian - [yuqingj2@illinois.edu](yuqingj2@illinois.edu)

Project Link: [https://github.com/jianyq/typescript-starter](https://github.com/jianyq/typescript-starter)

---
