import { Container, Text } from "pixi.js";
import { IScene } from "./types";
import { Manager } from "../Manager";

export class StartScene extends Container implements IScene {
    constructor() {
        super();

        const startText = new Text("Press any key to start", {
            fontSize: 36,
            fontWeight: "bold",
            fontFamily: "Georgia, serif",
        });
        startText.position.x = Manager.width / 2;
        startText.position.y = Manager.height / 2;
        startText.anchor.x = 0.5;
        startText.anchor.y = 0.5;

        this.addChild(startText);
    }

    public update(): void {}
}