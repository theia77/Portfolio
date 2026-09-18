export function Container({ children, className = "", as: Component = "div" }) {
  return (
    <Component className={`mx-auto w-full max-w-content px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </Component>
  );
}
