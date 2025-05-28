import { ArrowRight } from "lucide-react";
const Login = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 border border-solid">
        <div className="text-center mb-8">
          <h1
            className="text-3xl sm:text-4xl text-[#8e9ab0]"
            style={{
              fontFamily: "instrument-serif, sans-serif",
              fontStyle: "normal",
              whiteSpace: "nowrap",
            }}
          >
            Welcome back!
          </h1>
          <h2
            className="text-2xl sm:text-4xl font-serif  text-black mt-1"
            style={{
              fontFamily: "instrument-serif, sans-serif",
              fontStyle: "normal",
              whiteSpace: "nowrap",
            }}
          >
            Login to your account.
          </h2>
        </div>

        <div className="bg-white w-full max-w-md rounded-2xl shadow-md px-6 py-8 border border-gray-300">
          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your password"
              />
              <ArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-[#0d1128] text-white py-2 rounded-xl font-semibold hover:bg-[#1c223b] transition-colors flex items-center justify-center gap-1">
            Login
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Link */}
        <p className="mt-6 text-sm text-gray-500">
          Don’t have a Sociofeed profile?{" "}
          <a
            href="/signup"
            className="text-[#4e5b84] font-semibold hover:underline"
          >
            Create One!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
