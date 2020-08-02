import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, ImageBackground } from "react-native";
import { Content, Icon, Card, Spinner } from "native-base";
import { connect } from 'react-redux';

import LoadingInteraction from "../components/loadingInteraction";
import HeaderGoBack from "../components/headerGoBack";
import { onChangePeopleListSettings } from "../actions/OtherActions"

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

class Home extends Component {

    static navigationOptions = {
        title: '',
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            homeworldOBJ: {},
            homeWorldSpinner: true,

            filmsOBJ: [],
            filmsdSpinner: true,

            vehiclesOBJ: [],
            vehiclesdSpinner: true,

            starshipsOBJ: [],
            starshipsdSpinner: true,
        }
    }

    componentDidMount() {
        this.getHomeWorld()
        this.getFilms()
        this.getVehicles()
        this.getStarShips()
    }

    getHomeWorld() {
        const item = this.props.navigation.state.params
        fetch(item.homeworld, {
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
                    homeworldOBJ: responseJson,
                    homeWorldSpinner: false
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

    async getFilms() {
        const item = this.props.navigation.state.params
        let films = []

        await item.films.forEach(async (element, index) => {
            await fetch(element, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(async responseJson => {
                    responseJson.image =
                        responseJson.episode_id == 1 ? require(`../img/1.jpg`) :
                            responseJson.episode_id == 2 ? require(`../img/2.jpg`) :
                                responseJson.episode_id == 3 ? require(`../img/3.jpg`) :
                                    responseJson.episode_id == 4 ? require(`../img/4.jpg`) :
                                        responseJson.episode_id == 5 ? require(`../img/5.jpg`) :
                                            responseJson.episode_id == 6 ? require(`../img/6.jpg`) :
                                                responseJson.episode_id == 7 ? require(`../img/7.jpg`) :
                                                    responseJson.episode_id == 8 ? require(`../img/8.jpg`) :
                                                        require(`../img/9.jpg`)
                    await films.push(responseJson)
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
            if (index == item.films.length - 1) {
                this.setState({
                    filmsOBJ: films,
                    filmsdSpinner: false,
                })
            }
        });
    }

    async getVehicles() {
        const item = this.props.navigation.state.params
        let vehicles = []

        await item.vehicles.forEach(async (element, index) => {
            await fetch(element, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(async responseJson => {
                    await vehicles.push(responseJson)
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
            if (index == item.vehicles.length - 1) {
                this.setState({
                    vehiclesOBJ: vehicles,
                    vehiclesdSpinner: false,
                })
            }
        });
    }

    async getStarShips() {
        const item = this.props.navigation.state.params
        let starships = []

        await item.starships.forEach(async (element, index) => {
            await fetch(element, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(async responseJson => {
                    await starships.push(responseJson)
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
            if (index == item.starships.length - 1) {
                this.setState({
                    starshipsOBJ: starships,
                    starshipsdSpinner: false,
                })
            }
        });
    }






    render() {
        const item = this.props.navigation.state.params

        return (
            <HeaderGoBack pagetitle={`Detail`} onBack={() => this.props.navigation.goBack()} >
                <Content style={{}} >
                    <Card style={{ padding: 20, borderRadius: 10, width: width - 20, alignSelf: 'center' }} >
                        <Text style={{ fontWeight: '900', color: 'black', marginBottom: 30, fontSize: 20 }} >{item.name}</Text>
                        {this.renderData('Gender', item.gender)}
                        {this.renderData('Birth Year', item.birth_year)}
                        {this.renderData('Mass', item.mass)}
                        {this.renderData('Height', item.height)}
                        {this.renderData('Hair Color', item.hair_color)}
                        {this.renderData('Skin Color', item.skin_color)}
                        {this.renderData('Eye Color', item.eye_color)}
                        {this.renderHomeWorld()}
                        {this.renderFilms()}
                        {this.renderVehicles()}
                        {this.renderStarShips()}
                    </Card>
                </Content>
            </HeaderGoBack>
        );
    }

    renderHomeWorld() {
        const item = this.state.homeworldOBJ
        return (
            <View style={{ marginTop: 40 }} >
                {
                    this.state.homeWorldSpinner ?
                        <Spinner size="large" color={'black'} />
                        :
                        <View>
                            <Text style={{ fontWeight: '900', color: 'black', marginBottom: 10, fontSize: 16 }} >Home World on {item.name}</Text>
                            {this.renderData('Terrain', item.terrain)}
                            {this.renderData('Rotation Period', item.rotation_period)}
                            {this.renderData('Oribal Period', item.orbital_period)}
                            {this.renderData('Diameter', item.diameter)}
                            {this.renderData('Climate', item.climate)}
                            {this.renderData('Population', item.population)}

                        </View>
                }
            </View>
        )
    }

    renderFilms() {
        return (
            <View style={{ marginTop: 40 }} >
                {
                    this.state.homeWorldSpinner ?
                        <Spinner size="large" color={'black'} />
                        :
                        <View>
                            <Text style={{ fontWeight: '900', color: 'black', marginBottom: 10, fontSize: 16 }} >Films</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal  >
                                {this.state.filmsOBJ.map((obj, index) => {
                                    return (
                                        <ImageBackground imageStyle={{ borderRadius: 10, }} source={obj.image} style={{ padding: 5, borderRadius: 5, marginRight: 5, justifyContent: 'space-between', height: height / 3, width: 200 }} >
                                            <View />
                                            <Text style={{ fontWeight: '900', color: 'white', marginBottom: 30, fontSize: 14 }} >Episode {obj.episode_id}: {obj.title}</Text>
                                        </ImageBackground>
                                    )
                                })}
                            </ScrollView>
                        </View>
                }
            </View>
        )
    }

    renderVehicles() {
        return (
            <View style={{ marginTop: 40 }} >
                {
                    this.state.homeWorldSpinner ?
                        <Spinner size="large" color={'black'} />
                        :
                        <View>
                            <Text style={{ fontWeight: '900', color: 'black', marginBottom: 10, fontSize: 16 }} >Vehicles</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal  >
                                {this.state.vehiclesOBJ.map((obj, index) => {
                                    return (
                                        <Card style={{ padding: 5, borderRadius: 5, marginRight: 5, justifyContent: 'space-between', width: 200 }} >
                                            <Text style={{ fontWeight: '600', color: 'black', marginBottom: 30, fontSize: 14 }} >{obj.name}</Text>
                                            <View>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Model : {obj.model}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Manufacturer : {obj.manufacturer}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Costs in credit : {obj.cost_in_credits}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Length : {obj.length}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Atmosphering Speed : {obj.max_atmosphering_speed}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Crew : {obj.crew}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Class : {obj.vehicle_class}</Text>
                                            </View>
                                        </Card>
                                    )
                                })}
                            </ScrollView>
                        </View>
                }
            </View>
        )
    }

    renderStarShips() {
        return (
            <View style={{ marginTop: 40 }} >
                {
                    this.state.homeWorldSpinner ?
                        <Spinner size="large" color={'black'} />
                        :
                        <View>
                            <Text style={{ fontWeight: '900', color: 'black', marginBottom: 10, fontSize: 16 }} >Star Ships</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal  >
                                {this.state.starshipsOBJ.map((obj, index) => {
                                    return (
                                        <Card style={{ padding: 5, borderRadius: 5, marginRight: 5, justifyContent: 'space-between', width: 200 }} >
                                            <Text style={{ fontWeight: '600', color: 'black', marginBottom: 30, fontSize: 14 }} >{obj.name}</Text>
                                            <View>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Model : {obj.model}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Manufacturer : {obj.manufacturer}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Costs in credit : {obj.cost_in_credits}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Length : {obj.length}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Atmosphering Speed : {obj.max_atmosphering_speed}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Crew : {obj.crew}</Text>
                                                <Text numberOfLines={10} style={{ fontSize: 14, }} >Class : {obj.starship_class}</Text>
                                            </View>
                                        </Card>
                                    )
                                })}
                            </ScrollView>
                        </View>
                }
            </View>
        )
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
