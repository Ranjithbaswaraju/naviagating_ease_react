import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios'; // Import axios for API requests
import './login.css';
import Navbar from '../navbar/navbar';
const UserForm = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    
    <div className="container">
      <div className='pic'>
        <img src='../../images/home_img.jpg'/>
      </div>
      <div className="form-container">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src="../../images/project_log.png" // Replace with your logo path or URL
            alt="Logo"
            style={{ width: '150px', height: 'auto',borderRadius:'20px' }} // Adjust the width as needed
          />
        </div>
        {isSignup ? (
          <SignupForm setIsSignup={setIsSignup} />
        ) : (
          <LoginForm setIsSignup={setIsSignup} />
        )}
      </div>
    </div>
  );
};

const LoginForm = ({ setIsSignup }) => {
  const onFinish = (values) => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        const user = response.data.find(
          user => user.username === values.username && user.password === values.password
        );

        if (user) {
          message.success(`Welcome, ${user.username}! Successfully logged in.`);
        } else {
          message.error('Invalid username or password. Please try again.');
        }
      })
      .catch(() => {
        message.error('Error during login. Please try again later.');
      });
  };

  return (
    <Form
      name="login"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      autoComplete="off"
     

    >
      <h2 style={{ textAlign: 'center' }}>Login Form</h2>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Login
        </Button>
        <p style={{ marginTop: 10, textAlign: 'center' }}>
          Don't have an account?{' '}
          <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsSignup(true)}>
            Sign Up
          </span>
        </p>
      </Form.Item>
    </Form>
  );
};

const SignupForm = ({ setIsSignup }) => {
  const [otpGenerated, setOtpGenerated] = useState('');
  const [form] = Form.useForm();
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Generate OTP
  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit OTP
    setOtpGenerated(otp);
    message.success(`OTP has been generated: ${otp}`);
  };

  // Handle Signup Form Submission
  const onFinish = (values) => {
    if (values.otp === otpGenerated) {
      console.log('Form values:', values); // Log form values for debugging

      axios.post('http://localhost:3000/users', {
        username: values.username, // Ensure username is captured
        password: values.password, // Ensure password is captured
        phone: values.phone
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.status === 201 || response.status === 200) {
          message.success('Successfully signed up!');
          setIsSignup(false); // Switch back to login form
        } else {
          message.error('Error signing up. Please try again.');
        }
      })
      .catch(error => {
        console.error('Signup error:', error); // Log the error for debugging
        message.error('Error signing up! Please try again later.');
      });
    } else {
      message.error('Incorrect OTP!');
    }
  };

  // Inline validation for Username
  const validateUsername = (username) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    if (!regex.test(username)) {
      setUsernameError('Username must have 8 characters, one uppercase letter, and one special character.');
    } else {
      setUsernameError('');
    }
  };

  // Inline validation for Password
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$&*]).{8,}$/;
    if (!regex.test(password)) {
      setPasswordError('Password must have 8 characters, letters, and one special character.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <>
     
    
    <Form
      form={form}
      name="signup"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      autoComplete="off"
      
    >
       
      <h2 style={{ textAlign: 'center' }}>Signup Form</h2>

      {/* Username Validation */}
      <Form.Item
        label="Username"
        name="username" // Make sure name is set for capturing form values
        validateStatus={usernameError ? 'error' : ''}
        help={usernameError}
        rules={[{ required: true, message: 'Please input your username!' }]} // Add validation rule for required
      >
        <Input
          onChange={(e) => validateUsername(e.target.value)}
        />
      </Form.Item>

      {/* Password Validation */}
      <Form.Item
        label="Password"
        name="password" // Make sure name is set for capturing form values
        validateStatus={passwordError ? 'error' : ''}
        help={passwordError}
        rules={[{ required: true, message: 'Please input your password!' }]} // Add validation rule for required
      >
        <Input.Password
          onChange={(e) => validatePassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input />
      </Form.Item>

      {/* OTP Section */}
      {!otpGenerated ? (
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" style={{ width: '100%' }} onClick={generateOTP}>
            Generate OTP
          </Button>
        </Form.Item>
      ) : (
        <>
          <Form.Item
            label="Enter OTP"
            name="otp"
            rules={[{ required: true, message: 'Please input the OTP!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Sign Up
            </Button>
          </Form.Item>
        </>
      )}

      <p style={{ marginTop: 10, textAlign: 'center' }}>
        Already have an account?{' '}
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsSignup(false)}>
          Login
        </span>
      </p>
    </Form></>
    
  );
};



export default UserForm;
