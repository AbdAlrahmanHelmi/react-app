import React from "react";
import Joi, { errors, log } from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import * as userServies from "../services/userServies";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      const data = await userServies.register(this.state.data);
      console.log(data);
      auth.loginWithJwt(data.data.idToken);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = [...this.state.errors];
        errors.email = ex.response.data.error.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
