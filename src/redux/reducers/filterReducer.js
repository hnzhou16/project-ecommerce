import {actionTypes} from "../actions/actionTypes";

const initState = {
  requestBody: {},
  filterList: {},
  checkedItems: {},
  productList: {}
}

export const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_REQUEST_BODY:
      return {...state, requestBody: action.payload}

    case actionTypes.FETCH_FILTER:
      return {...state, filterList: action.payload}

    case actionTypes.CLEAR_FILTER:
      let newClearedRequestBody = {...state.requestBody}

      for (const group in newClearedRequestBody) {
        newClearedRequestBody[group] = state.requestBody[group].map(item => {return {...item, isChecked: false}})
      }

      return {...state, requestBody: newClearedRequestBody, checkedItems: {}}

    case actionTypes.FILTER_GENDER:
      let newFilterGenderRequestBody = {...state.requestBody}
      let newFilterGenderCheckedItems = {...state.checkedItems}

      newFilterGenderRequestBody[action.payload] = state.requestBody[action.payload].map((item, i) => {
        if (i === action.payload2) {
          const updatedItem = {...item, isChecked: true}
          if (!Object.keys(state.checkedItems).includes(updatedItem.name)) {
            newFilterGenderCheckedItems[updatedItem.name] = {
              group: action.payload,
              index: action.payload2
            }
          }
          return updatedItem
        } else {
          return item
        }
      })
      return {...state, requestBody: newFilterGenderRequestBody, checkedItems: newFilterGenderCheckedItems}

    case actionTypes.FILTER_SELECTED:
      let newRequestBody = {...state.requestBody}
      let newCheckedItems = {...state.checkedItems}
      // To modify 'newRequestBody':
      // OPTION 1
      // newRequestBody[action.payload][action.payload2].isChecked = !state.requestBody[action.payload][action.payload2].isChecked
      // OPTION 2
      newRequestBody[action.payload] = state.requestBody[action.payload].map((item, i) => {
        if (i === action.payload2) {
          // // code below won't work, MUST create a deep copy of item
          // // {...requestBody} only create shallow copy, directly modifying isChecked will make it unable to be used again
          // item.isChecked = !item.isChecked
          const updatedItem = {...item, isChecked: !item.isChecked}

          if (updatedItem.isChecked && !Object.keys(state.checkedItems).includes(updatedItem.name || updatedItem.swatch.colorGroup_name)) {
            newCheckedItems[updatedItem.name || updatedItem.swatch.colorGroup_name] = {
              group: action.payload,
              index: action.payload2
            }
          } else if (!updatedItem.isChecked && Object.keys(state.checkedItems).includes(updatedItem.name || updatedItem.swatch.colorGroup_name)) {
            delete newCheckedItems[updatedItem.name || updatedItem.swatch.colorGroup_name]
          }

          return updatedItem
        } else {
          return item
        }
      })

      return {...state, requestBody: newRequestBody, checkedItems: newCheckedItems}
    case actionTypes.FETCH_FILTERED_PRODUCTS:
      return {...state, productList: action.payload}
    default:
      return state
  }
}