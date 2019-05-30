import * as React from "react";
import {Observer} from "mobx-react";
import { Icon } from "antd";
import {LoadingInterface, LoadingProps, LoadingState} from "./LoadingInterface";
import {BaseComponent} from "../BaseComponent";

export class Loading <P extends LoadingProps = LoadingProps, S extends LoadingState = LoadingState> extends BaseComponent<P, S> implements LoadingInterface {
    constructor(props: any) {
        super(props);
    }

    render() {
        return(
            <Observer>
                {() =>
                    <div className="loading__main-container">
                        <Icon type="loading" />
                    </div>}
            </Observer>
        );
    }
}