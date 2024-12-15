'use client';
import { useState } from 'react';


export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    country: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const countries = ['Vietnam', 'United States', 'Japan', 'Korea', 'China'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, phone, password, country } = formData;

    // Reset messages
    setError('');
    setSuccessMessage('');

    // Validation
    if (!email || !phone || !password || !country) {
      setError('All fields are required!');
      return;
    }

    // Start loading
    setLoading(true);

    // Fake API call simulation
    setTimeout(() => {
      console.log(formData);
      setSuccessMessage('Registration successful!');
      setFormData({ email: '', phone: '', password: '', country: '' });
      setLoading(false); // End loading
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Registration Logo"
                className="mx-auto h-10 w-auto"  />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mt-4">Create Your Account</h2>
          <p className="text-gray-600 mt-2">Sign up to explore the features!</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className={`block text-sm font-medium ${formData.phone ? 'text-black' : 'text-gray-700'}`}
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+84 123 456 789"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
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
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className={`block text-sm font-medium ${formData.country ? 'text-black' : 'text-gray-700'}`}
            >
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              required
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>


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
}
