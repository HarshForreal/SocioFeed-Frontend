const ActivatePrompt = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full border border-gray-300 shadow-md rounded-2xl px-6 py-10 text-center">
        <h2 className="text-2xl font-sepmibold text-gray-900 mb-2">
          Check your email 📬
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We’ve sent you an activation link. Click the link in your inbox to
          activate your account.
        </p>

        <p className="text-xs text-gray-400">
          Didn’t receive the email? Check your spam folder or{' '}
          <span className="text-blue-600 hover:underline font-medium">
            try to connect us
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default ActivatePrompt;
