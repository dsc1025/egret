class RESLoad{
    private _item: string;
    private _path: string;
    private _config: string;
    public RES;

    public constructor(c: string, p: string, i: string) {
        this._config = c;
        this._path = p;
        this._item = i;
        this.RES = RES;
        //添加资源配置加载完成事件
        this.RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载配置
        this.RES.loadConfig(this._config, this._path);
    }
    private onConfigComplete(event: RES.ResourceEvent) {
        this.RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //添加资源组加载完成事件
        this.RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.resourceLoadComplete, this);
        //添加资源组加载失败事件
        this.RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        //添加资源加载失败事件
        this.RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceItemLoadError, this);
        //添加资源组加载进度事件
        this.RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.resourceProgress, this);
        //开始加载资源组
        this.RES.loadGroup(this._item);
    }
    //资源组加载进度
    private resourceProgress(event: RES.ResourceEvent): void {
        console.log( event.resItem.url + ": " + event.itemsLoaded + " / " + event.itemsTotal)
    }
    //资源组加载出错
    private onResourceLoadError(event: RES.ResourceEvent): void {
        throw event.groupName
    }
    //资源加载出错
    private onResourceItemLoadError(event: RES.ResourceEvent): void {
        throw event.resItem.url
    }
    //资源组加载完成
    private resourceLoadComplete(event: RES.ResourceEvent): void {
        this.RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.resourceLoadComplete, this);
        this.RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.resourceProgress, this);
        this.RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        this.RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceItemLoadError, this);
    }
}