import React, { Component } from 'react'
import { View, Image, Text, Button, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import myStyle from "../style"


import { Actions } from 'react-native-router-flux';
import { UserService } from '../services/UserService';
import { BaseUserWithJwt } from '@Core/model/user/BaseUser';
import { connect } from "react-redux";
import * as action from "../Action/ActionLogin"
import * as actionPopup from "../Action/ActionPopup";
import PopupConfirm from '../components/PopupConfirm';

class EnterYourPhone extends Component<props, state> {
    constructor(props: any) {
        super(props)
        this.state = {
            numberPhone: ""
        }
    }

    componentDidMount() {


    }
    checkPhone() {
        

        UserService.checkExits(this.state.numberPhone).then((res) => {

            if (res && this.props.typeAction == "signUp") {
                actionPopup.showMessage("Account has been registered")
            }
            else if (!res && this.props.typeAction == "forgotPassword") {
                actionPopup.showMessage("Can't find your account")
            }
            else {
                this.props.onPhone(this.state.numberPhone)
                UserService.sendOTP(this.state.numberPhone).then((res) => {
                    let error = UserService.checkValidatePhone(this.state.numberPhone);
                    if (error != null) {
                        actionPopup.showMessage(error);
                    }
                    else {
                        
                    }
                })
                Actions.confirmOTP()

            }

        })
    }
    render() {

        return (
            <KeyboardAvoidingView style={[myStyle.container, myStyle.fullCeter, { alignItems: "center" }]}>

                <View style={[]}>
                    <View style={[myStyle.frLogo]}>
                        <View
                            style={[{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }]}
                        >
                            <Text style={[myStyle.headerSignUp]}>Enter your phone</Text>
                        </View>
                    </View>
                </View>

                <View style={[ myStyle.login]}>


                    <View style={[{ marginTop: 30 }]}>
                        <TextInput
                            style={[myStyle.inputLogin]}
                            selectionColor='red'
                            placeholder={"Enter your phone"}
                            value={this.state.numberPhone}
                            onChange={(event) => {
                                this.setState({
                                    numberPhone: event.target.value
                                })
                            }}

                        />
                    </View>

                    <View style={[myStyle.frbuttonLogin, { marginTop: 30 }]}>
                        <TouchableOpacity style={[myStyle.buttonLogin]}
                            activeOpacity={0.7}
                            onPress={(event) => {
                                this.checkPhone()
                            }}
                        >
                            <Text style={[myStyle.textButton]}>
                                submit
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={[myStyle.row, { marginTop: 10, justifyContent: "center" }]}>
                        <TouchableOpacity
                            onPress={Actions.login}
                        >
                            <Text style={[myStyle.colorWhite, , { color: "#F8C400" }]}>Back to Login</Text>
                        </TouchableOpacity>
                    </View>



                </View>

            </KeyboardAvoidingView>
        )
    }
}

type props = {
    onPhone(numberPhone: string): void,
    typeAction: any
}
type state = {
    numberPhone: string,

}
function mapDispatchToProps(dispatch: any, props: any) {
    return {
        onPhone(numberPhone: string) {
            dispatch(action.setNumberPhone(numberPhone))
        }
    }
}

function mapStateToProps(state: any) {
    return {
        typeAction: state.LoginReducer.actionType
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterYourPhone)