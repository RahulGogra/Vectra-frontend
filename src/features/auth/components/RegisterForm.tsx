import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const RegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [showPass, setShowPass] = useState(false);

  const { mutate: doRegister, isPending, error, isError } = useRegister();

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doRegister(form);
  };

  // Parse Django field errors from the API response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as any;
  const apiErrors: Record<string, string[]> = isError && err?.response?.data
    ? err.response.data
    : {};

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/3 -left-32 h-72 w-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 h-72 w-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <Link to="/" className="absolute -top-12 left-0 text-sm font-medium text-muted hover:text-main flex items-center gap-1 transition-colors">
          ← Back to Vectra
        </Link>
        {/* Brand header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow mb-4">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-main">Create your account</h1>
          <p className="text-muted mt-1 text-sm">Start managing projects with Vectra</p>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-8">
          {apiErrors.non_field_errors && (
            <div className="mb-5 rounded-xl bg-danger/10 border border-danger/20 px-4 py-3 text-sm text-danger">
              {apiErrors.non_field_errors[0]}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="register-first-name"
                label="First name"
                placeholder="Jane"
                value={form.first_name}
                onChange={set('first_name')}
                icon={<User className="h-4 w-4" />}
                error={apiErrors.first_name?.[0]}
                required
              />
              <Input
                id="register-last-name"
                label="Last name"
                placeholder="Doe"
                value={form.last_name}
                onChange={set('last_name')}
                error={apiErrors.last_name?.[0]}
                required
              />
            </div>

            <Input
              id="register-email"
              type="email"
              label="Email address"
              placeholder="you@company.com"
              value={form.email}
              onChange={set('email')}
              icon={<Mail className="h-4 w-4" />}
              error={apiErrors.email?.[0]}
              required
              autoComplete="email"
            />

            <Input
              id="register-password"
              type={showPass ? 'text' : 'password'}
              label="Password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={set('password')}
              icon={<Lock className="h-4 w-4" />}
              error={apiErrors.password?.[0]}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="hover:text-main transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              required
              autoComplete="new-password"
              minLength={8}
            />

            <Button
              id="register-submit"
              type="submit"
              fullWidth
              size="lg"
              loading={isPending}
              icon={<ArrowRight className="h-4 w-4" />}
              className="mt-2"
            >
              Create account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
