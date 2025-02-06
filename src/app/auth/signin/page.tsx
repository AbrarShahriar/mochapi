import Image from "next/image";
import SigninForm from "./SigninForm";

export default function SignupPage() {
  return (
    <div className="flex flex-row w-[100vw] h-[100vh]">
      {/* FORM */}
      <div className="flex flex-col items-center justify-center w-[50%] px-12">
        <h1 className="w-[100%] text-left text-3xl font-bold mb-6 text-purple-800">
          Login
        </h1>
        <SigninForm />
      </div>
      {/* IMAGE */}
      <Image
        width={1152}
        height={896}
        className="w-[100%] object-cover "
        src={"/images/register-form-3.jpeg"}
        alt={"Graphics"}
      />
    </div>
  );
}
