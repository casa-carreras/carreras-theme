import { gql } from '@apollo/client';

// Native product search via WooGraphQL (WordPress's built-in search), used
// instead of Algolia so no third-party search service is required.
export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($search: String!) {
    products(first: 10, where: { search: $search }) {
      nodes {
        databaseId
        name
        slug
        shortDescription
        image {
          sourceUrl
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          onSale
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          onSale
        }
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query Product($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      averageRating
      slug
      description
      onSale
      image {
        id
        uri
        title
        srcSet
        sourceUrl
      }
      name
      ... on SimpleProduct {
        salePrice
        regularPrice
        price
        id
        stockQuantity
      }
      ... on VariableProduct {
        salePrice
        regularPrice
        price
        id
        allPaColors {
          nodes {
            name
          }
        }
        allPaSizes {
          nodes {
            name
          }
        }
        variations {
          nodes {
            id
            databaseId
            name
            stockStatus
            stockQuantity
            purchasable
            onSale
            salePrice
            regularPrice
          }
        }
      }
      ... on ExternalProduct {
        price
        id
        externalUrl
      }
      ... on GroupProduct {
        products {
          nodes {
            ... on SimpleProduct {
              id
              price
            }
          }
        }
        id
      }
    }
  }
`;

/**
 * Fetch first 200 Woocommerce products from GraphQL
 */
export const FETCH_ALL_PRODUCTS_QUERY = gql`
  query MyQuery {
    products(first: 50) {
      nodes {
        databaseId
        name
        onSale
        slug
        image {
          sourceUrl
        }
        ... on SimpleProduct {
          databaseId
          price
          regularPrice
          salePrice
          productCategories {
            nodes {
              name
              slug
            }
          }
        }
        ... on VariableProduct {
          databaseId
          price
          regularPrice
          salePrice
          productCategories {
            nodes {
              name
              slug
            }
          }
          allPaColors {
            nodes {
              name
              slug
            }
          }
          allPaSizes {
            nodes {
              name
            }
          }
          variations {
            nodes {
              price
              regularPrice
              salePrice
              attributes {
                nodes {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch first 20 categories from GraphQL
 */
export const FETCH_ALL_CATEGORIES_QUERY = gql`
  query Categories {
    productCategories(first: 20) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_PRODUCTS_FROM_CATEGORY = gql`
  query ProductsFromCategory($id: ID!) {
    productCategory(id: $id) {
      id
      name
      products(first: 50) {
        nodes {
          id
          databaseId
          onSale
          averageRating
          slug
          description
          image {
            id
            uri
            title
            srcSet
            sourceUrl
          }
          name
          ... on SimpleProduct {
            salePrice
            regularPrice
            onSale
            price
            id
          }
          ... on VariableProduct {
            salePrice
            regularPrice
            onSale
            price
            id
          }
          ... on ExternalProduct {
            price
            id
            externalUrl
          }
          ... on GroupProduct {
            products {
              nodes {
                ... on SimpleProduct {
                  id
                  price
                }
              }
            }
            id
          }
        }
      }
    }
  }
`;

export const GET_CART = gql`
  query GET_CART {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              id
              databaseId
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              galleryImages {
                nodes {
                  id
                  sourceUrl
                  srcSet
                  altText
                  title
                }
              }
            }
          }
          variation {
            node {
              id
              databaseId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              attributes {
                nodes {
                  id
                  name
                  value
                }
              }
            }
          }
          quantity
          total
          subtotal
          subtotalTax
        }
      }

      subtotal
      subtotalTax
      shippingTax
      shippingTotal
      total
      totalTax
      feeTax
      feeTotal
      discountTax
      discountTotal
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    customer {
      id
      firstName
      lastName
      email
    }
  }
`;

export const GET_CUSTOMER_ORDERS = gql`
  query GET_CUSTOMER_ORDERS {
    customer {
      orders {
        nodes {
          id
          orderNumber
          status
          total
          date
        }
      }
    }
  }
`;

// facturaScriptsInvoiceCode/facturaScriptsInvoiceUrl are custom fields, not
// part of core WooGraphQL — see wordpress/facturascripts-graphql-fields.php
// for the mu-plugin snippet that registers them on the Order type.
// Kept as a separate query (queried with errorPolicy: 'ignore') so that if
// the WordPress side hasn't added these fields yet, the order list above
// still renders instead of failing the whole page.
export const GET_CUSTOMER_ORDER_INVOICES_QUERY = gql`
  query GetCustomerOrderInvoices {
    customer {
      orders {
        nodes {
          id
          facturaScriptsInvoiceCode
          facturaScriptsInvoiceUrl
        }
      }
    }
  }
`;

// Fetches a WordPress Page's editable content by its slug (core WPGraphQL,
// no extra plugin needed). Used so legal/contact pages can be edited from
// wp-admin instead of being hardcoded in the frontend.
export const FETCH_PAGE_BY_SLUG_QUERY = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: SLUG) {
      title
      content
    }
  }
`;

// Requires the ACF field group "Ajustes del sitio" (Options Page) with
// "Show in GraphQL" enabled via the "WPGraphQL for ACF" plugin, exposed
// under the field name "ajustesSitio". See wordpress/README.md for the
// exact field setup.
export const GET_SITE_SETTINGS_QUERY = gql`
  query GetSiteSettings {
    ajustesSitio {
      direccion
      telefono
      email
      horario
      whatsapp
      facebookUrl
      instagramUrl
      xUrl
      heroImagen {
        sourceUrl
      }
      heroTitulo
      heroBotonTexto
      heroBotonUrl
    }
  }
`;
