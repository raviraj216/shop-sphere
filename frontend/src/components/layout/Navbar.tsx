import { NavLink  } from 'react-router-dom';
import { Button } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

function Navbar() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="mx-auto flex max-w-7xl justify-between">
        <h1 className="text-xl font-bold">Shop Sphere</h1>

        <div className="space-x-4 main-nav-bar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/orders">Orders</NavLink> 

             {isAuthenticated ? (
                <Button
                  variant="danger"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}

              {!isAuthenticated ? ( <NavLink to="/register">Register</NavLink>) : ""}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;