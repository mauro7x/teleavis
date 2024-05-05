import { Rating as MUIRating } from '@mui/material';
import { BookOutlined } from '@mui/icons-material';
import { useColors } from '../../providers/ColorsProvider';
import { WorkIcon } from './ThemedIcons';

export const WorkRating = (props) => {
  const {
    icons: { ratingBorderColor },
  } = useColors();

  return (
    <MUIRating
      icon={<WorkIcon />}
      emptyIcon={
        <BookOutlined style={{ color: ratingBorderColor }} fontSize="inherit" />
      }
      {...props}
    />
  );
};
