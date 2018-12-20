var mystorage = (function (window){
    var ms = "mystorage";
    var storage=window.localStorage;

    var set = function(key,value){
        //存储
        var mydata = storage.getItem(ms);
        if(!mydata){
            this.init();
            mydata = storage.getItem(ms);
        }
        mydata = JSON.parse(mydata);
        mydata.data[key] = value;
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;

    };

    var get = function(key){
        //读取
        var mydata = storage.getItem(ms);
        if(!mydata){
            return false;
        }
        mydata = JSON.parse(mydata);

        return mydata.data[key];
    };

    var remove = function(key){
        //读取
        var mydata = storage.getItem(ms);
        if(!mydata){
            return false;
        }

        mydata = JSON.parse(mydata);
        delete mydata.data[key];
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;
    };

    var clear = function(){
        //清除对象
        storage.removeItem(ms);
    };

    var init = function(){
        storage.setItem(ms,'{"data":{}}');
    };

    return {
        set : set,
        get : get,
        remove : remove,
        init : init,
        clear : clear
    };

})(this);

//
// console.log(mystorage.set('tqtest','tqtestcontent'));//存储
// console.log(mystorage.set('tqtest1','tqtestcontent1'));//存储
// console.log(mystorage.set('tqtest1','newtqtestcontent1'));//修改
// console.log(mystorage.get('tqtest'));//读取
// console.log(mystorage.remove('tqtest'));//删除
// mystorage.clear();//整体清除
