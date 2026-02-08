import React, { useState } from 'react';

const EditableRow = ({ ticket, onSave, onCancel, options }) => {
    const [formData, setFormData] = useState({ ...ticket });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => onSave(ticket._id, formData);

    return (
        <tr className="bg-gray-50">
            <td><input name="title" value={formData.title} onChange={handleChange} /></td>
            <td><input name="description" value={formData.description} onChange={handleChange} /></td>
            <td>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                    {options.priorities.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </td>
            <td>
                <select name="status" value={formData.status} onChange={handleChange}>
                    {options.statuses.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </td>
            <td>
                <select name="shape" value={formData.shape} onChange={handleChange}>
                    {options.shapes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </td>
            <td>
                <button onClick={handleSave} className="save-btn">💾 Save</button>
                <button onClick={onCancel} className="cancel-btn">❌</button>
            </td>
        </tr>
    );
};

export default EditableRow;