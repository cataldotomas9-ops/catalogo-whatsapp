# Catálogo con pedido por WhatsApp

Catálogo de productos con carrito, hecho en React (Vite). El cliente elige productos y el pedido
armado (productos, cantidades, total y una nota) se envía al WhatsApp del negocio con un solo toque.

## Qué hace
- Lista de productos con búsqueda y filtro por categoría.
- Carrito con cantidades, total y nota opcional; se guarda en el navegador (no se pierde al recargar).
- Botón "Enviar pedido por WhatsApp" que abre el chat con el mensaje listo.
- Responsive: pensado para celular.

## Cómo adaptarlo a otro negocio
Solo se edita `src/config.js` (nombre, slogan, número de WhatsApp, moneda y productos).

## Comandos
```bash
npm install
npm run dev     # desarrollo
npm test        # prueba de la lógica del carrito
npm run build   # versión para publicar (carpeta dist)
```
