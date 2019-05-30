import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as _ from "lodash";
import * as React from "react";
import {Observer, Provider, observer} from "mobx-react";
import * as ComponentFactory from "./components/ComponentFactory";
import {DataStore} from "../core/stores/DataStore";
import {AppStore, AppMode} from "./stores/AppStore";
import { Layout } from "antd";

const { Content, Footer } = Layout;

export interface AppProps {
    config?: any;
    locale?: string;
    showHeader?: boolean;
}

export interface AppState {
    isLoading?: any;
    mode?: any;
}

@observer
class App extends React.Component<AppProps, AppState> {
    state: AppState = {} as AppState;
    appStore: AppStore;
    dataStore: DataStore;
    constructor(props: AppProps) {
        super(props);
        this.state = {
            isLoading: true,
            mode: AppMode.Desktop
        };
        this.appStore = new AppStore();
        this.dataStore = new DataStore();
        this.handleResize = this.handleResize.bind(this);
    }

    componentWillMount() {
        this.appStore.dataStore.initialize()
        .then(() => {
           // Do something for Initialize
            this.setState({isLoading: false});
        })
        .catch((err: string) => {
            console.error(err);
            this.appStore.showMessage("error", err);
        });
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize() {
        const mode = this.appStore.evaluateMode();
        if (this.state.mode !== mode)
            this.setState({mode: mode});
    }

    render() {
        const content = (
            <>
                <Content>
                    <Switch>
                        <Route exact path={"/"} component={ComponentFactory.Home}/>
                        <Route component={ComponentFactory.NotFound}/>
                    </Switch>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    MTG League &copy;2019
                </Footer>
            </>
        );

        const layout = (
            <div className="app__container">
                <Layout>
                    {this.state.isLoading &&
                    <ComponentFactory.Loading />}

                    {!this.state.isLoading && 
                        <>
                        {this.state.mode === AppMode.Desktop && 
                            <>
                                <Layout style={{ marginLeft: 150 }}>
                                    {content}
                                </Layout>
                            </>
                        }
                        {this.state.mode === AppMode.Mobile && 
                            <>
                            <Layout>
                                {content}
                            </Layout>
                            </>
                        }
                        </>
                    }
                </Layout>
            </div>
        );

        return (
            <Provider>
                <>
                <Observer>
                    {() => 
                    <Router>
                        <Route path="/"
                            render={(props: any) => {
                                AppStore.history = props.history;
                                AppStore.location = props.location;

                                return layout;
                            }}/>
                    </Router>}
                </Observer>
                </>
            </Provider>
        );
    }
}

export default App;