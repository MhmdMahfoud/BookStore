import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, BookOpen, PlusCircle, Home, MenuIcon } from "lucide-react";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="  bg-slate-50 text-slate-900 ">
      
      <header className="sticky bg-white flex items-center top-0 z-30 shadow-lg h-14">
        <button
          className="md:hidden inline-flex items-center justify-center !bg-transparent !border-none !text-black rounded-md border border-slate-200 p-2"
          aria-label="Open sidebar"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <h4 className="font-bold">Admin Dashboard</h4>
      </header>

      {/* Sidebar */}
      <div className=" relative mx-auto flex ">
        <aside
          className={` fixed min-h-screen flex flex-col  transition-transform bg-slate-900  w-64 text-slate-100 ${
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0 "
          }`}
        >
          <a
            className="md:hidden !bg-transparent absolute right-0 !text-white rounded-md p-2 hover:bg-slate-800"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </a>

          <nav className="flex-1 p-2 ">
            <NavLink to="/admin/AllBooks">
              <div className="flex items-center gap-3 mt-2">
                <BookOpen className="h-4 w-4 " />
                <span>See All Books</span>
              </div>
            </NavLink>

            <NavLink to="/admin/AddBooks">
              <div className="flex items-center gap-3 mt-6">
                <PlusCircle className="h-4 w-4" />
                <span>Add Books</span>
              </div>
            </NavLink>

            <NavLink to="/">
              <div className="flex items-center gap-3 mt-6">
                <Home className="h-4 w-4" />
                <span>Return To Home Page</span>
              </div>
            </NavLink>
          </nav>
        </aside>

        <main className="w-full md:ml-64 p-4 md:p-6">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
