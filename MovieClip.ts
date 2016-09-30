class MovieClip extends egret.DisplayObjectContainer {
    private _data: any;
    private _texture: egret.Texture;
    private _loop: boolean = false;
    private _offsetX: number = 0;
    private _offsetY:number = 0;
    private _rotation:number = 0;
    private _mf: egret.MovieClipDataFactory;
    private _mc:egret.MovieClip;
    public constructor(data: any, texture: egret.Texture, loop?:boolean, offsetX?:number, offsetY?:number, rotation?:number) {
        super();
        this._data = data
        this._texture = texture;
        this._loop = loop;
        this._offsetX = offsetX;
        this._offsetY = offsetY;
        this._rotation = rotation;
        this.createMovieClip();
    }
    private createMovieClip(): void {
        this._mf = new egret.MovieClipDataFactory(this._data, this._texture);
        this._mc = new egret.MovieClip()
        this._mc.movieClipData = this._mf.generateMovieClipData()
        this._mc.x = this._offsetX;
        this._mc.y = this._offsetY;
        this._mc.rotation = this._rotation;
        this._mc.play()
        this._mc.addEventListener(egret.Event.COMPLETE, this.playComplete, this);
        
        this.addChild(this._mc)
    }
    private playComplete(event: egret.MovieClipEvent): void {
        if (this._loop) {
            this._mc.gotoAndPlay(1);
        }
    }
}