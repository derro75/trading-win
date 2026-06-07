import { Sidebar } from "@/components/shared/Sidebar";
import { DashboardHeader } from "@/components/shared/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#13161E] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto h-screen">
        <DashboardHeader />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
