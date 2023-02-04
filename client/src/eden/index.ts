import { eden } from '@elysiajs/eden'
import type { App } from '../../../server/src'

export const api = eden<App>('http://localhost:3000')
