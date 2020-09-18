import { Referal } from "@Core/model/user/Referal";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import HistoryDetail from "./HistoryDetail";


export default class MyReferrals extends React.Component<Props, State>{
    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container2}>
                <FlatList data={this.props.myReferrals}
                    renderItem={({ item }) =>
                        <HistoryDetail
                            type={true}
                            typeLabel='EARNED'
                            title={item.toUser?.username}
                            time={this.getTime(item.createdAt)}
                            coin={1000}
                        />}
                    keyExtractor={(item: Referal, index: number) => item._id || index.toString()} />
            </View>
        )
    }

    getTime = (date: Date | undefined): String => {
        if (date !== undefined) return date.toString().substring(0, 10)
        else return 'null'
    }
}

const styles = StyleSheet.create({
    container2: {
        paddingBottom: 10,
        paddingTop: 10,
        // backgroundColor: color.backgound
    },
})

type Props = {
    myReferrals: Referal[]
}

type State = {

}