'use client';

import { useState } from 'react';

const testimonials = [
  {
    img: '/gym/img/testimonial/testimonial-1.jpg',
    name: 'James Rodrigo',
    text: 'This gym completely transformed my lifestyle. The trainers are knowledgeable, supportive, and always push you to do better. Best investment I have ever made.',
  },
  {
    img: '/gym/img/testimonial/testimonial-2.jpg',
    name: 'Sarah Mitchell',
    text: 'Incredible facilities and a welcoming community. I lost 20 pounds in 3 months with their personalized nutrition and training plan. Highly recommend!',
  },
];

export default function GymTestimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="testimonial-section spad">
      <div className="container">
        <div className="section-title">
          <span>Testimonial</span>
          <h2>What Our Clients Say</h2>
        </div>

        <div className="testimonial-slider">
          {testimonials.map((t, i) => (
            <div key={i} className={`ts_item${i === current ? ' ts_item--active' : ''}`}>
              <div className="ti_pic">
                <img src={t.img} alt={t.name} />
              </div>
              <div className="ti_text">
                <p>{t.text}</p>
                <h5>{t.name}</h5>
                <div className="tt-rating">
                  {[...Array(5)].map((_, si) => (
                    <i key={si} className="fa fa-star" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot${i === current ? ' testimonial-dot--active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
