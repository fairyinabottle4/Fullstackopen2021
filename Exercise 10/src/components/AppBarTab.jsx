import React from 'react';
import { useHistory } from "react-router-native";
import { useQuery } from '@apollo/client';
import { CHECK_AUTHORIZED } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';

import { StyleSheet, View, Pressable } from 'react-native';

import Text from './Text';

import theme from '../theme';

import useAuthStorage from '../hooks/useAuthStorage';

const SignInPage = ({ appBarTabStyles }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/signin');
  };

  return (
    <Pressable onPress={handleClick}>
      <Text style={appBarTabStyles}>
        Sign in
      </Text>
    </Pressable>
  );
};

const SignUpPage = ({ appBarTabStyles }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/signup');
  };

  return (
    <Pressable onPress={handleClick}>
      <Text style={appBarTabStyles}>
        Sign up
      </Text>
    </Pressable>
  );
};

const Repositories = ({ appBarTabStyles }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };

  return (
    <Pressable onPress={handleClick}>
      <Text style={appBarTabStyles}>
        Repositories
      </Text>
    </Pressable>
  );
};

const SignOut = ({ appBarTabStyles }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const handleLogout = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/signin');
  };

  return (
    <Pressable onPress={handleLogout}>
      <Text style={appBarTabStyles}>
        Sign out
      </Text>
    </Pressable>
  );
};

const CreateReview = ({ appBarTabStyles }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/create-review');
  };

  return (
    <Pressable onPress={handleClick} >
      <Text style={appBarTabStyles}>
        Create Review
      </Text>
    </Pressable>
  );
};

const MyReviews = ({ appBarTabStyles }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/user-reviews');
  };

  return (
    <Pressable onPress={handleClick}>
      <Text style={appBarTabStyles}>
        My Reviews
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.appBar.textPrimary,
  },
  active: {
    textDecorationLine: 'underline'
  }
});

const AppBarTab = ({ isActive, onPress = () => null, style, ...props}) => {

  const { data } = useQuery(CHECK_AUTHORIZED);

  const appBarTabStyles = [
    styles.text,
    isActive && styles.active,
    style
  ];
  // console.log(data);
  return (
    <View style={{flexDirection: 'row'}}> 
      <Repositories appBarTabStyles={appBarTabStyles} />
      {data?.authorizedUser ? 
      <>
        <SignOut appBarTabStyles={appBarTabStyles} /> 
        <CreateReview appBarTabStyles={appBarTabStyles} />
        <MyReviews appBarTabStyles={appBarTabStyles} />
      </>  
      : 
      <>
        <SignInPage appBarTabStyles={appBarTabStyles} />
        <SignUpPage appBarTabStyles={appBarTabStyles} />
      </>
      }
      
    </View>
  );

};

export default AppBarTab;
  