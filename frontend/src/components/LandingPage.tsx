import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-vh-100 bg-primary text-white">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="display-4 fw-bold mb-4">
              Welcome to the Entertainment Agency
            </h1>
            <p className="lead mb-5">
              Your premier destination for booking top-tier entertainment talent.
              Discover amazing performers and make your event unforgettable!
            </p>
            <Link
              to="/entertainers"
              className="btn btn-light btn-lg px-5 py-3 rounded-pill text-primary fw-bold"
            >
              View Our Entertainers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 