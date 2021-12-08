/**
 * @format
 */

import {AppRegistry} from 'react-native';
import listRecettes from './android/app/src/components/listRecettes';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => listRecettes);
