import { NavLink, Outlet } from "react-router-dom";
import { Button, Divider } from "@heroui/react";

export default function AdminLayout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-primary text-primary-foreground shadow-md"
        : "text-default-500 hover:bg-default-100 hover:text-default-900"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen w-full bg-black text-foreground overflow-hidden">
      <aside className="w-72 border-r-1 border-divider bg-zinc-950 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight text-white">
            Feedback<span className="text-primary">Box</span>
          </h1>
          <p className="text-[10px] text-default-400 font-mono uppercase tracking-[0.2em] mt-1">
            Admin Area
          </p>
        </div>

        <Divider className="bg-divider/50" />

        <nav className="flex-1 p-4 flex flex-col gap-1.5">
          <NavLink to="/admin" end className={navLinkClass}>
            <span className="text-sm font-medium">Dashboard</span>
          </NavLink>
        </nav>

        <Divider className="bg-divider/50" />

        <div className="p-4 flex flex-col gap-2">
          <NavLink to="/">
            <Button
              fullWidth
              variant="light"
              className="justify-start text-default-400 hover:text-white"
              size="sm"
            >
              ← Client Side
            </Button>
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-black">
        <header className="h-16 border-b-1 border-divider bg-black/80 backdrop-blur-md flex items-center px-8 justify-between sticky top-0 z-10">
          <h2 className="font-medium text-sm uppercase tracking-widest text-default-500">
            System / Overview
          </h2>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              variant="flat"
              color="danger"
              className="font-bold text-xs"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </div>
        </header>

        <section className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}
