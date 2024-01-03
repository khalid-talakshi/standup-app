export const Navbar = () => {
  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "Boards",
      href: "/boards",
    },
  ];

  return (
    <div className="w-full bg-slate-700">
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="flex gap-2 items-center">
          <p className="text-3xl font-lobster">Standup</p>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:underline">
              {link.name}
            </a>
          ))}
        </div>
        <form method="post" action="/logout">
          <button type="submit" className="px-2 py-1 bg-slate-500 rounded-md">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};
