import { Outlet } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-screen max-w-7xl p-5">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;