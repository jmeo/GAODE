function zone(opt){
    this.option = this.extend(this.defaultOptions,opt);
    
    
}

zone.prototype = {
    defaultOptions : {
        minDistance : 500,  //最小半径
        maxDistance : 3000, //最大半径
        centerIcon : false, //中心点图标
        centerLngLat : false ,//中心点坐标
        radius : false //半径长度
    },
    extend : function(){
        var args = arguments;
        var rs;
        for(var k in args){
            rs = $.extend({},rs,args[k]);
        }
        return rs;
    },
    center : false,//圆心
    circle : false,  //圆
    radiusLine : false,  //半径线
    edgeButton : false, //圆边距点 用于拖动设置圆半径
    init : function(){
        //圆心
        this.center = new AMap.Marker({
            position : this.option.centerLnglat,
            map : this.option.map
        });
        this.option.radius = this.option.radius ? this.option.radius : this.option.minDistance;
        //圆
        this.circle = new AMap.Circle({
            map : this.option.map,
            center : this.option.centerLngLat,
            radius : this.option.radius
        });
        //边距button
        this.edgeButton = new AMap.Marker({
            position : this.option.centerLngLat.offset(this.option.radius,0),
            map : this.option.map
        });
        
        //半径
        this.radiusLine = new AMap.Polyline({
            map : this.option.map,
            path : [this.option.centerLngLat,this.edgeButton.getPosition()]
        });
        
        
        
    }
}