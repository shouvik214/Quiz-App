const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string({required_error: "Name is required" })
    .min(3, {message: "Name must be at least of 3 chars"})
    .max(255, {message: "Name must not be more than 255 chars"})
    .trim(),
  email: z.string({required_error: "Email is required" })
        .trim()
        .min(3, {message: "Email must be at least of 3 chars"})
        .max(255, {message: "Email must not be more than 255 chars"})
        .email(),
  password: z.string({required_error: "Password is required" })
        .min(7, {message: "Password must be at least of 7 chars"})
        .max(1024, {message: "Password must not be more than 1024 chars"}),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

module.exports = { registerSchema, loginSchema };
