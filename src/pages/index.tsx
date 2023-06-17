import { NextPageAuth } from '@/types/auth.types';
import Layout from '@/components/Layout';

const Home: NextPageAuth = () => {
  return <Layout title="Главная">Home</Layout>;
};

export default Home;

Home.is_auth = true;
