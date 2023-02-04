import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { TRPCProvider } from './trpc'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <TRPCProvider>
            <App />
        </TRPCProvider>
    </React.StrictMode>
)
