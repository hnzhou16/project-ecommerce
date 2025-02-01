import {fetchFilterUrl, fetchProductsUrl} from "../../components/consts";
import {actionTypes} from "./actionTypes";

export const fetchFilter = () => dispatch => {
  fetch(fetchFilterUrl)
    .then(res => res.json())
    .then(res => {
      const data = res.data
      dispatch({
        type: actionTypes.FILTER_REQUEST_BODY,
        payload: data
      })

      let newRes = {}
      for (const key in data) {
        newRes[key] = data[key].map(item => item.name || [item.swatch.colorGroup_name, item.swatch.colorGroup_url])
      }

      dispatch({
        type: actionTypes.FETCH_FILTER,
        payload: newRes
      })
    }).catch(err => console.log('fetch filter error: ', err))
}

export const clearFilter = () => {
  return {
    type: actionTypes.CLEAR_FILTER
  }
}

export const filterGender = (group='Gender', index) => {
    return {
      type: actionTypes.FILTER_GENDER,
      payload: group,
      payload2: index
  }
}

// 'group' and 'index' are directly values, NO '{}' needed
export const filterSelected = (group, index) => {
  return {
    type: actionTypes.FILTER_SELECTED,
    payload: group,
    payload2: index
  }
}

export const fetchFilteredProducts = (requestBody) => dispatch => {
  fetch(fetchProductsUrl, {
    method: 'POST',
    // must include the 'headers' and make the requestBody a JSON format
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestBody)
  }).then(res => res.json())
    .then(res => {
      let products = res.data
      // console.log(products)
      dispatch({
        type: actionTypes.FETCH_FILTERED_PRODUCTS,
        payload: products
      })
    })
}
