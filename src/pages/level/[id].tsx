import { ILevel, LevelService } from '@/api/level.service';
import { ITestTypes, TestTypeService } from '@/api/testType.service';
import Layout from '@/components/Layout';
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { NextPageAuth } from '@/types/auth.types';
import useRole from '@/hooks/useRole';

const LevelPage: NextPageAuth = () => {
  const { isTeacher } = useRole();
  const { data: testTypes, refetch } = useQuery('tests', TestTypeService.findAll, {
    select: (data: ITestTypes[]) => data,
  });

  const { mutate } = useMutation('createTest', (data: ILevel) => TestTypeService.create(data), {
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deleteTest } = useMutation(
    'deleteTest',
    (id: number) => TestTypeService.delete(id),
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

  const onSubmit = (data: ITestTypes) => {
    mutate({
      ...data,
    });
  };

  return (
    <Layout>
      <Stack
        sx={{
          m: '0 auto',
          width: '500px',
          maxWidth: '90%',
        }}
      >
        {isTeacher && (
          <Stack direction="row" alignItems="center" justifyContent="center" display="flex">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Тест" variant="filled" fullWidth />
                )}
              />
              <Button type="submit" variant="contained" fullWidth>
                Добавить тест
              </Button>
            </form>
          </Stack>
        )}
        <br />
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          display="flex"
          spacing={2}
        >
          {testTypes?.map((test: ILevel) => (
            <Stack
              key={test.id}
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
                href={`/test/${test?.id}`}
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
                <Typography variant="h6">{test.name}</Typography>
                {isTeacher && (
                  <IconButton
                    onClick={() => {
                      // @ts-ignore
                      deleteTest(test.id);
                    }}
                    color="error"
                    sx={{
                      boxShadow: 'none',
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                )}
              </Link>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Layout>
  );
};

export default LevelPage;

LevelPage.is_auth = true;
