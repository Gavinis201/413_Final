import React from 'react';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Welcome to Entertainment Agency</h1>
          <p className="lead mb-4">
            Your one-stop destination for booking top-notch entertainers for any occasion.
          </p>
          <Link to="/entertainers" className="btn btn-primary btn-lg">
            View Entertainers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
