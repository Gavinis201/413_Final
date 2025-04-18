import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEntertainers, addEntertainer, NewEntertainerForm } from '../api/api';
import { Entertainer } from '../types/entertainer';

const EntertainersList: React.FC = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newEntertainer, setNewEntertainer] = useState<NewEntertainerForm>({
    entStageName: '',
    entSsn: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: ''
  });

  useEffect(() => {
    const fetchEntertainers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('Fetching entertainers...');
        const data = await getEntertainers();
        console.log('Fetched entertainers:', data);
        setEntertainers(data);
      } catch (err) {
        console.error('Error fetching entertainers:', err);
        setError(err instanceof Error ? err.message : 'Failed to load entertainers');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntertainers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntertainer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEntertainer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntertainer.entStageName.trim()) {
      setError('Stage name is required');
      return;
    }

    try {
      console.log('Adding new entertainer:', newEntertainer);
      const newEntertainerData = await addEntertainer(newEntertainer);
      console.log('Added entertainer:', newEntertainerData);
      setEntertainers([...entertainers, newEntertainerData]);
      setNewEntertainer({
        entStageName: '',
        entSsn: '',
        entStreetAddress: '',
        entCity: '',
        entState: '',
        entZipCode: '',
        entPhoneNumber: '',
        entWebPage: '',
        entEmailAddress: ''
      });
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      console.error('Error adding entertainer:', err);
      setError(err instanceof Error ? err.message : 'Failed to add entertainer');
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
            <h2 className="mb-4" style={{ backgroundColor: '#0dcaf0', color: 'black', padding: '10px' }}>
            Entertainers
            </h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Stage Name</th>
                <th>Bookings</th>
                <th>Last Booked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entertainers.map((entertainer) => (
                <tr key={entertainer.entertainerId}>
                  <td>{entertainer.entStageName}</td>
                  <td>{entertainer.bookingCount ?? 0}</td>
                  <td>{entertainer.lastBookedDate || 'Never'}</td>
                  <td>
                    <Link 
                      to={`/entertainers/${entertainer.entertainerId}`}
                      className="btn btn-info btn-sm"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-4">
            {!showAddForm ? (
              <button
                className="btn btn-primary"
                onClick={() => setShowAddForm(true)}
              >
                Add New Entertainer
              </button>
            ) : (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Add New Entertainer</h5>
                  <form onSubmit={handleAddEntertainer}>
                    <div className="mb-3">
                      <label className="form-label">Stage Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="entStageName"
                        value={newEntertainer.entStageName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">SSN</label>
                      <input
                        type="text"
                        className="form-control"
                        name="entSsn"
                        value={newEntertainer.entSsn}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Street Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="entStreetAddress"
                        value={newEntertainer.entStreetAddress}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="entCity"
                        value={newEntertainer.entCity}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="entState"
                        value={newEntertainer.entState}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="entZipCode"
                        value={newEntertainer.entZipCode}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="entPhoneNumber"
                        value={newEntertainer.entPhoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Web Page</label>
                      <input
                        type="text"
                        className="form-control"
                        name="entWebPage"
                        value={newEntertainer.entWebPage}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="entEmailAddress"
                        value={newEntertainer.entEmailAddress}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainersList; 