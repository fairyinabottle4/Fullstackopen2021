import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchQuery, onChangeSearch, onPress, sort } = this.props;

    return (
      <RepositoryListHeader
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
        onPress={onPress}
        sort={sort}
      />
    );
  };

  render() {
    const { repositories, onEndReached } = this.props;
    const repositoryNodes = repositories
      ? repositories?.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        ListHeaderComponentStyle={styles.listHeader}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listHeader: {
    zIndex: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => {
  return (
    <RepositoryItem repo={item} />
  );
};



export default RepositoryListContainer;