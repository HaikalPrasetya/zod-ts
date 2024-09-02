import { z } from "zod";

//creating a schema for strings
const mySchema = z.string();

// parsing
mySchema.parse("Haikal"); // => "Haikal"
mySchema.parse(20); // => throws ZodError

// "safe" parsing (doesn't throw error if validation fails)
mySchema.safeParse("Haikal"); // => { success: true, data: "Haikal" }
mySchema.safeParse(20); // => { success: false, error: ZodError }

////////////////////
const schema = z.coerce.string();
schema.parse("Haikal"); // => "Haikal"
schema.parse(42); // => "42"
schema.parse(true); // => "true"
