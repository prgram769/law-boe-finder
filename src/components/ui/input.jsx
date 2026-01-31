function Input({ onChange, type, text, className }) {
  return (
    <input
      placeholder={text}
      type={type}
      className={className}
      onChange={onChange}
    />
  );
}

export { Input };
