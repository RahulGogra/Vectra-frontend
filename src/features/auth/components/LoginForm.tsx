import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [searchParams] = useSearchParams();
  const justRegistered = searchParams.get('registered') === '1';

  const { mutate: doLogin, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doLogin({ email, password });
  };

  const apiError = error
    ? 'Invalid email or password. Please try again.'
    : null;

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 h-64 w-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Brand header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow mb-4">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-main">Welcome back</h1>
          <p className="text-muted mt-1 text-sm">Sign in to your Vectra workspace</p>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-8">
          {justRegistered && (
            <div className="mb-5 rounded-xl bg-success/10 border border-success/20 px-4 py-3 text-sm text-success">
              🎉 Account created! Sign in to continue.
            </div>
          )}

          {apiError && (
            <div className="mb-5 rounded-xl bg-danger/10 border border-danger/20 px-4 py-3 text-sm text-danger">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="login-email"
              type="email"
              label="Email address"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
              autoComplete="email"
            />

            <Input
              id="login-password"
              type={showPass ? 'text' : 'password'}
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
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
              autoComplete="current-password"
            />

            <Button
              id="login-submit"
              type="submit"
              fullWidth
              size="lg"
              loading={isPending}
              icon={<ArrowRight className="h-4 w-4" />}
              className="mt-2"
            >
              Sign in
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-primary-hover font-medium transition-colors">
            Create one →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;