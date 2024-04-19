import { Form, Link, redirect, useNavigation } from "react-router-dom";
import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo></Logo>
        <h4>Register</h4>
        <FormRow type='text' name='name' defaultValue='Garvit' />
        <FormRow
          type='text'
          name='lastName'
          labelText='Last name'
          defaultValue='Yadav'
        />
        <FormRow type='text' name='location' defaultValue='New York' />
        <FormRow type='text' name='email' defaultValue='garvit@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret1234' />

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
