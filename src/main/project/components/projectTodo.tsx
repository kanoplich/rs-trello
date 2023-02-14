import { Card, CardContent, Typography } from '@mui/material';
import '../project.css';
import { CardType } from '../../../store/store';

interface ICard {
  data: CardType
}

export function ProjectTodo({ data }: ICard) {
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