import {
  Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, IconButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import Header from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import Sidebar from '../../components/Sidebar';

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx='auto' px="6">
        <Sidebar />

        <Box flex={1} borderRadius={8} bg="gray.800" p={['2', '8']} pb='6'>
          <Flex mb="8" justify="space-between" align="center" p={['4', '0']}>
            <Heading size="lg" fontWeight="normal">Usuários</Heading>

            <Link href='/users/create' passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="24"/>}
              >
                Criar novo
              </Button>
            </Link>
            
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={['4', '4', '6']} color="gray.300" w="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th px={['0', '5']}>Usuário</Th>
                {isWideVersion && <Th>Data de Cadastro</Th>}
                <Th w="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={['4', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td px={['0', '5']}>
                  <Box>
                    <Text fontWeight="bold">Eduarda Carvalho</Text>
                    <Text fontSize="sm" color="gray.300">eduarda.carvalho@gmail.com</Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>05 de Setembro, 2022</Td>}
                <Td>
                {isWideVersion
                  ? <Button
                      size='sm'
                      colorScheme="purple"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                    >
                      Editar
                    </Button>
                  : <IconButton 
                      aria-label='editar' 
                      colorScheme="purple"
                      size='sm'
                      icon={<RiPencilLine fontSize="16"/>}
                    />
                }
                </Td>
                </Tr>
                <Tr>
                <Td px={['4', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td px={['0', '5']}>
                  <Box>
                    <Text fontWeight="bold">Arthur Salustiano</Text>
                    <Text fontSize="sm" color="gray.300">tutu.da.vandal@gmail.com</Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>05 de Setembro, 2022</Td>}
                <Td>
                {isWideVersion
                  ? <Button
                      size='sm'
                      colorScheme="purple"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                    >
                      Editar
                    </Button>
                  : <IconButton 
                      aria-label='editar' 
                      colorScheme="purple"
                      size='sm'
                      icon={<RiPencilLine fontSize="16"/>}
                    />
                }
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
