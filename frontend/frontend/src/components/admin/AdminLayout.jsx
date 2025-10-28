import React, { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 z-0 ">
      <header className="sticky flex items-center  top-0 z-40 shadow-lg h-14">
        <h4 className="flex items-center">Admin Dashboard </h4>
        <button
          className="md:hidden !bg-transparent !border-none inline-flex items-center justify-center rounded-md border border-slate-200 p-2"
          onClick={() => setOpen(true)}
        >
          <Menu className="text-slate-900" />{" "}
        </button>
      </header>
      <aside
        className={`h-screen relative bg-slate-900 w-64 flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <button
          className="md:hidden absolute right-0 !bg-transparent !border-none inline-flex items-center justify-center rounded-md border border-slate-200 p-2"
          onClick={() => setOpen(false)}
        >
          <X />{" "}
        </button>
        <nav className="flex-1 space-y-1 p-3">
          <NavLink>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-slate-50 " />
              <span className="text-slate-50"> See All Books</span>
            </div>
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}

export default AdminLayout;
