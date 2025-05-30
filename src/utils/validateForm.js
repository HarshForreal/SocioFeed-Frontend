export const validateForm = async (schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { valid: true, errors: {} };
  } catch (validationError) {
    const formattedErrors = {};
    validationError.inner.forEach((err) => {
      formattedErrors[err.path] = err.message;
    });
    return { valid: false, errors: formattedErrors };
  }
};
