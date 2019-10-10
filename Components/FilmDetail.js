import React from 'react'
import {StyleSheet, View, Text, Image, ActivityIndicator, ScrollView} from 'react-native'
import {getFilmDetailFromApi, getImagesFromApi} from '../API/TMDBApi'

class FilmDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            film: undefined
            , isLoading: true
        }
    }

    componentDidMount() {
        let idFilm = this.props.navigation.getParam("idFilm")
        getFilmDetailFromApi(idFilm).then(
            data => {
                this.setState({
                    film: data
                    , isLoading: false
                })
            }
        )
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _listToString(list){
        let ret = ''
        if(list.length > 1){
            for(let element of list ){
                console.log(element)
                if(ret.length > 0){
                    ret += " / "
                }
                ret += element.name
            }
        }
        return ret
    }

    _displayFilm(){
        if(this.state.film != undefined){
            let genres = this.state.film.genres

            return(
                <ScrollView style={styles.scrollview_container}>
                    <View style={styles.content_container}>
                        <Image
                            style={styles.image}
                            source={{uri: getImagesFromApi(this.state.film.poster_path)}}
                        />
                        <View style={styles.title_container}>
                            <Text style={styles.title}>{this.state.film.title}</Text>
                        </View>
                        <View style={styles.content_container}>
                            <Text style={styles.overview}>{this.state.film.overview}</Text>
                        </View>
                        <View style={styles.detail_container}>
                            <Text style={styles.date}>Sorti le : {this.state.film.release_date}</Text>
                            <Text style={styles.note}>Note : {this.state.film.vote_average} / 10</Text>
                            <Text style={styles.vote}>Nombre de vote : {this.state.film.vote_count}</Text>
                            <Text style={styles.budget}>Budget : {this.state.film.budget}</Text>
                            <Text style={styles.genre}>Genre(s) : {this._listToString(this.state.film.genres)}</Text>
                            <Text style={styles.firme}>Compagnie(s) : {this._listToString(this.state.film.production_companies)}</Text>
                        </View>
                    </View>


                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
    , loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
    , scrollview_container:{
        flex: 1
    }
    , content_container: {

    }
    , title_container: {

    }
    , detail_container:{

    }
    , image: {
        width: 120,
        height: 180,
        margin: 5
    }
    , title: {

    }
    , overview:{

    }
    , date: {

    }
    , note: {

    }
    , vote : {

    }
    , budget: {

    }
    , genre: {

    }
    , firme:{

    }
})

export default FilmDetail