'use client';

import { useState } from 'react';
import CustomLink from '@/components/CustomLink';

const trainers = [
  { name: 'Rachel Athart', role: 'Gym Trainer', img: '/gym/img/team/team-1.jpg' },
  { name: 'Marcus Stone', role: 'Boxing Coach', img: '/gym/img/team/team-2.jpg' },
  { name: 'Sara Williams', role: 'Yoga Instructor', img: '/gym/img/team/team-3.jpg' },
  { name: 'David Kim', role: 'Cardio Specialist', img: '/gym/img/team/team-4.jpg' },
  { name: 'Lisa Chen', role: 'Nutrition Coach', img: '/gym/img/team/team-5.jpg' },
  { name: 'Tom Harris', role: 'Strength Coach', img: '/gym/img/team/team-6.jpg' },
];

export default function GymTeam() {
  const [current, setCurrent] = useState(0);
  const visible = 3;
  const maxStart = trainers.length - visible;

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxStart, c + 1));

  return (
    <section className="team-section spad">
      <div className="container">
        <div className="team-title">
          <div className="section-title">
            <span>Our Team</span>
            <h2>TRAIN WITH EXPERTS</h2>
          </div>
          <CustomLink href="/contact" className="primary-btn btn-normal appoinment-btn">Appointment</CustomLink>
        </div>

        <div className="team-slider-wrapper">
          <button className="team-arrow team-arrow--prev" onClick={prev} disabled={current === 0}>
            <i className="fa fa-angle-left" />
          </button>

          <div className="team-slider">
            {trainers.slice(current, current + visible).map((trainer, i) => (
              <div key={i} className="ts-item" style={{ backgroundImage: `url(${trainer.img})` }}>
                <div className="ts_text">
                  <h4>{trainer.name}</h4>
                  <span>{trainer.role}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="team-arrow team-arrow--next" onClick={next} disabled={current >= maxStart}>
            <i className="fa fa-angle-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
