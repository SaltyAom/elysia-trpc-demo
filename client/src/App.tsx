import { useState } from 'react'
import './App.css'

import { useQuery } from '@tanstack/react-query'
import { api as eden } from './eden'
import { trpc } from './trpc'

function App() {
    const hello = {
        trpc: trpc.mirror.useQuery('Hello from tRPC'),
        eden: useQuery(['eden'], {
            queryFn: () =>
                eden.mirror.post({
                    message: 'Hello from Eden'
                })
        })
    }

    return (
        <div className="App">
            <h2>tRPC: {hello.trpc.data}</h2>
            <h2>Eden: {hello.eden.data}</h2>
        </div>
    )
}

export default App
