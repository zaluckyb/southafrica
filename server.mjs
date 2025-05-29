import next from 'next'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Setup __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') })

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  // Phusion Passenger will automatically route HTTP requests here.
  console.log(`✅ Next.js app is prepared. Passenger will handle requests.`)
})
