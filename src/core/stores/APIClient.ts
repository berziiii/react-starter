// import * as _ from "lodash";
import axios, {AxiosInstance, AxiosRequestConfig, CancelTokenSource, AxiosResponse} from "axios";
import {AppConfig} from "../AppConfig";
// import * as Models from "../models/Index";

export class APIClient {

    // static accessToken: Models.AccessToken | undefined;

    static createClient(): { client: AxiosInstance, config: AxiosRequestConfig, cancelToken: CancelTokenSource } {
        const result: any = {};
    
        const clientConfig: AxiosRequestConfig = {
            timeout: AppConfig.Settings.Server.timeout,
            baseURL: AppConfig.Settings.Server.baseUrl
        };

        result.client = axios.create(clientConfig);
        
        const cancelTokenHelper = axios.CancelToken;
        result.cancelToken = cancelTokenHelper.source();
    
        const config: AxiosRequestConfig = {};
        config.headers = {};
    
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "application/json";
        // if (!_.isNil(this.accessToken))  config.headers["Authorization"] = `token=${this.accessToken}`;
    
        config.params = {};
    
        config.cancelToken = result.cancelToken.token;
    
        config.withCredentials = true;
    
        result.config = config;
    
        return result;
    }

    // ********************** //
    // ******* EXAMPLE ******* //
    // ********************** //

    static async getExample() {
        const {client, config} = this.createClient();
        const url = `/api/example`;
        return await client
            .get(url, config)
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((err) => {
                console.error(err);
                return err;
            });
    }
}

export default APIClient;