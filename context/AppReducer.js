export const authState = {isAuthenticated: false};
export const filterState = {uniqueFilters: [], selectedFilters: []}
// reducer that takes the state and the action paylod that determines which state to update

export const reducer = (state, action) => { // expects a current state and action to be worked on
  switch (action.type) {
    case "AUTHENTICATED":{
        let updatedAuth = {...authState}
        updatedAuth.isAuthenticated = true
        return updatedAuth
    }
    case "SIGNOUT":{
        let updatedAuth = {...authState}
        updatedAuth.isAuthenticated = false
        return updatedAuth
    }
    case "UNIQUE_FILTERS":{
        let currState = {...filterState}
        currState.uniqueFilters = [...action.payload]
        return currState
    }
    case "UPDATE_SELECTED_FILTERS":{
        let currState = {...filterState}
        let updated = [...currState.selectedFilters, ...action.payload.selected]
        currState.selectedFilters = updated
        currState.uniqueFilters = action.payload.unique
        return currState
    }
    default:
      return state;
  }
}