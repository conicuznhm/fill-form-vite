export default function Input({ type, placeholder, name, value, onChange, error }) {
  return (
    <>
      <input
        className="w-full"
        type={type || "text"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="text-rose-700">{error}</div>}
    </>
  );
}
