# DevLinks

DevLinks is an open-source platform that allows developers to create and manage a personalized link-sharing profile.

**Table of Contents**

[TOCM]

[TOC]

## Project Requirements

- ✅ Create, read, update, delete links and see previews in the mobile mockup
- ✅ Receive validations if the links form is submitted without a URL or with the wrong URL pattern for the platform
- Drag and drop links to reorder them
- ✅ Add profile details like profile picture, first name, last name, and email
- ✅ Receive validations if the profile details form is saved with no first or last name
- Preview their devlinks profile and copy the link to their clipboard
- ✅ View the optimal layout for the interface depending on their device's screen size
- ✅ See hover and focus states for all interactive elements on the page
- ✅ Bonus: Save details to a database (build the project as a full-stack app)
- ✅ Bonus: Create an account and log in (add user authentication to the full-stack app)

## Tech Stack

DevLinks is built using the following technologies:

- [Framework] Next.js 14 (App Router)
- [Language] TypeScript
- [UI Framework] Tailwind CSS, Shadcn UI
- [Form Management] React Hook Form, Zod

## Deployment

- Deployed on [Vercel](https://vercel.com/)
- [Live Link](https://t-devlinks.vercel.app/)

## Setup Requirements

- Node.js 20+ and npm

## Getting started

Run the following command on your local environment:

```shell
git clone https://github.com/TutulDevs/devlinks.git my-project-name
cd my-project-name
npm install
```

Then create a file in the root directory and name it `.env.local`. In that file add two environmental variables for [Supabase](https://supabase.com/) authentication and database access.

```shell
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

How to get started with Supabase? Read this [Doc](https://supabase.com/docs/guides/auth/quickstarts/nextjs).

If you're from [Kahf](https://kahf.com.tr/) HR department, please find those variables in the applied form.

Then, you can run the project locally in development mode with live reload by executing:

```shell
npm run dev
```

Or, if you want to run it locally after build, execute:

```shell
npm run build
npm run start
```

Open http://localhost:3000 with your favorite browser to see the project.

## Project structure

```shell
.
├── public                            # Public assets folder
├── src
│   ├── app                           # Next JS App (App Router)
│   ├── components                    # React components
│   ├── libs                          # 3rd party libraries configuration
│   ├── middleware.ts                 # Next JS middleware configuration & route protection
├── next.config.mjs                   # Next JS configuration
├── README.md                         # README file
├── tailwind.config.js                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

## Authentication

- Supabase Auth is used for authentication
- `/login` page handles both the sign in & sign up
- The form for both sign in & sign up, is using `formAction` to submit the form and the actions are in `/src/app/actions.ts` file
- The current valid credentials for sign in are
  - Email: **tutulnahid@gmail.com**
  - Password: **Pass.1234**
- Please do not try to sign-up with other emails frequently. Currently, I'm using Supabase's default SMTP, which has a rate limit of 02 emails per hour.
- On sign up, you'll get a confirmation email in your inbox
- After signing in, you'll be redirected to `/profile` page
- To sign out, visit `/` page and click `Sign out` button

## Page protection

Page protection logics are implemented in the `/src/lib/supabase/middleware.ts` file.

## TO DOs

- Drag and drop links to reorder them
- Preview their devlinks profile and copy the link to their clipboard
- Set meta title for all pages
