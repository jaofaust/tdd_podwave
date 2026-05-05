import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getHealth } from './modules/health/health.service.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

function serveStatic(res, filePath) {
  const ext = path.extname(filePath)
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Arquivo não encontrado')
      return
    }
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  })
}

export function router(req, res) {
  const { method, url } = req
  const parsedUrl = new URL(url, `http://localhost`)
  const pathname = parsedUrl.pathname

  if (method === 'GET' && pathname === '/') {
    const indexPath = path.join(__dirname, 'views', 'index.html')
    serveStatic(res, indexPath)
    return
  }

  if (method === 'GET' && pathname === '/api/health') {
    const result = getHealth()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
    return
  }

  if (pathname.startsWith('/public/')) {
    const filePath = path.join(__dirname, pathname)
    serveStatic(res, filePath)
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('Página não encontrada')
}
