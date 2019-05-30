import * as React from "react";
import {AppStore} from "../stores/AppStore";
import * as Store from "../../core/stores/DataStore";

export abstract class BaseComponent<P = {}, S = {}> extends React.Component<P, S> {
    protected dataStore = new Store.DataStore();
    protected appStore = new AppStore();
}