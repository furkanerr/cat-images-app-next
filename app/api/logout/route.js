
import { cookies } from "next/headers";


export async function GET(request) {
  const cookieStore = cookies();
 
  const response = {
    message: "Logged Out!",
  };
  cookieStore.delete("COOKIE_NAME");
  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
