import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from '../theme';

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 15,
  },
  btnContainer: {
    marginTop: '10%',
    display: "flex",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  signUpBtn: {
    padding: 15,
    alignSelf: "center",
    color: 'white'
  }
});

const SignUpForm = ({ onSubmit }) => (
  <View>
    <FormikTextInput name="username" placeholder="Username" />
    <View style={styles.textInputContainer}>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
    </View>
    <View style={styles.textInputContainer}>
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
    </View>
    <View style={styles.btnContainer}>
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text
          color="textlight"
          fontWeight='bold'
          style={styles.signUpBtn}
        >
         Sign up
        </Text>
      </TouchableWithoutFeedback>
    </View>
  </View>
);

export default SignUpForm;
