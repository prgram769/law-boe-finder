function Input({max, onChange, type, text, className }) {
  return (
    <input
      min={0}
      max={max}
      placeholder={text}
      type={type}
      className={className}
      onChange={onChange}
    />
  );
}

export { Input };
