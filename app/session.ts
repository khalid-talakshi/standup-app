import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
};

type SessionError = {
  error: string;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionError>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, // 1 day
      path: "/",
      secrets: [process.env.SESSION_SECRET as string],
      secure: true,
    },
  });

export const checkSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.get("userId")) {
    return false;
  }
  return true;
};
