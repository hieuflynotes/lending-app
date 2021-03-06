import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import myStyle from "../style";
import ChartHome from "../components/ChartHome";
import ListStatisticalBasic from "../components/ListStatisticalBasic";
import ListHistoryInterest from "../components/ListHistoryInterest";
import { FlatList } from "react-native-gesture-handler";
import HistoryInterest from "../components/HistoryInterest";
import { LendingProfitHistoryService } from "../services/LendingProfitHistoryService";
import { ProfitHistory } from "@StockAfiCore/model/lending/LendingProfitHistory";
import axios from "axios";
import { UserService } from "../../src/services/UserService";
var uuid = require('react-native-uuid');
export default class Home extends Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      index: 0
    };
    
  }

  componentDidMount() {
    LendingProfitHistoryService.getLendingProfit().then((res) => {
      console.log(res.rows)
      this.setState(
        {
          data: res != undefined ? res.rows : [],
        }
      );
    });
  }

  render() {
    return (
      <ScrollView
        style={[myStyle.container]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[myStyle.container]}>
          <View style={[myStyle.charHome]}>
            <ChartHome></ChartHome>
          </View>
          <View style={myStyle.listStatisticalBasic}>
            <ListStatisticalBasic></ListStatisticalBasic>
          </View>

          <View>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <HistoryInterest
                  createAt={item.createdAt?.toString().substr(0, 10) || "undefined"}
                  profits={item.profitAmount || 0}
                  amount={item.loanAmount || 0}
                  daysLeft={this.getDaysLeft(
                    item.lending ? item.lending.endAt : undefined, item.makeProfitAt
                  )}
                />
              )}
              keyExtractor={(item) => item._id || uuid.v4()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  getDaysLeft = (endAt: Date | undefined, makeAt: Date | undefined): number => {
    const secondCurrent = Date.now();

    if (endAt && makeAt) {
      const leftSecond = Date.parse(endAt.toString())  - Date.parse(makeAt.toString());
        const daysLeft = Math.ceil(
          leftSecond / (1000 * 60 * 60 * 24)
        );
        return daysLeft;
     
    }
    return 0;
  };
}

type props = {};
type state = {
  data: ProfitHistory[],
  index: number
};
