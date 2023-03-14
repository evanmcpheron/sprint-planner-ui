export const parseVotes = (currentState, newState, id) => {
  let foundIndex = currentState.findIndex((item) => item.id == id);
  for (const state of newState) {
    currentState[foundIndex][state.category.toLowerCase()] = state.value;
  }
  return currentState;
};
