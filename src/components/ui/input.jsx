function Input({onChange, type, text}) {
  return (
    <section className="flex flex-col justify-center">
      <input
        placeholder={text}
        type={type} 
        className="border-2 border-black rounded sm:w-1/6 px-2 py-2 m-2"
        onChange={onChange}
      />
    </section>
  );
}

export { Input };
