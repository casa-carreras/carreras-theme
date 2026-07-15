import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LOGIN_USER } from './gql/GQL_MUTATIONS';

type LoginError = {
  graphQLErrors?: Array<{ message?: string }>;
  networkError?: unknown;
  message?: string;
};

function getErrorMessage(error: unknown): string {
  if (typeof error !== 'object' || error === null) {
    return 'Ha ocurrido un error desconocido. Inténtalo de nuevo más tarde.';
  }

  const loginError = error as LoginError;

  // Check for GraphQL errors
  if (loginError.graphQLErrors && loginError.graphQLErrors.length > 0) {
    const graphQLError = loginError.graphQLErrors[0];
    const message = graphQLError.message;

    // Map GraphQL error messages to user-friendly messages
    switch (message) {
      case 'invalid_username':
        return 'Usuario o email no válido. Compruébalo e inténtalo de nuevo.';
      case 'incorrect_password':
        return 'Contraseña incorrecta. Compruébala e inténtalo de nuevo.';
      case 'invalid_email':
        return 'Email no válido. Escribe una dirección de email correcta.';
      case 'empty_username':
        return 'Escribe tu usuario o email.';
      case 'empty_password':
        return 'Escribe tu contraseña.';
      case 'too_many_retries':
        return 'Demasiados intentos fallidos. Espera un poco antes de volver a intentarlo.';
      default:
        return 'No se pudo iniciar sesión. Comprueba tus datos e inténtalo de nuevo.';
    }
  }

  // Check for network errors
  if (loginError.networkError) {
    return 'Error de red. Comprueba tu conexión a internet e inténtalo de nuevo.';
  }

  // Fallback for other errors
  if (loginError.message) {
    return 'Ha ocurrido un error al iniciar sesión. Inténtalo de nuevo.';
  }

  return 'Ha ocurrido un error desconocido. Inténtalo de nuevo más tarde.';
}

export async function login(username: string, password: string) {
  try {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      cache: new InMemoryCache(),
      credentials: 'include', // Include cookies in requests
    });

    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });

    const loginResult = data.loginWithCookies;

    if (loginResult.status !== 'SUCCESS') {
      throw new Error(
        'No se pudo iniciar sesión. Comprueba tus datos e inténtalo de nuevo.',
      );
    }

    // On successful login, cookies are automatically set by the server
    return { success: true, status: loginResult.status };
  } catch (error: unknown) {
    const userFriendlyMessage = getErrorMessage(error);
    throw new Error(userFriendlyMessage);
  }
}

/*
export async function logout() {
  // For cookie-based auth, we might need a logout mutation
  // For now, we can clear any client-side state
  if (typeof window !== 'undefined') {
    // Redirect to login or home page after logout
    window.location.href = '/';
  }
}
*/
