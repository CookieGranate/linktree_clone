"use client"

import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
 
export default function Home() {
  const {data: session, status} = useSession()
   
  if (status === 'loading') {
    return <h1>loading</h1>
  }

  // if (status === "authenticated") {
    return (
      <>
        <div>
          <main>
            <h1>Home</h1>
            <p>logged in as {session?.user?.name}</p>
            <p>logged in as {session?.user?.email}</p>
          </main>
        </div>
      </>
    )
  // }


  // if (status === "unauthenticated") {
  //   return <button onClick={() => signIn('google')}>Sign In</button>
  // }
}
