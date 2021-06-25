import * as React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Divider, Menu } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import theme from "../theme";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: theme.colors.backdrop,
    position: "absolute",
    left: 0,
    right: 0,
    height,
  },
  dropdown: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 30,
    flex: 1,
  },
  menu: {
    width: "75%",
    top: "45%",
    left: "12.5%",
    transform: [{ translateY: "-50% " }],
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 50,
    marginRight: 15,
    marginLeft: 5,
  },
});

const Dropdown = ({ onPress, sort }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const getSortVariables = (value) => {
    let variables;
    switch (value) {
      case "Latest repositories":
        variables = { orderBy: "CREATED_AT", orderDirection: "DESC" };
        return variables;
      case "Highest rated repositories":
        variables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
        return variables;
      case "Lowest rated repositories":
        variables = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
        return variables;
      default:
        return variables;
    }
  };

  return (
    <>
      {visible && <View style={styles.backdrop} />}
      <View style={styles.dropdown}>
        <Menu
          style={styles.menu}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity style={styles.btn} onPress={openMenu}>
              <Text color={theme.colors.textPrimary}>
                {sort ? sort : "Latest repositories"}
              </Text>
              <AntDesign
                name="caretdown"
                size={theme.fontSizes.body}
                color={theme.colors.textPrimary}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item disabled={true} title="Sort by:" />
          <Divider />
          <Menu.Item
            style={styles.menuItem}
            onPress={(e) => {
              const value =
                e._dispatchInstances.memoizedProps.children[0].props.children[1]
                  .props.children.props.children;
              onPress(getSortVariables(value), value);
              closeMenu();
            }}
            title="Latest repositories"
          />
          <Menu.Item
            onPress={(e) => {
              const value =
                e._dispatchInstances.memoizedProps.children[0].props.children[1]
                  .props.children.props.children;
              onPress(getSortVariables(value), value);
              closeMenu();
            }}
            title="Highest rated repositories"
          />
          <Menu.Item
            onPress={(e) => {
              const value =
                e._dispatchInstances.memoizedProps.children[0].props.children[1]
                  .props.children.props.children;
              onPress(getSortVariables(value), value);
              closeMenu();
            }}
            title="Lowest rated repositories"
          />
        </Menu>
      </View>
    </>
  );
};

export default Dropdown;
