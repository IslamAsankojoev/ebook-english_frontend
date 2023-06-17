import { AuthService, IRegister } from '@/api/auth.service';
import { NextPageAuth } from '@/types/auth.types';
import { LoadingButton } from '@mui/lab';
import { Card, Stack, Switch, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const Register: NextPageAuth = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    'register',
    (data: IRegister) => AuthService.register(data),
    {
      onSuccess: () => {
        toast.success('Вы успешно зарегистрировались!');
        router.push('/login');
      },
    },
  );

  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      is_teacher: false,
    },
  });

  const onSubmit = (data: IRegister) => {
    mutate(data);
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
        <Typography variant="h5">Регистрация</Typography>
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
            maxWidth: '90%',
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
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="email" variant="filled" fullWidth />
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

          <Controller
            name="is_teacher"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Stack direction="row" alignItems="center" justifyContent="flex-start" width="100%">
                <Switch id={field.name} {...field} />
                <label htmlFor={field.name}>
                  <Typography>Преподаватель</Typography>
                </label>
              </Stack>
            )}
          />

          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="info"
            type="submit"
            fullWidth
          >
            Регистрация
          </LoadingButton>
        </form>
        <br />
        <Link
          href="/login"
          style={{
            textDecoration: 'none',
          }}
        >
          <Typography color="secondary.main">Войти</Typography>
        </Link>
      </Card>
    </Stack>
  );
};

export default Register;

Register.is_not_auth = true;
