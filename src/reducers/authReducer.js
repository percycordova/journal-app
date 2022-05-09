/*
{
  id:jsahdi3,
  name:'percy
}
*/

import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
