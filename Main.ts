class Main extends egret.DisplayObjectContainer {

    //private loadingView: LoadingUI;
    private RESLoad: RESLoad;
    private LoadingUI: LoadingUI;
    private fish: MovieClip;
    private touchPoint: any;
    private angleSpeed: number;
    private speed: number = 2;
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
        this.fish.x = this.stage.stageWidth/2;
        this.fish.y = this.stage.stageHeight/2

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        //this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.animationFrame.addEventListener(egret.TimerEvent.TIMER, this.onAnimationFrame, this);

    }

    private onTouchStart(event: egret.TouchEvent) {
        this.touchPoint = { x: event.stageX, y: event.stageY };
        this.angleSpeed = Math.atan2(this.touchPoint.y - this.fish.y, this.touchPoint.x - this.fish.x);
        this.fish.rotation = this.angleSpeed * 180 / Math.PI;
        //this.animationFrame.start();
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
        //判断距离
        if (Math.sqrt(
            (this.touchPoint.x - this.fish.x) * (this.touchPoint.x - this.fish.x)
            +
            (this.touchPoint.y - this.fish.y) * (this.touchPoint.y - this.fish.y)
        ) < 10) {
            this.animationFrame.stop();
            return;
        }
        //计算出 x 、 y速度
        var vx: number = Math.cos(this.angleSpeed) * this.speed;
        var vy: number = Math.sin(this.angleSpeed) * this.speed;

        this.fish.x += vx;
        this.fish.y += vy;
    }
}