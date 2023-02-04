import { initTRPC } from '@trpc/server'
import { observable } from '@trpc/server/observable' 
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

import { EventEmitter } from 'stream' 

import { z } from 'zod'

export const createContext = async (opts: FetchCreateContextFnOptions) => {
    return {
        name: 'elysia'
    }
}

const p = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create()
const ee = new EventEmitter() 

export const router = p.router({
    mirror: p.procedure.input(z.string()).query(({ input }) => {
        ee.emit('listen', input) 

        return input
    }),
    listen: p.procedure.subscription(() => 
        observable<string>((emit) => { 
            ee.on('listen', (input) => { 
                emit.next(input) 
            }) 
        }) 
    ) 
})

export type Router = typeof router