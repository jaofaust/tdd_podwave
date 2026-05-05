import { vi } from 'vitest'

global.mockReq = (overrides = {}) => ({
  method: 'GET',
  url: '/',
  headers: {},
  ...overrides,
})

global.mockRes = () => {
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    writeHead: vi.fn(function (code, headers = {}) {
      res.statusCode = code
      Object.assign(res.headers, headers)
    }),
    setHeader: vi.fn(function (key, value) {
      res.headers[key] = value
    }),
    end: vi.fn(function (data = '') {
      res.body = data
    }),
  }
  return res
}
