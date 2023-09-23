import { DisplayObject } from "pixi.js";

export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
}

export type MoveType = "right" | "left" |"stop";

export interface Location {
    x: number;
    y: number;
}