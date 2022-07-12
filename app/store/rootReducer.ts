import { reducer as toastReducer } from "react-redux-toastr";

import { reducer as userReducer } from "./user/user.slice";

export const reducers = {
	user: userReducer,
	toastr: toastReducer,
};
