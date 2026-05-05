import { describe, it, expect } from 'vitest'
import { getHealth } from '../health.service.js'

describe('getHealth', () => {
  it('retorna status OK', () => {
    const result = getHealth()
    expect(result.status).toBe('OK')
  })

  it('retorna mensagem contendo "saudavel"', () => {
    const result = getHealth()
    expect(result.message).toContain('saudavel')
  })

  it('tem propriedade timestamp', () => {
    const result = getHealth()
    expect(result).toHaveProperty('timestamp')
  })

  it('tem propriedade version', () => {
    const result = getHealth()
    expect(result).toHaveProperty('version')
  })
})
