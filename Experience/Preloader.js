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
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise((resolve) => {
        this.timeline = new GSAP.timeline();
        this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
        this.timeline.to(".preloader", {
            opacity: 0,
            delay: 1,
            onComplete: () => {
                document
                    .querySelector(".preloader")
                    .classList.add("hidden");
            },
        });
        if(this.device === "desktop") {
        this.timeline
        .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
        })
        .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
            //onComplete: resolve,
        });
    }else {
        this.timeline
        .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            duration: 0.7,
            ease: "back.out(2.5)",
        })
        .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
            //onComplete: resolve,
        });
    }
        this.timeline
            .to(".intro-text .animatedis", {
                yPercent: 0,
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
        .to(
            ".intro-text .animatedis", 
            {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.8)",
            },
        "fadeout"
        )
        .to(
            ".arrow-svg-wrapper", 
            {
            opacity: 0,
            },
        "fadeout"
        )
        .to(
            this.room.position,
            {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            },
            "same"
        )
        .to(
            this.roomChildren.cube.rotation,
            {
                y: 2 * Math.PI + Math.PI / 4,
            },
            "same"
        )
        .to(
            this.roomChildren.cube.scale,
            {
                x: 10,
                y: 10,
                z: 10,
            },
            "same"
        )
        .to(
            this.camera.orthographicCamera.position,
            {
                y: 6.5,
            },
            "same"
        )
        .to(
            this.roomChildren.cube.position,
            {
                x: 0.638711,
                y: 8.5618,
                z: 1.3243,
            },
            "same"
        )
        .set(this.roomChildren.room.scale, 
            {
                x: 1,
                y: 1,
                z: 1,
            },
            )
        .to(
            this.roomChildren.cube.scale,
            {
                x: 0,
                y: 0,
                z: 0,
                duration: 1,
                ease: "power2.in(0.5)",
            },
            "introtext"
            )
        .to(
            ".hero-main-title .animatedis",
            {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            },
            "introtext"
        )
        .to(
            ".hero-main-description .animatedis",
            {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            },
            "introtext"
        )
        .to(
            ".first-sub .animatedis",
            {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            },
            "introtext"
        )
        .to(
            ".second-sub .animatedis",
            {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            },
            "introtext"
        )
        .to(
            this.roomChildren.parchet.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.covor.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.pat.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.birou.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.monitor1.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.monitor2.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.rafts.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.carteb.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.lampa.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.pc.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.mouse.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.tastatura.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.tablomiley.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.rama911.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.carti2.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.casti.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.raftcontrollere.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.cutie.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.cafea.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.carti1.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.cosdegunoi.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.eucumiley.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.planta.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.canacreioane.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.controller1.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.controller2.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.suportscaun.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.scaun.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(1.7)",
                duration: 0.5,
            }
        )
        .to(
            this.roomChildren.scaun.rotation,
            {
                y: 3 * Math.PI / 3 + 1,
                ease: "power2.out",
                duration: 1,
            },
        )
        
        .to(".arrow-svg-wrapper", {
            opacity: 1,
            onComplete: resolve,
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
            //console.log("swipe");
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
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        //console.log("waited");
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
}

    async playSecondIntro() {
        this.moveFlag = false;
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
        this.roomChildren.rectLight.width = 0;
        this.roomChildren.rectLight.height = 0;
        if(this.device === "desktop") {
            this.room.scale.set(0.6, 0.6, 0.6)
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