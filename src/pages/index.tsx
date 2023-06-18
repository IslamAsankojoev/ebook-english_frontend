import { NextPageAuth } from '@/types/auth.types';
import Layout from '@/components/Layout';
import { Stack, Typography } from '@mui/material';

const Home: NextPageAuth = () => {
  return (
    <Layout title="Главная">
      <Stack
        sx={{
          padding: '20px',
        }}
        justifyContent="center"
        alignItems="center"
      >
        <img src="/logoMain.png" alt="" width={300} />
        <br />
        <Typography variant="h4">Электронная книга по курсу “Английский язык”.</Typography>
        <Typography variant="h6">
          Знание английского языка открывает множествa возможностей в жизни.
        </Typography>
        <br />
      </Stack>
    </Layout>
  );
};

export default Home;

Home.is_auth = true;
