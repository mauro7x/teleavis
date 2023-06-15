import { Rating as MUIRating } from '@mui/material';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useColorModeValue } from '@chakra-ui/react';

export const Rating = (props) => {
  const ratingBorderColor = useColorModeValue('default', '#999999');

  return (
    <MUIRating
      emptyIcon={
        <StarBorderIcon
          fontSize="inherit"
          style={{ color: ratingBorderColor }}
        />
      }
      {...props}
    />
  );
};
