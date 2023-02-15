import { Card, CardContent, Typography } from '@mui/material';
import '../project.css';
import { CardsType } from '../../../types';

interface ICardsType {
  data: CardsType
}

export function ProjectTodo({ data }: ICardsType) {
  return (
    <Card sx={{
      marginBottom: "7px",
    }}>
      <CardContent>
        <Typography gutterBottom>{data.text}</Typography>
      </CardContent>
    </Card>
  );
}