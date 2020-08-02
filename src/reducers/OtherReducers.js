const INITIAL_STATE = {
    peopleListSettings: {
        currentURL: '',
        previousPage: '',
        nextPage: '',
        results: []
    },
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'peopleListSettings':
            return { ...state, peopleListSettings: action.payload }
        default:
            return state;
    }
}
