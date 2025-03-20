import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { LogInIcon } from 'lucide-react';
import UserMenu from './UserMenu';

export default function AuthButton() {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return (
      <Button variant="ghost" className="flex items-center gap-2" disabled>
        <span className="h-4 w-4 animate-pulse rounded-full bg-primary/20"></span>
        <span className="hidden md:inline animate-pulse bg-primary/20 h-3 w-12 rounded"></span>
      </Button>
    );
  }

  if (isAuthenticated) {
    return <UserMenu />;
  }

  return (
    <Link href="/auth">
      <Button className="flex items-center gap-2">
        <LogInIcon className="h-4 w-4" />
        <span className="hidden md:inline">Sign In</span>
      </Button>
    </Link>
  );
}