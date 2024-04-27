import actionTypes from "../actions/actionTypes";
const initState = {
  posts: [],
  newPosts: [],
  hotPosts: [],
  msg: "",
  count: 0,
  postOfCurrent: [],
  dataEdit: null,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.GET_HOT_POSTS:
      return {
        ...state,
        hotPosts: action.hotPosts || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_NEW_POSTS:
      return {
        ...state,
        newPosts: action.newPosts || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_POSTS_PAGINATION:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.GET_POSTS_MANAGE:
      return {
        ...state,
        postOfCurrent: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.EDIT_DATA:
      return {
        ...state,
        dataEdit: action.dataEdit || null,
      };
    case actionTypes.RESET_DATA_EDIT:
      return {
        ...state,
        dataEdit: null,
      };
    default:
      return state;
  }
};

export default postReducer;
