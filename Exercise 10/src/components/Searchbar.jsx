import * as React from "react";
import { StyleSheet } from "react-native";
import { Searchbar as PaperSearchbar } from "react-native-paper";

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 15,
    marginTop: 15,
  },
});

const Searchbar = ({ searchQuery, onChangeSearch }) => {
  return (
    <PaperSearchbar
      style={styles.input}
      placeholder="Filter repositories..."
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default Searchbar;
