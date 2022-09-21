import {
  Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { Input } from '../../components/Form/Input';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const CreateUserSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha').min(6, 'Minímo 6 caracteres'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'A senha precisa ser igual '),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(async (user: CreateUserProps) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      },
    });
    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserProps>({
    resolver: yupResolver(CreateUserSchema),
  });
  // eslint-disable-next-line no-unused-vars
  const handleCreateUser: SubmitHandler<CreateUserProps> = async (data) => {
    await createUser.mutateAsync(data);

    router.push('/users');
  };
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1400} mx='auto' px="6">
        <Sidebar />

        <Box
          as='form'
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal"> Criar Usuário</Heading>

          <Divider my="6" borderColor="gray.700" />
          
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                label="Nome completo" 
                {...register('name')}
                errors={errors.name}
              />
              <Input
                type='email'
                label="E-mail" 
                {...register('email')}
                errors={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                type="password"
                label="Senha" 
                {...register('password')}
                errors={errors.password}
              />
              <Input
                type='password'
                label="Confirmação da senha" 
                {...register('password_confirmation')}
                errors={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href='/users' passHref>
                <Button as='a' colorScheme="whiteAlpha">Cancelar</Button>
              </Link>

              <Button type="submit" colorScheme="pink">Salvar</Button>
              
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
