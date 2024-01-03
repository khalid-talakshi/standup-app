import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "prisma";
import { getSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session) {
    return redirect("/login");
  }

  const userId = session.get("userId");
  const projects = await client.project.findMany({
    where: {
      ownerId: userId,
    },
  });
  return projects;
};

export default function Projects() {
  const projects = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">Projects</h1>
      <div className="flex gap-2 py-2">
        {projects.map((project) => (
          <div key={project.id}>
            <p>{project.name}</p>
          </div>
        ))}
        <div className="flex justify-center  w-1/3">
          <a
            href="/projects/new"
            className="p-2 bg-blue-500 text-white rounded-lg w-full text-center"
          >
            New Project
          </a>
        </div>
      </div>
    </div>
  );
}
