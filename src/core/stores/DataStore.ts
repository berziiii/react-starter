import * as _ from "lodash";
import * as localforage from "localforage";
import * as Models from "../models/Index";
import {observable, action} from "mobx";
// import APIClient from "./APIClient";

export class DataStore implements Models.Store {
    instance: any = null;
    storage: LocalForage;
    @observable authorizedUser: any = undefined;

    constructor() {
        if (_.isNil(this.instance)) {
            this.storage = localforage.createInstance({
                name: "default"
            });
        }

        return this.instance;
    }

    processResponse(response: any) {
        return response.data;
    }

    @action
    async exampleAction() {
        this.storage.clear()
        .then((response: any) => {
            this.processResponse(response);
        })
        .catch((err: Error) => {
            console.error(err);
        });
    }

    @action
    initialize() {
        //    do something for initialize
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

}
