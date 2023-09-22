import { Container, Sprite } from "pixi.js";
import { IScene } from "./types";
import { Manager } from "../Manager";

export class Level1 extends Container implements IScene {
    constructor() {
        super();

        const background = Sprite.from("background_1");
        background.position.x = Manager.width / 2;
        background.position.y = Manager.height / 2;
        background.anchor.set(0.5);
        background.scale.set(2, 2);

        this.addChild(background);
    }

    public update(): void {
    }
}