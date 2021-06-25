import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: 'white'
  },
  language: {
    padding: 4,
    color: 'white',
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
  },
  avatar: {
    //this is for the avatar
    width: 50,
    height: 50,
    borderRadius: 45/2,
  },
  flexContainer: {
    display: 'flex',
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    color: 'white',
    justifyContent: 'space-between'
  },
  flexTopArea: {
    flexGrow: 0.6,
    paddingBottom: 20,
    flexDirection: 'row'
  },
  flexTopLeft: {
    //this contains the avatar
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexTopRight: {
    justifyContent: 'space-between',
  },
  flexBottomArea: {
    //this contains stars, forks, reviews, ratings
    display: "flex",
    flexDirection: 'row'
  },
  flexBottomBox: {
    //this contains the numerical figure and the title beneath
    flexGrow: 0.25,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  bodyText: {
    paddingVertical: 4,
    color: theme.colors.secondary,
  },
  btnContainer: {
    display: "flex",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  githubBtn: {
    padding: 15,
    alignSelf: "center",
    color: 'white'
  },

});

const formatNumbers = (num) => {
  return num > 999 ? (num / 1000).toFixed(1) + "k" : num;
};

const RepositoryDisplay = ({ repo, isDetail }) => {
  const openGithub = () => {
    Linking.openURL(repo.url);
  };

  return (  
    <View style={styles.backGround}>
      <View style={styles.flexContainer}>
        <View style={styles.flexTopArea}>
          <View style={styles.flexTopLeft}>
            <Image style={styles.avatar} source={{uri: repo.ownerAvatarUrl}}>
            </Image>
          </View>
          <View style={styles.flexTopRight}>
            <Text style={styles.subheading} testID='fullname'>{repo.fullName}</Text>
            <Text style={styles.bodyText} testID='description'>{repo.description}</Text>
            <Text style={styles.language} testID='language'>{repo.language}</Text>
          </View>
        </View>


        <View style={styles.flexBottomArea}>
          <View style={styles.flexBottomBox}>
            <Text style={styles.subheading} testID="stars">{formatNumbers(repo.stargazersCount)}</Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.flexBottomBox}>
            <Text style={styles.subheading} testID='forks'>{formatNumbers(repo.forksCount)}</Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.flexBottomBox}>
            <Text style={styles.subheading} testID='reviews'>{repo.reviewCount}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.flexBottomBox}>
            <Text style={styles.subheading} testID='ratings'>{repo.ratingAverage}</Text>
            <Text>Rating</Text>
          </View>
        </View>

        {isDetail && (
          <View style={styles.btnContainer}>
            <TouchableWithoutFeedback onPress={openGithub}>
              <Text
                color="textLight"
                fontWeight="bold"
                style={styles.githubBtn}
              >
                Open in GitHub
              </Text>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  );

};

export default RepositoryDisplay;