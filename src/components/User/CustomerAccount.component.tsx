import { useQuery } from '@apollo/client';
import {
  GET_CUSTOMER_ORDERS,
  GET_CUSTOMER_ORDER_INVOICES_QUERY,
} from '../../utils/gql/GQL_QUERIES';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

interface Order {
  id: string;
  orderNumber: number;
  status: string;
  total: string;
  date: string;
}

interface OrderInvoice {
  id: string;
  facturaScriptsInvoiceCode: string | null;
  facturaScriptsInvoiceUrl: string | null;
}

/**
 * Customer account component that displays user's orders
 * @function CustomerAccount
 * @returns {JSX.Element} - Rendered component with order history
 */
const CustomerAccount = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_ORDERS);
  // Separate, best-effort query: if the WordPress side hasn't registered the
  // FacturaScripts invoice fields yet, this just errors quietly and the
  // order list above still renders without an invoice column.
  const { data: invoiceData } = useQuery(GET_CUSTOMER_ORDER_INVOICES_QUERY, {
    errorPolicy: 'ignore',
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  const orders = data?.customer?.orders?.nodes;
  const invoicesById = new Map<string, OrderInvoice>(
    (invoiceData?.customer?.orders?.nodes ?? []).map(
      (invoice: OrderInvoice) => [invoice.id, invoice],
    ),
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-text">Mine ordre</h1>
      {orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-surface">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Ordrenummer</th>
                <th className="py-2 px-4 border-b">Dato</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Factura</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => {
                const invoice = invoicesById.get(order.id);
                return (
                  <tr key={order.id}>
                    <td className="py-2 px-4 border-b">{order.orderNumber}</td>
                    <td
                      className="py-2 px-4 border-b"
                      suppressHydrationWarning
                    >
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{order.status}</td>
                    <td className="py-2 px-4 border-b">{order.total}</td>
                    <td className="py-2 px-4 border-b">
                      {invoice?.facturaScriptsInvoiceUrl ? (
                        <a
                          href={invoice.facturaScriptsInvoiceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          Descargar {invoice.facturaScriptsInvoiceCode}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Du har ingen ordre.</p>
      )}
    </div>
  );
};

export default CustomerAccount;
