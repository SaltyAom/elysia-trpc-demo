import { Elysia, t } from 'elysia'
import { websocket } from '@elysiajs/websocket'
import { cors } from '@elysiajs/cors'
import '@elysiajs/trpc'

import { router, createContext } from './trpc'

const app = new Elysia()
    .use(websocket())
    .use(cors())
    .get('/', () => 'Hello Elysia')
    .post('/mirror', ({ body: { message } }) => message, {
        schema: {
            body: t.Object({
                message: t.String()
            })
        }
    })
    .trpc(router, {
        createContext
    })
    .listen(3000)

export type App = typeof app

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
