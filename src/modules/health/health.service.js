export function getHealth() {
  return {
    status: 'OK',
    message: 'Servidor saudavel e funcionando',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  }
}
