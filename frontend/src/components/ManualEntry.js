// ManualEntry.js - Fixed version
import React, { useState } from 'react';
import axios from 'axios';

const ManualEntry = ({ onSuccess }) => {
  const [form, setForm] = useState({
    patient_id: '',
    facility: '',
    organism: '',
    host: 'HUMAN',
    amoxicillin: 'S',
    ampicillin: 'S',
    ciprofloxacin: 'S',
    gentamicin: 'S',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // FIXED: Using the correct endpoint /api/entry-open instead of /api/manual-entry/
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/entry-open`,
        form
      );

      if (response.data.status === 'ok') {
        setMessage(`✅ Successfully added ${response.data.created} record(s)`);
        // Reset form
        setForm({
          patient_id: '',
          facility: '',
          organism: '',
          host: 'HUMAN',
          amoxicillin: 'S',
          ampicillin: 'S',
          ciprofloxacin: 'S',
          gentamicin: 'S',
          notes: ''
        });
        if (onSuccess) onSuccess();
      } else {
        setMessage(`❌ Error: ${response.data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Manual entry error:', error);
      setMessage(`❌ Failed to submit: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="manual-entry">
      <h3>Manual Data Entry</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient ID *</label>
          <input
            type="text"
            name="patient_id"
            value={form.patient_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Facility *</label>
          <input
            type="text"
            name="facility"
            value={form.facility}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Organism *</label>
          <input
            type="text"
            name="organism"
            value={form.organism}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Host *</label>
          <select name="host" value={form.host} onChange={handleChange} required>
            <option value="HUMAN">Human</option>
            <option value="ANIMAL">Animal</option>
            <option value="ENVIRONMENT">Environment</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amoxicillin</label>
          <select name="amoxicillin" value={form.amoxicillin} onChange={handleChange}>
            <option value="S">Susceptible (S)</option>
            <option value="R">Resistant (R)</option>
            <option value="I">Intermediate (I)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Ampicillin</label>
          <select name="ampicillin" value={form.ampicillin} onChange={handleChange}>
            <option value="S">Susceptible (S)</option>
            <option value="R">Resistant (R)</option>
            <option value="I">Intermediate (I)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Ciprofloxacin</label>
          <select name="ciprofloxacin" value={form.ciprofloxacin} onChange={handleChange}>
            <option value="S">Susceptible (S)</option>
            <option value="R">Resistant (R)</option>
            <option value="I">Intermediate (I)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gentamicin</label>
          <select name="gentamicin" value={form.gentamicin} onChange={handleChange}>
            <option value="S">Susceptible (S)</option>
            <option value="R">Resistant (R)</option>
            <option value="I">Intermediate (I)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Record'}
        </button>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ManualEntry;
