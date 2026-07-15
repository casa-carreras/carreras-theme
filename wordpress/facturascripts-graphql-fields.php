<?php
/**
 * Plugin Name: Casa Carreras - FacturaScripts GraphQL Fields
 * Description: Exposes the FacturaScripts invoice meta (written by the SyncFactuWoo
 *              plugin) on WooGraphQL's Order type, so the Next.js frontend can show
 *              a "Descargar factura" link in Mis Pedidos.
 *
 * Install: copy this file into wp-content/mu-plugins/ on the WordPress site
 *          (create that folder if it doesn't exist yet — mu-plugins load
 *          automatically, no activation needed).
 *
 * Requires: WPGraphQL + WPGraphQL WooCommerce (WooGraphQL) already active,
 *           and the SyncFactuWoo plugin writing these order meta keys:
 *             _facturascripts_invoice_code
 *             _facturascripts_invoice_id
 *             _facturascripts_invoice_token
 *
 * Define FACTURASCRIPTS_BASE_URL in wp-config.php with the same value as the
 * "URL de FacturaScripts" (fs_base_url) setting in SyncFactuWoo, e.g.:
 *   define( 'FACTURASCRIPTS_BASE_URL', 'https://facturas.casa-carreras.es' );
 */

add_action( 'graphql_register_types', function () {
	register_graphql_field( 'Order', 'facturaScriptsInvoiceCode', [
		'type'        => 'String',
		'description' => 'Número de factura generado en FacturaScripts para este pedido.',
		'resolve'     => function ( $order ) {
			$code = $order->get_meta( '_facturascripts_invoice_code' );
			return $code !== '' ? $code : null;
		},
	] );

	register_graphql_field( 'Order', 'facturaScriptsInvoiceUrl', [
		'type'        => 'String',
		'description' => 'URL pública y firmada para descargar el PDF de la factura.',
		'resolve'     => function ( $order ) {
			$id    = $order->get_meta( '_facturascripts_invoice_id' );
			$token = $order->get_meta( '_facturascripts_invoice_token' );

			if ( empty( $id ) || empty( $token ) || ! defined( 'FACTURASCRIPTS_BASE_URL' ) ) {
				return null;
			}

			$base = rtrim( FACTURASCRIPTS_BASE_URL, '/' );
			return "{$base}/index.php?page=WooInvoicePdf&code={$id}&token={$token}";
		},
	] );
} );
