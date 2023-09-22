import { Container, Sprite, TilingSprite } from "pixi.js";
import { IScene } from "./types";
import { Manager } from "../Manager";

const layer1Velocity = 0.2;
const layer2Velocity = 0.35;
const layer3Velocity = 0.60;
const layer4Velocity = 0.85;
const layer5Velocity = 1.5;

export class Level1 extends Container implements IScene {
    private background: Sprite;
    private layer1: TilingSprite;
    private layer2: TilingSprite;
    private layer3: TilingSprite;
    private layer4: TilingSprite;
    private layer5: TilingSprite;
    private layer1Velocity = 0;
    private layer2Velocity = 0;
    private layer3Velocity = 0;
    private layer4Velocity = 0;
    private layer5Velocity = 0;

    constructor() {
        super();

        this.background = Sprite.from("background_1");
        this.background.position.x = Manager.width / 2;
        this.background.position.y = Manager.height / 2;
        this.background.anchor.set(0.5);
        this.background.scale.set(2, 2);
        this.layer1 = TilingSprite.from("background_2", {width: Manager.width, height: Manager.height});
        this.layer1.scale.set(2, 2);
        this.layer2 = TilingSprite.from("background_3", {width: Manager.width, height: Manager.height});
        this.layer2.scale.set(2, 2);
        this.layer3 = TilingSprite.from("background_4", {width: Manager.width, height: Manager.height});
        this.layer3.scale.set(2, 2);
        this.layer4 = TilingSprite.from("background_5", {width: Manager.width, height: Manager.height});
        this.layer4.scale.set(2, 2);
        this.layer5 = TilingSprite.from("background_6", {width: Manager.width, height: Manager.height});
        this.layer5.scale.set(2, 2);


        this.addChild(this.background);
        this.addChild(this.layer1);
        this.addChild(this.layer2);
        this.addChild(this.layer3);
        this.addChild(this.layer4);
        this.addChild(this.layer5);

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    private onKeyDown(e: KeyboardEvent): void {
        if (e.key === "d" || e.key === "ArrowRight") {
            this.layer1Velocity = -layer1Velocity;
            this.layer2Velocity = -layer2Velocity;
            this.layer3Velocity = -layer3Velocity;
            this.layer4Velocity = -layer4Velocity;
            this.layer5Velocity = -layer5Velocity;
        }
        if (e.key === "a" || e.key === "ArrowLeft") {
            this.layer1Velocity = layer1Velocity;
            this.layer2Velocity = layer2Velocity;
            this.layer3Velocity = layer3Velocity;
            this.layer4Velocity = layer4Velocity;
            this.layer5Velocity = layer5Velocity;
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (e.key === "d" || e.key === "ArrowRight" || e.key === "a" || e.key === "ArrowLeft") {
            this.layer1Velocity = 0;
            this.layer2Velocity = 0;
            this.layer3Velocity = 0;
            this.layer4Velocity = 0;
            this.layer5Velocity = 0;
        }
    }

    public update(framesPassed: number): void {
        this.layer1.tilePosition.x += this.layer1Velocity * framesPassed;
        this.layer2.tilePosition.x += this.layer2Velocity * framesPassed;
        this.layer3.tilePosition.x += this.layer3Velocity * framesPassed;
        this.layer4.tilePosition.x += this.layer4Velocity * framesPassed;
        this.layer5.tilePosition.x += this.layer5Velocity * framesPassed;
    }
}