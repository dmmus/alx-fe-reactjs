import React, { useState } from 'react';

const RegistrationForm = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!values.username) tempErrors.username = "Username is required.";
    if (!values.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!values.password) tempErrors.password = "Password is required.";
    
    setErrors(tempErrors);
    // Return true if there are no errors
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
      console.log('Form Data:', values);
      // Reset form or proceed with submission logic
      setValues({ username: '', email: '', password: '' });
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration (Controlled Component)</h2>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={values.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={values.password} onChange={handleChange} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;