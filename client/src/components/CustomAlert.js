import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from '@chakra-ui/react';

export default function CustomAlert({
  status,
  title,
  description,
  onClose,
  ...props
}) {
  return (
    <Alert status={status}>
      <AlertIcon />
      <Box textAlign="left">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Box>
      <CloseButton position="absolute" top={1} right={1} onClick={onClose} />
    </Alert>
  );
}
