import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  role,
  title,
  children,
  defaultActive = "dashboard",
  // If the parent (dashboard page) manages activeId itself, accept it as a prop
  activeId: activeIdProp,
  setActiveId: setActiveIdProp,
}) {
  // Fallback: internal state if no external control is passed
  const [internalActiveId, setInternalActiveId] = useState(defaultActive);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeId = activeIdProp ?? internalActiveId;
  const setActiveId = setActiveIdProp ?? setInternalActiveId;

  return (
    <div className="flex h-screen bg-[#0F172A] overflow-hidden">
      <Sidebar
        role={role}
        activeId={activeId}
        setActiveId={setActiveId}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar
          title={title}
          role={role}
          onMobileMenuToggle={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
