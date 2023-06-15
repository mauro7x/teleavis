import { Rating as MUIRating } from '@mui/material';

import { useColorModeValue } from '@chakra-ui/react';
import { Psychology, PsychologyOutlined } from '@mui/icons-material';

export const DifficultyRating = (props) => {
  const ratingBorderColor = useColorModeValue('default', '#999999');

  return (
    <MUIRating
      icon={
        <Psychology
          style={{ color: useColorModeValue('#c73636', '#f04f4f') }}
          fontSize="inherit"
        />
      }
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
