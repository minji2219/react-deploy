import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

type Props = {
  email: string;
  password: string;
};
export const loginPath = () => `${BASE_URL}/api/members/login`;

export const login = async ({ email, password }: Props) => {
  return fetchInstance.post(loginPath(), {
    email: email,
    password: password,
  });
};
export const useLogin = ({ email, password }: Props) => {
  return useMutation({
    mutationFn: () => login({ email, password }),
    onError: () => {
      console.error('에러 발생');
    },
  });
};
