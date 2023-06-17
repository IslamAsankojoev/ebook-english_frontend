import { Avatar, Stack } from '@mui/material';
import React from 'react';

const Whatsapp = () => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
      <Avatar
        src="/wh.png"
        sx={{
          width: 70,
          height: 70,
        }}
      />
      <h2>+996 (700)-62-00-68</h2>
    </Stack>
  );
};

export default Whatsapp;
