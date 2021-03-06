import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import NavigationBar from './NavigationBar';

export default class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': undefined,
    };

    // put optional this binding here
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  // sign the user in with the details provided in the form
  getForgotPassword(event) {
    event.preventDefault(); //don't submit
    this.props.forgotPasswordCallback(this.state.email);
  }

  // update the state for specific sign in form field
  // using javascript event
  handleFormChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    let changes = {}; // object to hold changes in text fields

    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  // helper func to validate a value based on a hash of validations
  // first parameter is the value from the text field itself
  // second parameter has format e.g., {required: true, minLength: 5, email: true}
  // (for required field, with min length of 5, and valid email)
  validateFields(value, validations) {
    let errors = { isValid: true, style: '' };

    if (value !== undefined) { //check validations
      //all fields are required
      if (validations.required && value === '') {
        errors.required = true;
        errors.isValid = false;
      }

      //handle email type
      if (validations.email) {
        //pattern comparison that works 99.99% of the time from
        //http://emailregex.com/ 
        let valid = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(value);
        if (!valid) {
          errors.email = true;
          errors.isValid = false;
        }
      }

    }

    //display details
    if (!errors.isValid) { //if found errors
      errors.style = 'has-error';
    } else if (value !== undefined) { //valid and has input
      //errors.style = "no-error";
    } else { //valid and no input
      errors.isValid = false; //make false anyway
    }
    return errors; //return data object
  }

  render() {
    let emailErrors = this.validateFields(this.state.email, { required: true, email: true, });

    let submitDisabled = false;
    let submitState = "primary";
    let emailDoesNotExist = "";
    let errorAlert = (<div className="hidden"><p></p></div>);

    if (this.props.error !== undefined) {
      emailDoesNotExist = this.props.error;
      errorAlert = (<div className="alert red-error"><p>{emailDoesNotExist}</p></div>);
    } else if (this.props.error === undefined) {
      emailDoesNotExist = null;
      errorAlert = (<div className="hidden"><p></p></div>);
    }

    //set to secondary disabled when errors show
    //button validation
    let signInEnabled = (emailErrors.isValid);

    if (!signInEnabled) {
      submitDisabled = true;
      submitState = "secondary"
    }

    return (
      <div className="sign-up tinted" role="article">
        <div className="sign-up-container">
          <div className="sign-up-form">
            <h1 className="forgot-pass">forgot password</h1>
            {errorAlert}
            <Form>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="text" name="email" fieldName="Email Address" id="email" onChange={this.handleFormChange} errors={emailErrors} />
              </FormGroup>
              <div className="forgot-button">
                <Button color={submitState} disabled={submitDisabled} onClick={(event) => this.getForgotPassword(event)}>Submit</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

//A component that displays an input form with validation styling
//props are: field, type, label, changeCallback, errors
class ValidatedInput extends React.Component {
  render() {
    let errors = this.props.errors.style != "" ? "invalid" : "";
    let errorMessage = "";

    if (this.props.errors.required) {
      errorMessage = "This field is required.";
    } else {
      if (this.props.errors.email) {
        errorMessage += "Email address is invalid.";
      }
    }

    let field = (
      <span>
        <Label for={this.props.name}>{this.props.fieldName}</Label>
        <Input type={this.props.type} name={this.props.name} id={this.props.id} invalid={errors != "" ? true : false} />
        <FormFeedback>{errorMessage}</FormFeedback>
      </span>
    );
    return (
      <div>
        {field}
      </div>
    );
  }
}
