import * as constants from "../constants/action-types";

const initialState = {
    users: {},
    login: null,
    userList: [],
    next_page: 1,
    total_pages: 1
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case constants.LOGIN:
            return Object.assign({}, state, {
                login: action.payload,
            });
        case constants.SET:
            return { ...state, ...action.payload };
        case constants.SET_USER:
            return { ...state, ...action.payload };
        case constants.SET_NEXT_PAGE:
            return { ...state, ...action.payload };
        case constants.SET_TOTAL:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default rootReducer;
