import { AnimatedSprite, Assets, Container, Sprite, Text } from "pixi.js";
import { IScene, Location } from "./types";
import { Manager } from "../Manager";
import { Transition } from "./Transition";

export class StartScene extends Container implements IScene {
    private player: AnimatedSprite;
    private startText: Text;
    private movePlayer: boolean;
    private newLocation: Location;
    private Xspeed = 0.5;
    private Yspeed = 0.3;

    constructor() {
        super();

        this.movePlayer = false;
        this.newLocation = {x: 0, y: 0};
        this.startText = new Text("Press any key to start", {
            fontSize: 36,
            fontWeight: "bold",
            fontFamily: "Georgia, serif",
        });
        this.startText.position.x = Manager.width / 2;
        this.startText.position.y = Manager.height / 2;
        this.startText.anchor.x = 0.5;
        this.startText.anchor.y = 0.5;

        const background = Sprite.from("background_1");
        background.position.x = Manager.width / 2;
        background.position.y = Manager.height / 2;
        background.anchor.set(0.5);
        background.scale.set(2, 2);

        const playerAnimations = Assets.get('player').data.animations;
        this.player = AnimatedSprite.fromFrames(playerAnimations.playerIdle);
        this.player.animationSpeed = 0.04;
        this.player.position.x = Manager.width / 2;
        this.player.position.y = Manager.height / 3;
        this.player.play();

        this.addChild(background);
        this.addChild(this.player);
        this.addChild(this.startText);

        document.addEventListener("keydown", this.startGame.bind(this), { once: true });
    }

    private startGame(): void {
        console.log()
        this.removeChild(this.startText);

        this.movePlayer = true;
        this.player.textures = Assets.get('player').animations.playerWalk;
        this.player.animationSpeed = 0.1;
        this.player.play();
        this.newLocation = {
            x: this.player.position.x + 80,
            y: this.player.position.y + 50,
        }
    }

    public update(framesPassed: number): void {
        const newLocationX = this.player.x + this.Xspeed * framesPassed;
        if (this.movePlayer && this.newLocation.x >= this.player.x){
            this.player.position.x = newLocationX;
            this.player.alpha -= 0.01;
        }
        const newLocationY = this.player.y + this.Yspeed * framesPassed;
        if (this.movePlayer && this.newLocation.y >= this.player.y){
            this.player.position.y = newLocationY;
        }
        if (this.movePlayer && this.newLocation.x <= this.player.position.x && this.newLocation.y <= this.player.position.y) {
            Manager.changeScene(new Transition());
        }
    }
}