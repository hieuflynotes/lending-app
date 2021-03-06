import axios from "axios";
import { useSelector } from "react-redux";
import { Actions } from "react-native-router-flux"
import { UserService } from "./UserService";
import * as action from "../Action/ActionPopup"
import * as actionLoadding from "../Action/ActionLoadding"
axios.interceptors.request.use(
    res => {
        actionLoadding.setLoad(true)
        return res
    },
    err => {

    }
);


axios.interceptors.response.use(
    res => {
        actionLoadding.setLoad(false)
        return res;
    },
    err => {
        actionLoadding.setLoad(false)

        if (err.message == "Network Error") {
            action.showMessage("Network Error");
        }

        if (err.response.status == 404) {
            action.showMessage("Have error when processing")
        }
        if (err.response.status == 401) {
            UserService.getJWT().then(res => {
            })

            UserService.setJWT("").then(res => {

                Actions.login();

            })
            return Promise.reject(err);
        }
        if(err.response.status == 500){
            if(err.response.message){
                action.showMessage(err.response.message)
            }
            else {
                action.showMessage("Have error when processing")
            }
        }
    }
)
export const getAxios = async () => {
    var jwt = await UserService.getJWT();
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`
    return axios;
}



export default getAxios();