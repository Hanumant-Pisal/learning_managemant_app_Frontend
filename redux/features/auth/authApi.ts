import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {}; // Define your registration data type here

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include",
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken
                        })
                    );
                } catch (error: any) {
                    // Handle error (e.g., show notification, log error, etc.)
                    console.error('Registration failed:', error);
                }
            }
        }),

        activation:builder.mutation({
            query:({activation_token,activation_code})=>({
                url:"activate-user",
                method:"POST",
                body:{activation_token,activation_code}
            })
        })


    })
});

export const { useRegisterMutation, useActivationMutation } = authApi;