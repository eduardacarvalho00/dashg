import { useQuery } from 'react-query';
import { api } from '../api';

interface PropsUsers{
  id: string;
  name: string;
  email:{
    email: string;
  }
  created_at: {
    createdAt: string;
  }
}

export async function getUsers(page: number) {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user: PropsUsers) => {
    return {
      ide: user.id,
      name: user.name,
      email: user.email.email,
      createdAt: new Date(user.created_at.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return { users, totalCount };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // => milissegundos 10 min
  });
}
