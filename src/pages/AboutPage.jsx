import Footer from "../components/Footer.jsx";
import { TEAM, STATS } from "../data/data.js";

export default function AboutPage() {
  return (
    <div className="page">
      <div className="about-wrapper">
        <div className="about-hero">
          <div className="about-image anim-fade-in">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
              alt="Barista at work"
            />
          </div>

          <div className="about-text anim-fade-up">
            <h2 className="about-text__heading">
              A Passion Brewed <em>Over Decades</em>
            </h2>
            <p>Coffeecient began in 2001 as a tiny kiosk on a rainy Portland corner — a single espresso machine, two bar stools, and an obsession with perfect coffee.</p>
            <p>Today we're a beloved gathering place, but our philosophy hasn't changed: treat every cup like a handwritten letter to the person who'll drink it.</p>
            <p>We believe coffee is more than caffeine — it's connection, ritual, and a tiny daily luxury that belongs to everyone.</p>

            <div className="about-stats">
              {STATS.map(({ number, label }) => (
                <div key={label}>
                  <span className="stat__number">{number}</span>
                  <div className="stat__label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="section-header">
          <h2 className="section-header__title">Meet Our Crew</h2>
          <p className="section-header__sub">The humans behind your perfect cup</p>
        </div>

        <div className="team-grid">
          {TEAM.map(({ image, name, role }) => (
            <div className="team-card" key={name}>
              <div className="team-card__avatar">
                <img src={image} alt={name} />
              </div>
              <h4 className="team-card__name">{name}</h4>
              <span className="team-card__role">{role}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
