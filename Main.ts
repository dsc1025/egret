class Main extends egret.DisplayObjectContainer {

    //private loadingView: LoadingUI;
    private RESLoad: RESLoad;
    private LoadingUI: LoadingUI;
    private fish: MovieClip;
    private touchPoint: any;
    private angleSpeed: number;
    private angle: number;
    private speed: number = 2;
    private radian: number = 0;

    private line: egret.Shape = new egret.Shape()
    //60FPS
    private animationFrame: egret.Timer = new egret.Timer(1000 / 60);

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }

    private onAddToStage(event: egret.Event) {
        this.RESLoad = new RESLoad("resource/default.res.json", "resource/", 'fish_1')
        this.RESLoad.RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.resourceProgress, this)
        this.RESLoad.RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.resourceLoadComplete, this);

        this.LoadingUI = new LoadingUI(this.stage.stageWidth, this.stage.stageHeight)
        this.stage.addChild(this.LoadingUI)

    }

    //资源组加载进度
    private resourceProgress(event: RES.ResourceEvent): void {
        this.LoadingUI.setProgress(event.itemsLoaded, event.itemsTotal, event.groupName)
    }

    //资源组加载完成
    private resourceLoadComplete(event: RES.ResourceEvent): void {
        this.LoadingUI.setComplete()
        this.fish = new MovieClip(event.target.getRes('fish_1_json'), event.target.getRes('fish_1_png'), true)
        this.stage.addChild(this.fish)
        this.fish.x = (this.stage.stageWidth - this.fish.width) / 2;
        this.fish.y = (this.stage.stageHeight - this.fish.height) / 2;

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        //this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.animationFrame.addEventListener(egret.TimerEvent.TIMER, this.onAnimationFrame, this);

        this.stage.addChild(this.line)
    }

    private onTouchStart(event: egret.TouchEvent) {
        this.touchPoint = { x: event.stageX, y: event.stageY };
        this.angleSpeed = Math.atan2(this.touchPoint.y - this.fish.y, this.touchPoint.x - this.fish.x);
        this.angle = Math.round(this.angleSpeed * 180 / Math.PI);
        //console.log(this.fish.rotation < this.angle)
        //this.fish.rotation = this.angle



        //this.animationFrame.start();
        this.line.graphics.clear()
        this.line.graphics.lineStyle(1, 0xff0000, 1)
        this.line.graphics.moveTo(this.fish.x, this.fish.y)
        //this.line.graphics.lineTo(this.touchPoint.x, this.touchPoint.y);
        this.line.graphics.cubicCurveTo(this.fish.x, this.fish.y - this.fish.height , this.fish.x +  this.fish.width, this.fish.y , this.touchPoint.x, this.touchPoint.y);
        this.line.graphics.endFill();

    }

    private onTouchEnd(event: egret.TouchEvent) {
        //this.animationFrame.stop();
    }

    // private onTouchMove(event: egret.TouchEvent) {
    //     this.touchPoint = { x: event.stageX, y: event.stageY };
    //     this.angleSpeed = Math.atan2(this.touchPoint.y - this.fish.y, this.touchPoint.x - this.fish.x);
    //     this.fish.rotation = this.angleSpeed * 180 / Math.PI;
    // }

    private onAnimationFrame(event: egret.TimerEvent) {


        this.radian--
        var rad = this.radian * Math.PI / 180; //计算弧度
        this.fish.x = Math.round(200 * Math.cos(rad) + this.stage.stageWidth / 2)
        this.fish.y = Math.round(200 * Math.sin(rad) + this.stage.stageHeight / 2)
        this.fish.rotation -= 1


        // //判断距离
        // if (Math.sqrt(
        //     (this.touchPoint.x - this.fish.x) * (this.touchPoint.x - this.fish.x)
        //     +
        //     (this.touchPoint.y - this.fish.y) * (this.touchPoint.y - this.fish.y)
        // ) < 10) {
        //     
        // }
        // //计算出 x 、 y速度
        // var vx: number = Math.cos(this.angleSpeed) * this.speed;
        // var vy: number = Math.sin(this.angleSpeed) * this.speed;

        // this.fish.x += vx;
        // this.fish.y += vy;
    }
}