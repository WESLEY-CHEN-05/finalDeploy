import React from "react";

// Run: npx shadcn-ui@latest add input label
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  className: string
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setNormal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthInput({ className, label, type, value, setValue, setNormal}: Props) {
  return (
    <div className="w-full">
      <Label>{label}</Label>
      <Input
        className={"text-white " + className}
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setNormal(false);
        }}
      />
    </div>
  );
}

export default AuthInput;
