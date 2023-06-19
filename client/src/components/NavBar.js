import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useUser } from '../providers/UserProvider';
import ColorModeToggle from './ColorModeToggle';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { isEmpty } from '../utils';
import NavBarButton from './NavBarButton';

const DesktopNav = () => {
  const user = useUser();
  const isLoggedIn = !isEmpty(user);
  const location = useLocation();
  const { colorMode } = useColorMode();
  const linkColor = useColorModeValue(`gray.600`, `gray.200`);
  const linkHoverColor = useColorModeValue(`gray.800`, `white`);

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.filter((navItem) => isLoggedIn || navItem.public).map(
        (navItem) => (
          <Link
            key={navItem.label}
            as={RouterLink}
            to={navItem.href ?? '#'}
            p={2}
            fontSize={'sm'}
            textDecorationLine={
              location.pathname === navItem.href ? 'underline' : 'none'
            }
            fontWeight={navItem.fontWeight || 500}
            color={
              navItem.color
                ? colorMode === 'light'
                  ? `${navItem.color}.600`
                  : `${navItem.color}.200`
                : linkColor
            }
            _hover={{
              textDecoration: 'none',
              color: navItem.color
                ? colorMode === 'light'
                  ? `${navItem.color}.800`
                  : `white`
                : linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        ),
      )}
    </Stack>
  );
};

const MobileNav = ({ onClose }) => {
  const user = useUser();
  const isLoggedIn = !isEmpty(user);

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
      spacing={4}
    >
      {NAV_ITEMS.filter((navItem) => isLoggedIn || navItem.public).map(
        (navItem) => (
          <MobileNavItem key={navItem.label} onClose={onClose} {...navItem} />
        ),
      )}
      {isLoggedIn ? (
        <MobileNavItem label="Log Out" href="/logout" color="red" api={true} />
      ) : (
        <MobileNavItem
          label="Log In"
          href="/login"
          color="green"
          api={true}
          fontWeight={700}
        />
      )}
    </Stack>
  );
};

const MobileNavItem = ({
  label,
  href,
  color,
  fontWeight,
  onClose,
  api,
}: NavItem) => {
  const textColor = color || 'gray';

  return (
    <Flex
      as={api ? Link : RouterLink}
      {...(api ? { href } : { to: href ?? '#' })}
      py={2}
      justify={'space-between'}
      align={'center'}
      _hover={{
        textDecoration: 'none',
      }}
      onClick={onClose}
    >
      <Text
        fontWeight={fontWeight || 500}
        color={useColorModeValue(`${textColor}.600`, `${textColor}.200`)}
      >
        {label}
      </Text>
    </Flex>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  href?: string;
  color?: string;
  fontWeight?: number;
}

export default function NavBar() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const user = useUser();
  const isLoggedIn = !isEmpty(user);

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          align={'center'}
          justify={{ base: 'center', md: 'start' }}
        >
          <Link
            as={RouterLink}
            to={'/'}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            fontSize={'m'}
            fontWeight={800}
          >
            {isLoggedIn ? user.username : 'guest'}@téléavis:~
            {isLoggedIn ? '#' : '$'}
          </Link>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <ColorModeToggle display={{ base: '1', md: 'inline-flex' }} />
          {isLoggedIn ? (
            <NavBarButton color={'white'} bgColor={'red'} href={'/logout'}>
              Log Out
            </NavBarButton>
          ) : (
            <NavBarButton color={'white'} bgColor={'green'} href={'/login'}>
              Log In
            </NavBarButton>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav onClose={onClose} />
      </Collapse>
    </Box>
  );
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Subjects',
    href: '/',
    public: true,
  },

  {
    label: 'Study Tracks',
    href: '/study-tracks',
    public: true,
  },
  {
    label: 'My Reviews',
    href: '/my-reviews',
    public: false,
  },
  {
    label: 'Add Review',
    href: '/create-review',
    color: 'blue',
    fontWeight: 700,
    public: false,
  },
];
