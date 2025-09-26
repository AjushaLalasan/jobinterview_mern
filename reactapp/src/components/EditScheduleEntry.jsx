import React, { useEffect, useState } from 'react';
import { getScheduleById, updateSchedule } from '../services/scheduleService';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditScheduleEntry() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getScheduleById(id).then(data => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSchedule(id, formData);
    navigate('/view');
  };

  return (
    <div className="form-container">
      <h2>Edit Schedule Entry</h2>
      <form onSubmit={handleSubmit}>
        {formData && Object.keys(formData).map((field) => (
          field !== 'id' && (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          )
        ))}
        <button type="submit">Update Entry</button>
      </form>
    </div>
  );
}
