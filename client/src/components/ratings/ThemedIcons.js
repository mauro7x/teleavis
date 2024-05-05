import { Book, Psychology } from '@mui/icons-material';
import { useColors } from '../../providers/ColorsProvider';

export const DifficultyIcon = (props) => {
  const {
    icons: { difficulty },
  } = useColors();

  return (
    <Psychology style={{ color: difficulty }} fontSize="inherit" {...props} />
  );
};

export const WorkIcon = (props) => {
  const {
    icons: { work },
  } = useColors();

  return <Book style={{ color: work }} fontSize="inherit" {...props} />;
};

export const StarIcon = (props) => {
  const {
    icons: { difficulty },
  } = useColors();

  return (
    <Psychology style={{ color: difficulty }} fontSize="inherit" {...props} />
  );
};
