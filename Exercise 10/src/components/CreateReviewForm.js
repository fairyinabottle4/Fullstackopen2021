import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback, Text } from 'react-native';
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
  reviewBtn: {
    padding: 15,
    alignSelf: "center",
    color: 'white'
  }
});

const CreateReviewForm = ({ createReview }) => (
  <View>
    <FormikTextInput name="ownerName" placeholder="Repository owner name" />
    <View style={styles.textInputContainer}>
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
    </View>
    <View style={styles.textInputContainer}>
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
    </View>
    <View style={styles.textInputContainer}>
      <FormikTextInput name="text" placeholder="Review" multiline />
    </View>
    <View style={styles.btnContainer}>
      <TouchableWithoutFeedback onPress={createReview}>
         <Text
          color="textLight"
          fontWeight='bold'
          style={styles.reviewBtn}
         >
          Create a Review
         </Text>
      </TouchableWithoutFeedback>
    </View>
  </View>
);

export default CreateReviewForm;
