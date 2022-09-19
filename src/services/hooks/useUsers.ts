import { useQuery } from 'react-query';
import { api } from '../api';

// interface PropsUsers{
//   id: string;
//   name: string;
//   email:{
//     email: string;
//   }
//   created_at: {
//     createdAt: string;
//   }
// }

export async function getUsers() {
  const { data } = await api.get('users');

  const users = data.users.map((user) => {
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

  return users;
}

export function useUsers() {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5, // (milissegundos) 5 segundos 
  });
}
