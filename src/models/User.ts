import { z } from "zod";

export const BasicUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be 2 or more characters long" }),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be 4 or more characters long" }),
  email: z.string().email().trim().toLowerCase(),
  phone: z
    .string()
    .min(10, { message: "Phone numbers are a minimum of a 10 digits" }),
  // .regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
  // .length(10, { message: "Phone numbers are a minimum of a 10 digits" })
  // .transform(
  //   (value) => `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`
  // ),
  //   website: z.string().trim().toLowerCase().url().optional(),
  website: z
    .string()
    .trim()
    .toLowerCase()
    .refine((val) => val.indexOf(".") !== -1, {
      message: "Invalid URL",
    })
    .optional(),
  company: z.object({
    name: z
      .string()
      .trim()
      .min(5, { message: "Company name must be 5 or more character long" }),
    catchPhrase: z.string().optional(),
  }),
});

const UserAddressSchema = z.object({
  street: z
    .string()
    .trim()
    .min(5, { message: "Street must be 5 or more characters long" }),
  suite: z.string().trim().optional(),
  city: z
    .string()
    .trim()
    .min(2, { message: "City must be 2 or more characters long" }),
  zipcode: z.string().regex(/^[0-9]{5}(-[0-9]{4})?$/, {
    message: "Zipcode must be 5 or 9 digits long",
  }),
});

const UserAddressSchemaWithGeo = UserAddressSchema.extend({
  geo: z.object({
    lat: z.string(),
    lng: z.string(),
  }),
});

const HasIDSchema = z.object({ id: z.number().int().positive() });

export const UserSchemaWithAddress = BasicUserSchema.extend({
  address: UserAddressSchema,
}).merge(HasIDSchema);

export const UserSchemaWithGo = BasicUserSchema.extend({
  address: UserAddressSchemaWithGeo,
}).merge(HasIDSchema);

export type UserWithAddress = z.infer<typeof UserSchemaWithAddress>;
export type UserWithGeo = z.infer<typeof UserSchemaWithGo>;
