const features = [
  {
    icon: 'flaticon-034-stationary-bike',
    title: 'Modern Equipment',
    desc: 'State-of-the-art machines and free weights to support every fitness level and goal.',
  },
  {
    icon: 'flaticon-033-juice',
    title: 'Healthy Nutrition Plan',
    desc: 'Expert nutritional guidance crafted to complement your training and accelerate results.',
  },
  {
    icon: 'flaticon-002-dumbell',
    title: 'Professional Training Plan',
    desc: 'Personalized workout programs designed by certified coaches for maximum performance.',
  },
  {
    icon: 'flaticon-014-heart-beat',
    title: 'Unique to Your Needs',
    desc: 'Every member gets a tailored experience so you can train smarter and see real progress.',
  },
];

export default function GymWhyUs() {
  return (
    <section className="choseus-section spad">
      <div className="container">
        <div className="section-title">
          <span>Why choose us?</span>
          <h2>PUSH YOUR LIMITS FORWARD</h2>
        </div>
        <div className="choseus-grid">
          {features.map((f, i) => (
            <div key={i} className="cs-item">
              <span className={f.icon} />
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
