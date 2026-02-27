import Footer from "../components/Footer.jsx";
import { FEATURES } from "../data/data.js";

export default function HomePage({ setPage, user }) {
  return (
    <div className="page">
      <section className="hero">
        <img
          className="hero__bg"
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=80"
          alt="Coffee shop interior"
        />
        <div className="hero__overlay" />

        <div className="hero__inner">
          <h1 className="hero__title anim-fade-up">
            Where Every Sip<br />Tells a <em>Story.</em>
          </h1>
          <p className="hero__subtitle anim-fade-up-d1">
            Handcrafted coffees, artisan pastries, and a warm corner of the world — all waiting for you at Coffeecient.
          </p>
          <div className="hero__btns anim-fade-up-d2">
            <button className="btn btn--primary" onClick={() => setPage("products")}>
              Explore Our Menu
            </button>
            {!user && (
              <button className="btn btn--outline" onClick={() => setPage("register")}>
                Become a Member
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        {FEATURES.map(({ image, title, desc }) => (
          <div className="feature-card" key={title}>
            <img className="feature-card__img" src={image} alt={title} />
            <h3 className="feature-card__title">{title}</h3>
            <p className="feature-card__desc">{desc}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
