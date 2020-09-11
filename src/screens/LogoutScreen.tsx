import React, { Component } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HistoryBidScreen from "./HistoryBidScreen";
import Logout from "./Logout";
import * as color from '../Color'
import PageBid from "./PageBid";
const Stack = createStackNavigator();

export default class LogoutScreen extends Component<Props, State> {
    constructor(props: any) {
        super(props);


    }

    render() {
        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="Logout" >
                    <Stack.Screen name="Logout" component={Logout} options={{headerShown: false}}/>
                    <Stack.Screen name="Bid" component={PageBid} 
                    options={{
                        title: 'Bid', 
                        headerTintColor: '#fff',
                        headerStyle: {
                            backgroundColor: color.background
                          },
                    }}
                    />
                    <Stack.Screen name="MyBid" component={HistoryBidScreen} 
                    options={{
                        title: 'My Bid', 
                        headerTintColor: '#fff',
                        headerStyle: {
                            backgroundColor: color.background
                          },
                    }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
type Props = {};

type State = {

};

