import { useState } from "react";
import Footer from "../components/Footer.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { PRODUCTS } from "../data/data.js";

export default function ProductsPage({ user, setPage }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="page">
      <div className="products-header">
        <h1 className="products-header__title anim-fade-up">Our Menu</h1>
        <p className="products-header__sub anim-fade-up-d1">Crafted with care, served with love</p>
      </div>

      {!user && (
        <div className="member-banner">
          <button onClick={() => setPage("register")}>Join as a member</button>
          &nbsp;for exclusive deals and early access to seasonal specials ☕
        </div>
      )}

      <div className="products-grid">
        {PRODUCTS.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-card__image">
              <img src={product.image} alt={product.name} />
              {product.badge && (
                <span className="product-card__badge">{product.badge}</span>
              )}
            </div>

            <div className="product-card__body">
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__desc">{product.desc}</p>

              <div className="product-card__footer">
                <span className="product-card__price">{product.price}</span>
                <button
                  className="btn btn--dark"
                  onClick={() => setSelectedProduct(product)}
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
