import CustomLink from '@/components/CustomLink';

const plans = [
  {
    name: 'Class Drop-in',
    price: '39.0',
    period: 'SINGLE CLASS',
    features: ['Free riding', 'Unlimited equipment', 'Personal trainer', 'Weight losing classes', 'Month to month', 'No time restriction'],
  },
  {
    name: '12 Month Unlimited',
    price: '99.0',
    period: 'PER MONTH',
    features: ['Free riding', 'Unlimited equipment', 'Personal trainer', 'Weight losing classes', 'Month to month', 'No time restriction'],
    featured: true,
  },
  {
    name: '6 Month Unlimited',
    price: '59.0',
    period: 'PER MONTH',
    features: ['Free riding', 'Unlimited equipment', 'Personal trainer', 'Weight losing classes', 'Month to month', 'No time restriction'],
  },
];

export default function GymPricing() {
  return (
    <section className="pricing-section spad">
      <div className="container">
        <div className="section-title">
          <span>Our Plan</span>
          <h2>Choose Your Pricing Plan</h2>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div key={i} className={`ps-item${plan.featured ? ' ps-item--featured' : ''}`}>
              <h3>{plan.name}</h3>
              <div className="pi-price">
                <h2>$ {plan.price}</h2>
                <span>{plan.period}</span>
              </div>
              <ul>
                {plan.features.map((f, fi) => (
                  <li key={fi}>{f}</li>
                ))}
              </ul>
              <CustomLink href="/contact" className="primary-btn pricing-btn">Enroll Now</CustomLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
