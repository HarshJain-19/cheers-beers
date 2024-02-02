import React from 'react';
import Button from 'react-bootstrap/Button';

const Error = () => {
  return (
    <div style={{color: 'red', textAlign: 'center', marginTop: '2rem', fontSize: '2rem'}}>
      InValid Page.... <br />
      <Button variant="outline-primary">Click here to go Home</Button>
    </div>
  )
}

export default Error
