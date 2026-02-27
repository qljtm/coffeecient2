export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal__image">
          <img src={product.image} alt={product.name} />
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal__body">
          <h3 className="modal__name">{product.name}</h3>
          <p className="modal__desc">{product.longDesc}</p>

          <div className="modal__meta">
            {product.tags.map((tag) => (
              <span key={tag} className="modal__tag">{tag}</span>
            ))}
          </div>

          <div className="modal__meta">
            {product.calories && <span className="modal__tag">🔥 {product.calories}</span>}
            {product.origin   && <span className="modal__tag">🌍 {product.origin}</span>}
          </div>

          <div className="modal__footer">
            <span className="modal__price">{product.price}</span>
            <button className="btn btn--primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
