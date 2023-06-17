import axiosInstance from '@/api/axios.config';
import { DictionaryService, IWord } from '@/api/dictionary.service';
import Layout from '@/components/Layout';
import useTypedSession from '@/hooks/useTypedSession';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

const Dictionary = () => {
  const { data: session } = useTypedSession();
  const {
    data: dictionary,
    isLoading,
    refetch,
  } = useQuery('dictionary', DictionaryService.findAll, {
    select: (data) => data.filter((item: IWord) => item.user === session?.user?.id),
  });
  const { mutate: createDictionary, isLoading: createLoading } = useMutation(
    'createDictionary',
    (data: IWord) => DictionaryService.create(data),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { mutate: deleteDictionary, isLoading: deleteLoading } = useMutation(
    'deleteDictionary',
    (id: number) => DictionaryService.delete(id),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = (data: IWord) => {
    createDictionary({
      ...data,
      user: session?.user?.id,
    });
  };

  return (
    <Layout title="Словарь">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField {...field} label="Слово" variant="filled" fullWidth />}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Описание" variant="filled" fullWidth multiline rows={4} />
          )}
        />
        <LoadingButton loading={createLoading} type="submit">
          Создать
        </LoadingButton>
      </form>
      <br />
      <Grid container spacing={3}>
        {dictionary?.map((word: IWord) => (
          <Grid item key={word.id} xs={12} sm={12} md={6}>
            <Card
              sx={{
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <Stack direction="column" sx={{ gap: '10px' }}>
                <Typography variant="h6">{word.name}</Typography>
                <Typography variant="body2"> {word.description}</Typography>
                <LoadingButton
                  loading={deleteLoading}
                  color="error"
                  // @ts-ignore
                  onClick={() => deleteDictionary(word?.id)}
                >
                  Удалить
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Dictionary;
