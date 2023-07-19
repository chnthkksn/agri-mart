import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './reducers/themeReducer'
import userReducer from './reducers/userReducer'
import adsReducer from './reducers/adsReducer'


export default configureStore({
    reducer: {
        theme: themeReducer,
        userType: userReducer,
        ads: adsReducer
    }
})
