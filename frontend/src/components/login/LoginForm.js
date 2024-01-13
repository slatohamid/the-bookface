import {Formik, Form} from "formik";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";

import {useState} from "react";
const loginInfos = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [login, setLogin] = useState(loginInfos);
  const {email, password} = login;
  const handleLoginChange = (e) => {
    const {name, value} = e.target;
    setLogin({...login, [name]: value});
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .email("Email address is invalid!")
      .required("Email address is required!"),
    password: Yup.string().required("Password is required!"),
  });
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/friendlink.svg" alt="" />
        <span>
          FriendLink hepls you to connect and share moments with people in your
          life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}>
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="orange_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten Password?
          </Link>
          <div className="sign_splitter"></div>
          <button className="orange_btn open_signup">Create Account</button>
        </div>
        <Link to="/" className="sing_extra">
          <strong>Creat a Page </strong> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
