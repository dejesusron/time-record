import { useState, useEffect } from 'react';

const Home = () => {
  const [date, setDate] = useState(new Date());

  const localizedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const localizedTime = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className='container mx-auto px-4'>
        <div className='min-h-screen py-24 grid place-items-center'>
          <div className='border border-[#c2c9d3] p-4 md:p-6 rounded-lg w-full md:max-w-[400px]'>
            <h1 className='mb-8 font-semibold text-2xl'>Hello user</h1>

            <div className='stats shadow w-full border border-[#c2c9d3] rounded-md bg-base-200'>
              <div className='stat'>
                <div className='stat-title'>{localizedDate}</div>
                <div className='stat-value'>{localizedTime}</div>
              </div>
            </div>

            <div className='flex'>
              <div className='stats w-full rounded-md'>
                <div className='stat'>
                  <div className='stat-title text-center'>Time in:</div>
                  <div className='stat-value text-xl text-center'>00:00</div>
                  <button className='btn mt-4'>TIME IN</button>
                </div>
              </div>
              <div className='stats w-full rounded-md'>
                <div className='stat'>
                  <div className='stat-title text-center'>Time out:</div>
                  <div className='stat-value text-xl text-center'>00:00</div>
                  <button className='btn mt-4'>TIME OUT</button>
                </div>
              </div>
            </div>

            <div className='divider'></div>

            <button className='btn btn-neutral w-full'>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
