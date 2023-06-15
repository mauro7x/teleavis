import { Rating as MUIRating } from '@mui/material';

import { useColorModeValue } from '@chakra-ui/react';
import { Book, BookOutlined } from '@mui/icons-material';

export const WorkRating = (props) => {
  const ratingBorderColor = useColorModeValue('default', '#999999');

  return (
    <MUIRating
      icon={
        <Book
          style={{ color: useColorModeValue('#2b5399', '#3c6aba') }}
          fontSize="inherit"
        />
      }
      emptyIcon={
        <BookOutlined style={{ color: ratingBorderColor }} fontSize="inherit" />
      }
      {...props}
    />
  );
};
