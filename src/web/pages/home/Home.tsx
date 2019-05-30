import * as React from "react";
import {Observer} from "mobx-react";
import {HomeInterface, HomeProps, HomeState} from "./HomeInterface";
import {BaseComponent} from "../../components/BaseComponent";

export class Home <P extends HomeProps = HomeProps, S extends HomeState = HomeState> extends BaseComponent<P, S> implements HomeInterface {
    constructor(props: any) {
        super(props);
    }

    protected renderContent() {
        return (
            <div>
                <h1> Home Page </h1>
            </div>
        );
    }

    render() {
        return(
            <Observer>
                {() => this.renderContent()}
            </Observer>
        );
    }
}