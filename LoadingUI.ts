class LoadingUI extends egret.DisplayObjectContainer {
    private _width: number = 200;
    private _height: number = 10;
    private _stageW: number;
    private _stageH: number;
    private loadBar: egret.Sprite;
    private loadBarMask: egret.Shape;
    private loadTxt: egret.TextField;

    public constructor(w: number, h: number) {
        super();
        this._stageW = w;
        this._stageH = h;
        this.createView()
    }
    private createView(): void {
        this.loadBar = new egret.Sprite()
        var loadBarSide: egret.Shape = new egret.Shape();
        loadBarSide.graphics.lineStyle(2, 0x000000)
        loadBarSide.graphics.drawRoundRect(0, 0, this._width + 10, this._height + 10, 20);
        this.loadBar.addChild(loadBarSide)

        var loadBarLine: egret.Shape = new egret.Shape()
        loadBarLine.graphics.beginFill(0x000000);
        loadBarLine.graphics.drawRoundRect(5, 5, this._width, this._height, 10);
        loadBarLine.graphics.endFill();
        this.loadBar.addChild(loadBarLine)

        this.loadBarMask = new egret.Shape()
        this.loadBar.addChild(this.loadBarMask)

        loadBarLine.mask = this.loadBarMask;
        this.loadBar.x = (this._stageW - this.loadBar.width) / 2;
        this.loadBar.y = (this._stageH - this.loadBar.height) / 2;
        this.addChild(this.loadBar);

        this.loadTxt = new egret.TextField();
        this.loadTxt.fontFamily = "微软雅黑";
        this.loadTxt.size = 16;
        this.loadTxt.width = 212;
        this.loadTxt.height = 20;
        this.loadTxt.y = this.loadBar.y + 40;
        this.loadTxt.x = (this._stageW - this.loadTxt.width) / 2;
        this.loadTxt.textAlign = "center";
        this.loadTxt.verticalAlign = 'middle';
        this.loadTxt.textColor = 0x000000;
        this.addChild(this.loadTxt);
    }

    public setProgress(current: number, total: number, file?:string): void {
        var percent: number = Math.floor((current / total) * 100) / 100;
        this.loadBarMask.graphics.beginFill(0xff0000);
        this.loadBarMask.graphics.drawRect(5, 5, percent * this._width, this._height);
        this.loadBarMask.graphics.endFill();
        //this.loadTxt.text = String(percent * 100) + '%';
        this.loadTxt.text = file
    }

    public setComplete() {
        this.loadTxt.text = 'finished!';
        egret.Tween.get(this).wait(1000).to({ alpha: 0 }, 1000, egret.Ease.quartOut).call(function () {
            this.stage.removeChild(this)
        })
    }
}
