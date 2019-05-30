import * as React from "react";
import {Observer} from "mobx-react";
import { Icon, Button } from "antd";
import {NotFoundInterface, NotFoundProps, NotFoundState} from "./NotFoundInterface";
import {BaseComponent} from "../BaseComponent";

export class NotFound <P extends NotFoundProps = NotFoundProps, S extends NotFoundState = NotFoundState> extends BaseComponent<P, S> implements NotFoundInterface {
    constructor(props: any) {
        super(props);
        this.handleHomeClick = this.handleHomeClick.bind(this);
    }

    handleHomeClick() {
        this.appStore.navigateTo("/");
    }

    render() {
        return(
            <Observer>
                {() =>
                    <>
                        <h1> Not Found </h1>
                        <Button
                            onClick={this.handleHomeClick}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button">
                            <Icon type="home" />
                        </Button>
                    </>
                }
            </Observer>
        );
    }
}