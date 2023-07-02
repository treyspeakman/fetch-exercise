## To Run Locally

```bash
npm i
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

### State Management

- I have chosen to use XState as my state management solution instead of Redux,
  React Context, or React Hooks. When running the application locally, XState
  provides an inspection tab that allows you to view the current state of the
  application, as well as the events and transitions, similar to Redux devtools. Although I am relatively new
  to using XState, I have found it to be a powerful tool and decided to give it a
  try. In an ideal scenario, I would break down the primary state machine into
  smaller state machines that correspond to different parts of the application.
  However, I encountered some challenges in doing so due to the ongoing
  development of TypeScript support in XState.

### File Structure

- I used [this](https://giancarlobuomprisco.com/next/a-scalable-nextjs-project-structure) file structure for the Next.js application.

  - src/core - Reusable components
  - src/lib - Utilities and state management
    - You can find api endpoints at src/lib/xstate/services
  - src/component - Components that are tightly coupled to application logic
  - src/pages - Next.js pages
  - src/server - I used [TRPC](https://trpc.io/docs/getting-started) for TypeScript remote procedure calls with my Next.js serverless functions
    - I only used this for the OpenAI integration

### API Keys

- Without the .env.local file with the OpenAI API key, the chat and dog intro features will not work locally. This file is not included in the repo.
