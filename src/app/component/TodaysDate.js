import React from 'react';

const TodaysDate = () => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default TodaysDate;