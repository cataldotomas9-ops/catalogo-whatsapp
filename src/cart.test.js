import test from 'node:test'
import assert from 'node:assert/strict'
import { agregar, quitar, total, cantidadTotal, mensaje, linkWhatsapp } from './cart.js'

const productos = [
  { id: 1, nombre: 'Pan', precio: 100 },
  { id: 2, nombre: 'Torta', precio: 500 },
]
const negocio = { nombre: 'La Espiga', moneda: '$' }

test('agregar y quitar actualizan cantidades y total', () => {
  let c = {}
  c = agregar(c, 1)
  c = agregar(c, 1)
  c = agregar(c, 2)
  assert.equal(cantidadTotal(c), 3)
  assert.equal(total(c, productos), 700)
  c = quitar(c, 1)
  c = quitar(c, 2)
  assert.deepEqual(c, { 1: 1 })
  assert.deepEqual(quitar(c, 1), {})
})

test('el mensaje lista los productos, el total y la nota', () => {
  const m = mensaje({ 1: 2, 2: 1 }, productos, negocio, 'sin sal')
  assert.match(m, /2 x Pan = \$200/)
  assert.match(m, /Total: \$700/)
  assert.match(m, /Nota: sin sal/)
})

test('el link de WhatsApp codifica el texto', () => {
  assert.equal(linkWhatsapp('549', 'a b\nc'), 'https://wa.me/549?text=a%20b%0Ac')
})
