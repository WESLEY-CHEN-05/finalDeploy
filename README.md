# Run the project

1. Install dependencies
   ```bash
   yarn
   ```

2. Get Google OAuth credentials
   Please refer to the [Google login Setup](#google-login-setup) section for more details.

3. Get Github OAuth credentials
   Please refer to the [NextAuth Setup](#nextauth-setup) section for more details. (The same as we did in class!)

4. Create `.env.local` file in the project root and add the following content:

   ```text
   AUTH_GOOGLE_ID=
   AUTH_GOOGLE_SECRET=

   AUTH_SECRET=<this can be any random string>
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=
   ```

5. Start the database
   ```bash
   docker compose up -d
   ```
6. Run migrations
   ```bash
   yarn migrate
   ```
7. Start the development server
   ```bash
   yarn dev
   ```
8. Open http://localhost:3000 in your browser

# Setup Guide

## Prettier and ESLint

1. Install prettier and prettier plugins
   ```bash
   yarn add -D prettier prettier-plugin-tailwindcss @trivago/prettier-plugin-sort-imports
   ```
2. Install eslint and eslint plugins
   ```bash
   yarn add -D eslint typescript @typescript-eslint/parser eslint-config-prettier @typescript-eslint/eslint-plugin
   ```
3. Copy and paste the `./prettierrc.cjs` and `./eslintrc.json` from this repo to your project root.

4. Add `format` script to `package.json`
   ```json
   {
     "scripts": {
       "format": "prettier --write ."
     }
   }
   ```
5. Check if the scripts work
   ```bash
   yarn format
   yarn lint
   ```

## Shadcn UI setup

1. Setup Shadcn UI
   ```bash
   npx shadcn-ui@latest init
   ```
2. Answer the questions carefully since **some of the default options are not compatible with our setup**.

   - Would you like to use TypeScript (recommended)? `yes`
   - Which style would you like to use? › `New York`
     - I personally prefer New York style, but you can choose any style you like.
   - Which color would you like to use as base color? › `Slate`
     - You can choose any color you like.
   - Where is your global CSS file? › › `src/app/globals.css`
     - **IMPORTANT**: You must enter `src/app/globals.css` here. Otherwise, the setup will fail.
   - Do you want to use CSS variables for colors? › `yes`
   - Where is your tailwind.config.js located? › `tailwind.config.ts`
     - **IMPORTANT**: We are using TypeScript, so you must enter `tailwind.config.ts` here.
   - Configure the import alias for components: › `@/components`
   - Configure the import alias for utils: › `@/lib/utils/shadcn`
   - Are you using React Server Components? › `yes`

## Google login Setup

1. Go to Google Cloud and create project
   - `URL`: `https://console.cloud.google.com/projectselector2/apis/credentials/consent?authuser=2&supportedpurview=project`

2. Insert `Proect Name` and `Location` (you can choose `No organization`).
   
## NextAuth Setup

We use the latest version (v5) of NextAuth, which is still in beta. So there are some differences between the documentation and the actual code. You can find the detailed v5 migration guide here: https://authjs.dev/guides/upgrade-to-v5#authenticating-server-side

1. Install next-auth

   ```bash
   yarn add next-auth@beta
   ```

2. Get Github OAuth credentials

   - Go to `Settings` tab of your Github account
   - Click `Developer settings` on the left sidebar
   - Click `OAuth Apps` on the left sidebar
   - Click `New OAuth App` or `Registr a new application`
   - Enter the following information:
     - `Application name`: `Notion Clone` (or any name you like)
     - `Homepage URL`: `http://localhost:3000`
     - `Authorization callback URL`: `http://localhost:3000/api/auth/callback/github`
   - Click `Register application`
   - Copy the `Client ID` and `Client Secret` to your `.env.local` file:

     ```text
     AUTH_GITHUB_ID=<Client ID>
     AUTH_GITHUB_SECRET=<Client Secret>
     ```

     Before copying the Clinet Secret, you may need to click on `Generate a new client secret` first.

     Note that in NextAuth v5, the prefix `AUTH_` is required for the env variables.

     Note that you do not have to add those keys to `src/lib/env/private.ts` since they are automatically handled by NextAuth.

3. Add `AUTH_SECRET` to `.env.local`:

   ```text
   AUTH_SECRET=any-random-string
   ```

   This is used to encrypt the session token. You can use any random string here. Make sure to keep it secret and update it regularly.

   Note that you do not have to add those keys to `src/lib/env/private.ts` since they are automatically handled by NextAuth.
