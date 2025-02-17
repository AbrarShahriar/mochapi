import { z } from "zod";

export type FormState =
  | {
      error?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SignupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Contain at least one letter.",
    })
    .regex(/[0-9]/, {
      message: "Contain at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
});

export type ChartDataType = {
  [key: string]: string | number;
};

export type UserPayload = {
  res: {
    id: number;
    email: string;
  };
};
