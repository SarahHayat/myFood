/**
 * @format
 */

import {AppRegistry} from 'react-native';
import listRecettes from './src/components/listRecettes';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => listRecettes);
