import { Button } from '@chakra-ui/react';

export default function NavBarButton({ bgColor, color, children, ...props }) {
  return (
    <Button
      as={'a'}
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize={'sm'}
      fontWeight={600}
      color={color}
      bg={`${bgColor}.400`}
      _hover={{
        bg: `${bgColor}.300`,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
