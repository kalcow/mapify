import Constants, { ExecutionEnvironment } from 'expo-constants';
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export default isExpoGo; 