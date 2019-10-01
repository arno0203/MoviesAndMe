// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {
  constructor(props){
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPage = 0
    this.state = {
      films : [],
      isLoading: false
    }
  }

  _loadFilms(){
    if(this.searchedText.length > 0){
      this.setState({isLoading: true})
    getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(
        data => {
          this.page = data.page
          this.totalPage = data.total_pages
          this.setState({
            films:  [ ...this.state.films, ...data.results ] // => films: this.state.films.concat(data.results)
            , isLoading: false
          })
        }
      )
    }
  } 

  _searchTextInputChanged(text) {
       this.searchedText = text
   }

  _searchFilm(){
    this.page = 0
    this.totalPage = 0
    
    this.setState(
      {
        films : []
      }
      , () => {
        console.log("--->Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms()
      })
   
   }

  _displayLoading() {
     if (this.state.isLoading) {
       return (
         <View style={styles.loading_container}>
           <ActivityIndicator size='large' />
         </View>
       )
     }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing= {() => this._loadFilms()}
          />
        <Button title='Rechercher' onPress={() => this._searchFilm()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
          onEndReached={() => {
            if(this.page < this.totalPage){
              this._loadFilms()
            }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
