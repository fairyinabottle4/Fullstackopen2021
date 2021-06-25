import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { format, parseISO } from "date-fns";
import theme from "../theme";

const width = 50;
const height = width;
const borderRadius = width / 2;

const styles = StyleSheet.create({
  reviewItemContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    backgroundColor: 'white',
  },
  ratingCircle: {
    height,
    width,
    borderRadius,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  reviewItemDescription: {
    flexShrink: 1,
  },
  username: {
    lineHeight: 26,
  },
  date: {
    marginBottom: 5,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  bodyText: {
    paddingVertical: 4,
    color: theme.colors.secondary,
  },
});


const ReviewItem = ({ review }) => {
  // console.log('not');
  // console.log(review);
  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.ratingCircle}>
        <Text style={styles.subheading} color="primary">{review.node.rating}</Text>
      </View>
      <View style={styles.reviewItemDescription}>
        <Text style={styles.username && styles.subheading} color="textPrimary">
          {review.node.user.username}
        </Text>
        <Text style={styles.date && styles.bodyText} color="textSecondary">
          {format(parseISO(review.node.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text style={styles.bodyText} color="textPrimary">{review.node.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
