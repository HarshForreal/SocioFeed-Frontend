import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../common/Button/Button";
import InputField from "../common/Input/InputField";
const UsernameInput = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="max-w-xl px-4 mx-auto mt-12">
      <InputField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        prefix={
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="logo"
              style={{ height: "35px", width: "35px" }}
            />
            <span className="text-black">sociofeed.io/</span>
          </div>
        }
        addonRight={
          <Button
            onClick={() => console.log("Searching", username)}
            className="p-2"
            color="bg-gray-400"
            textColor="text-white"
            text={<ArrowRight className="w-5 h-5" />}
          />
        }
      />

      <p className="text-center text-gray-500 text-sm mt-3">
        Quickly search for your friend's username!
      </p>
    </div>
  );
};

export default UsernameInput;
