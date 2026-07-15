# Configuración necesaria en WordPress

Este frontend Next.js ahora puede leer varias cosas directamente de WordPress
en vez de tenerlas escritas en el código. Esto es lo que hay que configurar
en el `wp-admin` del backend para que funcione.

## 1. Horario, contacto y banner de portada (opcional, recomendado)

Sin esto, el footer y el banner de portada siguen funcionando con los datos
de ejemplo que hay ahora mismo en el código (ver `useSiteSettings.ts`). Con
esto configurado, se editan desde `wp-admin` sin tocar código ni redesplegar.

1. Instala y activa los plugins **Advanced Custom Fields (ACF o ACF PRO)** y
   **WPGraphQL for ACF**.
2. Crea una **Options Page** (`Custom Fields > Options Page` si usas
   ACF PRO, o el equivalente vía código) con el slug `ajustes-sitio`.
3. Crea un grupo de campos llamado "Ajustes del sitio", asignado a esa
   Options Page, con estos campos exactos (el nombre del campo —"Field
   Name"— debe coincidir literalmente, son los que usa la query GraphQL):

   | Field Name        | Tipo          |
   | ------------------ | ------------- |
   | `direccion`        | Texto         |
   | `telefono`         | Texto         |
   | `email`            | Email         |
   | `horario`          | Texto         |
   | `whatsapp`         | Texto (solo dígitos, con prefijo de país, ej. `34954386554`) |
   | `facebookUrl`      | URL           |
   | `instagramUrl`     | URL           |
   | `xUrl`              | URL           |
   | `heroImagen`       | Imagen        |
   | `heroTitulo`       | Texto         |
   | `heroBotonTexto`   | Texto         |
   | `heroBotonUrl`     | Texto/URL     |

4. En el grupo de campos, activa **"Show in GraphQL"** y pon
   **"GraphQL Field Name"** = `ajustesSitio` (debe coincidir con la query en
   `src/utils/gql/GQL_QUERIES.ts`).
5. Rellena los valores y guarda. El frontend los recoge en la siguiente
   visita (consulta client-side, sin necesidad de rebuild).

Si dejas este paso sin hacer, no pasa nada: el footer y el hero siguen
mostrando los valores por defecto.

## 2. Páginas legales editables desde wp-admin

`Aviso Legal` y `Contacto` ya intentan leer una WordPress Page por su slug
(`page(id: $slug, idType: SLUG)`, WPGraphQL nativo, sin plugins extra). Para
que un editor pueda cambiar el texto desde `wp-admin`:

1. Crea una **Página** normal en WordPress con el slug `aviso-legal` y
   escribe el contenido real (NIF/CIF, Registro Mercantil, etc.).
2. El frontend usará automáticamente ese contenido en la próxima
   regeneración (ISR, `revalidate: 60`). Si la página no existe, se sigue
   mostrando el texto de respaldo que ya está en el código.

`Política de Cookies` se ha dejado fija en el código a propósito: su texto
describe las categorías reales que implementa el gestor de cookies
(Necesarias/Analíticas/Marketing), así que conviene editarla en el código
para que no se desincronice con lo que de verdad hace el sitio.

## 3. Enlace de descarga de factura (FacturaScripts / SyncFactuWoo)

`SyncFactuWoo` ya guarda en cada pedido de WooCommerce estos metadatos
privados cuando FacturaScripts genera la factura:

- `_facturascripts_invoice_code`
- `_facturascripts_invoice_id`
- `_facturascripts_invoice_token`

Y expone un endpoint público y firmado para descargar el PDF:
`https://tu-facturascripts.com/index.php?page=WooInvoicePdf&code={id}&token={token}`.

Para que "Mis Pedidos" en el frontend muestre un enlace de descarga:

1. Copia `wordpress/facturascripts-graphql-fields.php` a
   `wp-content/mu-plugins/` en el WordPress de Casa Carreras (créalo si no
   existe; los mu-plugins se cargan solos, sin activarlos).
2. Añade en `wp-config.php`:
   ```php
   define( 'FACTURASCRIPTS_BASE_URL', 'https://tu-facturascripts.com' );
   ```
   (debe ser la misma URL que `fs_base_url` en los ajustes de SyncFactuWoo).
3. Verifica que `$order->get_meta(...)` funciona con tu versión de
   WooGraphQL — si el modelo `Order` de tu versión expone los metadatos de
   otra forma, ajusta el resolver en ese archivo en consecuencia.

Hasta que hagas esto, "Mis Pedidos" sigue funcionando con normalidad; solo
no muestra el enlace de descarga (columna con "—").

## 4. Dominio de imágenes de WordPress

`next.config.ts` solo permite cargar imágenes (`next/image`) desde los
hosts listados en `images.remotePatterns`. Ahora mismo apunta al dominio de
la demo original (`swewoocommerce.dfweb.no`). **Añade el dominio real del
WordPress/WooCommerce de Casa Carreras** a esa lista antes de desplegar, o
las imágenes de producto y del banner de portada (si usas `heroImagen`)
no cargarán.
