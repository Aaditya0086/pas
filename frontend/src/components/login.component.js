import React, { Component } from 'react'
import '../styles/login.css';

export default class Login extends Component {
  constructor(props){
    super (props)
    this.state={
      email:'',
      password:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const { email, password} = this.state;
    console.log(email, password);
    fetch("http://localhost:5000/loginUser", {
      method: 'POST', 
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'Login Complete');
        if (data.status === 'ok') {
          alert('login successful');
          window.localStorage.setItem('token', data.data);
          window.localStorage.setItem('loggedIn', true);
          window.location.href = './dashboard'
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
      <div className='app__login-image'>
        <img src="https://mujslcm.jaipur.manipal.edu:122/keen/themes/keen/theme/demo1/dist/assets/media/misc/collage.png" alt="backgroung_img" />
        </div>
      <form className='app__login' onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3 app__login-email">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({email: e.target.value})}
          />
        </div>

        <div className="mb-3 app__login-password">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({password: e.target.value})}
          />
        </div>

        <div className="mb-3 app__login-rememberme">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid app__login-btn">
          <button type="submit" className="btn btn-primary" style={{backgroundColor: '#ffc107', borderColor: '#ffc107', color: 'black'}}>
            Submit
          </button>
        </div>
        <p className="forgot-password">
          Forgot <a href="/">password?</a>
        </p>
      </form>
      </div>
    )
  }
}
