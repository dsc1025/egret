class MovieClip extends egret.MovieClip {
    private _data: any;
    private _texture: egret.Texture;
    private _mf: egret.MovieClipDataFactory;
    private _loop: boolean = false;
    public constructor(data: any, texture: egret.Texture, loop?:boolean) {
        super();
        this._data = data
        this._texture = texture;
        this._loop = loop;
        this.createMovieClip()
    }
    private createMovieClip(): void {
        this._mf = new egret.MovieClipDataFactory(this._data, this._texture);
        this.movieClipData = this._mf.generateMovieClipData()
        this.play()

        this.addEventListener(egret.Event.LOOP_COMPLETE, this.loopComplete, this);
        this.addEventListener(egret.Event.COMPLETE, this.playComplete, this);
    }
    private loopComplete(event: egret.MovieClipEvent): void {

    }
    private playComplete(event: egret.MovieClipEvent): void {
        if (this._loop) {
            this.gotoAndPlay(1);
        }
    }
}