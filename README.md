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

5. You can use docker for database. If this is the case, `POSTGRES_URL` in `.env.local` can be the same as in `.env.example`.
   Otherwise, you can use your own `POSTGRES_URL`. (Skip to 7.)

6. If docker is used, start the database
   ```bash
   docker compose up -d
   ```

7. Run migrations
   ```bash
   yarn migrate
   ```

8. Start the development server
   ```bash
   yarn dev
   ```
9. Open http://localhost:3000 in your browser

# Report [112-1] Web Programming Final 

## (Group 9) Quizzz

組長：B10901011 陳威仲
組員：B09901071 吳弘翔、B10901034 蔡宇翔

1. Demo 影片連結: `https://youtu.be/ZUZxy_eBcJs`

2. 網站簡介：
   Quizzz是一個簡易且方便的語言學習平台，供任何想要學習外語的人使用。使用者除了能夠依照各國語言、目標以及喜好，選擇不同類別的網站預設字卡閱讀，也可以依照自己平時的學習情況、個人需求，建立專屬的字卡。除此之外，使用者也可以透過公開專屬字卡的方式，與他人交流。若想加強練習，也可以藉由字卡生成屬於自己的測驗，檢驗自己近期學習的成果。

3. Deploy 連結: `https://final-deploy-plum.vercel.app/`

4. 使用方式：
   註冊帳號後登入(也可以透過google帳號或是github帳號登入)。登入後可以新增單字本，或是閱讀及修改自己之前建立的單字本。如果想看其他人的筆記或是瀏覽網站上的資源，也可以閱覽公開的單字本。所有的單字本中都有創建即時測驗的功能，可供使用者檢驗學習結果。

5. 使用與參考之框架/模組/原始碼：無

6. 使用之第三方套件、框架：
   - 前端：typescript/next.js/react/radix-ui/tailwindcss/shadcn UI/Material UI
   - 後端：drizzle orm/postgresql/next-auth

7. 專題製作心得：
   - 陳威仲：
     這次做project的經驗很辛苦但也很特別，有時候常常有bug想很久，最後好不容易找到才發現竟然是上課就講過的觀念，雖然覺得有點氣但是也因為這個過程讓我更了解每網路服務的更多細節，這學期花費很多時間來一點一點學習也終於有不錯的成果，project名字叫Quizzz代表寫一寫寫到好想睡覺QQ。這次project也讓我體會到分工的重要，學到很多東西。
   - 蔡宇翔：
     從這個學期一開始對網頁毫無涉略，學期中間也一度有想停修的念頭，到現在幾乎可以得心應手寫出自己想要的element，十分有成就感。雖然有時候debug還是蠻辛苦，但做完專題之後，很開心可以有屬於自己跟組員的網頁。
   - 吳弘翔：
     我之前沒有寫網頁的經驗，加上學期初教學速度飛快，我常常跟不上進度，而要花比別人多一些時間才能搞懂reference code和課程內容。不過我還是很慶幸在學期中沒有選擇停修，而是繼續學習。雖然到現在相較很多人，我還是菜鳥中的菜鳥，不過我很高興自己對寫網頁有了基礎且較全面的認識。在做專題的過程中，我感受到分工作業的困難，以及了解到溝通的重要性。感謝我的組員在我遇到困難時能提供協助，成功在2023結束前，做出屬於我們自己的網頁。

## Work Distribution
1. 陳威仲：
   - Datsbase Schema
   - APIs
   - Auth
   - Learning mode
   - Components (DataTable, Carousels, Navbar, too many to list!!)

2. 吳弘翔：
   - Quiz mode
   - some dialogs

3. 蔡宇翔：
   - Hooks
   - publicbooks, books, some dialogs, profile

# Setup Guide

## Google login Setup

1. Go to Google Cloud and create project
   - `URL`: `https://console.cloud.google.com/projectselector2/apis/credentials/consent?authuser=2&supportedpurview=project`

2. Insert `Proect Name` and `Location` (you can choose `No organization`).

3. Choose `External` for `User Type`.

4. Insert the imformation with `*` sign. Click on `Save and Continue` on the following pages.

5. Go to `Credential` page and click on `+ Create Credentials` and choose `OAuth client ID`.

6. Choose `Web application` in `Application type`.

7. Click on `ADD URI` in `Authorized JavaScript origins` section and insert `http://localhost:3000`

8. Click on `ADD URI` in `Authorized redirect URIs` section and insert `http://localhost:3000/api/auth/callback/google`

9. After clicking on `CREATE` button, you can copy the `Client ID` and `Client Secret` to your `.env.local` file:

   ```text
   AUTH_GOOGLE_ID=<Client ID>
   AUTH_GOOGLE_SECRET=<Client secret>
   ```

   
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
