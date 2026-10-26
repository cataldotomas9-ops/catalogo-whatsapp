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

const plata = (n) => `${negocio.moneda}${n.toLocaleString('es-AR')}`

export default function App() {
  const [carrito, setCarrito] = useState(leerCarrito)
  const [nota, setNota] = useState('')
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(carrito))
    } catch {
      /* sin almacenamiento: el carrito vive solo en memoria */
    }
  }, [carrito])

  const categorias = useMemo(() => [...new Set(productos.map((p) => p.categoria))], [])
  const items = cantidadTotal(carrito)
  const importe = total(carrito, productos)
  const enlace = linkWhatsapp(negocio.whatsapp, mensaje(carrito, productos, negocio, nota))

  return (
    <>
      <header className="barra">
        <a className="marca" href="#arriba">
          {negocio.nombre}
        </a>
        <button className="pedido" onClick={() => setAbierto(true)}>
          Mi pedido{items > 0 && <span className="cuenta">{items}</span>}
        </button>
      </header>

      <main id="arriba" className="pagina">
        <section className="presentacion">
          <p className="tipo">{negocio.tipo}</p>
          <h1>Pan y facturas del día</h1>
          <p>{negocio.historia}</p>
          <p className="horarios">
            {negocio.direccion} · {negocio.horarios}
          </p>
        </section>

        <nav className="indice" aria-label="Categorías">
          {categorias.map((c) => (
            <a key={c} href={`#${c}`}>
              {c}
            </a>
          ))}
        </nav>

        {categorias.map((c) => (
          <section key={c} id={c} className="seccion">
            <h2>{c}</h2>
            <ul className="menu">
              {productos
                .filter((p) => p.categoria === c)
                .map((p) => (
                  <li key={p.id}>
                    <div className="texto">
                      <span className="nombre">{p.nombre}</span>
                      <span className="detalle">{p.detalle}</span>
                    </div>
                    <span className="precio">{plata(p.precio)}</span>
                    {carrito[p.id] ? (
                      <span className="cantidad">
                        <button onClick={() => setCarrito((x) => quitar(x, p.id))} aria-label={`Quitar ${p.nombre}`}>
                          −
                        </button>
                        <b>{carrito[p.id]}</b>
                        <button onClick={() => setCarrito((x) => agregar(x, p.id))} aria-label={`Agregar ${p.nombre}`}>
                          +
                        </button>
                      </span>
                    ) : (
                      <button className="agregar" onClick={() => setCarrito((x) => agregar(x, p.id))}>
                        Agregar
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <footer className="pie">
          <p>
            {negocio.nombre} · {negocio.direccion}
          </p>
          <p>Sitio de ejemplo hecho por Tomás Cataldo.</p>
        </footer>
      </main>

      {items > 0 && !abierto && (
        <button className="barra-pedido" onClick={() => setAbierto(true)}>
          Ver mi pedido · {items} {items === 1 ? 'producto' : 'productos'} · {plata(importe)}
        </button>
      )}

      {abierto && <div className="fondo" onClick={() => setAbierto(false)} />}
      <aside className={`panel ${abierto ? 'abierto' : ''}`} aria-hidden={!abierto}>
        <div className="panel-cabecera">
          <h2>Mi pedido</h2>
          <button onClick={() => setAbierto(false)}>Cerrar</button>
        </div>

        {items === 0 ? (
          <p className="vacio">Todavía no elegiste nada.</p>
        ) : (
          <>
            <ul className="lista">
              {productos
                .filter((p) => carrito[p.id])
                .map((p) => (
                  <li key={p.id}>
                    <span>
                      {carrito[p.id]} × {p.nombre}
                    </span>
                    <strong>{plata(p.precio * carrito[p.id])}</strong>
                  </li>
                ))}
            </ul>
            <label className="campo">
              ¿Algo que quieras aclarar?
              <textarea
                placeholder="Ej.: la torta para las 18"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
              />
            </label>
            <p className="total">
              <span>Total</span>
              <strong>{plata(importe)}</strong>
            </p>
            <a className="enviar" href={enlace} target="_blank" rel="noreferrer">
              Mandar el pedido por WhatsApp
            </a>
            <button className="vaciar" onClick={() => setCarrito({})}>
              Empezar de nuevo
            </button>
          </>
        )}
      </aside>
    </>
  )
}
