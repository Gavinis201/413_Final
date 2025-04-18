import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEntertainer, updateEntertainer, deleteEntertainer } from '../api/api';
import { Entertainer } from '../types/entertainer';

const EntertainerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntertainer = async () => {
      try {
        const data = await getEntertainer(Number(id));
        setEntertainer(data);
      } catch (err) {
        setError('Failed to load entertainer details');
        console.error(err);
      }
    };
    fetchEntertainer();
  }, [id]);

  const handleUpdate = async () => {
    if (!entertainer) return;
    try {
      await updateEntertainer(entertainer.entertainerId, entertainer);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update entertainer');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!entertainer) return;
    try {
      await deleteEntertainer(entertainer.entertainerId);
      navigate('/entertainers');
    } catch (err) {
      setError('Failed to delete entertainer');
      console.error(err);
    }
  };

  if (!entertainer) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2 className="mb-4">Entertainer Details</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Stage Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.entStageName}
                  onChange={(e) => setEntertainer({ ...entertainer, entStageName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">SSN</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.entSsn || ''}
                  onChange={(e) => setEntertainer({ ...entertainer, entSsn: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.entStreetAddress || ''}
                  onChange={(e) => setEntertainer({ ...entertainer, entStreetAddress: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.entCity || ''}
                  onChange={(e) => setEntertainer({ ...entertainer, entCity: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.entState || ''}
                  onChange={(e) => setEntertainer({ ...entertainer, entState: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.entZipCode || ''}
                  onChange={(e) => setEntertainer({ ...entertainer, entZipCode: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.entPhoneNumber || ''}
                  onChange={(e) => setEntertainer({ ...entertainer, entPhoneNumber: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Web Page</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.entWebPage || ''}
                  onChange={(e) => setEntertainer({ ...entertainer, entWebPage: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={entertainer.entEmailAddress || ''}
                  onChange={(e) => setEntertainer({ ...entertainer, entEmailAddress: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Date Entered</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.dateEntered || ''}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Booking Count</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.bookingCount ?? 0}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Last Booked</label>
                <input
                  type="text"
                  className="form-control"
                  value={entertainer.lastBookedDate || 'Never'}
                  disabled
                />
              </div>

              <div className="mt-4">
                {isEditing ? (
                  <button className="btn btn-primary me-2" onClick={handleUpdate}>
                    Save Changes
                  </button>
                ) : (
                  <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>
                    Edit
                  </button>
                )}
                <button className="btn btn-danger me-2" onClick={handleDelete}>
                  Delete
                </button>
                <Link to="/entertainers" className="btn btn-secondary">
                  Back to List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainerDetails; 