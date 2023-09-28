import { AnimatedSprite, Assets, Container, Sprite, TilingSprite } from "pixi.js";
import { IScene, MoveType } from "./types";
import { Manager } from "../Manager";
import { isJump, isLeft, isRight } from "../utils";

const background2Velocity = 0.2;
const background3Velocity = 0.35;
const background4Velocity = 0.60;
const groundVelocity = 0.85;
const foregroundVelocity = 1.5;
const runSpeed = 6;
const rightLimit = 774;
const leftLimit = 250;
const fallSpeed = 3;
const playerScale = 1.5;
const slowDownSpeed = 1;

export class Level1 extends Container implements IScene {
    private background: Sprite;
    private background2: TilingSprite;
    private background3: TilingSprite;
    private background4: TilingSprite;
    private ground: TilingSprite;
    private foreground: TilingSprite;
    private layer1Velocity = 0;
    private layer2Velocity = 0;
    private layer3Velocity = 0;
    private layer4Velocity = 0;
    private layer5Velocity = 0;
    private player: AnimatedSprite;
    private playerVelocityX = 0;
    private playerVelocityY = 0;
    private playerMoving = false;
    private slowDown = false;

    constructor() {
        super();

        this.background = Sprite.from("background_1");
        this.background.position.x = Manager.width / 2;
        this.background.position.y = Manager.height / 2;
        this.background.anchor.set(0.5);
        this.background.scale.set(2, 2);
        this.background2 = TilingSprite.from("background_2", {width: Manager.width, height: Manager.height});
        this.background2.scale.set(2, 2);
        this.background3 = TilingSprite.from("background_3", {width: Manager.width, height: Manager.height});
        this.background3.scale.set(2, 2);
        this.background4 = TilingSprite.from("background_4", {width: Manager.width, height: Manager.height});
        this.background4.scale.set(2, 2);
        this.ground = TilingSprite.from("background_5", {width: Manager.width, height: Manager.height});
        this.ground.scale.set(2, 2);
        this.foreground = TilingSprite.from("background_6", {width: Manager.width, height: Manager.height});
        this.foreground.scale.set(2, 2);

        const playerAnimations = Assets.get('player').data.animations; // Look at if better way to do this?
        this.player = AnimatedSprite.fromFrames(playerAnimations.playerIdle);
        this.player.animationSpeed = 0.08;
        this.player.anchor.set(0.5, 0.5);
        this.player.position.x = 250;
        this.player.position.y = Manager.height - 46;
        this.player.scale.set(playerScale, playerScale);
        this.player.play();

        this.addChild(this.background);
        this.addChild(this.background2);
        this.addChild(this.background3);
        this.addChild(this.background4);
        this.addChild(this.ground);
        this.addChild(this.player);
        this.addChild(this.foreground);

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    private onKeyDown(e: KeyboardEvent): void {
        this.slowDown = false;
        const playerAnimations = Assets.cache.get('player').animations;
        if (isJump(e.key) && this.playerVelocityY === 0 && !e.repeat) {
            this.player.textures = playerAnimations.playerJumpUp;
            this.player.animationSpeed = 0.2;
            this.playerVelocityY = -runSpeed;
            this.player.loop = false;
            this.player.play();
        }

        if (isRight(e.key) && !e.repeat) {
            if (this.player.position.x < rightLimit) {
                this.playerVelocityX = runSpeed;
            }

            this.player.textures = playerAnimations.playerRun;
            this.player.scale.x = playerScale;
            this.player.play();

            this.playerMoving = true;
            return;
        }
        if (isLeft(e.key) && !e.repeat) {
            if (this.player.position.x > leftLimit) {
                this.playerVelocityX = -runSpeed;
            }

            this.player.textures = playerAnimations.playerRun;
            this.player.scale.x = -playerScale;
            this.player.play();

            this.playerMoving = true;
            return;
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (isRight(e.key) || isLeft(e.key)) {
            this.slowDown = true;

            const playerAnimations = Assets.cache.get('player').animations;
            this.player.textures = playerAnimations.playerIdle;
            this.player.play();

            return;
        }
    }

    private animateBackground(movementType: MoveType) {
        if (movementType === "left") {
            this.layer1Velocity = -background2Velocity;
            this.layer2Velocity = -background3Velocity;
            this.layer3Velocity = -background4Velocity;
            this.layer4Velocity = -groundVelocity;
            this.layer5Velocity = -foregroundVelocity;
        }
        if (movementType === "right") {
            this.layer1Velocity = background2Velocity;
            this.layer2Velocity = background3Velocity;
            this.layer3Velocity = background4Velocity;
            this.layer4Velocity = groundVelocity;
            this.layer5Velocity = foregroundVelocity;
        }
        if (movementType === "stop") {
            this.layer1Velocity = 0;
            this.layer2Velocity = 0;
            this.layer3Velocity = 0;
            this.layer4Velocity = 0;
            this.layer5Velocity = 0;
        }
    }

    public update(framesPassed: number): void {
        this.background2.tilePosition.x += this.layer1Velocity * framesPassed;
        this.background3.tilePosition.x += this.layer2Velocity * framesPassed;
        this.background4.tilePosition.x += this.layer3Velocity * framesPassed;
        this.ground.tilePosition.x += this.layer4Velocity * framesPassed;
        this.foreground.tilePosition.x += this.layer5Velocity * framesPassed;
        this.player.position.x += this.playerVelocityX * framesPassed;
        this.player.position.y += this.playerVelocityY * framesPassed;

        if (this.slowDown) {
            if (this.playerVelocityX === 0) {
                this.slowDown = false;
                this.animateBackground("stop");
                this.playerMoving = false;
            }
            if (this.playerVelocityX > 0) {
                this.playerVelocityX += -slowDownSpeed;
            }
            if (this.playerVelocityX < 0) {
                this.playerVelocityX += slowDownSpeed;
            }
        }

        if (this.playerMoving) {
            if (this.player.position.x >= rightLimit) {
                this.playerVelocityX = 0;
                this.animateBackground("left");
            }
            if (this.player.position.x <= leftLimit) {
                this.playerVelocityX = 0;
                this.animateBackground("right");
            }
        }

        if (this.player.position.y <= 400) {
            this.playerVelocityY = fallSpeed;
        }
        if (this.playerVelocityY === fallSpeed && this.player.position.y >= 465) {
            this.playerVelocityY = 0;
            const playerAnimations = Assets.cache.get('player').animations;
            if (this.playerMoving) {
                this.player.textures = playerAnimations.playerRun;
            } else {
                this.player.textures = playerAnimations.playerIdle;
            }
            this.player.animationSpeed = 0.08;
            this.player.play();
            this.player.loop = true;
        }
    }
}