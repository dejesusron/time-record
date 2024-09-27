import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const [signInPage, setSignInPage] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    switch (location.pathname) {
      case '/sign-in':
        setSignInPage(false);
        setSignUpPage(true);
        break;
      case '/sign-up':
        setSignInPage(true);
        setSignUpPage(false);
        break;
      default:
        setSignInPage(false);
        setSignUpPage(false);
        break;
    }
  }, [location]);

  const handleLogout = () => {
    const confirmLogout = window.confirm(`Are you sure do you want to logout?`);

    if (confirmLogout) {
      localStorage.removeItem('user');
      dispatch(logout());
      navigate('/sign-in');
    }
  };

  return (
    <div className='navbar bg-base-300 fixed'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          TimeRecord
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 gap-x-1'>
          <li>
            <Link
              to='/sign-in'
              className={`${signInPage ? 'block' : 'hidden'}`}
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className={`${signUpPage ? 'block' : 'hidden'}`}
            >
              Sign up
            </Link>
          </li>
          {user && (
            <li>
              <details>
                <summary>{user.name}</summary>
                <ul className='bg-base-100 border border-[#c2c9d3] rounded-t-none p-2'>
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
