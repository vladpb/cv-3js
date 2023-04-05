import * as THREE from "three";
import Experience from "../Experience";

import Room from "./Room";
import Floor from "./Floor";
import Controls from "./Controls";
import Environment from "./Environment";
import { EventEmitter } from "events";

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.room = new Room();
            this.floor = new Floor();
            //this.controls = new Controls();
           // console.log("created room");
        });

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });
    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchTheme(theme);
        }
    }

    resize(){}

    update(){
        if (this.room) {
            this.room.update();
        }
    }
}