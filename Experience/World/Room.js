import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import Time from "../Utils/Time";


export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        //console.log(this.actualRoom);

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        //this.setAnimation();
        this.onMouseMove();
    }
    
    setModel() {

        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
        

            if(child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            };

            if(child.name === "pc") {
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x4e4a4e);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            };
            
           /*  pt videouri monitoare

            if(child.name === "monitor") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen1,
                });
            }

            if(child.name === "monitorwide") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen2,
                });
            }
            
            */

            //console.log(child);
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.5, 0.5, 0.5);
    }

    /* Animatie
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        console.log(this.room);
    }
    */

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.05;
        });
    }

    resize(){}

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        //this.mixer.update(this.time.delta * 0.0009);
    }
}