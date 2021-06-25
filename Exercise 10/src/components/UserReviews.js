import { useQuery, useMutation } from "@apollo/client";
import React from "react";
import { FlatList, View, StyleSheet, Alert, TouchableWithoutFeedback, Text } from "react-native";
import { CHECK_AUTHORIZED } from "../graphql/queries";
import { DELETE_REVIEW } from '../graphql/mutations';
import ReviewItem from "./ReviewItem";
import { Link } from "react-router-native";
import theme from '../theme';

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  viewButton: {
    flex: 1,
    borderWidth: 5,
    borderColor: 'white',
    padding: '5%',
    backgroundColor: theme.colors.primary,
    height: '100%'
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: '5%',
    borderWidth: 5,
    borderColor: 'white',
  },
  buttonText: {
    alignSelf: "center",
    color: 'white',
    fontWeight: 'bold'
  },
  separator: {
    height: 10,
  },
  listHeader: {
    zIndex: 10,
  },
});


const UserReviews = () => {
  const { data, loading, fetchMore } = useQuery(CHECK_AUTHORIZED, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
      first: 20,
    },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const alert = (id) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress: () =>
            deleteReview({
              variables: { id },
              refetchQueries: [
                {
                  query: CHECK_AUTHORIZED,
                  variables: {
                    includeReviews: true,
                    first: 20,
                  },
                },
              ],
            }),
        },
      ],
      { cancelable: false }
    );


  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: CHECK_AUTHORIZED,
      variables: {
        includeReviews: true,
        after: data.authorizedUser.reviews.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  const onEndReach = () => {
    handleFetchMore();
  };

  const reviews = data?.authorizedUser.reviews.edges;


  const renderItem = ({ item }) => {
    return (
      <>
        <ReviewItem review={item} />
          <View style={styles.rowContainer}>
            <View style={styles.viewButton}>
              <Link
                component={TouchableWithoutFeedback}
                to={`/repository/${item.node.repository.id}`}
              >
                <Text style={styles.buttonText}>
                  View Repository
                </Text>
              </Link>
            </View>
            <View style={styles.deleteButton}>
              <TouchableWithoutFeedback
                onPress={() => alert(item.node.id)}
              >
                <Text style={styles.buttonText}>
                  Delete Review
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
      </>
    );
  };
  
  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={({ node: { id } }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};
  
export default UserReviews;
