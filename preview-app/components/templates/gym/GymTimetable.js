const schedule = [
  {
    time: '06:00 - 07:00',
    monday: { name: 'Yoga', trainer: 'Sara W.' },
    tuesday: { name: 'Boxing', trainer: 'Marcus S.' },
    wednesday: { name: 'Cycling', trainer: 'David K.' },
    thursday: { name: 'Yoga', trainer: 'Sara W.' },
    friday: { name: 'Strength', trainer: 'Tom H.' },
    saturday: { name: 'HIIT', trainer: 'Lisa C.' },
  },
  {
    time: '08:00 - 09:00',
    monday: { name: 'Weightlifting', trainer: 'Tom H.' },
    tuesday: { name: 'Cycling', trainer: 'David K.' },
    wednesday: { name: 'Boxing', trainer: 'Marcus S.' },
    thursday: { name: 'Strength', trainer: 'Tom H.' },
    friday: { name: 'HIIT', trainer: 'Lisa C.' },
    saturday: { name: 'Yoga', trainer: 'Sara W.' },
  },
  {
    time: '10:00 - 11:00',
    monday: { name: 'HIIT', trainer: 'Rachel A.' },
    tuesday: { name: 'Strength', trainer: 'Tom H.' },
    wednesday: { name: 'Yoga', trainer: 'Sara W.' },
    thursday: { name: 'Cycling', trainer: 'David K.' },
    friday: { name: 'Boxing', trainer: 'Marcus S.' },
    saturday: { name: 'Weightlifting', trainer: 'Tom H.' },
  },
  {
    time: '12:00 - 13:00',
    monday: { name: 'Cycling', trainer: 'David K.' },
    tuesday: { name: 'HIIT', trainer: 'Rachel A.' },
    wednesday: { name: 'Strength', trainer: 'Tom H.' },
    thursday: { name: 'Boxing', trainer: 'Marcus S.' },
    friday: { name: 'Yoga', trainer: 'Sara W.' },
    saturday: { name: 'HIIT', trainer: 'Rachel A.' },
  },
  {
    time: '17:00 - 18:00',
    monday: { name: 'Boxing', trainer: 'Marcus S.' },
    tuesday: { name: 'Yoga', trainer: 'Sara W.' },
    wednesday: { name: 'HIIT', trainer: 'Rachel A.' },
    thursday: { name: 'Weightlifting', trainer: 'Tom H.' },
    friday: { name: 'Cycling', trainer: 'David K.' },
    saturday: null,
  },
];

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function GymTimetable() {
  return (
    <section className="timetable-section spad">
      <div className="container">
        <div className="section-title">
          <span>Our Schedule</span>
          <h2>CLASS TIMETABLE</h2>
        </div>
        <div className="timetable-wrap">
          <table className="timetable">
            <thead>
              <tr>
                <th>Time</th>
                {dayLabels.map(d => <th key={d}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => (
                <tr key={i}>
                  <td className="time-cell">{row.time}</td>
                  {days.map(day => (
                    <td key={day}>
                      {row[day] ? (
                        <div className="tt-cell">
                          <span className="tt-class">{row[day].name}</span>
                          <span className="tt-trainer">{row[day].trainer}</span>
                        </div>
                      ) : (
                        <span className="tt-empty">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
