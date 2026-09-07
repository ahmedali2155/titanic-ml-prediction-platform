import { z } from "zod";

export const passengerSchema = z.object({
  pclass: z.coerce
    .number({ invalid_type_error: "Select a class" })
    .int("Must be a whole number")
    .min(1, "Must be 1, 2, or 3")
    .max(3, "Must be 1, 2, or 3"),
  sex: z.enum(["male", "female"]),
  age: z.coerce
    .number({ invalid_type_error: "Enter an age" })
    .min(0, "Age cannot be negative")
    .max(100, "Age must be 100 or under"),
  sibsp: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .int("Must be a whole number")
    .min(0, "Cannot be negative")
    .max(10, "Must be 10 or fewer"),
  parch: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .int("Must be a whole number")
    .min(0, "Cannot be negative")
    .max(10, "Must be 10 or fewer"),
  fare: z.coerce
    .number({ invalid_type_error: "Enter a fare" })
    .min(0, "Fare cannot be negative")
    .max(600, "Fare must be 600 or under"),
  embarked: z.enum(["C", "Q", "S"]),
});

export type PassengerFormValues = z.infer<typeof passengerSchema>;
