import { useAuthUser } from 'next-firebase-auth';
import { GoogleLogo } from 'phosphor-react';
import useAuth from '../../hooks/useAuth';
import Button from '../Button';

const AuthButton = () => {
  const { loginWithGoogle, logout } = useAuth();
  const user = useAuthUser();

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-40 py-3"
      icon={<GoogleLogo color="#F4F4F5" className="w-6 h-6" />}
      onClick={user.id ? logout : loginWithGoogle}
    >
      {user.id ? 'Sign Out' : 'Sign In'}
    </Button>
  );
};

export default AuthButton;
