import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
//import { isAuthenticated } from '@/utils/auth';

function ProtectedRoute() {

  const { isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;