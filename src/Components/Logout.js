import {userDataMap, dataMapKeys} from './UserDataMap.js';

export const logout = () => {
    userDataMap.set(dataMapKeys.loginStatus, false);
    userDataMap.set(dataMapKeys.username, '');
    userDataMap.set(dataMapKeys.password, '');
    userDataMap.set(dataMapKeys.firstName, '');
    userDataMap.set(dataMapKeys.lastName, '');
};