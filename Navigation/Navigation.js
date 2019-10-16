import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'

const SearchStackNavigator = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions:{
            title: 'Rechercher'
        }
    },
    FilmDetail:{
        screen: FilmDetail
        , navigationOptions:{
            title: 'Film'
        }
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: Search
    },
    Favorites: {
        screen: Favorites
    }
})


export default createAppContainer(MoviesTabNavigator)