// Registration Form Client Component
'use client';

import { useActionState, useState } from 'react';
import { registerAction, type FormState } from '@/app/actions/auth';
import Link from 'next/link';

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    registerAction,
    {}
  );

  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    if (!email) return 'ელ. ფოსტა აუცილებელია';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'გთხოვთ შეიყვანოთ ვალიდური ელ. ფოსტა';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'პაროლი აუცილებელია';
    if (password.length < 6) return 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო';
    return '';
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) return 'გაიმეორეთ პაროლი';
    if (password !== confirmPassword) return 'პაროლები არ ემთხვევა';
    return '';
  };

  const handleBlur = (field: string, value: string, passwordValue?: string) => {
    let error = '';
    switch (field) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(passwordValue || '', value);
        break;
    }
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <form className="space-y-4" action={formAction}>
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          ელ. ფოსტა
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            onBlur={(e) => handleBlur('email', e.target.value)}
            className={`w-full pl-3 pr-8 py-2 border rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 text-sm ${
              fieldErrors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="m@example.com"
          />
          <svg
            className="input-icon-custom"
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              fill: 'rgb(230, 0, 23)',
              position: 'absolute',
              bottom: '8px',
              right: '10px'
            }}
            viewBox="0 0 64 64"
          >
            <g>
              <path d="m20,28.12a33.78,33.78 0 0 1 13.36,2.74a22.18,22.18 0 0 1 0.64,5.32c0,9.43 -5.66,17.81 -14,20.94c-8.34,-3.13 -14,-11.51 -14,-20.94a22.2,22.2 0 0 1 0.64,-5.32a33.78,33.78 0 0 1 13.36,-2.74m0,-28.12c-8.82,0 -14,7.36 -14,16.41l0,5.16c2,-1.2 2,-1.49 5,-2.08l0,-3.08c0,-6.21 2.9,-11.41 8.81,-11.41l0.19,0c6.6,0 9,4.77 9,11.41l0,3.08c3,0.58 3,0.88 5,2.08l0,-5.16c0,-9 -5.18,-16.41 -14,-16.41l0,0zm0,22c-6.39,0 -12.77,0.67 -18.47,4a31.6,31.6 0 0 0 -1.53,9.74c0,13.64 8.52,25 20,28.26c11.48,-3.27 20,-14.63 20,-28.26a31.66,31.66 0 0 0 -1.54,-9.77c-5.69,-3.3 -12.08,-4 -18.47,-4l0,0l0.01,0.03z"></path>
              <path d="m21.23,39.5a2.81,2.81 0 0 0 1.77,-2.59a2.94,2.94 0 0 0 -3,-2.93a3,3 0 0 0 -3,3a2.66,2.66 0 0 0 1.77,2.48l-1.77,4.54l6,0l-1.77,-4.5z"></path>
            </g>
          </svg>
        </div>
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          პაროლი
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            onBlur={(e) => handleBlur('password', e.target.value)}
            className={`w-full pl-3 pr-8 py-2 border rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 text-sm ${
              fieldErrors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="••••••••"
          />
          <svg
            className="input-icon-custom"
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              fill: 'rgb(230, 0, 23)',
              marginTop: '0.5px',
              position: 'absolute',
              bottom: '8px',
              right: '10px'
            }}
            viewBox="0 0 20 20"
          >
            <g>
              <path d="M14.9127559,5.43359723 C13.9827216,4.58951985 12.8308672,4.0225262 11.5692789,3.80232854 C7.92872888,3.16142854 4.44202888,5.60772854 3.80367888,9.25082854 C3.49342888,11.0154285 3.89037888,12.7953285 4.91887888,14.2624285 C5.94822888,15.7286785 7.48757888,16.7078785 9.25217888,17.0164285 C11.1238789,17.3453785 13.0576289,16.8591785 14.5561789,15.6836285 C14.9259289,15.3920785 15.4605789,15.4575285 15.7487289,15.8272785 C16.0394289,16.1970285 15.9748289,16.7308285 15.6059289,17.0206785 C14.1141789,18.1919785 12.2764789,18.8167285 10.4056289,18.8167285 C9.92367888,18.8167285 9.44002888,18.7750785 8.95807888,18.6917785 C6.74637888,18.3033285 4.81772888,17.0776285 3.52742888,15.2382285 C2.23797888,13.4005285 1.74072888,11.1692785 2.12832888,8.95672854 C2.92902888,4.38967854 7.29292888,1.32712854 11.8633789,2.12697854 C13.4205324,2.40009833 14.8442726,3.09412153 16.0007123,4.12545035 L16.7423789,3.23367854 C16.9905789,2.93532854 17.4691289,3.01777854 17.6034289,3.38242854 L18.9506789,7.03657854 C19.0849789,7.40122854 18.7747289,7.77352854 18.3922289,7.70807854 L14.5536289,7.04762854 C14.1711289,6.98217854 14.0036789,6.52657854 14.2518789,6.22822854 L14.9127559,5.43359723 Z M8.04092888,10.3711285 C8.04092888,11.0570785 7.48502888,11.6121285 6.79992888,11.6121285 C6.11482888,11.6121285 5.55892888,11.0570785 5.55892888,10.3711285 C5.55892888,9.68602854 6.11482888,9.13012854 6.79992888,9.13012854 C7.48502888,9.13012854 8.04092888,9.68602854 8.04092888,10.3711285 Z M11.9713289,10.3711285 C11.9713289,11.0570785 11.4154289,11.6121285 10.7303289,11.6121285 C10.0443789,11.6121285 9.48932888,11.0570785 9.48932888,10.3711285 C9.48932888,9.68602854 10.0443789,9.13012854 10.7303289,9.13012854 C11.4154289,9.13012854 11.9713289,9.68602854 11.9713289,10.3711285 Z M16.1601289,10.3711285 C16.1601289,11.0570785 15.6042289,11.6121285 14.9191289,11.6121285 C14.2331789,11.6121285 13.6781289,11.0570785 13.6781289,10.3711285 C13.6781289,9.68602854 14.2331789,9.13012854 14.9191289,9.13012854 C15.6042289,9.13012854 16.1601289,9.68602854 16.1601289,10.3711285 Z"></path>
            </g>
          </svg>
        </div>
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          გაამეორეთ პაროლი
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            onBlur={(e) => {
              const passwordInput = document.getElementById('password') as HTMLInputElement;
              handleBlur('confirmPassword', e.target.value, passwordInput?.value);
            }}
            className={`w-full pl-3 pr-8 py-2 border rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 text-sm ${
              fieldErrors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="••••••••"
          />
          <svg
            className="input-icon-custom"
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              fill: 'rgb(230, 0, 23)',
              marginTop: '0.5px',
              position: 'absolute',
              bottom: '8px',
              right: '10px'
            }}
            viewBox="0 0 20 20"
          >
            <g>
              <path d="M14.9127559,5.43359723 C13.9827216,4.58951985 12.8308672,4.0225262 11.5692789,3.80232854 C7.92872888,3.16142854 4.44202888,5.60772854 3.80367888,9.25082854 C3.49342888,11.0154285 3.89037888,12.7953285 4.91887888,14.2624285 C5.94822888,15.7286785 7.48757888,16.7078785 9.25217888,17.0164285 C11.1238789,17.3453785 13.0576289,16.8591785 14.5561789,15.6836285 C14.9259289,15.3920785 15.4605789,15.4575285 15.7487289,15.8272785 C16.0394289,16.1970285 15.9748289,16.7308285 15.6059289,17.0206785 C14.1141789,18.1919785 12.2764789,18.8167285 10.4056289,18.8167285 C9.92367888,18.8167285 9.44002888,18.7750785 8.95807888,18.6917785 C6.74637888,18.3033285 4.81772888,17.0776285 3.52742888,15.2382285 C2.23797888,13.4005285 1.74072888,11.1692785 2.12832888,8.95672854 C2.92902888,4.38967854 7.29292888,1.32712854 11.8633789,2.12697854 C13.4205324,2.40009833 14.8442726,3.09412153 16.0007123,4.12545035 L16.7423789,3.23367854 C16.9905789,2.93532854 17.4691289,3.01777854 17.6034289,3.38242854 L18.9506789,7.03657854 C19.0849789,7.40122854 18.7747289,7.77352854 18.3922289,7.70807854 L14.5536289,7.04762854 C14.1711289,6.98217854 14.0036789,6.52657854 14.2518789,6.22822854 L14.9127559,5.43359723 Z M8.04092888,10.3711285 C8.04092888,11.0570785 7.48502888,11.6121285 6.79992888,11.6121285 C6.11482888,11.6121285 5.55892888,11.0570785 5.55892888,10.3711285 C5.55892888,9.68602854 6.11482888,9.13012854 6.79992888,9.13012854 C7.48502888,9.13012854 8.04092888,9.68602854 8.04092888,10.3711285 Z M11.9713289,10.3711285 C11.9713289,11.0570785 11.4154289,11.6121285 10.7303289,11.6121285 C10.0443789,11.6121285 9.48932888,11.0570785 9.48932888,10.3711285 C9.48932888,9.68602854 10.0443789,9.13012854 10.7303289,9.13012854 C11.4154289,9.13012854 11.9713289,9.68602854 11.9713289,10.3711285 Z M16.1601289,10.3711285 C16.1601289,11.0570785 15.6042289,11.6121285 14.9191289,11.6121285 C14.2331789,11.6121285 13.6781289,11.0570785 13.6781289,10.3711285 C13.6781289,9.68602854 14.2331789,9.13012854 14.9191289,9.13012854 C15.6042289,9.13012854 16.1601289,9.68602854 16.1601289,10.3711285 Z"></path>
            </g>
          </svg>
        </div>
        {fieldErrors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
        )}
      </div>

      {state.error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3">
          <div className="text-sm text-red-800">{state.error}</div>
        </div>
      )}

      {/* Register Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'რეგისტრაცია...' : 'რეგისტრაცია'}
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">ან გაგრძელება</span>
        </div>
      </div>

      {/* Google Register Button (Visual Only) */}
      <button
        type="button"
        disabled
        className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google-ით რეგისტრაცია
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 mt-4">
        უკვე გაქვთ ანგარიში?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          შესვლა
        </Link>
      </p>
    </form>
  );
}
