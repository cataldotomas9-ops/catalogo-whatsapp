// Lo único que se cambia para cada negocio.
export const negocio = {
  nombre: 'La Espiga',
  tipo: 'Panadería y confitería',
  whatsapp: '5491112345678', // código de país + número, sin + ni espacios
  moneda: '$',
  direccion: 'Alem 1250',
  horarios: 'Lunes a sábado de 7 a 20 · Domingos de 8 a 13',
  historia:
    'Horneamos todos los días desde temprano. Elegí lo que quieras, mandanos el pedido por WhatsApp y pasás a retirarlo sin esperar.',
}

export const productos = [
  { id: 1, nombre: 'Pan francés (kg)', precio: 2500, categoria: 'Panes', detalle: 'Corteza crocante y miga aireada. Salen dos tandas por día.' },
  { id: 2, nombre: 'Pan de campo', precio: 3200, categoria: 'Panes', detalle: 'Masa madre, horneado en piedra.' },
  { id: 3, nombre: 'Medialunas (docena)', precio: 4800, categoria: 'Facturas', detalle: 'De manteca, las de siempre.' },
  { id: 4, nombre: 'Churros (6 u.)', precio: 3000, categoria: 'Facturas', detalle: 'Rellenos de dulce de leche, calentitos.' },
  { id: 5, nombre: 'Torta de chocolate', precio: 12000, categoria: 'Tortas', detalle: 'Con ganache y dulce de leche. Avisar con un día de anticipación.' },
  { id: 6, nombre: 'Lemon pie', precio: 9500, categoria: 'Tortas', detalle: 'Con merengue italiano.' },
  { id: 7, nombre: 'Café con leche', precio: 1800, categoria: 'Para tomar', detalle: 'Para tomar en el local.' },
  { id: 8, nombre: 'Jugo de naranja', precio: 2200, categoria: 'Para tomar', detalle: 'Exprimido en el momento.' },
]
