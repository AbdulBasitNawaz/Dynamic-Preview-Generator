import CustomLink from '@/components/CustomLink';

const classes = [
  { img: '/gym/img/classes/class-1.jpg', category: 'STRENGTH', name: 'Weightlifting', wide: false },
  { img: '/gym/img/classes/class-2.jpg', category: 'Cardio', name: 'Indoor Cycling', wide: false },
  { img: '/gym/img/classes/class-3.jpg', category: 'STRENGTH', name: 'Kettlebell Power', wide: false },
  { img: '/gym/img/classes/class-4.jpg', category: 'Cardio', name: 'Indoor Cycling', wide: true },
  { img: '/gym/img/classes/class-5.jpg', category: 'Training', name: 'Boxing', wide: true },
];

export default function GymClasses() {
  return (
    <section className="classes-section spad">
      <div className="container">
        <div className="section-title">
          <span>Our Classes</span>
          <h2>WHAT WE CAN OFFER</h2>
        </div>
        <div className="classes-grid">
          {classes.map((cls, i) => (
            <div key={i} className={`class-item${cls.wide ? ' class-item--wide' : ''}`}>
              <div className="ci-pic">
                <img src={cls.img} alt={cls.name} />
              </div>
              <div className="ci-text">
                <span>{cls.category}</span>
                <h5>{cls.name}</h5>
                <CustomLink href="/classes"><i className="fa fa-angle-right" /></CustomLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
