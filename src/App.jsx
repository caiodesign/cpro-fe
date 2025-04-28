import React, { useState } from 'react';
import './index.css';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isUsernameValid = username.length >= 6;
  const isPasswordValid = password.length >= 6;
  const requirementValid = isUsernameValid && isPasswordValid;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://cpro.ddns.net:3000/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setError(msg || 'An error occurred.');
      } else {
        setSuccess(true);
      }
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="hidden lg:flex flex-1 relative overflow-hidden cpro-bg" style={{maxWidth: '40%'}}>
        <div className="absolute top-6 left-6 text-white text-2xl font-bold">
          <a href="#">
            <div className='cpro-logo h-24 w-24'>
            </div>
          </a>
        </div>
      </div>
      


      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md p-8">
          {!success && (<h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Your <b>CPRO</b> Account
          </h2>)}

          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}

{
        success ? (
          <div className="flex items-center justify-center">
            <div className="bg-white p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Account created!</h2>
              <p className="text-gray-600">
                Welcome aboard, <b>{username}</b>!
              </p>
            </div>
          </div>
        ) : (          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-gray-600">Username*</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="john_wick"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Email*</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="johnwick@gmail.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 text-gray-600">Password*</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="px#Qszxza1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 flex items-center"
                style={{ top: '56%' }}
              >
                {showPassword ? (
                  <svg width="20" height="20" fill="none" stroke="gray" viewBox="0 0 24 24">
                    <path d="M3 3l18 18M10 10a4 4 0 014 4m0 0a4 4 0 01-4 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" stroke="gray" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p>Minimal requirements:</p>
              <ul className="flex flex-col space-y-1 mt-2">
                <li className="flex items-center">
                  <span
                    className={`inline-block w-4 h-4 mr-2 rounded-full ${
                      requirementValid ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  Username & Password must be at least 6 characters
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={!requirementValid}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                requirementValid
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              SIGN ME UP!
            </button>

            <p className="text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <a href="#" className="text-blue-500 hover:underline disabled">
                Log in
              </a>{' '}(soon)
            </p>
          </form>)
      }


          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">Download</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <a href="https://drive.google.com/drive/folders/1TGvdcM_zyaduKW5QyTd_LExrFkpl6Wht?usp=sharing">
            <button className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
              <div className="h-5 w-5 mr-2 drive-logo"></div>
              Download CPRO Client
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
