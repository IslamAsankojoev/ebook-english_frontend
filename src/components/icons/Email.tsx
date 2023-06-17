import { Avatar, Stack } from '@mui/material';
import React from 'react';

const Email = () => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
      <Avatar
        variant="square"
        src="/email.png"
        sx={{
          width: 70,
          height: 70,
        }}
      />
      <h2>botalykyzykenje@gmail.com</h2>
    </Stack>
  );
};

export default Email;
