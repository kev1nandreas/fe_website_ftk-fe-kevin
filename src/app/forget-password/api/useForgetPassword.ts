import { post } from "@/services/api/main/call";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
import { ForgetPasswordInputs, ResetPasswordInputs } from "@/types/inputs";
import { useMutation } from "@tanstack/react-query";

export const forgetPassword = ({
    onSuccess,
    onError,
}: {
    onSuccess: (data: any) => void;
    onError?: (error: any) => void;
}) => {
    return useMutation({
        mutationFn: async (data: ForgetPasswordInputs) => {
            const { Kind, OK, StatusCode } = await post(
                MAIN_ENDPOINT.Auth.ForgetPassword,
                data,
            );
            if (!OK) {
                throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
            }
            return Kind;
        },
        mutationKey: ['forget.password'],
        onSuccess,
        onError,
    }) as any;
}

export const resetPassword = ({
    onSuccess,
    onError,
}: {
    onSuccess: () => void;
    onError?: (error: any) => void;
}) => {
    return useMutation({
        mutationFn: async (data: ResetPasswordInputs) => {
            const { Kind, OK, StatusCode } = await post(
                MAIN_ENDPOINT.Auth.ResetPassword,
                data,
            );
            if (!OK) {
                throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
            }
            return Kind;
        },
        mutationKey: ['reset.password'],
        onSuccess,
        onError,
    }) as any;
}