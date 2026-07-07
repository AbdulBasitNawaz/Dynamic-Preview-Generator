'use client';

import { useState } from 'react';

const BMI_TABLE = [
  { range: 'Below 18.5', status: 'Underweight' },
  { range: '18.5 – 24.9', status: 'Healthy' },
  { range: '25.0 – 29.9', status: 'Overweight' },
  { range: '30.0 and Above', status: 'Obese' },
];

function getBMICategory(bmi) {
  if (bmi < 18.5) return { status: 'Underweight', color: '#3b82f6' };
  if (bmi < 25) return { status: 'Healthy', color: '#22c55e' };
  if (bmi < 30) return { status: 'Overweight', color: '#f59e0b' };
  return { status: 'Obese', color: '#ef4444' };
}

export default function GymBMICalculator() {
  const [form, setForm] = useState({ height: '', weight: '', age: '', sex: 'male' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const calculate = e => {
    e.preventDefault();
    const h = parseFloat(form.height);
    const w = parseFloat(form.weight);
    if (!h || !w || h <= 0 || w <= 0) {
      setError('Please enter valid height and weight.');
      setResult(null);
      return;
    }
    setError('');
    const heightM = h / 100;
    const bmi = (w / (heightM * heightM)).toFixed(1);
    setResult({ bmi, ...getBMICategory(parseFloat(bmi)) });
  };

  return (
    <section className="bmi-calculator-section spad">
      <div className="container">
        <div className="bmi-row">
          {/* Chart Table */}
          <div className="bmi-col">
            <div className="section-title">
              <span>Check your body</span>
              <h2>BMI CALCULATOR CHART</h2>
            </div>
            <div className="chart-table">
              <table>
                <thead>
                  <tr>
                    <th>BMI</th>
                    <th>Weight Status</th>
                  </tr>
                </thead>
                <tbody>
                  {BMI_TABLE.map((row, i) => (
                    <tr key={i}>
                      <td className="point">{row.range}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calculator Form */}
          <div className="bmi-col">
            <div className="section-title">
              <span>Check your body</span>
              <h2>CALCULATE YOUR BMI</h2>
            </div>
            <div className="chart-calculate-form">
              <p>Enter your details below to calculate your Body Mass Index and get your health status instantly.</p>
              <form onSubmit={calculate}>
                <div className="bmi-form-grid">
                  <input
                    type="number"
                    name="height"
                    placeholder="Height (cm)"
                    value={form.height}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="weight"
                    placeholder="Weight (kg)"
                    value={form.weight}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                  />
                  <select name="sex" value={form.sex} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <button type="submit" className="bmi-submit">Calculate</button>
                </div>
              </form>

              {error && <p className="bmi-error">{error}</p>}

              {result && (
                <div className="bmi-result" style={{ borderColor: result.color }}>
                  <div className="bmi-result-number" style={{ color: result.color }}>
                    BMI: {result.bmi}
                  </div>
                  <div className="bmi-result-status" style={{ color: result.color }}>
                    {result.status}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
