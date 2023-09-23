import { AnimatedSprite, Assets, Container, Sprite } from "pixi.js";
import { IScene } from "./types";
import { Manager } from "../Manager";
import { Level1 } from "./Level1";

export class Transition extends Container implements IScene {
    private background: Sprite;
    private layer1: Sprite;
    private layer2: Sprite;
    private layer3: Sprite;
    private layer4: Sprite;
    private layer5: Sprite;
    private player: AnimatedSprite;

    constructor() {
        super();

        this.background = Sprite.from("background_1");
        this.background.position.x = Manager.width / 2;
        this.background.position.y = Manager.height / 2;
        this.background.anchor.set(0.5);
        this.background.scale.set(2, 2);
        this.layer1 = Sprite.from("background_2");
        this.layer1.position.x = Manager.width / 2;
        this.layer1.position.y = Manager.height / 2;
        this.layer1.anchor.set(0.5);
        this.layer1.scale.set(2, 2);
        this.layer1.alpha = 0;
        this.layer2 = Sprite.from("background_3");
        this.layer2.position.x = Manager.width / 2;
        this.layer2.position.y = Manager.height / 2;
        this.layer2.anchor.set(0.5);
        this.layer2.scale.set(2, 2);
        this.layer2.alpha = 0;
        this.layer3 = Sprite.from("background_4");
        this.layer3.position.x = Manager.width / 2;
        this.layer3.position.y = Manager.height / 2;
        this.layer3.anchor.set(0.5);
        this.layer3.scale.set(2, 2);
        this.layer3.alpha = 0;
        this.layer4 = Sprite.from("background_5");
        this.layer4.position.x = Manager.width / 2;
        this.layer4.position.y = Manager.height / 2;
        this.layer4.anchor.set(0.5);
        this.layer4.scale.set(2, 2);
        this.layer4.alpha = 0;
        this.layer5 = Sprite.from("background_6");
        this.layer5.position.x = Manager.width / 2;
        this.layer5.position.y = Manager.height / 2;
        this.layer5.anchor.set(0.5);
        this.layer5.scale.set(2, 2);
        this.layer5.alpha = 0;
        const playerAnimations = Assets.get('player').data.animations;
        this.player = AnimatedSprite.fromFrames(playerAnimations.playerWalk);
        this.player.animationSpeed = 0.08;
        this.player.anchor.set(0.5,0.5);
        this.player.position.x = -50;
        this.player.position.y = Manager.height - 46;
        this.player.play();


        this.addChild(this.background);
        this.addChild(this.layer1);
        this.addChild(this.layer2);
        this.addChild(this.layer3);
        this.addChild(this.layer4);
        this.addChild(this.player);
        this.addChild(this.layer5);
    }

    public update(framesPassed: number): void {
        if (this.player.position.x > 250) {
            Manager.changeScene(new Level1());
            return;
        }
        if (this.layer1.alpha < 1) {
            this.layer1.alpha += 0.025;
            this.layer2.alpha += 0.025;
            this.layer3.alpha += 0.025;
            this.layer4.alpha += 0.025;
            this.layer5.alpha += 0.025;
            return;
        }
        this.player.position.x += 1 * framesPassed;
    }
}