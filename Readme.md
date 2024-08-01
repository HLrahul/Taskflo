# Taskflo ( Crework labs assignment )

A full stack web application for task management.

## Sample SS

| Light mode | Dark mode |
| --- | --- |
| ![Light mode](media/light%20mode.png) | ![Dark mode](media/dark%20mode.png) |

### Live demo - https://taskflo.vercel.app/

## Local setup

### .env file structure

#### Client folder (.env)

```note
NEXT_PUBLIC_API_URL= [API url]
```

#### Server folder (.env)

```note
DATABASE_URL=
JWT_SECRET= [random generated string]
REFRESH_TOKEN_SECRET= [random generated string]
```

### Step 1 - Clone the repo

```bash
git clone https://github.com/HLrahul/Taskflo.git
```

```bash
cd taskflo
```

### Step 2 - Install deps for client and run

```bash
cd client

npm i

npm run dev
```

#### Optional (build and run)

```bash
npm run build
npm start
```

### Step 3 - Install deps for server and run

```bash
cd server

npm i

npm run dev
```

#### Optional (for auto restrating on changes)

```bash
npm i -g nodemon
```

## Tech Stack

![NextJs](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](    https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![ShadCNui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

![NodeJs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![ExpressJs](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

![PrismaORM](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Technical requirements checklist

- [x] User Authentication
  - [x] Implement signup and login functionality using email and password
  - [x] Ensure secure password storage and user session management

- [x] Task Board
  - [x] Upon logging in, users should see their personal task board
  - [x] The board should have four columns: "To-Do", "In Progress", “Under Review” and "Completed"

- [x] Task Management
  - [x] Users can create new tasks in any column
  - [x] Each task should have:
    - A title (mandatory)
    - A description (not mandatory to fill)
    - Status (mandatory)
      - [x] Automatically fill if card created from buttons in specific section
    - Priority (not mandatory)
      - Values for priority - Low, Medium, Urgent
    - Deadline (not mandatory)
  - [x] Users can edit and delete tasks after creation

- [x] Drag and Drop Functionality
  - [x] Implement drag and drop feature to move tasks between columns
  - [x] The task's status should update automatically when moved to a different column

- [x] Data Persistence
  - [x] All user data (account information and tasks) must be stored in a database
  - [x] Ensure that each user can only see and manage their own tasks
