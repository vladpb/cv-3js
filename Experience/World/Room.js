import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import Time from "../Utils/Time";
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import GUI from 'lil-gui'; 
import { TransformControls } from 'three/addons/controls/TransformControls.js';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {}
        //console.log(this.actualRoom);


        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };
        this.setModel();
        //this.setAnimation();
        this.onMouseMove();
        this.setLights();
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

            //console.log(child);

            if(child.name === "PC") {
                child.children[4].material = new THREE.MeshPhysicalMaterial();
                child.children[4].material.roughness = 0;
                child.children[4].material.color.set(0x4e4a4e);
                child.children[4].material.ior = 3;
                child.children[4].material.transmission = 1;
                child.children[4].material.opacity = 0.1;
            };
            


            

            if(child.name === "monitor1") {
                child.children[2].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen1,
                });
            }

            if(child.name === "monitor2") {
                child.children[2].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen2,
                });
            }
            
            child.scale.set(0, 0, 0);
            if(child.name === "Cube") {
                //child.scale.set(1, 1, 1);
                child.position.set(0, 1, 0)
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;

            //console.log(child);




            this.scene.add(this.actualRoom);
            this.actualRoom.scale.set(0.6, 0.6, 0.6);
        });
    }

    setLights() {
            
        const width = 0.36;
        const height = 0.18;
        const intensity = 3;
        const rectLight = new THREE.RectAreaLight( 0xc33af8, intensity,  width, height );
        rectLight.position.set( -1.21 , 1.2 , -0.7 );
        rectLight.rotation.y = -Math.PI / 1.4; 
        this.actualRoom.add( rectLight )

        const rectLight2 = new THREE.RectAreaLight( 0xaf2bfa, intensity,  width, height );
        rectLight2.position.set( -0.5 , 1.2 , -1.4 );
        rectLight2.rotation.y = Math.PI / 0.82; 
        this.actualRoom.add( rectLight2 )
        
        this.roomChildren['rectLight'] = rectLight;

        //const rectLightHelper = new RectAreaLightHelper( rectLight2 );
        //rectLight.add( rectLightHelper );
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