import { ENV } from "@/configs/environment";
import { removeCookies } from "@/modules/cookies";
import { post } from "@/services/api/main/call";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
import { useMutation } from "@tanstack/react-query";

export const useLogout = ({
    onSuccess,
    onError,
}: {
    onSuccess: () => void;
    onError?: (error: any) => void;
}) => {
    return useMutation({
        mutationFn: async () => {
            const { Kind, OK, StatusCode } = await post(
                MAIN_ENDPOINT.Auth.Logout,
                {},
            );
            await removeCookies(ENV.TOKEN_KEY);
            if (!OK) {
                throw new Error('Gagal melakukan logout');
            }
            return Kind;
        },
        mutationKey: ['logout'],
        onSuccess,
        onError,
    }) as any;
};