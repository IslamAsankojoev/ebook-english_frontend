import axiosInstance from '@/api/axios.config';
import { DictionaryService, IWord } from '@/api/dictionary.service';
import { ILevel, LevelService } from '@/api/level.service';
import { IQuestion, QuestionService } from '@/api/question.service';
import { ITestTypes, TestTypeService } from '@/api/testType.service';
import Layout from '@/components/Layout';
import useTypedSession from '@/hooks/useTypedSession';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import AsyncSelect from 'react-select/async';

const CreateQuestion = () => {
  const { data: session } = useTypedSession();
  const {
    data: dictionary,
    isLoading,
    refetch,
  } = useQuery('questions', QuestionService.findAll, {
    select: (data: IQuestion[]) => data,
  });

  const { data: levels } = useQuery('levels', LevelService.findAll, {
    select: (data: ILevel[]) => data,
  });

  const { data: tests } = useQuery('tests', TestTypeService.findAll, {
    select: (data: ITestTypes[]) => data,
  });

  const { mutate: createDictionary, isLoading: createLoading } = useMutation(
    'createQuestions',
    (data: IQuestion) => QuestionService.create(data),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { mutate: deleteDictionary, isLoading: deleteLoading } = useMutation(
    'deleteQuestions',
    (id: number) => QuestionService.delete(id),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { control, handleSubmit, setValue, trigger } = useForm({
    defaultValues: {
      question_text: '',
      choice1: '',
      choice2: '',
      choice3: '',
      correct_answer: '',
      level: '',
      test_type: '',
    },
  });

  const onSubmit = (data: IQuestion) => {
    createDictionary({
      ...data,
      user: session?.user?.id,
    });
  };

  return (
    <Layout title="Вопросы">
      <form
        // @ts-ignore
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          sx={{
            zIndex: 2,
          }}
          spacing={1}
        >
          <Grid item xs={12} sm={12} md={6}>
            <AsyncSelect
              cacheOptions
              placeholder="Выберите уровень"
              defaultOptions={levels?.map((item: ILevel) => {
                return { value: item?.id, label: item?.name };
              })}
              onChange={(e) => {
                // @ts-ignore
                setValue('level', e?.value);
                trigger('level');
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <AsyncSelect
              cacheOptions
              placeholder="Выберите тест"
              defaultOptions={tests?.map((item: ITestTypes) => {
                return { value: item?.id, label: item?.name };
              })}
              onChange={(e) => {
                // @ts-ignore
                setValue('test_type', e?.value);
                trigger('test_type');
              }}
            />
          </Grid>
        </Grid>
        <Controller
          name="question_text"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Вопрос" variant="filled" fullWidth multiline rows={4} />
          )}
        />
        <Controller
          name="choice1"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Вариант 1" variant="filled" fullWidth />
          )}
        />
        <Controller
          name="choice2"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Вариант 2" variant="filled" fullWidth />
          )}
        />
        <Controller
          name="choice3"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Вариант 3" variant="filled" fullWidth />
          )}
        />

        <Controller
          name="correct_answer"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Скопируйте правильный ответ и вставьте сюда"
              variant="filled"
              fullWidth
            />
          )}
        />

        <LoadingButton loading={createLoading} type="submit">
          Создать
        </LoadingButton>
      </form>
      <br />
      <Typography variant="h5">Все вопросы</Typography>
      <br />
      <Grid container spacing={3}>
        {dictionary?.map((question: IQuestion) => (
          <Grid item key={question?.id} xs={12} sm={12} md={4}>
            <Card
              sx={{
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <Stack direction="column" sx={{ gap: '10px' }}>
                <Typography variant="h6">Вопрос: {question?.question_text}</Typography>
                <Typography variant="body2">Вариант 1: {question?.choice1}</Typography>
                <Typography variant="body2">Вариант 2: {question?.choice2}</Typography>
                <Typography variant="body2">Вариант 3: {question?.choice3}</Typography>
                <Typography variant="body2">Ответ 3: {question?.correct_answer}</Typography>
                <Typography variant="body2">
                  Уровень: {levels?.find((item: ILevel) => item?.id === question?.level)?.name}
                </Typography>
                <Typography variant="body2">
                  Тест: {tests?.find((item: ITestTypes) => item?.id === question?.test_type)?.name}
                </Typography>
                <LoadingButton
                  loading={deleteLoading}
                  color="error"
                  // @ts-ignore
                  onClick={() => deleteDictionary(question?.id)}
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

export default CreateQuestion;
