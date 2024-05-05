import { useLocation } from 'react-router-dom';

export function usePwd() {
  const location = useLocation();
  const path = location.pathname;

  // handle particular cases
  switch (path) {
    case '/':
      return 'téléavis';
    case '/study-tracks':
      return 'tracks';
    case '/create-review':
      return 'add-review';
    case '/my-reviews':
      return 'my-reviews';
    default:
      return '???';
  }
}
