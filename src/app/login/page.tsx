'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fakeUsers = [
    { email: 'tranhoainamnb1312@gmail.com', password: '123456', name: 'User One' },
    { email: 'user2@example.com', password: 'password2', name: 'User Two' },
  ];

  const handleSubmit =(e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Ngăn reload trang mặc định
    setError('');
    setLoading(true);

    setTimeout(() => {
      const user = fakeUsers.find((u) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('token', 'fake-token-12345');
        localStorage.setItem('user', JSON.stringify(user));

        router.push('/home'); // Chuyển trang sau khi login
      } else {
        setError('Invalid email or password');
      }

      setLoading(false);
    }, 1000); // Mô phỏng thời gian xử lý
  };
  

  const handleRegiter=(e: { preventDefault: () => void; }) => {

    router.push("/register")
  }



  return (
    <div className="bg-white">
      <div className="flex min-h-screen w-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                {loading ? 'Logging in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a onClick={handleRegiter} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
