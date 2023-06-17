import Layout from '@/components/Layout';
import Email from '@/components/icons/Email';
import Instagram from '@/components/icons/Instagram';
import Phone from '@/components/icons/Phone';
import Whatsapp from '@/components/icons/Whatsapp';
import { Stack } from '@mui/material';
import React from 'react';

const Contacts = () => {
  return (
    <Layout title="Контакты">
      <h1>Contacts</h1>
      <Stack direction="column" spacing={5}>
        <Phone />
        <Whatsapp />
        <Email />
        <Instagram />
      </Stack>
    </Layout>
  );
};

export default Contacts;
