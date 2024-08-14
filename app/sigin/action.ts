"use server";

import { signIn ,auth } from "@/auth";
export async function authenticate() {
    const session = await auth();
console.log(77777,session);
try {
    let res=  await signIn("credentials", {
        test:123123,
         redirect: false,
       });
console.log(111133311,res);
 
} catch (error) {
console.log(2222222,typeof error);
    
}
    


}