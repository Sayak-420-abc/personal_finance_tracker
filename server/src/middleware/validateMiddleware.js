/**
 * Zod schema validation factory middleware.
 * Validates req.body against the provided schema.
 * On success, replaces req.body with the parsed (coerced) data.
 */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        issues: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data; // Replace with parsed + coerced data
    next();
  };
}
