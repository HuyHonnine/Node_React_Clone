const actionTypes = {
  // Authentication Actions
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",

  // Authentication Success/Failure Actions
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",

  // Post Actions
  GET_POSTS: "GET_POSTS",
  GET_HOT_POSTS: "GET_HOT_POSTS",
  GET_NEW_POSTS: "GET_NEW_POSTS",
  GET_POSTS_PAGINATION: "GET_POSTS_PAGINATION",
  GET_POSTS_MANAGE: "GET_POSTS_MANAGE",
  EDIT_DATA: "EDIT_DATA",
  RESET_DATA_EDIT: "RESET_DATA_EDIT",

  //App Actions
  GET_CATEGORIES: "GET_CATEGORIES",
  GET_PROVINCES: "GET_PROVINCES",
  GET_PRICES: "GET_PRICES",
  GET_AREAS: "GET_AREAS",

  //User Actions
  GET_CURRENT: "GET_CURRENT",
};

export default actionTypes;
