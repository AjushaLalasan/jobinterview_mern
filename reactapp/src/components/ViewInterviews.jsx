import React, { useEffect, useState } from 'react';

const ViewInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [editingInterview, setEditingInterview] = useState(null);
  const [formData, setFormData] = useState({
    candidateName: '',
    companyName: '',
    jobTitle: '',
    interviewDate: '',
    interviewType: '',
    status: '',
    feedback: ''
  });

  // Fetch all interviews
  const fetchInterviews = async () => {
    const res = await fetch('https://8080-cbcfadadebd329831151bccfaccecfeight.premiumproject.examly.io/api/interviews');
    if (res.ok) {
      const data = await res.json();
      setInterviews(data);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  // Handle input change for editing form
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Start editing a particular interview
  const handleEditClick = (interview) => {
    setEditingInterview(interview.interviewId);
    setFormData({
      candidateName: interview.candidateName || '',
      companyName: interview.companyName || '',
      jobTitle: interview.jobTitle || '',
      interviewDate: interview.interviewDate || '',
      interviewType: interview.interviewType || '',
      status: interview.status || '',
      feedback: interview.feedback || ''
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingInterview(null);
  };

  // Submit updated interview to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://8080-cbcfadadebd329831151bccfaccecfeight.premiumproject.examly.io/api/interviews/${editingInterview}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert('Interview updated successfully!');
      setEditingInterview(null);
      fetchInterviews();
    } else {
      alert('Failed to update interview');
    }
  };

  // Delete interview
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this interview?')){
      const res = await fetch(`https://8080-cbcfadadebd329831151bccfaccecfeight.premiumproject.examly.io/api/interviews/${id}`, {
        method: 'DELETE'
      });
      if(res.ok){
        alert('Interview deleted successfully!');
        fetchInterviews();
      } else {
        alert('Failed to delete interview');
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>All Interviews</h2>
      {interviews.length === 0 ? (
        <p>No interviews found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Candidate</th>
              <th>Company</th>
              <th>Job Title</th>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map(i => (
              <tr key={i.interviewId}>
                {editingInterview === i.interviewId ? (
                  <>
                    <td>{i.interviewId}</td>
                    <td><input name="candidateName" value={formData.candidateName} onChange={handleChange} /></td>
                    <td><input name="companyName" value={formData.companyName} onChange={handleChange} /></td>
                    <td><input name="jobTitle" value={formData.jobTitle} onChange={handleChange} /></td>
                    <td><input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} /></td>
                    <td><input name="interviewType" value={formData.interviewType} onChange={handleChange} /></td>
                    <td><input name="status" value={formData.status} onChange={handleChange} /></td>
                    <td><input name="feedback" value={formData.feedback} onChange={handleChange} /></td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{i.interviewId}</td>
                    <td>{i.candidateName}</td>
                    <td>{i.companyName}</td>
                    <td>{i.jobTitle}</td>
                    <td>{i.interviewDate}</td>
                    <td>{i.interviewType}</td>
                    <td>{i.status}</td>
                    <td>{i.feedback}</td>
                    <td>
                      <button onClick={() => handleEditClick(i)}>Edit</button>
                      <button onClick={() => handleDelete(i.interviewId)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewInterviews;
