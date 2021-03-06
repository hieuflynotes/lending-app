import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Separator from '../Separator'
import style from 'src/style';
import * as color from '../../Color'
const timeIcon = <MaterialIcons name="access-time" size={12} color={color.inactive} />;
export default class HistoryDetail extends React.Component<Props, {}>{
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <View >
                <View style={styles.container}>
                    <View style={{marginRight: 15}}>
                        <FontAwesome5 name='money-bill-alt' size={35} color={color.success}/>
                    </View>

                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: 42 }}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            {timeIcon}<Text style={styles.time}>{this.props.time}</Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end', flex: 1 }}>
                        <Text style={styles.time}>{this.props.typeLabel}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <Text style={this.props.type ? styles.coinGreen : styles.coinRed}>
                                {this.props.type && this.props.typeLabel != 'AMOUNT' ? '+' : (this.props.typeLabel == 'AMOUNT' ? '' : '-')}{this.props.coin} COIN</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}

type Props = {
    title: any,
    time: any,
    coin: number,
    type: boolean,
    typeLabel: string
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: color.dark
    },

    subContainer: {
        height: 50,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    logo: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        marginRight: 15,

    },
    amount: {
        fontSize: 28,
        fontWeight: 'bold'

    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "600",

    },
    time: {
        color: '#868685',
        fontSize: 10,
        marginLeft: 3
    },
    coinGreen: {
        fontSize: 15,
        color: color.success,
        fontWeight: "600"
    },
    coinRed: {
        fontSize: 15,
        color: color.warning,
        fontWeight: "600"
    }


})

