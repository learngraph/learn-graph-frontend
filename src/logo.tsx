const Logo = ({ size = 100 }) => {
  return (
    <img
      src="/lg-logo-small-logo-only.png"
      alt="Logo"
      className="select-none"
      style={{ width: size, height: size }}
    />
  );
};

export default Logo;
