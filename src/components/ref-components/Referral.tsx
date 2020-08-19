import * as React from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button, Clipboard } from 'react-native';
import Separator from '../Separator'
import { TouchableOpacity, ScrollView, FlatList } from 'react-native-gesture-handler';
import RefAbout from './RefAbout';
import HistoryDetail from './HistoryDetail';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { Referal } from '@Core/model/user/Referal';
import { ReferralService } from '../../services/ReferralService';



const user = {
    urlRef: 'http://lendinggame.com/ref=?83587345435345',
    amountRef: 19,
    profits: 19000,
    ref: [
        { id: '71287482734892', time: '2020-08-15 15:12' },
        { id: '43675434534535', time: '2020-08-15 15:12' },
        { id: '86746325345645', time: '2020-08-15 15:12' },
        { id: '71287482734892', time: '2020-08-15 15:12' },

    ]
};


export default class Referral extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            myReferral: [],
            myID: "ID is null"
        }
        ReferralService.getReferral().then(res => {
            this.setState({ myReferral: res.rows })
        })
        ReferralService.getMe().then(res => {
            this.setState({myID: res._id != undefined ? res._id : "null"})
        })
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#181f29' }}>
                <FlashMessage position="center" />
                <View style={styles.container}>
                    <Text style={styles.textLabel}>REFERRAL</Text>
                    <Text style={{ textAlign: 'justify', color: '#fff' }}>The Lending game referral program is a great way to read the word of this great service and to earn even more money with your friend! Refer friends and receive 1000 COIN of their earnings for life!</Text>
                    <View style={{
                        flexDirection: 'row',
                        padding: 20,
                        marginVertical: 10
                    }}>
                        <TextInput
                            value={this.getLinkRef()}
                            style={styles.urlRef}
                            editable={false}
                            textContentType={'URL'}
                        />
                        <TouchableOpacity
                            style={styles.copy}
                            onPress={() => this.copyToClipboard()}
                        >
                            <Text style={styles.copyText}>Copy</Text>
                        </TouchableOpacity >
                    </View>

                    <Separator />

                    <View style={styles.refAbout}>
                        <RefAbout
                            label='Total'
                            amount={this.state.myReferral.length}
                            urlIcon='../../assets/icons8_user_groups_80px_1.png'
                        ></RefAbout>
                        <RefAbout
                            label='Reward'
                            amount={this.state.myReferral.length * 1000}
                            urlIcon='../../assets/icons8_user_groups_80px_1.png'
                        ></RefAbout>

                    </View>


                </View>
                <View style={styles.container2}>
                    <Text style={{ paddingBottom: 15, color: '#fff', fontSize: 17, fontWeight: "500" }}>My Referrals</Text>
                    <Separator />
                    <FlatList data={this.state.myReferral}
                        renderItem={({ item }) =>
                            <HistoryDetail
                                title={item.toUser?.username}
                                time={this.getTime( item.createdAt)}
                                coin={1000}
                            />}
                        keyExtractor={item => item._id ? item._id : 'null ID'} />




                </View>

            </ScrollView>
        )
    }
    copyToClipboard = () => {
        Clipboard.setString(this.getLinkRef())
        showMessage({
            message: "Copied!",
            type: "success",
            hideOnPress: true,
            // backgroundColor: "purple", // background color
            color: "#fff",
            duration: 500
        });
    }


    getTime = (date: Date | undefined): String => {
        if (date !== undefined) return date.toString().substring(0, 10)
        else return 'null'
    }

    getLinkRef = () => {
        console.log(this.state.myID);
        
        return 'https://lendinggame.com/ref=?' + this.state.myID
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#868685',
        paddingBottom: 5,
        backgroundColor: '#1e2126'
    },
    container2: {
        marginTop: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#868685',
        paddingBottom: 5,
        paddingTop: 10,
        backgroundColor: '#1e2126'
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        marginRight: 10
    },
    urlRef: {
        flex: 1,
        flexGrow: 1,
        borderColor: '#fff',
        borderWidth: 1.5,
        outline: 'none',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,

        paddingHorizontal: 15,
        paddingVertical: 5,
        fontSize: 10,
        fontWeight: "500",
        color: '#fff'
    },
    copy: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#FB8C00',
        borderColor: '#fff',
        borderWidth: 1.5,
        outline: 'none',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderLeftWidth: 0
    },
    copyText: {
        fontSize: 14,
        fontWeight: "700",
        color: '#fff'
    },
    refAbout: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20

    },
    textLabel: {
        paddingBottom: 15,
        color: '#fff',
        fontSize: 17,
        fontWeight: "500"
    }

})

type Props = {

}

type State = {
    myReferral: Array<Referal>,
    myID: String
}