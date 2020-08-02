import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, ScrollView, FlatList } from "react-native";
import { Content, Icon, Card, Button, Spinner, Item, Input } from "native-base";
import { connect } from 'react-redux';

import LoadingInteraction from "../components/loadingInteraction";
import HeaderMenu from "../components/headerMenu";
import { onChangePeopleListSettings } from "../actions/OtherActions"

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const yellowSW = '#FFE81F'

class Home extends Component {

    static navigationOptions = {
        title: '',
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isSpinner: true,
            results: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.peopleListSettings.currentURL == '') {
                this.getPeople(`http://swapi.dev/api/people/?page=1`)
            } else {
                this.setState({
                    results: this.props.peopleListSettings.results,
                    isSpinner: false
                })
            }
        }, 10);
    }

    getPeople(URL) {
        fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                this.props.onChangePeopleListSettings({
                    currentURL: URL,
                    previousPage: responseJson.previous,
                    nextPage: responseJson.next,
                    results: responseJson.results
                })
                this.setState({
                    results: responseJson.results,
                    isSpinner: false
                })
            })
            .catch(err => {
                console.log(err)
                Toast.show({
                    text: `Error: Harap coba lagi`,
                    position: "bottom",
                    type: "danger",
                    duration: 4000,
                    buttonText: "Okay"
                });
            });
    }

    getQuery(text) {
        fetch(`https://swapi.dev/api/people/?search=${text}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                this.setState({
                    results: responseJson.results,
                    isSpinner: false
                })
            })
            .catch(err => {
                console.log(err)
                Toast.show({
                    text: `Error: Harap coba lagi`,
                    position: "bottom",
                    type: "danger",
                    duration: 4000,
                    buttonText: "Okay"
                });
            });
    }

    changePage(URL) {
        this.setState({
            isSpinner: true,
            results: [],
        }, () => {
            this.getPeople(URL)
        })
    }

    onInputSearch(text) {
        if (text) {
            this.setState({ inputQuery: text, isSpinner: true }, () => { this.getQuery(text) })
        } else {
            this.setState({ isSpinner: true, inputQuery: "" }, () => { this.getPeople(this.props.peopleListSettings.currentURL) })
        }
    }


    render() {
        return (
            <HeaderMenu >
                <Content style={{}} >
                    <Image source={require('../img/swlogo.png')} style={{ resizeMode: 'contain', height: width / 3, alignSelf: 'center' }} />
                    <Item style={{ marginVertical: 20, borderRadius: 10, width: width - 20, alignSelf: 'center' }} regular>
                        <Input style={{ color: 'white' }} value={this.state.inputQuery} onChangeText={(text) => this.onInputSearch(text)} placeholder='Search People' />
                        {
                            this.state.inputQuery ?
                                <TouchableOpacity onPress={(text) => this.onInputSearch("")} >
                                    <Icon style={{ color: 'white' }} type={"FontAwesome"} name={'close'} />
                                </TouchableOpacity>
                                :
                                <View />
                        }
                    </Item>
                    {
                        this.state.isSpinner ?
                            <Spinner size="large" color={yellowSW} />
                            :
                            <FlatList
                                style={{ paddingHorizontal: 15, }}
                                data={this.state.results}
                                renderItem={({ item, index }) => (
                                    <Card style={{ padding: 20, borderRadius: 10 }} >
                                        <Text style={{ color: 'black', marginBottom: 15, fontSize: 20 }} >{item.name}</Text>
                                        {this.renderData('Gender', item.gender)}
                                        {this.renderData('Birth Year', item.birth_year)}
                                        {this.renderData('Height', item.height)}
                                        <Button onPress={() => this.props.navigation.navigate('DetailScreen', { ...item })} bordered style={{ backgroundColor: 'black', paddingLeft: 10, justifyContent: 'center', alignSelf: 'flex-end', borderColor: yellowSW }} >
                                            <Text style={{ color: yellowSW }} >See More</Text>
                                            <Icon type="FontAwesome" name="arrow-right" style={{ color: yellowSW, fontSize: 15 }} />
                                        </Button>
                                    </Card>
                                )}
                            />
                    }
                </Content>
                {
                    this.state.inputQuery || this.state.isSpinner ?
                        null :
                        <View style={{ width, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                            {
                                this.props.peopleListSettings.previousPage ?
                                    <TouchableOpacity onPress={() => this.changePage(this.props.peopleListSettings.previousPage)} style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <Icon type="FontAwesome" name="arrow-left" style={{ color: 'white', fontSize: 20 }} />
                                        <Text style={{ color: 'white', marginLeft: 10 }} >Previous Page</Text>
                                    </TouchableOpacity>
                                    :
                                    <View />
                            }
                            {
                                this.props.peopleListSettings.nextPage ?
                                    <TouchableOpacity onPress={() => this.changePage(this.props.peopleListSettings.nextPage)} style={{ flexDirection: 'row' }} >
                                        <Text style={{ color: 'white', marginRight: 10 }} >Next Page</Text>
                                        <Icon type="FontAwesome" name="arrow-right" style={{ color: 'white', fontSize: 20 }} />
                                    </TouchableOpacity>
                                    :
                                    <View />
                            }
                        </View>
                }
            </HeaderMenu>
        );
    }

    renderData(label, value, fontSize) {
        return (
            <View style={{ width: '100%', marginBottom: 2, alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: fontSize ? fontSize : 14, width: '25%' }} >{label}</Text>
                <Text style={{ fontSize: fontSize ? fontSize : 14 }}>:</Text>
                <Text style={{ fontSize: fontSize ? fontSize : 14, width: '75%' }} >{value}</Text>
            </View>
        )
    }

}

const mapStateToProps = (state) => ({
    peopleListSettings: state.other.peopleListSettings,
})

const mapDispatchToProps = (dispatch) => ({
    onChangePeopleListSettings: (value) => dispatch(onChangePeopleListSettings(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadingInteraction(Home));
