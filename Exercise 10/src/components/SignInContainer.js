import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

const SignInContainer = ({ initialValues, onSubmit, validationSchema }) => {
  
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => {
      return (
        <View style={{
          paddingHorizontal: 12,
          paddingVertical: 20,
          height: 200,
          justifyContent: 'space-around',
          backgroundColor: 'white',
        }}>
          <FormikTextInput testID='usernameField' name='username' placeholder='Username' />
          <FormikTextInput testID='passwordField' name='password' placeholder='Password' secureTextEntry />
          <TouchableWithoutFeedback testID='submitButton' onPress={handleSubmit}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                borderRadius: 4,
                padding: 12,
                backgroundColor:'#0355d6',
                fontWeight:'bold'  
              }}
            >Sign in</Text>
          </TouchableWithoutFeedback>
        </View>  
      );
    }}
    </Formik>

  );
};

export default SignInContainer;