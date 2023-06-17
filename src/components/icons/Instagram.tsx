import { Avatar, Stack } from '@mui/material';
import React from 'react';

const Instagram = () => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
      <Avatar
        src="/insta.png"
        sx={{
          width: 70,
          height: 70,
        }}
      />
      <h2>https://instagram.com/bk87051?igshid=NTc4MTIwNjQ2YQ==</h2>
    </Stack>
  );
};

export default Instagram;
