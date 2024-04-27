import actionTypes from "./actionTypes";
import * as service from "../../services";

export const actionGetPost = () => async (dispatch) => {
  try {
    const response = await service.apiGetPost();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS,
      posts: null,
    });
  }
};

export const actionGetHotPost = () => async (dispatch) => {
  try {
    const response = await service.apiGetHotPost();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_HOT_POSTS,
        hotPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_HOT_POSTS,
        msg: response.data.msg,
        hotPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOT_POSTS,
      hotPosts: null,
    });
  }
};

export const actionGetNewPost = () => async (dispatch) => {
  try {
    const response = await service.apiGetNewPost();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_NEW_POSTS,
        newPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEW_POSTS,
        msg: response.data.msg,
        newPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NEW_POSTS,
      newPosts: null,
    });
  }
};

export const actionGetPostPagination = (query) => async (dispatch) => {
  try {
    const response = await service.apiGetPostPagination(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_PAGINATION,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_PAGINATION,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_PAGINATION,
      posts: null,
    });
  }
};

export const actionGetPostManage = (query) => async (dispatch) => {
  try {
    const response = await service.apiGetPostManage(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_MANAGE,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_MANAGE,
        msg: response.data.msg,
        posts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_MANAGE,
      posts: null,
    });
  }
};



export const actionEditData = (dataEdit) => ({
  type: actionTypes.EDIT_DATA,
  dataEdit,
});

export const resetDataEdit = () => ({
  type: actionTypes.RESET_DATA_EDIT,
});
