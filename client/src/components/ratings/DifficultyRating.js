import { Rating as MUIRating } from '@mui/material';
import { PsychologyOutlined } from '@mui/icons-material';
import { useColors } from '../../providers/ColorsProvider';
import { DifficultyIcon } from './ThemedIcons';

export const DifficultyRating = (props) => {
  const {
    icons: { ratingBorderColor },
  } = useColors();

  return (
    <MUIRating
      icon={<DifficultyIcon />}
      emptyIcon={
        <PsychologyOutlined
          style={{ color: ratingBorderColor }}
          fontSize="inherit"
        />
      }
      {...props}
    />
  );
};
