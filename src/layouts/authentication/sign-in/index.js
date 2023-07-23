import { useContext, useState } from "react";

// @mui material components
import Switch from "@mui/material/Switch";

// React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { AuthContext } from "context";
import { checkEmail } from "http/authApi";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setSuccessLogin } from "context";
import { useSoftUIController } from "context";
import { setQrCode } from "context";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [controller, dispatch] = useSoftUIController();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [rememberMe, setRememberMe] = useState(true);
  const [credentialsErros, setCredentialsError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const submitHandler = async (e) => {
    // check rememeber me?
    e.preventDefault();
    const email = e.target.email.value;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.trim().length === 0 || !email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    const user = { email: email};
    try {
      await checkEmail(user);
      navigate("/authentication/sign-in", { state: { email: email } });
      setSuccessLogin(dispatch, "verificationCode");
      // authContext.login(response?.data.token);
    } catch (res) {
      if (res.hasOwnProperty("message")) {
        setCredentialsError(res.response.data.message);
      } else {
        setCredentialsError(res.errors[0].detail);
      }
    }

    return () => {
      setInputs({
        email: "",
      });

      setErrors({
        emailError: false,
        passwordError: false,
      });
    };
  };

  return (
    <CoverLayout
      title="Login or create profile"
      description="Please enter your email."
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={submitHandler}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" color="white" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            required
            error={credentialsErros}
            placeholder="Email"
            id="email"
            name="email"
          />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
          Get code
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
};

export default SignIn;
