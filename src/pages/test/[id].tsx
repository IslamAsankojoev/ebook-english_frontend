import axiosInstance from '@/api/axios.config';
import { IQuestion, QuestionService } from '@/api/question.service';
import { ITestTypes, TestTypeService } from '@/api/testType.service';
import { TestingService } from '@/api/testing.service';
import Layout from '@/components/Layout';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { ChangeEvent, SyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

const LevelPage = () => {
  const router = useRouter();
  const { data: questions, refetch } = useQuery(
    'questions',
    () =>
      TestingService.findAll({
        level_id: localStorage.getItem('level') as any,
        test_type_id: router.query.id as any,
      }),
    {
      select: (data: IQuestion[]) => data,
    },
  );

  const { mutateAsync } = useMutation(
    'createTest',
    (
      data: IQuestion & {
        user_answer: string;
      },
    ) =>
      axiosInstance.post(`testing/${data.id}/update_user_answer/`, {
        user_answer: data.user_answer,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { control, handleSubmit, setValue, trigger } = useForm();

  const onSubmit = async (data: any) => {
    const dataArray = Object.entries(data).map(([key, value]) => ({
      key: key.replace('question_', ''),
      value,
    }));

    const testings = dataArray?.map(async (answer) => {
      await mutateAsync({
        id: answer.key,
        user_answer: answer.value,
      } as any);
    }); // create attributes

    await Promise.all(testings);

    router.push('/profile');
  };

  return (
    <Layout>
      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={4}>
            {questions?.map((question) => (
              <Stack
                key={question.id}
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <FormControl>
                  <FormLabel id={question.question_text}>
                    <Typography variant="h6">{question.question_text}</Typography>
                  </FormLabel>
                  <Controller
                    control={control}
                    name={`question_${question.id}`} // Уникальное имя для каждого вопроса
                    rules={{ required: true }} // Добавьте правила валидации, если необходимо
                    render={({ field }) => (
                      <RadioGroup
                        row
                        aria-labelledby={question.question_text}
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value={question.choice1}
                          control={<Radio />}
                          label={question.choice1}
                          required
                          onChange={(e: any) => {
                            setValue(`question_${question.id}`, e?.target?.value);
                            trigger(`question_${question.id}`);
                          }}
                        />
                        <FormControlLabel
                          value={question.choice2}
                          control={<Radio />}
                          label={question.choice2}
                          required
                          onChange={(e: any) => {
                            setValue(`question_${question.id}`, e?.target?.value);
                            trigger(`question_${question.id}`);
                          }}
                        />
                        <FormControlLabel
                          value={question.choice3}
                          control={<Radio />}
                          label={question.choice3}
                          required
                          onChange={(e: any) => {
                            setValue(`question_${question.id}`, e?.target?.value);
                            trigger(`question_${question.id}`);
                          }}
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Stack>
            ))}
          </Stack>
          <br />
          <Button type="submit" variant="contained">
            Оправить
          </Button>
        </form>
      </Stack>
    </Layout>
  );
};

export default LevelPage;
