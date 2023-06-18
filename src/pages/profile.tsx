import { IUser, UserService } from '@/api/user.service';
import Layout from '@/components/Layout';
import useTypedSession from '@/hooks/useTypedSession';
import { NextPageAuth } from '@/types/auth.types';
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQuery } from 'react-query';

const Profile: NextPageAuth = () => {
  const { data: session } = useTypedSession();
  const router = useRouter();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery('user', () => UserService.findOne(session?.user?.id), {
    enabled: !!session?.user?.id,
    select: (data: IUser) => data,
  });

  const { mutate: updateProfile, isLoading: updateLoading } = useMutation(
    'updateProfile',
    (data: IUser) => UserService.update(session?.user?.id, data),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const onSubmit = (e: any) => {
    const File = e.target.files[0];
    const formData = new FormData();
    formData.append('profile_photo', File);
    updateProfile(formData as any);
  };

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="center" alignItems="center" p={4} spacing={4}>
            <Box>
              <Avatar src={user?.profile_photo} sx={{ width: 100, height: 100 }} />
              <br />
              <Button variant="contained" component="label" size="small">
                Upload File
                <input type="file" hidden onChange={(e) => onSubmit(e)} />
              </Button>
            </Box>
            <Box>
              <Typography variant="h4">Ваш логин: {user?.username}</Typography>
              <Typography variant="h6">Email: {user?.email}</Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="flex-start" alignItems="center" display="flex">
          <Stack direction="column" p={4}>
            <Typography variant="h5">Статистика: {user?.statistic}</Typography>
            <Typography variant="h5">Балы: {user?.points}</Typography>
          </Stack>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} justifyContent="center" display="flex">
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              router.push('/level');
            }}
            sx={{
              width: '100%',
              height: '70px',
            }}
          >
            Выбор уровня
          </Button>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center" display="flex">
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              router.push('/dictionary');
            }}
            sx={{
              width: '100%',
              height: '70px',
            }}
          >
            Словарь
          </Button>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center" display="flex">
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              router.push('/note');
            }}
            sx={{
              width: '100%',
              height: '70px',
            }}
          >
            Заметки
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Profile;

Profile.is_auth = true;
