import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { client } from "prisma";
import bcrypt from "bcryptjs";
import { commitSession, getSession } from "~/session";
import { useActionData, useNavigate } from "@remix-run/react";
import { constructError, Error, zodErrorToError } from "~/error";
import { Card } from "~/components";
import { LoginForm } from "~/zod";

export const loader: LoaderFunction = async () => {
  return { message: "Hello World!" };
};

export default function Login() {
  const actionData = useActionData<Error>();
  const navigate = useNavigate();

  console.log(actionData);

  const errorMarkup = actionData ? (
    <div className="bg-red-500 text-white p-4 rounded-lg flex flex-col gap-2 items-center w-fill">
      <h1 className="text-2xl font-bold">Error</h1>
      <p>{actionData.error as string}</p>
    </div>
  ) : null;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-96 gap-2">
        {errorMarkup}
        <Card>
          <h1 className="text-3xl font-bold">Login</h1>
          <form className="flex flex-col gap-2" method="post">
            <div className="flex items-center justify-between space-x-2">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="email"
                name="email"
                className="p-2 rounded-lg bg-slate-400 text-white"
              />
            </div>
            <div className="space-x-2 flex items-center justify-between">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="p-2 rounded-lg bg-slate-400 text-white"
              />
            </div>
            <div className="flex gap-2 items-center justify-center w-fill">
              <button
                className="p-2 rounded-lg bg-blue-500 text-white w-full hover:bg-blue-600 transition-colors ease-in-out"
                type="submit"
              >
                Login
              </button>
              <button
                className="p-2 rounded-lg bg-slate-600 text-white w-full hover:bg-slate-700 transition-colors ease-in-out"
                onClick={() => navigate("/register")}
                type="button"
              >
                Register
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const validatedData = LoginForm.safeParse(data);

  if (!validatedData.success) {
    return json(zodErrorToError(validatedData.error));
  }

  const user = await client.user.findUnique({
    where: {
      email: validatedData.data.email,
    },
  });

  console.log(user);

  if (!user) {
    return json(constructError(1));
  }

  const passwordCorrect = await bcrypt.compare(
    validatedData.data.password,
    user.password
  );

  if (!passwordCorrect) {
    return json(constructError(1));
  }

  session.set("userId", user.id);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
