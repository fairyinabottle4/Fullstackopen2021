import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useHistory } from "react-router-native";
import * as yup from "yup";
import { CREATE_REVIEW } from "../graphql/mutations";
import theme from "../theme";
import CreateReviewForm from "./CreateReviewForm";

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: theme.colors.backgroundLight,
    padding: 15,
  },
  graphqlError: {
    marginTop: 10,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number("Rating should be a number between 0 and 100")
    .required("Rating is required")
    .min(0)
    .max(100),
  text: yup.string(),
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const CreateReview = () => {
  const [mutate, { error }] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const createReview = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const parsedRating = +rating;

    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: parsedRating,
            text,
          },
        },
      });

      if (data?.createReview) {
        history.push(`/repository/${data?.createReview?.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={createReview}
      >
        {({ handleSubmit }) => <CreateReviewForm createReview={handleSubmit} />}
      </Formik>
      {error && (
        <Text style={styles.graphqlError} color="error">
          {error.message}
        </Text>
      )}
    </View>
  );
};

export default CreateReview;
