
# Library System App

A brief description of what this project does and who it's for


## Features

- Book
- Member
- Borrow


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DATABASE_URL`

## Installation

Install library-system with npm 
- First set-up your env

```bash
  cd library-management
  npm install
  npm run start:dev
```

- Open in another terminal
```bash
  npm run seed
```
    
## API Reference
```http
  http://localhost:3000/
```

#### Swagger Documentation
```http
  http://localhost:3000/api-docs/
```

![Swagger Documentation](https://i.ibb.co.com/vcwm9HB/Screenshot-2024-05-30-150814.png)

#### Book

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `code` | `string` | **Required** |
| `title`   | `string` | **Required** |
| `author` | `string` | **Required** |
| `stock` | `number` | **Required** |

#### Member

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `code` | `string` | **Required** |
| `name`   | `string` | **Required** |

#### Borrow

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `memberId` | `number` | **Required** |
| `bookId`   | `number` | **Required** |


## Tech Stack

**Server:** Node, NestJS, Prisma, PostgreSQL

