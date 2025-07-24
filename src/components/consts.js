export const serverAPI = process.env.NODE_ENV === "production" ? process.env.REACT_APP_DOMAIN_SERVER : process.env.REACT_APP_LOCAL_SERVER
// export const serverAPI = process.env.REACT_APP_LOCAL_SERVER
export const fetchFilterUrl = `${serverAPI}/filter/getFilter`
export const fetchProductsUrl = `${serverAPI}/filter/filteredProducts`
export const singleProductUrl = `${serverAPI}/product`
export const authAPI = `${serverAPI}/auth`
export const cartAPI = `${serverAPI}/cart`
export const AIAPI = `${serverAPI}/AI`