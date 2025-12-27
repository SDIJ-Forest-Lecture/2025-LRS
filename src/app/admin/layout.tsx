import { AdminNav } from "@/components/layout/admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <AdminNav />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b bg-white px-8 py-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold">LRS - 관리자</h1>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
