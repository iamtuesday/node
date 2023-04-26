npn init -y
pnpm i typescript
npx tsc --init
pnpm i ts-node-dev

"scripts": {
"dev": "ts-node-dev --respawn --transpile-only ./src/index.ts"
},

pnpm i express
pnpm i @types/node @types/express -D

\*JEST
pnpm i supertest jest ts-jest @types/jest @types/supertest -d

pnpm ts-jest config:init