// Components/FilmItem.js

import React from 'react'
import moment from 'moment'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import {getImageFromApi} from '../API/TMDBApi.js'

class FilmItem extends React.Component {

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (this.props.isFilmFavorite == true) {
            // Film dans nos favoris
            sourceImage = require('../Images/ic_favorite.png')
        }
        return (
            <Image style={styles.favorite_image}
                   source={sourceImage}
            />
        )
    }

    render() {
        const {film, isFilmFavorite, displayDetailForFilm} = this.props
        let release_date = new Date(film.release_date)
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => displayDetailForFilm(film.id)}>
                <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(film.backdrop_path)}}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        {this._displayFavoriteImage()}
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{film.overview}}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le {moment(release_date).format('DD/MM/YYYY')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_image:{
        width: 40,
        height: 40
    }
})

export default FilmItem
