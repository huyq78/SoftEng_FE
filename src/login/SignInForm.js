import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FacebookLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";
const SignInForm = () => {
  const [inputText, setInputText] = useState({
    phone: "",
    password: "",
    roleAdmin: false,
  });
  const handleChange = (event) =>
    setInputText({
      ...inputText,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: inputText.phone,
        password: inputText.password,
        role: inputText.roleAdmin ? "ADMIN" : " ",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // code here //
        if (data.errors) {
          alert("Error Password or Username"); /*displays error message*/
          console.log(inputText.phone, inputText.password);
        } else {
          // window.open(
          //   // "SignUpForm.js"
          // ); /*opens the target page while Id & password matches*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="formCenter">
        <form className="formFields" onSubmit={handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="text">
              E-Mail Address
            </label>
            <input
              type="text"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="phone"
              value={inputText.phone}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={inputText.password}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign In</button>{" "}
            <Link to="/sign-up" className="formFieldLink">
              Create an account
            </Link>
          </div>
          <div className="formField">
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="roleAdmin"
                value={inputText.roleAdmin}
                onChange={handleChange}
              />{" "}
              Admin{" "}
            </label>
          </div>
          <div className="socialMediaButtons">
            <div className="facebookButton">
              <FacebookLoginButton onClick={() => alert("Hello")} />
            </div>

            <div className="instagramButton">
              <InstagramLoginButton onClick={() => alert("Hello")} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
// class SignInForm extends Component {
//   constructor() {
//     super();

//     this.state = {
//       email: "",
//       password: ""
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     let target = event.target;
//     let value = target.type === "checkbox" ? target.checked : target.value;
//     let name = target.name;

//     this.setState({
//       [name]: value
//     });
//   }

//   handleSubmit(event) {
//     event.preventDefault();

//     console.log("The form was submitted with the following data:");
//     console.log(this.state);
//   }

//   render() {
//     return (
//       <div className="formCenter">
//         <form className="formFields" onSubmit={this.handleSubmit}>
//           <div className="formField">
//             <label className="formFieldLabel" htmlFor="email">
//               E-Mail Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="formFieldInput"
//               placeholder="Enter your email"
//               name="email"
//               value={this.state.email}
//               onChange={this.handleChange}
//             />
//           </div>

//           <div className="formField">
//             <label className="formFieldLabel" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="formFieldInput"
//               placeholder="Enter your password"
//               name="password"
//               value={this.state.password}
//               onChange={this.handleChange}
//             />
//           </div>

//           <div className="formField">
//             <button className="formFieldButton">Sign In</button>{" "}
//             <Link to="/" className="formFieldLink">
//               Create an account
//             </Link>
//           </div>

//           <div className="socialMediaButtons">
//             <div className="facebookButton">
//               <FacebookLoginButton onClick={() => alert("Hello")} />
//             </div>

//             <div className="instagramButton">
//               <InstagramLoginButton onClick={() => alert("Hello")} />
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

export default SignInForm;
