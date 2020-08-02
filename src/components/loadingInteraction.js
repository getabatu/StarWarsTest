import React, { Component } from 'react';
import { InteractionManager, View } from "react-native";
import { Spinner } from "native-base";

import GlobalStyle from "../style/globalStyle";

const LoadingInteraction = (ComponentInterect) => {
    return class LoadingInteraction extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true
            }
        }

        componentWillMount() {
            InteractionManager.runAfterInteractions(() => {
                this.setState({ loading: false })
            })
        }

        render() {
            if (this.state.loading) {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Spinner size='large' color={GlobalStyle.blue} />
                    </View>
                )
            } else {
                return (<ComponentInterect {...this.props} />)
            }
        }
    }
}
export default LoadingInteraction;