import { GoogleLogo } from 'phosphor-react';
import Button from '../Button';

const AuthButton = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-40 py-3"
      icon={<GoogleLogo color="#F4F4F5" className="w-6 h-6" />}
    >
      Sign In
    </Button>
  );
};

export default AuthButton;
