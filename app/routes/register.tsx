import { ActionFunction, json, redirect } from "@remix-run/node";
import { client } from "prisma";
import bcrypt from "bcryptjs";
import { commitSession, getSession } from "~/session";
import { useActionData, useNavigate } from "@remix-run/react";
import { Error, zodErrorToError } from "~/error";
import { RegistrationForm } from "~/zod";
import { Card } from "~/components/Card";

export default function Register() {
  const actionData = useActionData<Error>();
  const navigate = useNavigate();

  const errorMarkup = actionData ? (
    <div className="bg-red-500 text-white p-4 rounded-lg flex flex-col gap-2 items-center w-fill">
      <h1 className="text-2xl font-bold">Error</h1>
      {Array.isArray(actionData.error) ? (
        <ul>
          {actionData.error.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : (
        <p>{actionData.error as string}</p>
      )}
    </div>
  ) : null;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-96 gap-2">
        {errorMarkup}
        <Card>
          <h1 className="text-3xl font-bold">Register</h1>
          <form className="flex flex-col gap-2" method="post">
            <div className="flex items-center justify-between space-x-2">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="p-2 rounded-lg bg-slate-400 text-white"
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="p-2 rounded-lg bg-slate-400 text-white"
              />
            </div>
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
            <div className="space-x-2 flex items-center justify-between">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                placeholder="Password"
                name="passwordConfirmation"
                className="p-2 rounded-lg bg-slate-400 text-white"
              />
            </div>
            <div className="flex gap-2 items-center justify-center">
              <button
                className="p-2 rounded-lg bg-blue-500 text-white w-full h-full hover:bg-blue-600 transition-colors ease-in-out"
                type="submit"
              >
                Register
              </button>
              <button
                className="p-2 rounded-lg bg-slate-600 text-white w-full hover:bg-slate-700 transition-colors ease-in-out"
                onClick={() => navigate("/login")}
                type="button"
              >
                Have an Account? Login
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

  const validatedData = RegistrationForm.safeParse(data);

  if (!validatedData.success) {
    console.log(validatedData.error.issues);
  }

  if (!validatedData.success) {
    return json(zodErrorToError(validatedData.error));
  }

  const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);

  const newUser = await client.user.create({
    data: {
      email: validatedData.data.email,
      password: hashedPassword,
      firstName: validatedData.data.firstName,
      lastName: validatedData.data.lastName,
    },
  });

  session.set("userId", newUser.id);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
