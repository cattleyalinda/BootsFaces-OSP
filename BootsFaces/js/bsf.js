/*!
 * Copyright 2014 Riccardo Massera (TheCoder4.Eu)
 * BootsFaces JS
 * author: TheCoder4.eu
 */

BsF={};
BsF.ajax={};
BsF.callback={};
BsF.isFunction=function(f) {
 var getType = {};
 return f && getType.toString.call(f) === '[object Function]';
}
BsF.ajax.onevent=function(d) {
    if(d.status == "success") {
            var cid=d.source.id.replace(/[^a-zA-Z0-9]+/g,'_');
            var f=BsF.callback[cid];
            f();
        }
    };
BsF.ajax.cb=function(o,e,r,f) { //commandButton ajax helper (object, event, [render], [oncomplete])
    var argn=arguments.length;
    var oid=o.id;
    var cid=oid.replace(/[^a-zA-Z0-9]+/g,'_');
    var opts={};
    opts.execute='@all';
    opts[oid]=oid;
    if(argn==4) {
    BsF.callback[cid]=f;
    
    opts.render=r;
    opts.onevent=BsF.ajax.onevent;
    }
    if(argn==3) {
        if(BsF.isFunction(r)) {
            BsF.callback[cid]=r;
            opts.onevent=BsF.ajax.onevent;
        }
        else { opts.render=r; } //jsf.ajax.request(o,e, { execute: '@form', render: r }); }
    }
    
    jsf.ajax.request(o,e, opts);
    return false;
};

BsF.ajax.paginate=function(o,e,v,c,r) { //Paginator ajax helper (object, event, value, component, render)
    var opts={};
    opts.execute='@this';
    opts.render=r;
    opts[c]=v;
    jsf.ajax.request(c,e, opts);
    return false;
};

/* DatePicker Bootstrap Icon support */
if( $.datepicker ) {
    var generateHTML_orig = $.datepicker._generateHTML;

    $.datepicker._generateHTML = function() {
        var ret = generateHTML_orig.apply(this,arguments); //alert(ret);
        ret = ret.replace(/<span\s+class='ui-icon\s+ui-icon-circle-triangle-w'\s*>[^<]+<\/span>/, '<span class="glyphicon glyphicon-chevron-left"></span>');
        ret = ret.replace(/<span\s+class='ui-icon\s+ui-icon-circle-triangle-e'\s*>[^<]+<\/span>/, '<span class="glyphicon glyphicon-chevron-right"></span>');
        return ret;    
    };
}
