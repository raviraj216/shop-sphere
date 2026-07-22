import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-900 p-6 text-white">
        Admin Menu
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;