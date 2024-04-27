import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Rental,
  HomePage,
  DetailPost,
  FilterDetail,
  Contact,
} from "./containers/public";
import { path } from "./ultils/constant";
import {
  System,
  CreatePost,
  PostManage,
  EditAccount,
} from "./containers/system";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "./store/actions";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.actionGetCategory());
    dispatch(actions.actionGetPrices());
    dispatch(actions.actionGetAreas());
    dispatch(actions.actionGetProvinces());
  }, []);

  return (
    <section className="h-full w-full bg-homeBackground">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.FILTER} element={<FilterDetail />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route
            path={path.DETAL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.POST_MANAGE} element={<PostManage />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
