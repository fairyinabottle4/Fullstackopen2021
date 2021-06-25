import React from 'react';
import { useHistory } from "react-router-native";
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const initialValues = {
    username: '',
    password: '',
  };  

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <SignInContainer 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema} />
  ); 
};

export default SignIn;
