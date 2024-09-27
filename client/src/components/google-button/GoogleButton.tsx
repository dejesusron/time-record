import { GoogleLoginButton } from 'react-social-login-buttons';

const GoogleButton = () => {
  return (
    <GoogleLoginButton
      onClick={() => alert('Hello')}
      style={{
        boxShadow: 'none',
        border: '1px solid #c2c9d3',
        color: '#1f2937',
      }}
    >
      <span>Continue with Google</span>
    </GoogleLoginButton>
  );
};

export default GoogleButton;
