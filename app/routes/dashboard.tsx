import { LoaderFunction, redirect } from "@remix-run/node";
import { checkSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
  const hasSession = checkSession(request);
  if (!hasSession) {
    return redirect("/login");
  }

  return {};
};

export default function Dashboard() {
  return <div className="container mx-auto">Dashboard</div>;
}
