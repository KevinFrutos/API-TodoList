# API - TodoList

A RESTful API for managing user authentication and todo notes, built with Node.js, TypeScript, MongoDB, and Redis using Hexagonal Architecture.

---

## SETUP

### Prerequisites

* Node.js >= 18
* MongoDB instance (local or cloud)
* Redis instance (local or cloud)

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and set the following:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
```

### Run the App

```bash
npm run dev
```

Server will start at `http://localhost:PORT`

---

## Routes

### Auth

| Method | Endpoint              | Description         |
| ------ |-----------------------| ------------------- |
| POST   | /api/v1/auth/register | Register new user   |
| POST   | /api/v1/auth/login    | Login existing user |

### Notes

All `/note` routes require a Bearer token in the `Authorization` header.

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | /api/v1/note/create | Create a new note  |
| GET    | /api/v1/note/list   | List notes by user |
| PUT    | /api/v1/note/update | Update a note      |
| DELETE | /api/v1/note/delete | Delete a note      |

---

## Testing

```bash
npm run test
```

---

## License

MIT
