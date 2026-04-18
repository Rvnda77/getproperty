import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../components/PropertyForm';
import { createProperty } from '../store/slices/propertySlice';

const CreateProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateProperty = async (propertyData) => {
    setLoading(true);
    setError(null);

    try {
      await dispatch(createProperty(propertyData)).unwrap();
      navigate('/');
    } catch (err) {
      setError(err || 'Unable to create property.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <PropertyForm onSubmit={handleCreateProperty} loading={loading} error={error} />
    </div>
  );
};

export default CreateProperty;
