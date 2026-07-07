const services = [
  {
    img: '/gym/img/services/services-1.jpg',
    title: 'Personal Training',
    desc: 'One-on-one coaching sessions crafted around your fitness level, goals, and schedule for maximum results.',
  },
  {
    img: '/gym/img/services/services-2.jpg',
    title: 'Group Fitness Classes',
    desc: 'High-energy group classes in boxing, cycling, yoga, and more — all led by certified instructors.',
  },
  {
    img: '/gym/img/services/services-3.jpg',
    title: 'Strength Training',
    desc: 'Progressive resistance programs designed to build lean muscle, improve posture, and boost metabolism.',
  },
  {
    img: '/gym/img/services/services-4.jpg',
    title: 'Body Building',
    desc: 'Advanced hypertrophy and periodization programs for dedicated athletes looking to maximize muscle mass.',
  },
];

export default function GymServices() {
  return (
    <section className="services-section spad">
      <div className="container">
        <div className="section-title">
          <span>What we do?</span>
          <h2>PUSH YOUR LIMITS FORWARD</h2>
        </div>
        <div className="services-grid">
          {services.map((svc, i) => (
            <div key={i} className={`service-pair${i % 2 === 0 ? '' : ' service-pair--reverse'}`}>
              <div className="ss-pic">
                <img src={svc.img} alt={svc.title} />
              </div>
              <div className="ss-text">
                <h4>{svc.title}</h4>
                <p>{svc.desc}</p>
                <a href="#">Explore</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
