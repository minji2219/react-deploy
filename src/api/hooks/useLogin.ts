import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

type Props = {
  email: string;
  password: string;
};
export const loginPath = () => `${BASE_URL}/members/login`;

export const login = async ({ email, password }: Props) => {
  return fetchInstance.post(loginPath(), {
    email: email,
    password: password,
  });
};
export const useLogin = ({ email, password }: Props) => {
  return useMutation({
    mutationFn: () => login({ email, password }),
    onError: (error) => {
      console.log(error);
      return;
    },
  });
};
