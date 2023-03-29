import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        //console.log(this.actualRoom);

        this.setModel();
    }

    setModel() {
        this.scene.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
            }
         });

        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
        

            if(child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            //console.log(child);
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.4, 0.4, 0.4);
    }

    resize(){}

    update(){}
}