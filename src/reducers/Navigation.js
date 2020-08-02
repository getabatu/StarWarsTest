import { NavigationActions } from 'react-navigation';

import { Root } from '../AppNavigation';
import { getCurrentRouteName, getActionRouteName } from '../utils/config/navigate';

//initial router into login screen

const initialNavState = Root.router.getStateForAction(Root.router.getActionForPathAndParams('LandingScreen'));

export const navReducer = (state = initialNavState, action) => {
  const nextState = Root.router.getStateForAction(action, state);
  const { type } = action;
  if (type === NavigationActions.NAVIGATE) {
    // Return current state if no routes have changed
    if (getActionRouteName(action) === getCurrentRouteName(state)) {
      return state;
    }
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
