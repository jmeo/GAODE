function zone(opt){
    this.option = this.extend(this.defaultOptions,opt);
    this.init();
    this.bindEvent();
//    this.drawPlugin();
}

zone.prototype.defaultOptions = {
        minDistance : 500,  //最小半径
        maxDistance : 3000, //最大半径
        centerIcon : false, //中心点图标
        centerLngLat : false ,//中心点坐标
        radius : false //半径长度
    };
zone.prototype.extend = function(){
        var args = arguments;
        var rs;
        for(var k in args){
            rs = $.extend({},rs,args[k]);
        }
        return rs;
    };
zone.prototype.center = false;//圆心
    zone.prototype.circle = false;  //圆
    zone.prototype.radiusLine = false;  //半径线
    zone.prototype.edgeButton = false; //圆边距点 用于拖动设置圆半径
    zone.prototype.init = function(){
        //圆心
        this.center = new AMap.Marker({
            position : this.option.centerLnglat,
            draggable : true
        });
        this.option.radius = this.option.radius ? this.option.radius : this.option.minDistance;
        //圆
        this.circle = new AMap.Circle({
            center : this.option.centerLngLat,
            radius : this.option.radius
        });
        //边距button
        this.edgeButton = new AMap.Marker({
            position : this.option.centerLngLat.offset(this.option.radius,0),
            draggable : true
        });
        
        //半径
        this.radiusLine = new AMap.Polyline({
            path : [this.option.centerLngLat,this.edgeButton.getPosition()]
        });
    };
    zone.prototype.bindEvent = function(){
        var _this = this;
        _this.center.on('dragging',function(e){
            _this.option.centerLngLat = e.lnglat;
            _this.drawPlugin();
        });
        _this.edgeButton.on('dragging',function(e){
            var _l = e.lnglat;
            var rs = _l.distance(_this.option.centerLngLat);
            if(rs > _this.option.maxDistance){
                _this.option.radius = _this.option.maxDistance;
            }else
            if(rs < _this.option.minDistance){
                _this.option.radius = _this.option.minDistance;
            }else{
                _this.option.radius = rs;
            }
            _this.drawPlugin();
        });
    }
    zone.prototype.drawPlugin = function(){
        //绘制插件
        this.center.setPosition(this.option.centerLngLat);
        this.circle.setCenter(this.option.centerLngLat);
        this.circle.setRadius(this.option.radius);
        this.edgeButton.setPosition(this.option.centerLngLat.offset(this.option.radius,0));
        this.radiusLine.setPath(this.option.centerLngLat,this.edgeButton.getPosition());
    };
    zone.prototype.show =function(){
        this.option.map.add([this.center,this.circle,this.edgeButton,this.radiusLine]);
    };
    zone.prototype.hide = function(){
        this.option.map.remove([this.center,this.circle,this.edgeButton,this.radiusLine]);
    };
    zone.prototype.reset = function(){
    
    };
    zone.prototype.setOption = function(opt){
        
    };
    zone.prototype.getCenter=function(){
        return this.option.centerLngLat;
    };
    zone.prototype.getRadius= function(){
        return this.option.radius;
    };
    zone.prototype.setCenter = function(lnglat){
        this.option.centerLngLat = lnglat;
    };
