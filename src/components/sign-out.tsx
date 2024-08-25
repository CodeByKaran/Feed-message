"use client"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
 
function SignOut() {
  return <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
}


export default SignOut