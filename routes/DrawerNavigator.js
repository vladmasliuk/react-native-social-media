import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from './StackNavigator'
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator 
        drawerContent={({navigation}) => <DrawerContent navigation={navigation}/>}
    >
        <Drawer.Screen name="Navigator" component={StackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;