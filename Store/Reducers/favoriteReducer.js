const initialState = {
    favoritesFilm: []
}

function toggleFavorite(state, action) {
    let nextState

    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)

            if (favoriteFilmIndex !== -1) {
                // film in favoris
                nextState = {
                    ...state,
                    favoriteFilmIndex: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex)
                }
            } else {
                // film is not in favoris
                nextState = {
                    ...state,
                    favoriteFilm: [...state.favoritesFilm, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite