import InputField from "../../components/common/Input/InputField";
import Button from "../../components/common/Button/Button";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Top avatars and count */}
      <div className="text-center mb-4">
        <div className="flex justify-center -space-x-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"
            ></div>
          ))}
        </div>
        <p
          className="text-[#8e9ab0] text-sm italic"
          style={{ fontFamily: "instrument-serif, sans-serif" }}
        >
          Join 118,044+ peers.
        </p>
      </div>

      {/* Headings */}
      <div className="text-center mb-6">
        <h1
          className="text-2xl sm:text-3xl text-black font-serif"
          style={{
            fontFamily: "instrument-serif, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          Sign up & create your profile.
        </h1>
      </div>

      {/* Form container */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md px-6 py-8 border border-gray-300">
        {/* Username Field  */}
        <InputField
          label="Username"
          type="text"
          name="username"
          placeholder="Your username"
        />
        {/* Email Field */}
        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="you@youremail.com"
        />

        {/* Password Field */}
        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="At least 8 characters."
        />
        {/* Confirm Password Field */}
        <InputField
          label="Confirm Password"
          type="password"
          name="password"
          placeholder="At least 8 characters."
        />

        {/* Create Profile Button */}
        <Button
          text="Create Profile"
          type="submit"
          color="bg-[#0d1128]"
          className="w-full font-semibold mt-2 flex items-center justify-center gap-1"
          textColor="text-white"
        />

        {/* Terms Notice */}
        <p className="text-xs text-center text-gray-400 mt-4">
          By clicking "Create Profile" you agree to our{" "}
          <a href="#" className="underline hover:text-gray-600">
            Code of Conduct
          </a>
          ,{" "}
          <a href="#" className="underline hover:text-gray-600">
            Terms of Service
          </a>
          , and{" "}
          <a href="#" className="underline hover:text-gray-600">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* Bottom Link */}
      <p className="mt-6 text-sm text-gray-500">
        Already have a profile?{" "}
        <a
          href="/login"
          className="text-[#4e5b84] font-semibold hover:underline"
        >
          Log in
        </a>
      </p>
    </div>
  );
};

export default Signup;
