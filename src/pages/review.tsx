import { IReview, ReviewService } from '@/api/review.service';
import { IUser } from '@/api/user.service';
import Layout from '@/components/Layout';
import useTypedSession from '@/hooks/useTypedSession';
import { NextPageAuth } from '@/types/auth.types';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

const Review: NextPageAuth = () => {
  const { data: session } = useTypedSession();
  const { data: reviews, refetch } = useQuery('reviews', ReviewService.findAll, {
    select: (data: IReview[]) => data,
  });
  const { data: users } = useQuery('users', ReviewService.findAll, {
    select: (data: IUser[]) => data,
  });

  const { mutate: createReview, isLoading: createLoading } = useMutation(
    'createReview',
    ReviewService.create,
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { mutate: deleteReview, isLoading: deleteLoading } = useMutation(
    'deleteReview',
    (id: number) => ReviewService.delete(id),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      review_text: '',
    },
  });

  const onSubmit = (data: IReview) => {
    createReview({
      ...data,
      user: session?.user?.id,
    });
  };

  return (
    <Layout>
      <Stack
        direction="column"
        width="500px"
        sx={{
          maxWidth: '90%',
          margin: '0 auto',
        }}
      >
        <Typography variant="h4">Review</Typography>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" alignItems="flex-end">
            <Controller
              name="review_text"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Введите сообщение..."
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                      marginBottom: '20px',
                      border: 'none',
                      backgroundColor: '#DCDCDC',
                    },
                  }}
                  multiline
                  rows={4}
                  fullWidth
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: 'fit-content',
                backgroundColor: '#DCDCDC',
                boxShadow: 'none',
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: '#DCDCDC',
                },
                color: '#000',
              }}
            >
              Добавить отзыв
            </Button>
          </Stack>
        </form>
        <br />
        <br />
        <Stack direction="column" spacing={1}>
          {reviews
            ?.map((review: IReview) => (
              <Stack
                direction="row"
                key={review.id}
                sx={{
                  borderRadius: '50px',
                  padding: '8px 16px',
                  backgroundColor: '#DCDCDC',
                  display: 'flex',
                }}
              >
                <Box
                  sx={{
                    padding: '5px 10px',
                    backgroundColor: '#bfbfbf',
                    borderRadius: '50px',
                  }}
                >
                  <Typography variant="h6">{review.user_username}</Typography>
                </Box>
                <Box
                  sx={{
                    padding: '5px 10px',
                    borderRadius: '50px',
                  }}
                >
                  <Typography variant="h6">{review.review_text}</Typography>
                </Box>
              </Stack>
            ))
            .reverse()}
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Review;

Review.is_teacher = true;
