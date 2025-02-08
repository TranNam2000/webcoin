'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    // Reset messages
    setError('');
    setSuccessMessage('');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Start loading
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, 
          email,
          password,
          confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Registration Logo"
            className="mx-auto h-12 w-auto" />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mt-4">Create Your Account</h2>
          <p className="text-gray-600 mt-2">Sign up to explore the features!</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium ${formData.name ? 'text-black' : 'text-gray-700'}`}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${formData.email ? 'text-black' : 'text-gray-700'}`}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${formData.password ? 'text-black' : 'text-gray-700'}`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className={`block text-sm font-medium ${formData.confirmPassword ? 'text-black' : 'text-gray-700'}`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              required
            />
          </div>

          {/* Error / Success Messages */}
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {successMessage && <p className="text-sm text-green-500 mt-2">{successMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className="w-full rounded-lg bg-indigo-600 py-2 text-white font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition transform hover:scale-105 duration-200"
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="w-4 h-4 border-4 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <a href="#" className="text-indigo-600 hover:underline">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
