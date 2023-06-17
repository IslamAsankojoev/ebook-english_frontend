import axiosInstance from '@/api/axios.config';
import { INote, NoteService } from '@/api/note.service';
import Layout from '@/components/Layout';
import useTypedSession from '@/hooks/useTypedSession';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

const Note = () => {
  const { data: session } = useTypedSession();
  const {
    data: Note,
    isLoading,
    refetch,
  } = useQuery('Note', NoteService.findAll, {
    select: (data) => data.filter((item: INote) => item.user === session?.user?.id),
  });
  const { mutate: createNote, isLoading: createLoading } = useMutation(
    'createNote',
    (data: INote) => NoteService.create(data),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { mutate: deleteNote, isLoading: deleteLoading } = useMutation(
    'deleteNote',
    (id: number) => NoteService.delete(id),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = (data: INote) => {
    createNote({
      ...data,
      user: session?.user?.id,
    });
  };

  return (
    <Layout title="Заметки">
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
          name="message"
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
        {Note?.map((note: INote) => (
          <Grid item key={note.id} xs={12} sm={12} md={6}>
            <Card
              sx={{
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <Stack direction="column" sx={{ gap: '10px' }}>
                <Typography variant="body2"> {note.message}</Typography>
                <LoadingButton
                  loading={deleteLoading}
                  color="error"
                  // @ts-ignore
                  onClick={() => deleteNote(note?.id)}
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

export default Note;
