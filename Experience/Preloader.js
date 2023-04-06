import Experience from "./Experience";
import { EventEmitter } from "events";
import GSAP from "gsap";
import convert from "./Utils/divsToSpans";


export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        })


}   

    setAssets() {
        convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".hero-main-title"))
        convert(document.querySelector(".hero-main-description"))
        //convert(document.querySelector(".hero-second-subheading"))
        //convert(document.querySelector(".intro-text"))
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise((resolve) => {
        this.timeline = new GSAP.timeline();
        
        if(this.device === "desktop") {
        this.timeline.to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            duration: 1,
            ease: "power1.inOut"
        }).to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 1,
            //onComplete: resolve,
        });
    }else {
        this.timeline.to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            duration: 1,
            ease: "back.out(2.5)",
        }).to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 1,
            //onComplete: resolve,
        });
    }
        this.timeline
            .to(".intro-text .animatedis", {
                yPercent: -100,
                stagger: 0.05,
                ease: "back.out(1.8)",
            })
            .to(".arrow-svg-wrapper", {
                opacity: 1,
            },
            "same"
            )
            .to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve,
            },
            "same"
            );
        });
}

    secondIntro() {
        return new Promise((resolve) => {
        this.secondTimeline = new GSAP.timeline();
        
        this.secondTimeline
        .to(".intro-text .animatedis", {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.8)",
        },
        "fadeout"
        )
        .to(".arrow-svg-wrapper", {
            opacity: 1,
        },
        "fadeout"
        )
        .to(this.roomChildren.cube.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            ease: "power1.inOut"
        })
        .to(this.roomChildren.cube.rotation, {
            y: 2*Math.PI + Math.PI / 4
            })
            .to(this.roomChildren.cube.scale, {
                x: 10,
                y: 10,
                z: 10,
            })
            .to(this.camera.orthographicCamera.position, {
                y: 5.65,
            })
            .to(this.roomChildren.cube.position, {
                x: 0.031249,
                y: 1.6096,
                z: -0.21056,
            },
            "same"
            )
            .set(this.roomChildren.body.scale, {
                x: 1,
                y: 1,
                z: 1,
            },).to(this.roomChildren.cube.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1,
            }, "introtext").to(".hero-main-title .animatedis", {
                yPercent: -100,
                stagger: 0.07,
                ease: "back.out(1.7)",
            }, "introtext").to(".hero-main-description .animatedis", {
                yPercent: -100,
                stagger: 0.07,
                ease: "back.out(1.7)",
            });

    })};

    onScroll(e) {
        if(e.deltaY > 0) {
            //console.log("added event");
            this.removeEventListeners();
            this.playSecondIntro();
    }
}

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if(difference > 0) {
            console.log("swipe");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners(){
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        //console.log("waited");
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
        this.scaleFlag = true;
}

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        if(this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
    }else {
        this.room.position.set(0, 0, -1);
    }
}

    scale() {
        if(this.device === "desktop") {
            this.room.scale.set(0.5, 0.5, 0.5)
        }else {
            this.room.scale.set(0.35, 0.35, 0.35);
        }
}

    update() {
        if(this.moveFlag) {
            this.move();
        }
        if(this.scaleFlag) {
            this.scale();
        }
    }

}