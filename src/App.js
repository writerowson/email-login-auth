import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, getAuth } from 'firebase/auth'

import './App.css';
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
const auth = getAuth(app)
function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('')
  const [registered, setRegistered] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = event => {
    setPassword(event.target.value)

  }

  const handleRegisteredChange = event => {
    setRegistered(event.target.checked)
    console.log(event.target.checked)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password should contain a special character')
      return;
    }
    setValidated(true);
    setError('')
    if (registered) {
      console.log(email, password);
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
          setError(error.message)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('')
          setPassword('')
          verifyEmail()
        })
        .catch(error => {
          console.error(error)
          setError()
        })
    }
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email Verification Sent');
      })
  }


  return (
    <div className="App">
      <div className='w-50 mx-auto'>
        <h2 className='text-primary'>Plz {registered ? 'Login' : 'Register'}!! </h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid"> Please provide a valid email</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already registered" />
          </Form.Group>
          <p className='text-success'>{'success'}</p>
          <p className='text-danger'>{error}</p>
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
