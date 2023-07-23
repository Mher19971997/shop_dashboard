import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { Box, Input, Stack, styled } from "@mui/material";
import * as yup from "yup";

// import Countdown from "../components/Countdown";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
// components
import SoftBox from "components/SoftBox";
import CoverLayout from "../components/CoverLayout";

// import { verifyContact } from "http/userApi";
import { verifyAndRegister } from "http/authApi";
import { useSoftUIController, AuthContext } from "context";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

const VerificationInput = styled(SoftInput)(({ theme }) => ({
  fontSize: "1.5625rem",
  fontWeight: "600",
  color: "#ffffff !important",
  backgroundColor: 'transparent !important',
  input: { textAlign: "center ", padding: "0px !important" },
  appearance: "textfield",
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    appearance: "none",
    margin: 0,
  },
}));

const schema = yup
  .array()
  .required()
  .of(yup.number().required())
  .when("$length", (len, schema) => {
    if (len) return schema.length(len);
    else return schema;
  });

const Verification = () => {
  const authContext = useContext(AuthContext);

  const [controller, dispatch] = useSoftUIController();
  const { succesLogin, qrcode } = controller;
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(Array(6).fill(""));

  const { mutate, isError } = useMutation((formData) => verifyAndRegister(formData), {
    onSuccess: (response, formData) => {
      authContext.login(response?.data.token);
      return setIsValid(true);
    },
    onError: (error) => {
      console.log(error, "errorerror");
      setError(error.response.data.message);
    },
  });

  const update = useCallback((index, val) => {
    return setCode((prevState) => {
      const slice = prevState.slice();
      slice[index] = val;
      return slice;
    });
  }, []);

  const formRef = useRef(null);

  function handleKeyDown(evt) {
    const index = parseInt(evt.currentTarget.dataset.index);
    const form = formRef.current;
    if (isNaN(index) || form === null) return; // just in case

    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prevInput = form.querySelector(`.input-${prevIndex}`);
    const nextInput = form.querySelector(`.input-${nextIndex}`);
    switch (evt.key) {
      case "Backspace":
        if (code[index]) update(index, "");
        else if (prevInput) prevInput.select();
        break;
      case "ArrowRight":
        evt.preventDefault();
        if (nextInput) nextInput.focus();
        break;
      case "ArrowLeft":
        evt.preventDefault();
        if (prevInput) prevInput.focus();
    }
  }

  function handleChange(evt) {
    const value = evt.currentTarget.value;
    const index = parseInt(evt.currentTarget.dataset.index);
    const form = formRef.current;
    if (isNaN(index) || form === null) return; // just in case

    let nextIndex = index + 1;
    let nextInput = form.querySelector(`.input-${nextIndex}`);

    update(index, value[0] || "");
    if (value.length === 1) nextInput?.focus();
    else if (index < length - 1) {
      const split = value.slice(index + 1, length).split("");
      split.forEach((val) => {
        update(nextIndex, val);
        nextInput?.focus();
        nextIndex++;
        nextInput = form.querySelector(`.input-${nextIndex}`);
      });
    }
  }

  function handleFocus(evt) {
    evt.currentTarget.select();
  }

  useEffect(() => {
    if (isSubmitted) {
      try {
        setIsValid(schema.isValidSync(code, { context: { length } }));
      } catch (e) {}
    }
    if(code.length === 6){
      handleSubmit()
    }
  }, [code]);
  
  async function handleSubmit() {
    setIsSubmitted(true);
    try {
      const data = await schema.validate(code, { context: { length } });
      await mutate({ code: data?.join(""), email: location?.state?.email });
    } catch (e) {
      console.log(e);
      setIsValid(false);
    }
  }

  return (
    <CoverLayout
      title={location?.state?.email || "Please try again"}
      description="We have sent you a message in Email with the code."
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        <Box ref={formRef} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Stack component={"fieldset"} border={"none"} direction={"row"} spacing={1.2}>
            {code.map((value, i) => (
              <VerificationInput
                key={i}
                value={value}
                required
                placeholder="0"
                error={error}
                sx={{
                  width: "50px !important",
                  padding: "12px 0px !important",
                  color: (isValid && "red") || "#000000",
                }}
                inputProps={{
                  type: "number",
                  className: `input-${i}`,
                  "aria-label": `Number ${i + 1}`,
                  "data-index": i,
                  pattern: "[0-9]*",
                  inputtype: "numeric",
                  onChange: handleChange,
                  onKeyDown: handleKeyDown,
                  onFocus: handleFocus,
                }}
              />
            ))}
          </Stack>
          <SoftBox mt={1}>
            <SoftTypography color="error" variant="caption" fontWeight="light">
              {error}
            </SoftTypography>
          </SoftBox>
        </Box>
      </SoftBox>
    </CoverLayout>
  );
};

export default Verification;
