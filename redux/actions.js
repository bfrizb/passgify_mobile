// Define action types
export const UPDATE_STATE = "UPDATE_STATE";

export const updateSetting = (k, v) => (dispatch) => {
  dispatch({
    type: UPDATE_STATE,
    payload: { key: k, value: v },
  });
};
