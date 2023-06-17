import { ILevel, LevelService } from '@/api/level.service';
import Layout from '@/components/Layout';
import { Button, IconButton, Link, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Level = () => {
  const router = useRouter();
  const { data: levels, refetch } = useQuery('levels', LevelService.findAll, {
    select: (data: ILevel[]) => data,
  });

  const { mutate } = useMutation('createLevel', (data: ILevel) => LevelService.create(data), {
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deleteLevel } = useMutation(
    'deleteLevel',
    (id: number) => LevelService.delete(id),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: ILevel) => {
    mutate({
      ...data,
    });
  };

  return (
    <Layout>
      <Stack
        sx={{
          m: '0 auto',
          width: 'fit-content',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="center" display="flex">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Уровень" variant="filled" fullWidth />
              )}
            />
            <Button type="submit" variant="contained" fullWidth>
              Добавить уровень
            </Button>
          </form>
        </Stack>
        <br />
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          display="flex"
          spacing={1}
        >
          {levels?.map((level: ILevel) => (
            <Stack
              key={level.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              display="flex"
              sx={{
                width: '100%',
                gap: '10px',
                p: '10px',
              }}
            >
              <Link
                onClick={() => {
                  // @ts-ignore
                  localStorage.setItem('level', level?.id.toString());
                  router.push(`/level/${level.id}`);
                }}
                style={{
                  color: 'black',
                  padding: '10px 20px',
                  borderRadius: '50px',
                  backgroundColor: '#e0e0e0',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  textDecoration: 'none',
                }}
              >
                <Typography variant="h6">{level.name}</Typography>
                <IconButton
                  onClick={() => {
                    // @ts-ignore
                    deleteLevel(level.id);
                  }}
                  color="error"
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Link>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Level;
