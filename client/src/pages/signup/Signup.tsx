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

const Signup = () => {
  const [select, setSelect] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    password2: '',
  });

  const { name, email, role, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, message } = useSelector((state: RootState) => state.auth);

  // when the select state change, role value set to select value
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      role: select,
    }));
  }, [select]);

  useEffect(() => {
    if (isError) {
      toast.error(message.response.data.message);
    }

    dispatch(reset());
  }, [isError, message, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      try {
        dispatch(pending());
        const userData = { name, email, role, password };

        const response = await axios.post(
          'http://localhost:5001/api/users',
          userData
        );

        dispatch(fulfilled(response));

        navigate('/sign-in');

        toast.success('Sign up successful');
        console.log(response.data);
      } catch (error) {
        dispatch(rejected(error));
        console.log(error);
      }

      console.log(formData);
    }
  };

  return (
    <div>
      <div className='container mx-auto px-4'>
        <div className='min-h-screen py-24 grid place-items-center'>
          <div className='border border-[#c2c9d3] p-4 md:p-6 rounded-lg w-full md:max-w-[400px]'>
            <h1 className='mb-8 font-semibold text-2xl'>Sign up</h1>

            <form
              action=''
              className='flex flex-col gap-y-6'
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type='text'
                  placeholder='Name'
                  className='input input-bordered w-full'
                  name='name'
                  value={name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type='email'
                  placeholder='Email'
                  className='input input-bordered w-full'
                  name='email'
                  value={email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <select
                  className='select select-bordered w-full'
                  onChange={handleSelect}
                  value={select}
                >
                  <option disabled value=''>
                    Select a role
                  </option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
              </div>

              <div>
                <input
                  type='text'
                  placeholder='Password'
                  className='input input-bordered w-full'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type='text'
                  placeholder='Confirm Password'
                  className='input input-bordered w-full'
                  name='password2'
                  value={password2}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button className='btn btn-neutral w-full'>Sign up</button>
                <div className='divider'>or</div>
                <GoogleButton />
                <p className='text-sm mt-4'>
                  Already have an account?{' '}
                  <Link to='/sign-in' className='mt-2 text-[#1b73e8]'>
                    Sign in
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

export default Signup;
