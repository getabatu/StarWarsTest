import { navReducer } from './Navigation';
import OtherReducers from './OtherReducers';

const rootReducers = {
    nav: navReducer,
    other: OtherReducers,
}

export default rootReducers;
