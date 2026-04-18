import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const propertyTypes = ['apartment', 'house', 'villa', 'office', 'shop'];
const transactionTypes = ['rent', 'sale'];

const PropertyForm = ({ onSubmit, loading, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      transactionType: 'rent',
      propertyType: 'apartment',
      country: 'India',
      amenities: '',
      photoUrl: '',
    },
  });

  const [message, setMessage] = useState(null);

  const submitHandler = async (values) => {
    const propertyData = {
      title: values.title,
      description: values.description,
      propertyType: values.propertyType,
      transactionType: values.transactionType,
      price: Number(values.price),
      area: Number(values.area),
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms),
      address: {
        street: values.street,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        country: values.country || 'India',
      },
      amenities: values.amenities
        ? values.amenities.split(',').map((amenity) => amenity.trim()).filter(Boolean)
        : [],
      photos: values.photoUrl
        ? [{ url: values.photoUrl, alt: values.photoAlt || values.title, order: 0 }]
        : [],
    };

    setMessage(null);

    try {
      await onSubmit(propertyData);
      setMessage('Property created successfully.');
    } catch (submitError) {
      setMessage(null);
    }
  };

  return (
    <div className="property-form-container">
      <h2>Create a Property Listing</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Title</label>
          <input {...register('title', { required: 'Title is required', minLength: 10, maxLength: 100 })} />
          {errors.title && <span>{errors.title.message || 'Title must be 10-100 characters'}</span>}
        </div>

        <div>
          <label>Description</label>
          <textarea {...register('description', { required: 'Description is required', minLength: 50, maxLength: 2000 })} />
          {errors.description && <span>{errors.description.message || 'Description must be 50-2000 characters'}</span>}
        </div>

        <div>
          <label>Property Type</label>
          <select {...register('propertyType', { required: true })}>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Transaction Type</label>
          <select {...register('transactionType', { required: true })}>
            {transactionTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Price</label>
          <input type="number" {...register('price', { required: 'Price is required', min: 1 })} />
          {errors.price && <span>{errors.price.message || 'Enter a valid price'}</span>}
        </div>

        <div>
          <label>Area (sq ft)</label>
          <input type="number" {...register('area', { required: 'Area is required', min: 1 })} />
          {errors.area && <span>{errors.area.message || 'Enter a valid area'}</span>}
        </div>

        <div>
          <label>Bedrooms</label>
          <input type="number" {...register('bedrooms', { required: 'Bedrooms is required', min: 0, max: 20 })} />
          {errors.bedrooms && <span>{errors.bedrooms.message || 'Enter a valid bedroom count'}</span>}
        </div>

        <div>
          <label>Bathrooms</label>
          <input type="number" {...register('bathrooms', { required: 'Bathrooms is required', min: 0, max: 20 })} />
          {errors.bathrooms && <span>{errors.bathrooms.message || 'Enter a valid bathroom count'}</span>}
        </div>

        <fieldset>
          <legend>Address</legend>
          <div>
            <label>Street</label>
            <input {...register('street', { required: 'Street is required' })} />
            {errors.street && <span>{errors.street.message}</span>}
          </div>
          <div>
            <label>City</label>
            <input {...register('city', { required: 'City is required' })} />
            {errors.city && <span>{errors.city.message}</span>}
          </div>
          <div>
            <label>State</label>
            <input {...register('state', { required: 'State is required' })} />
            {errors.state && <span>{errors.state.message}</span>}
          </div>
          <div>
            <label>Pincode</label>
            <input {...register('pincode', { required: 'Pincode is required', pattern: { value: /^[0-9]{5,10}$/, message: 'Enter a valid pincode' } })} />
            {errors.pincode && <span>{errors.pincode.message}</span>}
          </div>
          <div>
            <label>Country</label>
            <input {...register('country')} />
          </div>
        </fieldset>

        <div>
          <label>Amenities (comma-separated)</label>
          <input {...register('amenities')} />
        </div>

        <div>
          <label>Photo URL</label>
          <input {...register('photoUrl', { required: 'At least one photo URL is required' })} />
          {errors.photoUrl && <span>{errors.photoUrl.message}</span>}
        </div>

        <div>
          <label>Photo alt text</label>
          <input {...register('photoAlt')} />
        </div>

        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create Property'}</button>
      </form>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PropertyForm;
