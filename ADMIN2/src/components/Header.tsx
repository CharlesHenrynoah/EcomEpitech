import { useAuth } from '@/contexts/AuthContext';
export function Header() {
  const {
    user
  } = useAuth();
  return <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      
    </header>;
}