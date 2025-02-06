import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <header>
      <div className="flex items-center gap-4 p-4">
        <SidebarTrigger />
        <h1 className="font-bold text-xl">Dashboard</h1>
      </div>
    </header>
  );
}
