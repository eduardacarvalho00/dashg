import {
  Flex, Button, Stack, 
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/Form/Input';

interface LoginInputs {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha'),
});

export default function SignIn() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(signInFormSchema),
  });

  // eslint-disable-next-line no-unused-vars
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    router.push('/users');
    console.log(data);
  };
  return (
    <Flex
      w='100vm'
      h='100vh'
      align='center'
      justify='center'
    >
      <Flex 
        onSubmit={handleSubmit(onSubmit)}
        as="form"
        w="100%"
        maxW={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDir='column'
      >
        <Stack spacing="4">
          <Input
            label='E-mail'
            type='email' 
            {...register('email')}
            errors={errors.email}
          />
          <Input
            label='Senha'
            type='password'
            {...register('password')}
            errors={errors.password}
            current-password = 'true'
          />
        </Stack>

        <Button
          type="submit"
          mt='6'
          colorScheme={'pink'}
          size=
          'lg'
        > 
          Entrar 
        </Button>
      </Flex>
    </Flex>
  );
}
