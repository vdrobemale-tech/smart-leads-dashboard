import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  LogIn,
} from 'lucide-react';

import { useAuthContext } from '../../context/AuthContext';

import Input from '../common/Input';
import Button from '../common/Button';

import toast from 'react-hot-toast';

const LoginForm = () => {
  const {
    login,
    loading,
    error,
    clearError,
  } = useAuthContext();

  const navigate = useNavigate();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [formErrors, setFormErrors] =
    useState<{
      email?: string;
      password?: string;
    }>({});

  const validate = (): boolean => {
    const errors: {
      email?: string;
      password?: string;
    } = {};

    if (!email.trim()) {
      errors.email =
        'Email is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      errors.email =
        'Please enter a valid email';
    }

    if (!password.trim()) {
      errors.password =
        'Password is required';
    } else if (password.length < 6) {
      errors.password =
        'Password must be at least 6 characters';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    clearError();

    if (!validate()) return;

    try {
      const result = await login({
        email: email.trim(),
        password,
      });

      if (
        result.meta.requestStatus ===
        'fulfilled'
      ) {
        toast.success(
          'Login successful!'
        );

        navigate('/dashboard');
      } else {
        toast.error('Login failed');
      }
    } catch (err) {
      console.error(err);

      toast.error(
        'Something went wrong'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);

          if (formErrors.email) {
            setFormErrors((prev) => ({
              ...prev,
              email: undefined,
            }));
          }
        }}
        error={formErrors.email}
        icon={
          <Mail className="w-4 h-4 text-gray-400" />
        }
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);

          if (formErrors.password) {
            setFormErrors((prev) => ({
              ...prev,
              password: undefined,
            }));
          }
        }}
        error={formErrors.password}
        icon={
          <Lock className="w-4 h-4 text-gray-400" />
        }
      />

      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <Button
        type="submit"
        loading={loading}
        disabled={loading}
        className="w-full"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;