import { useEffect, useMemo, useState } from 'react'
import { negocio, productos } from './config.js'
import { agregar, quitar, total, cantidadTotal, mensaje, linkWhatsapp } from './cart.js'

const CLAVE = 'catalogo-carrito'

function leerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || {}
  } catch {
    return {}
  }
}

export default function App() {
  const [carrito, setCarrito] = useState(leerCarrito)
  const [categoria, setCategoria] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [nota, setNota] = useState('')
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(carrito))
    } catch {
      /* sin almacenamiento: el carrito vive solo en memoria */
    }
  }, [carrito])

  const categorias = useMemo(() => ['Todas', ...new Set(productos.map((p) => p.categoria))], [])
  const visibles = productos.filter(
    (p) =>
      (categoria === 'Todas' || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()),
  )
  const items = cantidadTotal(carrito)
  const importe = total(carrito, productos)
  const enlace = linkWhatsapp(negocio.whatsapp, mensaje(carrito, productos, negocio, nota))

  return (
    <>
      <header className="cabecera">
        <div>
          <h1>{negocio.nombre}</h1>
          <p>{negocio.slogan}</p>
        </div>
        <button className="boton-carrito" onClick={() => setAbierto(true)} aria-label="Abrir carrito">
          🛒 <span>{items}</span>
        </button>
      </header>

      <main className="contenedor">
        <input
          className="buscador"
          type="search"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <nav className="filtros">
          {categorias.map((c) => (
            <button key={c} className={c === categoria ? 'activo' : ''} onClick={() => setCategoria(c)}>
              {c}
            </button>
          ))}
        </nav>

        <section className="grilla">
          {visibles.map((p) => (
            <article key={p.id} className="tarjeta">
              <div className="emoji">{p.emoji}</div>
              <h2>{p.nombre}</h2>
              <p className="precio">
                {negocio.moneda}
                {p.precio}
              </p>
              <button onClick={() => setCarrito((c) => agregar(c, p.id))}>Agregar</button>
            </article>
          ))}
          {visibles.length === 0 && <p className="vacio">No hay productos que coincidan.</p>}
        </section>
      </main>

      {abierto && <div className="fondo" onClick={() => setAbierto(false)} />}
      <aside className={`panel ${abierto ? 'abierto' : ''}`}>
        <div className="panel-cabecera">
          <h2>Tu pedido</h2>
          <button onClick={() => setAbierto(false)} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        {items === 0 ? (
          <p className="vacio">Todavía no agregaste nada.</p>
        ) : (
          <>
            <ul className="lista">
              {productos
                .filter((p) => carrito[p.id])
                .map((p) => (
                  <li key={p.id}>
                    <span>
                      {p.emoji} {p.nombre}
                    </span>
                    <span className="cantidad">
                      <button onClick={() => setCarrito((c) => quitar(c, p.id))}>−</button>
                      {carrito[p.id]}
                      <button onClick={() => setCarrito((c) => agregar(c, p.id))}>+</button>
                    </span>
                    <strong>
                      {negocio.moneda}
                      {p.precio * carrito[p.id]}
                    </strong>
                  </li>
                ))}
            </ul>
            <textarea
              placeholder="Nota para el negocio (opcional)"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
            <p className="total">
              Total: {negocio.moneda}
              {importe}
            </p>
            <a className="enviar" href={enlace} target="_blank" rel="noreferrer">
              Enviar pedido por WhatsApp
            </a>
            <button className="vaciar" onClick={() => setCarrito({})}>
              Vaciar carrito
            </button>
          </>
        )}
      </aside>
    </>
  )
}
