import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [signUpText, setSignUpText] = useState({
    phone: "",
    password: "",
    // name: "",
    hasAgreed: false,
    roleLeader: false,
  });

  const handleChange = (event) =>
    setSignUpText({
      ...signUpText,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: signUpText.phone,
        password: signUpText.password,
        role: (signUpText.roleLeader ? "LEADER": " "),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // code here //
        if (data.errors) {
          alert("Error Password or Username"); /*displays error message*/
          console.log(signUpText.phone, signUpText.password);

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
        <form onSubmit={handleSubmit} className="formFields">
          {/* <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="formFieldInput"
              placeholder="Enter your full name"
              name="name"
              value={signUpText.name}
              onChange={handleChange}
            />
          </div> */}
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
              value={signUpText.password}
              onChange={handleChange}
            />
          </div>
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
              value={signUpText.phone}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="roleLeader"
                value={signUpText.roleLeader}
                onChange={handleChange}
              />{" "}
              Leader{" "}
            </label>
          </div>
          <div className="formField">
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="hasAgreed"
                value={signUpText.hasAgreed}
                onChange={handleChange}
              />{" "}
              I agree all statements in{" "}
              <a href="null" className="formFieldTermsLink">
                terms of service
              </a>
            </label>
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/sign-in" className="formFieldLink">
              I'm already member
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

// class signUpText Form extends Component {
//   constructor() {
//     super();

//     this.state = {
//       email: "",
//       password: "",
//       name: "",
//       hasAgreed: false,
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     let target = event.target;
//     let value = target.type === "checkbox" ? target.checked : target.value;
//     let name = target.name;

//     this.setState({
//       [name]: value,
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();

//     console.log("The form was submitted with the following data:");
//     console.log(this.state);
//   }

//   render() {
//     return (
//       <div className="formCenter">
//         <form onSubmit={this.handleSubmit} className="formFields">
//           <div className="formField">
//             <label className="formFieldLabel" htmlFor="name">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               className="formFieldInput"
//               placeholder="Enter your full name"
//               name="name"
//               value={this.state.name}
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
//             <label className="formFieldCheckboxLabel">
//               <input
//                 className="formFieldCheckbox"
//                 type="checkbox"
//                 name="hasAgreed"
//                 value={this.state.hasAgreed}
//                 onChange={this.handleChange}
//               />{" "}
//               I agree all statements in{" "}
//               <a href="null" className="formFieldTermsLink">
//                 terms of service
//               </a>
//             </label>
//           </div>

//           <div className="formField">
//             <button className="formFieldButton">Sign Up</button>{" "}
//             <Link to="/sign-in" className="formFieldLink">
//               I'm already member
//             </Link>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
export default SignUpForm;
