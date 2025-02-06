import { getSession } from "@/lib/session";

export default async function Dashboard() {
  const session = await getSession();
  console.log(session);

  return (
    <div>Main Dashboard</div>
    // <div>
    //   {!session || !session.user ? (
    //     <div>
    //       <p>
    //         Please login first: <Link href={"/auth/signin"}>Login</Link>
    //       </p>
    //     </div>
    //   ) : (
    //     <>
    //       <p>
    //         {session.user.email} : {session.user.id}
    //       </p>
    //       <Link href={"/api/auth/signout"}>Signout</Link>
    //     </>
    //   )}
    // </div>
  );
}
