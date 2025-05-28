export const handleApiError = (err, fallbackMessage = 'An error occurred') => {
  if (err.response?.data?.message) {
    return err.response.data.message;
  }
  return fallbackMessage;
};
