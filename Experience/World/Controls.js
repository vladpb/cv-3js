import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DynamicReadUsage } from "three";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();
    }
    setScrollTrigger() {
        ScrollTrigger.matchMedia({
            //desktop
            "(min-width: 969px)": function() {
                console.log("desktop scroll trigger");
            },

            "(max-width: 968px)": function() {
            },
            // all 
            "all": function() {},
        }); 
    }


    resize() {}

    update() {}
}