import { useState } from 'react';

const CourseInput: React.FunctionComponent = () => {
  const [course, setCourse] = useState('');
  return (
    <div>
      <h2>Rett</h2>
      <input value={course} onChange={(event) => setCourse(event.target.value)}>
        Eks: Spaghetti Bolognese
      </input>
    </div>
  );
};

export default CourseInput;
