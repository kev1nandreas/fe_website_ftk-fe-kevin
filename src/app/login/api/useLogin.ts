import { ENV } from '@/configs/environment';
import { createCookies } from '@/modules/cookies';
import { post } from '@/services/api/main/call';
import { MAIN_ENDPOINT } from '@/services/api/main/endpoint';
import { LoginInputs } from '@/types/inputs';
import { typecastLoginResponse } from '@/types/login';
import { useMutation } from '@tanstack/react-query';

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: any;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: LoginInputs) => {
      const { Kind, OK, StatusCode } = await post(
        MAIN_ENDPOINT.Auth.Login,
        body,
      );
      if (!OK) {
        throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
      }
      const resp = typecastLoginResponse((Kind as { data: any })?.data);
      await createCookies({
        name: ENV.TOKEN_KEY,
        data: resp?.accessToken as string,
      });
      return Kind;
    },
    mutationKey: ['login'],
    onSuccess,
    onError,
  }) as any;
};
