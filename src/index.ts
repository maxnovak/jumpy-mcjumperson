import { Manager } from './Manager';
import { LoaderScene } from './scenes/Loader';

Manager.initialize();

const loading = new LoaderScene();
Manager.changeScene(loading);
