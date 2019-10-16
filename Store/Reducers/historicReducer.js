// Store/Reducers/favoriteReducer.js

const initialState = { historicFilms: [] }

function manageHistoricFilms(state = initialState, action) {
    let nextState
    let historicFilmIndex = -1

    switch (action.type) {
        case 'TOGGLE_FILMDETAIL':
            historicFilmIndex = state.historicFilms.findIndex(item => item.id === action.value.id)
            if (historicFilmIndex === -1) {
                // Le film n'est pas dans l'historic, on l'ajoute à la liste
                nextState = {
                    ...state,
                    historicFilms: [...state.historicFilms, action.value]
                }
            }
            return nextState || state
        case 'REMOVE_HISTORIC_FILM':
            historicFilmIndex = state.historicFilms.findIndex(item => item.id === action.value.id)
            if (historicFilmIndex !== -1) {
                // Le film est déjà dans l'historic, on le supprime de la liste
                nextState = {
                    ...state,
                    historicFilms: state.historicFilms.filter( (item, index) => index !== historicFilmIndex)
                }
            }
            return nextState || state
        case 'RESET_HISTORIC':
            nextState = {
                ...state,
                historicFilms: []
            }
            return nextState || state
        default:
            return state
    }
}

export default manageHistoricFilms