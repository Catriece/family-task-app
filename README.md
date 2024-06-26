# Your Favorite Family Task App

## Introduction:

Welcome to SimplyDo Task App, a todo application designed to bring organization and collaboration to your daily activities. This application is here to simplify your routine by providing a centralized platform where you can focus on your tasks for the day.

This project is broken up into two folders: `/client` for frontend and `/server` for the backend/api.

Check out my Trello Board:
https://trello.com/b/fd78pYk3/cwc-todo-app

### Technologies used

#### Client-Side

- Vite
- React
- TypeScript
- Tanstack Query
- Axios
- ChakraUI

#### Server-Side

- Nestjs
- TypeScript
- PostgreSQL
- TypeOrm

## GETTING STARTED:

### Cloning or Forking Repository - Pulling from GitHub

#### To `Clone` the repository:

In the terminal or command prompt, `cd` into your preferred project folder where you want to store the project. Use `git clone [SSH URL]` command to clone project onto your local machine.

SSH Url found in the `Code` dropdown list in GitHub

-or-

#### To `Fork` the repository:

In GitHub, click the `Fork` button and follow the instructions on the screen.

## Client Side

This project was initalized with Vite.

To start the development server in the terminal:

- [ ] `cd` to the `/client` folder.
- [ ] Install all dependencies using `npm install`
- [ ] Start the development server with the `npm run dev` command
- [ ] Open the application in the web browser. The link to the application will be in the terminal.

> [!TIP]
> Be mindful of what folder you're starting in. You may need to include `cwc-todo-app/` before you `cd` into the `/client` folder

---

> [!TIP]
> I'm not sure wha it is for Windows but on Mac in order to make the link clickable use the `command` key while you hover over the link.

## Server Side

In a new terminal:

- [ ] Navigate to the `/server` folder
- [ ] Install all dependencies with `npm install`
- [ ] Create `.env` file from `.env.copy` file (Make sure the .env file is located in the server folder)
- [ ] Run `npm run build`
- [ ] Run migration with: `npm run migration:run`
- [ ] Start the server with `npm run start:dev` command

## FOLDER STRUCTURE

```
|-- `client`
| |-- public
| |-- `src`
| | |-- `assets` (images etc housed here)
| | |-- `components`
| | |-- `pages` (pages (or different sections) where components are rendered)
| |-- `App.tsx` (all pages files rendered here)
| |-- `index.css` (global css file)
| |-- `main.tsx` (App file rendered here. App file wrapped in ChakraProvider)
| |-- & other necessary files

|-- `server`
| |-- `src`
| | |-- `config`
| | |-- `functions`
| | |-- `migrations`
| | |-- `modules`
| | | |-- `auth`
| | | |-- `user`
| | |-- `app.controller.ts` (Top level controllers file)
| | |-- `app.module.ts` (Top level modules file)
| | |-- `app.service.ts` (Top level routes file)
| | |-- `main.ts`
| | |-- `folder`
| |-- `test`
| |-- .env.copy (Environment Variables set up)
| |-- package.json (dependencies list) & all other necessary files
```

# family-task-app
