import React from "react"
import { inject, observer } from "mobx-react";


@inject("user", "account","messaging")
@observer
class Notification extends React.Component{
    componentDidMount=async ()=> {
        await this.props.user.signIn();
        localStorage.removeItem("notification");
        this.props.messaging.setNotification(false);
    }

    render(){
        return(
            <div>Notification page </div>
        )
    }

}
export default Notification;