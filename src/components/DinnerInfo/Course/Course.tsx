import React from 'react';

//This will be the name of the course
const Course: React.FunctionComponent = () => {
  const course = React.useState('Pasta med reker');

  return (
    <div>
      {
        //det under er en eksempelrett
      }
      <h1 className="courseHeadline">{course}</h1>
    </div>
  );
};

export default Course;
