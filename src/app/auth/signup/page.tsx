import Image from "next/image";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <div className="flex flex-row w-[100vw] h-[100vh]">
      {/* FORM */}
      <div className="flex flex-col items-center justify-center w-[40%] px-12">
        <h1 className="w-[100%] text-left text-3xl font-bold mb-6 text-purple-800">
          Sign Up
        </h1>
        <SignupForm />
      </div>
      {/* IMAGE */}
      <Image
        width={1000}
        height={1000}
        className="w-[70%]  object-cover "
        src={"/images/registerform-split2.jpeg"}
        alt={"Graphics"}
      />
    </div>
  );
}
