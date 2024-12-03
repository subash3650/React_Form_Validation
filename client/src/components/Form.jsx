import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required.";
    if (!form.employeeId || form.employeeId.length > 10) tempErrors.employeeId = "Valid Employee ID is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = "Valid Email is required.";
    if (!/^\d{10}$/.test(form.phoneNumber)) tempErrors.phoneNumber = "Valid 10-digit phone number is required.";
    if (!form.department) tempErrors.department = "Department is required.";
    if (!form.dateOfJoining || new Date(form.dateOfJoining) > new Date()) tempErrors.dateOfJoining = "Valid date is required.";
    if (!form.role) tempErrors.role = "Role is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:3001/emp", form);
      setMessage(res.data.message);
      setForm({
        name: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        department: "",
        dateOfJoining: "",
        role: "",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Submission failed!";
      setMessage(errorMessage);
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        {errors.name && <p>{errors.name}</p>}

        <input name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="Employee ID" />
        {errors.employeeId && <p>{errors.employeeId}</p>}

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        {errors.email && <p>{errors.email}</p>}

        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}

        <select name="department" value={form.department} onChange={handleChange}>
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>
        {errors.department && <p>{errors.department}</p>}

        <input name="dateOfJoining" type="date" value={form.dateOfJoining} onChange={handleChange} />
        {errors.dateOfJoining && <p>{errors.dateOfJoining}</p>}

        <input name="role" value={form.role} onChange={handleChange} placeholder="Role" />
        {errors.role && <p>{errors.role}</p>}

        <button type="submit">Submit</button>
        <button type="reset" onClick={() => setForm({})}>Reset</button>
      </form>
    </div>
  );
}

export default Form;
