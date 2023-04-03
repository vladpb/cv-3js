import * as THREE from "three";
import Experience from "../Experience";

export default class Environments {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();
    }

    setModel() {
        this.scene.add(this.actualRoom);
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        
        const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        this.scene.add(helper);

        this.sunLight.position.set(3, 7, 7);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientLight);
        
    }

    resize(){}

    update(){}
}