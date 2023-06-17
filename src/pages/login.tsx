import { AuthService, ILogin } from '@/api/auth.service';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { NextPageAuth } from '@/types/auth.types';
import { LoadingButton } from '@mui/lab';
import { Card, Link, Stack, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const Login: NextPageAuth = () => {
  useAuthRedirect();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: ILogin) => {
    signIn('credentials', data);
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100vh',
      }}
    >
      <Card
        sx={{
          padding: '20px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5">Войти</Typography>
        <br />
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            width: '340px',
          }}
        >
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Логин" variant="filled" fullWidth />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Пароль" variant="filled" fullWidth />
            )}
          />

          <LoadingButton variant="contained" color="info" type="submit" fullWidth loading={false}>
            Войти
          </LoadingButton>
        </form>
        <br />
        <Link
          href="/register"
          style={{
            textDecoration: 'none',
          }}
        >
          <Typography color="secondary.main">Регистрация</Typography>
        </Link>
      </Card>
    </Stack>
  );
};

export default Login;

Login.is_not_auth = true;
