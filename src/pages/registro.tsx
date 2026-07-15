import Layout from '@/components/Layout/Layout.component';
import UserRegister from '@/components/User/UserRegister.component';

import type { NextPage } from 'next';

const RegisterPage: NextPage = () => {
  return (
    <Layout title="Crear cuenta">
      <div className="container mx-auto px-4 py-8">
        <UserRegister />
      </div>
    </Layout>
  );
};

export default RegisterPage;
