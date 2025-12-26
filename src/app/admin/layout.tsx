export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">LRS - 관리자</h1>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <aside className="w-64 space-y-2">
            <nav className="space-y-1">
              <a href="/admin/dashboard" className="block px-4 py-2 rounded-md hover:bg-slate-100">대시보드</a>
              <a href="/admin/users" className="block px-4 py-2 rounded-md hover:bg-slate-100">사용자 관리</a>
              <a href="/admin/lectures" className="block px-4 py-2 rounded-md hover:bg-slate-100">강의 관리</a>
              <a href="/admin/assignments" className="block px-4 py-2 rounded-md hover:bg-slate-100">배정 관리</a>
              <a href="/admin/analytics" className="block px-4 py-2 rounded-md hover:bg-slate-100">분석 리포트</a>
            </nav>
          </aside>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
