import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z ]*$/, "Name must not contain numbers"),

  birthday: yup
    .date()
    .required("Date of Birth is required")
    .typeError("Invalid Date of Birth. Format must be DD/MM/YYYY"),

  genders: yup
    .string()
    .required("Sex is required")
    .oneOf(["Male", "Female"], "Invalid selection"),

  cities: yup.string().required("City is required"),

  doctor: yup.string().required("Doctor is required"),

  doctor_specialty: yup.string(),

  email: yup
    .string()
    .email("Invalid Email")
    .test(
      "either-email-or-phone",
      "Email or Mobile Number is required",
      function (value) {
        const { phoneNumber } = this.parent;
        return (
          (value !== null && value !== "") ||
          (phoneNumber !== null && phoneNumber !== "")
        );
      }
    ),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number can only contain numbers")
    .min(10, "Phone number must be at least 10 digits")
    .test(
      "either-phone-or-email",
      "Email or Mobile Number is required",
      function (value) {
        const { email } = this.parent;
        return (
          (value !== null && value !== "") || (email !== null && email !== "")
        );
      }
    ),
});
