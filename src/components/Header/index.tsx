import {
  Flex, Icon, IconButton, useBreakpointValue, 
} from '@chakra-ui/react';
import { RiMenu2Line } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { Logo } from './Logo';
import { NotficationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { Search } from './Search';

export default function Header() {
  const { onOpen } = useSidebarDrawer();
  const isWideVersion = useBreakpointValue({
    base: false, 
    lg: true,
  });
  return (
    <Flex
      as="header"
      w='100%'
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      { !isWideVersion && (
        <IconButton
          aria-label='Open navigation'
          icon={<Icon as={RiMenu2Line}/>}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      )}
      <Logo />

      { isWideVersion && <Search />}

      <Flex align="center" ml="auto">

        <NotficationsNav />
        <Profile showProfileData={isWideVersion}/>
      </Flex>
    </Flex>
  );
}
