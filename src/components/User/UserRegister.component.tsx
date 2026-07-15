import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';

import { REGISTER_USER } from '@/utils/gql/GQL_MUTATIONS';
import { InputField } from '../Input/InputField.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import Button from '../UI/Button.component';

interface IRegisterData {
  username: string;
  email: string;
  password: string;
}

const getRegisterErrorMessage = (message?: string): string => {
  switch (message) {
    case 'existing_user_login':
      return 'Ese nombre de usuario ya está en uso.';
    case 'existing_user_email':
      return 'Ya existe una cuenta con ese email.';
    default:
      return 'No se pudo completar el registro. Inténtalo de nuevo.';
  }
};

/**
 * User registration form. Creates a WordPress/WooCommerce customer account
 * via the core registerUser mutation, then sends the visitor to log in.
 */
const UserRegister = () => {
  const methods = useForm<IRegisterData>();
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      push('/logg-inn');
    },
    onError: (mutationError) => {
      setError(getRegisterErrorMessage(mutationError.graphQLErrors?.[0]?.message));
    },
  });

  const onSubmit = (data: IRegisterData) => {
    setError(null);
    registerUser({ variables: data });
  };

  return (
    <section className="text-text-muted container p-4 py-2 mx-auto mb-32 md:mb-0">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mx-auto lg:w-1/2 flex flex-wrap">
            <InputField
              inputName="username"
              inputLabel="Usuario"
              type="text"
              customValidation={{ required: true }}
            />
            <InputField
              inputName="email"
              inputLabel="Email"
              type="email"
              customValidation={{ required: true }}
            />
            <InputField
              inputName="password"
              inputLabel="Contraseña"
              type="password"
              customValidation={{ required: true }}
            />

            {error && (
              <div
                className="w-full p-2 text-error text-sm text-center"
                role="alert"
              >
                {error}
              </div>
            )}

            <div className="w-full p-2">
              <div className="mt-4 flex justify-center">
                <Button variant="primary" buttonDisabled={loading}>
                  {loading ? <LoadingSpinner /> : 'Crear cuenta'}
                </Button>
              </div>
            </div>

            <div className="w-full p-2 text-center text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link href="/logg-inn" className="text-primary hover:underline">
                Inicia sesión
              </Link>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default UserRegister;
