export default function FormGroup({ label, id, type = "text", placeholder, value, onChange, onKeyDown, error }) {
  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={id}>{label}</label>
      <input
        id={id}
        className="form-group__input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoComplete="off"
      />
      {error && <p className="form-group__error">{error}</p>}
    </div>
  );
}
