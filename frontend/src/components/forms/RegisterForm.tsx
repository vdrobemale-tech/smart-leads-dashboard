import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const { register, loading, error, clearError } = useAuthContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string | undefined>>({});

  const validate = (): boolean => {
    const errors: Record<string, string | undefined> = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    const result = await register({ name: name.trim(), email: email.trim(), password });

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Registration successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.payload || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={formErrors.name}
          icon={<User className="w-4 h-4 text-gray-400" />}
        />
      </div>

      <div>
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={formErrors.email}
          icon={<Mail className="w-4 h-4 text-gray-400" />}
        />
      </div>

      <div>
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (formErrors.password) setFormErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={formErrors.password}
          icon={<Lock className="w-4 h-4 text-gray-400" />}
        />
      </div>

      <div>
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (formErrors.confirmPassword) setFormErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          error={formErrors.confirmPassword}
          icon={<Lock className="w-4 h-4 text-gray-400" />}
        />
      </div>

      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <Button type="submit" loading={loading} className="w-full">
        <UserPlus className="w-4 h-4" />
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;