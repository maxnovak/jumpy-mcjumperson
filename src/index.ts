import { Manager } from './Manager';
import { LoaderScene } from './scenes/Loader';

Manager.initialize();

const loading: LoaderScene = new LoaderScene();
Manager.changeScene(loading);
