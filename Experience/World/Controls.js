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

        this.setPath();
    }

    setPath() {
        console.log("this.room");
        this.timeline = new GSAP.timeline();
        this.timeline.to(this.room.position, {
            x: () =>{ 
                return this.sizes.width * 0.00012;
            },

            scrollTrigger:{
                trigger:".first-move",
                markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            }
        });
    }

    resize() {}

    update() {}
}