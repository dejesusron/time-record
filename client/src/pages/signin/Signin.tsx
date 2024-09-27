import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from '../../components/google-button/GoogleButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {
  pending,
  fulfilled,
  rejected,
  reset,
} from '../../features/auth/authSlice';
import type { RootState } from '../../app/store';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message, isError } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message.response.data.message);
    }

    dispatch(reset());
  }, [message, isError, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(pending());

      const userData = { email, password };
      const response = await axios.post(
        'http://localhost:5001/api/users/login',
        userData
      );

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      dispatch(fulfilled(response));

      const name = response.data.name;
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      toast.success(`Welcome ${capitalizedName}`);

      navigate('/');
    } catch (error) {
      dispatch(rejected(error));
    }
  };

  return (
    <div>
      <div className='container mx-auto px-4'>
        <div className='min-h-screen py-24 grid place-items-center'>
          <div className='border border-[#c2c9d3] p-4 md:p-6 rounded-lg w-full md:max-w-[400px]'>
            <h1 className='mb-8 font-semibold text-2xl'>Sign in</h1>

            <form
              action=''
              className='flex flex-col gap-y-6'
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type='text'
                  placeholder='Email'
                  className='input input-bordered w-full'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <input
                  type='text'
                  placeholder='Password'
                  className='input input-bordered w-full'
                  name='password'
                  value={password}
                  onChange={handleChange}
                  required
                />
                <Link className='mt-2 block text-sm text-[#1b73e8]' to='#'>
                  Forgot password?
                </Link>
              </div>

              <div>
                <button className='btn btn-neutral w-full'>Sign in</button>
                <div className='divider'>or</div>
                <GoogleButton />
                <p className='text-sm mt-4'>
                  Don't have an account?{' '}
                  <Link to='/sign-up' className='mt-2 text-[#1b73e8]'>
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
