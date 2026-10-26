// Lógica pura del carrito (sin React) para poder probarla.
export function agregar(carrito, id) {
  return { ...carrito, [id]: (carrito[id] || 0) + 1 }
}

export function quitar(carrito, id) {
  const cantidad = (carrito[id] || 0) - 1
  const { [id]: _, ...resto } = carrito
  return cantidad > 0 ? { ...resto, [id]: cantidad } : resto
}

export function total(carrito, productos) {
  return productos.reduce((suma, p) => suma + p.precio * (carrito[p.id] || 0), 0)
}

export function cantidadTotal(carrito) {
  return Object.values(carrito).reduce((suma, n) => suma + n, 0)
}

export function mensaje(carrito, productos, { nombre, moneda }, nota = '') {
  const lineas = productos
    .filter((p) => carrito[p.id])
    .map((p) => `• ${carrito[p.id]} x ${p.nombre} = ${moneda}${p.precio * carrito[p.id]}`)
  const texto = [
    `Hola ${nombre}, quiero hacer este pedido:`,
    ...lineas,
    `Total: ${moneda}${total(carrito, productos)}`,
    nota && `Nota: ${nota}`,
  ].filter(Boolean)
  return texto.join('\n')
}

export function linkWhatsapp(numero, texto) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
}
