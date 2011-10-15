jCanvaScript.Proto.Shape = function(options) {
    this._fillColorR = 0;
    this._fillColorG = 0;
    this._fillColorB = 0;
    this._fillColorA = 0;
    this._lineColorR = 0;
    this._lineColorG = 0;
    this._lineColorB = 0;
    this._lineColorA = 0;
    this._lineWidth = 1;
    this._cap = 'butt';
    this._join = 'miter';
    this._miterLimit = 1;
    if (options === undefined)options = {};
    if(options.color !== undefined){
        options.lineColor = options.fillColor = options.color;
    }
    if(options.lineColor !== undefined){
        if(options.lineColor === 0 || options.lineColor === false || options.lineColor === 1 || options.lineColor === true){
            options.fillColor = options.lineColor;
            options.lineColor = '#000000';
        }
    }
    if(options.fillColor !== undefined){
        if(options.fillColor === 0 || options.fillColor === false){
            options.fillColor = undefined;
        }
        if(options.fillColor === 1 || options.fillColor === true){
            options.fillColor = options.lineColor;
        }
    }
    options = jCanvaScript.checkDefaults(options, {fillColor:'rgba(0,0,0,0)',lineColor:'rgba(0,0,0,0)'});
    jCanvaScript.Proto.Object.call(this,options);
    this.optns.fillColor = {val:options.fillColor,notColor:undefined};
    this.optns.lineColor = {val:options.lineColor,notColor:undefined};
    this.fillColor(options.fillColor);
    this.lineColor(options.lineColor);
    return this;
}
jCanvaScript.Proto.Shape.prototype = Object.create(jCanvaScript.Proto.Object.prototype);

jCanvaScript.Proto.Shape.prototype.fillColor = function(color) {
    if (color === undefined)return [this._fillColorR,this._fillColorG,this._fillColorB,this._fillColorA];
    return this.attr('fillColor', color);
};
jCanvaScript.Proto.Shape.prototype.lineColor = function(color) {
    if (color === undefined)return [this._lineColorR,this._lineColorG,this._lineColorB,this._lineColorA];
    return this.attr('lineColor', color);
};
jCanvaScript.Proto.Shape.prototype.color = function(color){
    if(color === undefined) return {
        fillColor: this.fillColor(),
        lineColor: this.lineColor()
    }
    this.fillColor(color);
    this.lineColor(color);
    return this;
};
jCanvaScript.Proto.Shape.prototype.lineStyle = function(options) {
    return this.attr(options);
};
jCanvaScript.Proto.Shape.prototype.setOptns = function(ctx) {
    jCanvaScript.Proto.Object.prototype.setOptns.call(this, ctx);
    ctx.lineWidth = this._lineWidth;
    ctx.lineCap = this._cap;
    ctx.lineJoin = this._join;
    ctx.miterLimit = this._miterLimit;
    var fillColor = jCanvaScript._helpers.updateColor(this, this.optns.fillColor, 'fill');
    var lineColor = jCanvaScript._helpers.updateColor(this, this.optns.lineColor, 'line');
    ctx.fillStyle = fillColor.val;
    ctx.strokeStyle = lineColor.val;
};
jCanvaScript.Proto.Shape.prototype.afterDraw = function(optns) {
    optns.ctx.stroke();
    optns.ctx.fill();
    jCanvaScript.Proto.Object.prototype.afterDraw.call(this, optns);
};