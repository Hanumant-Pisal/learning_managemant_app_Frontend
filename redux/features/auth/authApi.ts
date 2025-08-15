import { apiSlice } from "../api/apiSlice";
import { userRegistration,userLoggedIn } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {}; // Define your registration data type here

type SocialAuthRequest = {
  email: string;
  name: string;
  avatar: string;
};

type SocialAuthResponse = {
  accessToken: string;
  user: any; // Replace 'any' with your user type
  message: string;
};

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

        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "activate-user",
                method: "POST",
                body: { activation_token, activation_code }
            })
        }),


        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "login",
                method: "POST",
                body: { email, password },
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log('Login successful. User data:', result.data.user);
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    );
                } catch (error: any) {
                    console.error('Login failed:', error);
                    // You might want to dispatch an error action here
                }
            }
        }),

        socialAuth: builder.mutation<SocialAuthResponse, SocialAuthRequest>({
            query: ({ email, name, avatar }) => ({
              url: "social-auth",
              method: "POST",
              body: { email, name, avatar },
              credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
              try {
                const { data } = await queryFulfilled;
                dispatch(
                  userLoggedIn({
                    accessToken: data.accessToken,
                    user: data.user,
                  })
                );
              } catch (error: any) {
                console.error('Social auth failed:', error);
                // You might want to dispatch an error action here
                // dispatch(authError(error.message));
              }
            },
          }),
          


    })
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation } = authApi;