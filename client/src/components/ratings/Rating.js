import { Rating as MUIRating } from '@mui/material';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useColors } from '../../providers/ColorsProvider';

export const Rating = (props) => {
  const {
    icons: { ratingBorderColor },
  } = useColors();

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
