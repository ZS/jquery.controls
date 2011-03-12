var activeTrigger = null;

var popup = function(options) {
    // See http://craigsworks.com/projects/qtip2/docs/position/ for position options
    var settings = {
        trigger: function() {},
        container: function(trigger) {},
        initCallback: function() {},
        cancelCallback: function() {},
        okCallback: function() {},
        ajaxOk: false,
        position: {
            my: "top center",
            at: "bottom center",
            viewport: $(window)
        },
        show: {
            solo: true,
            modal: false
        },
        classes: []
    };

    // initialize
    $.extend(settings, options);

    // persist objects for convenience
    var trigger = settings.trigger();
    var container = settings.container(trigger);

    // this is the actual content of the popup
    var popup = $(container.html());

    // private functions
    function wireOKButton() {
        popup.find("input.ok").click(function() {

            if (settings.ajaxOk) {
                // show spinner, let developer decide
                // when to close qtip
            } else {
                trigger.qtip("hide");
            }

            return false;
        });
    }

    function wireCancelLink() {
        popup.find("a.cancel").click(function() {
            trigger.qtip("hide");
            return false;
        });
    }

    function addActiveState() {
        trigger.addClass("active");
    }

    function removeActiveState() {
        trigger.removeClass("active");
    }

    function wireQtip() {
        // custom classes to adjust for width, etc
        var classes = ["ui-tooltip-plain", "ui-tooltip-shadow", "ui-tooltip-rounded"].concat(settings.classes);

        var qtipOptions = {
            content: {
                text: popup
            },
            show: {
                event: "click",
                solo: settings.show.solo,
                modal: settings.show.modal
            },
            hide: {
                event: "click"
            },
            events: {
                show: function(event, api) {
                    wireOKButton();
                    wireCancelLink();
                    addActiveState();

                    settings.initCallback();

                    // but where solo doesn't work for modal
                    if (settings.show.modal && activeTrigger !== null) {
                        activeTrigger.qtip("hide");
                    }

                    activeTrigger = trigger;
                },
                hide: function(event, api) {
                    removeActiveState();
                }
            },
            style: {
                classes: classes.join(" "),
                tip: {
                    width: 20,
                    height: 10
                }
            },
            position: settings.position
        };

        if (settings.show.modal) {
            qtipOptions.position = {
                my: "center",
                at: "center",
                target: $(window)
            };

            qtipOptions.show.modal = {
                blur: false
            };
        }

        trigger.qtip(qtipOptions);
    }

    wireQtip();

    // public
    return popup;
};

/*
* qTip2 - Pretty powerful tooltips
* http://craigsworks.com/projects/qtip2/
*
* Version: nightly
* Copyright 2009-2010 Craig Michael Thompson - http://craigsworks.com
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: Thu Mar  3 10:10:57 PST 2011
*/

"use strict"; // Enable ECMAScript "strict" operation for this function. See more: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
/*jslint browser: true, onevar: true, undef: true, nomen: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true */
/*global window: false, jQuery: false */

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('"56 57",9(a,b,c){9 y(c){P f=Q,h=c.25.O.1q,i=c.2Z,j=i.1n,k="#17-1I",l=".58",m="3m"+l+" 4J"+l;c.2H.1q={"^O.1q.(2I|1W)$":9(){f.2b(),i.1I.26(j.3U(":59"))}},a.1l(f,{2b:9(){h.2I&&(j.1D(l).18(m,9(b,c,d){P e=b.1z.2e("1n","");a.23(h[e])?h[e].1K(i.1I,d,c):f[e](d)}),f.2g(),h.1W===d&&i.1I.1D(l+c.1h).18("3D"+l+c.1h,9(){c.R.1K(c)}),i.1I.W("5a",h.1W?"5b":""))},2g:9(){P c=a(k),d;S(c.1b){i.1I=c;N c}d=i.1I=a("<2c />",{1h:k.2s(1),W:{15:"46",T:0,U:0,2u:"4a"},3b:9(){N e}}).2Q(1w.2U),a(b).18("2k"+l,9(){d.W({Y:1r.2z(a(b).Y(),a(1w).Y()),X:1r.2z(a(b).X(),a(1w).X())})}).29("2k");N d},26:9(b){P h=i.1I,k=c.25.O.1q.1X,l=b?"O":"R",m;h||(h=f.2g());S(!h.3U(":5c")||b)h.3O(d,e),b&&(m=1H(a.W(j[0],"z-4H"),10),h.W("z-4H",(m||g.3z)-1)),a.23(k)?k.1K(h,b):k===e?h[l]():h.4T(3i,b?.7:0,9(){b||a(Q).R()})},O:9(){f.26(d)},R:9(){f.26(e)},2i:9(){P d=i.1I;d&&(a(k).1e(9(){P b=a(Q).1y("17");S(b&&b.1h!==b.1h&&b.25.O.1q)N d=e}),d?(i.1I.1S(),a(b).1D(l)):i.1I.1D(l+c.1h)),j.1D(m)}}),f.2b()}9 x(b,g){9 v(a){P b=a.1o==="y",c=n[b?"X":"Y"],d=n[b?"Y":"X"],e=a.1k().3V("1v")>-1,f=c*(e?.5:1),g=1r.5e,h=1r.3K,i,j,k,l=1r.3I(g(f,2)+g(d,2)),m=[p/f*l,p/d*l];m[2]=1r.3I(g(m[0],2)-g(p,2)),m[3]=1r.3I(g(m[1],2)-g(p,2)),i=l+m[2]+m[3]+(e?0:m[0]),j=i/l,k=[h(j*d),h(j*c)];N{Y:k[b?0:1],X:k[b?1:0]}}9 u(b){P c=k.1s&&b.y==="T",d=c?k.1s:k.V,e=a.1Q.7f,f=e?"-5f-":a.1Q.4C?"-4C-":"",g=b.y+(e?"":"-")+b.x,h=f+(e?"19-4s-"+g:"19-"+g+"-4s");N 1H(d.W(h),10)||1H(l.W(h),10)||0}9 t(a,b,c){b=b?b:a[a.1o];P d=k.1s&&a.y==="T",e=d?k.1s:k.V,f="19-"+b+"-X",g=1H(e.W(f),10);N(c?g||1H(l.W(f),10):g)||0}9 s(b,e,f,g){S(k.16){P h=a.1l({},i.1g),l=f.37,n;i.1g.2j!==d&&(l.U&&(h.x=h.x==="1v"?l.U>0?"U":"1B":h.x==="U"?"1B":"U"),l.T&&(h.y=h.y==="1v"?l.T>0?"T":"1A":h.y==="T"?"1A":"T"),h.1k()!==m.1g&&(m.T!==l.T||m.U!==l.U)&&(n=i.2R(h))),n||(n=i.15(h,0)),n.1B!==c&&(n.U=n.1B),n.1A!==c&&(n.T=n.1A),n.3o=1r.2z(0,j.1i),f.U-=n.U.3h?n.3o:(n.1B?-1:1)*n.U,f.T-=n.T.3h?n.3o:(n.1A?-1:1)*n.T,m.U=l.U,m.T=l.T,m.1g=h.1k()}}P i=Q,j=b.25.14.16,k=b.2Z,l=k.1n,m={T:0,U:0,1g:""},n={X:j.X,Y:j.Y},o={},p=j.19||0,q=".17-16",r=a("<4m />")[0].3w;i.1g=f,i.3e=f,b.2H.16={"^15.1L|14.16.(1g|3e|19)$":9(){i.2b()||i.2i(),b.1Y()},"^14.16.(Y|X)$":9(){n={X:j.X,Y:j.Y},i.2g(),i.2R(),b.1Y()},"^V.13.1j|14.(2O|2f)$":9(){k.16&&i.2R()}},a.1l(i,{2b:9(){P b=i.4x()&&(r||a.1Q.2w);b&&(i.2g(),i.2R(),l.1D(q).18("4U"+q,s));N b},4x:9(){P a=j.1g,c=b.25.15,f=c.2m,g=c.1L.1k?c.1L.1k():c.1L;S(a===e||g===e&&f===e)N e;a===d?i.1g=1F h.2r(g):a.1k||(i.1g=1F h.2r(a),i.1g.2j=d);N i.1g.1k()!=="5i"},48:9(){P c=k.16.W({6h:"",19:""}),d=i.1g,e=d[d.1o],f="19-"+e+"-33",g="19"+e.3h(0)+e.2s(1)+"5k",h=/5l?\\(0, 0, 0(, 0)?\\)|2S/i,m="5m-33",p="2S",q=k.1s&&(d.y==="T"||d.y==="1v"&&c.15().T+n.Y/2+j.1i<k.1s.2X(1)),r=q?k.1s:k.V;o.28=c.W(m)||p,o.19=c[0].14[g];S(!o.28||h.1C(o.28))o.28=r.W(m),h.1C(o.28)&&(o.28=l.W(m));S(!o.19||h.1C(o.19)){o.19=l.W(f);S(h.1C(o.19)||o.19===a(1w.2U).W("33"))o.19=r.W(f)!==a(b.2Z.V).W("33")?r.W(f):p}a("*",c).2n(c).W(m,p).W("19","6e 4c 2S")},2g:9(){P b=n.X,c=n.Y,d;k.16&&k.16.1S(),k.16=a("<2c />",{"1T":"1u-1n-16"}).W({X:b,Y:c}).5o(l),r?a("<4m />").2Q(k.16)[0].3w("2d").4M():(d=\'<3S:47 5p="0,0" 14="2u:2W; 15:46; 4Q:2a(#3c#4f);"></3S:47>\',k.16.2E(p?d+=d:d))},2R:9(b){P c=k.16,g=c.5q(),l=n.X,m=n.Y,q="3Q 5r ",s="3Q 4c 2S",u=j.3e,x=1r.3K,y,z,A,B,C;b||(b=i.1g),u===e?u=b:(u=1F h.2r(u),u.1o=b.1o,u.x==="3g"?u.x=b.x:u.y==="3g"?u.y=b.y:u.x===u.y&&(u[b.1o]=b[b.1o])),y=u.1o,i.48(),p=o.19==="2S"||o.19==="#5I"?0:j.19===d?t(b,f,d):j.19,A=w(u,l,m),C=v(b),c.W(C),b.1o==="y"?B=[x(u.x==="U"?p:u.x==="1B"?C.X-l-p:(C.X-l)/2),x(u.y==="T"?C.Y-m:0)]:B=[x(u.x==="U"?C.X-l:0),x(u.y==="T"?p:u.y==="1A"?C.Y-m-p:(C.Y-m)/2)],r?(g.1a(C),z=g[0].3w("2d"),z.5u(),z.4M(),z.5d(0,0,42,42),z.5w(B[0],B[1]),z.5n(),z.5y(A[0][0],A[0][1]),z.49(A[1][0],A[1][1]),z.49(A[2][0],A[2][1]),z.5A(),z.53=o.28,z.5B=o.19,z.5C=p*2,z.5D="4P",z.63=7z,z.4W(),z.28()):(A="m"+A[0][0]+","+A[0][1]+" l"+A[1][0]+","+A[1][1]+" "+A[2][0]+","+A[2][1]+" 5F",B[2]=p&&/^(r|b)/i.1C(b.1k())?1:0,g.W({5G:""+(u.1k().3V("1v")>-1),U:B[0]-B[2]*4Z(y==="x"),T:B[1]-B[2]*4Z(y==="y"),X:l+p,Y:m+p}).1e(9(b){P c=a(Q);c.1a({7v:l+p+" "+(m+p),7u:A,5K:o.28,7r:!!b,5N:!b}).W({2u:p||b?"2W":"4a"}),!b&&p>0&&c.2E()===""&&c.2E(\'<3S:4W 5Q="\'+p*2+\'3Q" 33="\'+o.19+\'" 5S="5T" 5U="4P"  14="4Q:2a(#3c#4f); 2u:2W;" />\')}));N i.15(b,1)},15:9(b,c){P f=k.16,g={},h=1r.2z(0,j.1i),l,m,n;S(j.1g===e||!f)N e;b=b||i.1g,l=b.1o,m=v(b),n=a.1Q.2w&&p&&/^(b|r)/i.1C(b.1k())?1:0,a.1e(l==="y"?[b.x,b.y]:[b.y,b.x],9(a,c){P e,f;c==="1v"?(e=l==="y"?"U":"T",g[e]="50%",g["4g-"+e]=-1r.3K(m[l==="y"?"X":"Y"]/2)+h):(e=t(b,c,d),f=u(b),g[c]=a||!p?t(b,c)+(a?0:f):h+(f>e?f:0))}),g[b[l]]-=m[l==="x"?"X":"Y"]+n,c&&f.W({T:"",1A:"",U:"",1B:"",4g:""}).W(g);N g},2i:9(){k.16&&k.16.1S(),l.1D(q)}}),i.2b()}9 w(a,b,c){P d=1r.4h(b/2),e=1r.4h(c/2),f={4i:[[0,0],[b,c],[b,0]],4j:[[0,0],[b,0],[0,c]],4k:[[0,c],[b,0],[b,c]],4l:[[0,0],[0,c],[b,c]],5W:[[0,c],[d,0],[b,c]],5X:[[0,0],[b,0],[d,c]],5Y:[[0,0],[b,e],[0,c]],5Z:[[b,0],[b,c],[0,e]]};f.60=f.4i,f.61=f.4j,f.62=f.4k,f.64=f.4l;N f[a.1k()]}9 v(b){P c=Q,d=b.2Z.1n,e=b.25.V.1t,f=".17-1t",g=/<3J\\b[^<]*(?:(?!<\\/3J>)<[^<]*)*<\\/3J>/4y;b.2H.1t={"^V.1t":9(a,b,d){b==="1t"&&(e=d),b==="1G"?c.1G(e.1G):e&&e.2a?c.2x():c.1G(0)}},a.1l(c,{2b:9(){e&&e.2a&&(c.2x(),d.65("3m",9(){c.1G(e.1G)}))},1G:9(a){d[(a?"4D":"")+"18"]("3m"+f,c.2x)},2x:9(){9 j(a,c,d){b.2M("V.1j",c+": "+d)}9 i(c){h&&(c=a("<2c/>").31(c.2e(g,"")).4p(h)),b.2M("V.1j",c)}P d=e.2a.3V(" "),f=e.2a,h;d>-1&&(h=f.2s(d),f=f.2s(0,d)),a.1t(a.1l({66:i,3x:j,67:b},e,{2a:f}));N c}}),c.2b()}9 u(b,c){P i,j,k,l,m=a(Q),n=a(1w.2U),o=Q===1w?n:m,p=m.1U?m.1U(c.1U):f,u=c.1U.1z==="68"&&p?p[c.1U.4n]:f,v=m.1y(c.1U.4n||"69");6O{v=11 v==="1k"?(1F 6a("N "+v))():v}6b(w){r("6c 6K 6f 6I 6g 1y: "+v)}l=a.1l(d,{},g.2v,c,11 v==="1f"?s(v):f,s(u||p)),p&&a.44(Q,"1U"),j=l.15,l.1h=b;S("2L"===11 l.V.1j){k=m.1a(l.V.1a);S(l.V.1a!==e&&k)l.V.1j=k;2q N e}j.1p===e&&(j.1p=n),j.12===e&&(j.12=o),l.O.12===e&&(l.O.12=o),l.O.2Y===d&&(l.O.2Y=n),l.R.12===e&&(l.R.12=o),l.15.1R===d&&(l.15.1R=j.1p),j.2m=1F h.2r(j.2m),j.1L=1F h.2r(j.1L);S(a.1y(Q,"17"))S(l.3L)m.17("2i");2q S(l.3L===e)N e;a.1a(Q,"13")&&(a.1y(Q,q,a.1a(Q,"13")),m.3p("13")),i=1F t(m,l,b,!!k),a.1y(Q,"17",i),m.18("1S.17",9(){i.2i()});N i}9 t(p,r,t,u){9 M(c,d,e,f){f=1H(f,10)!==0;P g=".17-"+t,h={O:c&&r.O.12[0],R:d&&r.R.12[0],1n:e&&v.1d&&A.1n[0],V:e&&v.1d&&A.V[0],1p:f&&r.15.1p[0]===w?1w:r.15.1p[0],3R:f&&b};v.1d?a([]).6G(a.6i([h.O,h.R,h.1n,h.1p,h.V,h.3R],9(a){N 11 a==="1f"})).1D(g):c&&r.O.12.1D(g+"-2g")}9 L(c,d,f,h){9 y(a){D()&&v.1Y(a)}9 x(a){S(z.21(l))N e;1E(v.1m.1N),v.1m.1N=2P(9(){v.R(a)},r.R.1N)}9 u(b){S(z.21(l))N e;P c=a(b.3M||b.12),d=c.6j(m)[0]===z[0],f=c[0]===n.O[0];1E(v.1m.O),1E(v.1m.R);S(k.12==="24"&&d||r.R.2j&&(/24(4R|4S|3N)/.1C(b.1z)&&(d||f))){b.6k(),b.6C();N e}z.3O(1,1),r.R.22>0?v.1m.R=2P(9(){v.R(b)},r.R.22):v.R(b)}9 s(a){S(z.21(l))N e;n.O.29("17-"+t+"-1N"),1E(v.1m.O),1E(v.1m.R);P b=9(){v.O(a)};r.O.22>0?v.1m.O=2P(b,r.O.22):b()}P j=".17-"+t,k=r.15,n={O:r.O.12,R:r.R.12,1p:k.1p[0]===w?a(1w):k.1p,3C:a(1w)},o={O:2F(r.O.1c).39(" "),R:2F(r.R.1c).39(" ")},q=a.1Q.2w&&1H(a.1Q.3G,10)===6;f&&(r.R.2j&&(n.R=n.R.2n(z),z.18("6m"+j,9(){z.21(l)||1E(v.1m.R)})),k.12==="24"&&k.2D.24&&r.R.1c&&z.18("3l"+j,9(a){(a.3M||a.12)!==n.O[0]&&v.R(a)}),z.18("2V"+j+" 3l"+j,9(a){v[a.1z==="2V"?"2o":"1W"](a)})),d&&("2G"===11 r.R.1N&&(n.O.18("17-"+t+"-1N",x),a.1e(g.45,9(a,b){n.R.2n(A.1n).18(b+j+"-1N",x)})),a.1e(o.R,9(b,c){P d=a.6n(c,o.O),e=a(n.R);d>-1&&e.2n(n.O).1b===e.1b||c==="4o"?(n.O.18(c+j,9(a){D()?u(a):s(a)}),2A o.O[d]):n.R.18(c+j,u)})),c&&a.1e(o.O,9(a,b){n.O.18(b+j,s)}),h&&((k.2D.2k||k.1R)&&a(a.1c.6o.2k?k.1R:b).18("2k"+j,y),(k.1R||q&&z.W("15")==="2j")&&a(k.1R).18("3v"+j,y),/4o/i.1C(r.R.1c)&&n.3C.18("3b"+j,9(b){P c=a(b.12);c.6p(m).1b===0&&c.2n(p).1b>1&&D()&&!z.21(l)&&v.R(b)}),k.12==="24"&&n.3C.18("3t"+j,9(a){k.2D.24&&!z.21(l)&&D()&&v.1Y(a||i)}))}9 K(b,c){P f=A.V;S(!v.1d||!b)N e;a.23(b)&&(b=b.1K(p,v)||""),b.1P&&b.1b>0?f.4r().31(b.W({2u:"2W"})):f.2E(b),z.38("3P",9(b){9 e(a){c=c.3d(a),c.1b===0&&(v.30(),v.1d&&D()&&v.1Y(B.1c),b())}P c=f.4p("3k:3d([Y]):3d([X])");c.1e(9(b,c){P f=["6r","3x","2x","6s",""].6t(".17-6u ");a(Q).18(f,9(){1E(v.1m.3k[b]),e(Q)}),9 g(){S(c.Y&&c.X)N e(c);v.1m.3k[b]=2P(g,20)}();N d}),c.1b===0&&e(c)});N v}9 J(b){P c=A.13;S(!v.1d||!b)N e;a.23(b)&&(b=b.1K(p,v)||""),b.1P&&b.1b>0?c.4r().31(b.W({2u:"2W"})):c.2E(b),v.30(),v.1d&&D()&&v.1Y(B.1c)}9 I(a){P b=A.1x,c=A.13;S(!v.1d)N e;a?(c||H(),G()):b.1S()}9 H(){P b=x+"-13";A.1s&&F(),A.1s=a("<2c />",{"1T":j+"-1s "+(r.14.2f?"1u-2f-4z":"")}).31(A.13=a("<2c />",{1h:b,"1T":j+"-13","1J-3H":d})).6w(A.V),r.V.13.1x?G():v.1d&&v.30()}9 G(){P b=r.V.13.1x;A.1x&&A.1x.1S(),b.1P?A.1x=b:A.1x=a("<a />",{"1T":"1u-2K-3c "+(r.14.2f?"":j+"-3j"),13:"4t 1n","1J-6x":"4t 1n"}).6y(a("<6z />",{"1T":"1u-3j 1u-3j-6A",2E:"&6B;"})),A.1x.2Q(A.1s).1a("4F","1x").4w(9(b){a(Q).2h("1u-2K-4w",b.1z==="2V")}).3D(9(a){z.21(l)||v.R(a);N e}).18("3b 6D 43 6E 6H",9(b){a(Q).2h("1u-2K-6J 1u-2K-2o",b.1z.2s(-4)==="6L")}),v.30()}9 F(){A.13&&(A.1s.1S(),A.1s=A.13=A.1x=f,v.1Y())}9 E(){P a=r.14.2f;z.2h(k,a),A.V.2h(k+"-V",a),A.1s&&A.1s.2h(k+"-4z",a),A.1x&&A.1x.2h(j+"-3j",!a)}9 D(){N z&&z.W("U")!==o&&z.W("3f")!=="2T"}9 C(a){P b=0,c,d=r,e=a.39(".");4E(d=d[e[b++]])b<e.1b&&(c=d);N[c||r,e.6P()]}P v=Q,w=1w.2U,x=j+"-"+t,y=0,z,A,B;v.1h=t,v.1d=e,v.2Z=A={12:p},v.1m={3k:[]},v.25=r,v.2H={},v.1O={},v.2N=B={1c:{},12:f,2p:e,1a:u},v.2H.6Q={"^1h$":9(b,c,f){P h=f===d?g.3A:f,i=j+"-"+h;h!==e&&h.1b>0&&!a("#"+i).1b&&(z[0].1h=i,A.V[0].1h=i+"-V",A.13[0].1h=i+"-13")},"^V.1j$":9(a,b,c){K(c)},"^V.13.1j$":9(a,b,c){S(!c)N F();!A.13&&c&&H(),J(c)},"^V.13.1x$":9(a,b,c){I(c)},"^15.(1L|2m)$":9(a,b,c){"1k"===11 c&&(a[b]=1F h.2r(c))},"^15.1p$":9(a,b,c){v.1d&&z.2Q(c)},"^(O|R).(1c|12|2j|22|1N)$":9(a,b,c,d,e){P f=[1,0,0];f[e[0]==="O"?"4O":"6S"](0),M.1Z(v,f),L.1Z(v,[1,1,0,0])},"^O.2B$":9(){v.1d||v.O()},"^14.2O$":9(b,c,d){a.1a(z[0],"1T",j+" 17 1u-4b-4d "+d)},"^14.2f|V.13":E,"^3y.(1M|O|3N|R|2o|1W)$":9(b,c,d){z[(a.23(d)?"":"4D")+"18"]("1n"+c,d)}},a.1l(v,{1M:9(b){S(v.1d)N e;P c=r.V.1j,f=r.V.13.1j,g=a.35("6T");a.1a(p[0],"1J-3E",x),z=A.1n=a("<2c/>").1a({1h:x,"1T":j+" 17 1u-4b-4d "+r.14.2O,4F:"6U","1J-6W":"6X","1J-3H":e,"1J-3E":x+"-V","1J-2T":d}).2h(l,B.2p).1y("17",v).2Q(r.15.1p).31(A.V=a("<2c />",{"1T":j+"-V",1h:x+"-V","1J-3H":d})),v.1d=d,f&&(H(),J(f)),K(c),E(),a.1e(h,9(){Q.2C==="1M"&&Q(v)}),L(1,1,1,1),a.1e(r.3y,9(a,b){S(b){P c=a==="26"?"3m 4J":"1n"+a;z.18(c,b)}}),z.W("3f","2T").38("3P",9(a){g.36=B.1c,z.29(g,[v]),(r.O.2B||b)&&v.O(B.1c),a()});N v},4e:9(a){P b,c;72(a.2t()){4K"73":b={Y:z.2X(),X:z.3a()};3F;4K"1i":b=h.1i(z,r.15.1p);3F;3c:c=C(a.2t()),b=c[0][c[1]],b=b.1o?b.1k():b}N b},2M:9(b,c){9 j(a,b){P c,e,f;S(v.1d){4L(c 1V h)4L(e 1V h[c])S(f=(1F 76(e,"i")).4N(a))b.4O(f),h[c][e].1Z(v,b)}2q a==="O.2B"&&b[2]&&(y=0,v.1M(d))}P f=/^15.(1L|2m|2D|12|1p)|14|V/i,g=e,h=v.2H,i;"1k"===11 b?(i=b,b={},b[i]=c):b=a.1l(d,{},b),a.1e(b,9(c,d){P e=C(c.2t()),h;h=e[0][e[1]],e[0][e[1]]="1f"===11 d&&d.77?a(d):d,b[c]=[e[0],e[1],d,h],g=f.1C(c)||g}),s(r),y=1,a.1e(b,j),y=0,g&&D()&&v.1d&&v.1Y();N v},26:9(b,c){9 j(){b?a.1Q.2w&&z[0].14.3Z("3q"):z.W({2u:"",3f:"2T",X:"",3Y:"",U:"",T:""})}S(!v.1d)S(b)v.1M(1);2q N e;P d=b?"O":"R",g=r[d],h=D(),i;(11 b).4q("2L|2G")&&(b=!h);S(h===b)N v;S(c){S(/79|7b/.1C(c.1z)&&/4R|4S/.1C(B.1c.1z)&&c.12===r.O.12[0]&&z.7d(c.3M).1b)N v;B.1c=a.1l({},c)}i=a.35("1n"+d),i.36=c?B.1c:f,z.29(i,[v,3i]);S(i.3s())N v;a.1a(z[0],"1J-2T",!b),b?(z.R().W({3f:""}),v.2o(c),v.1Y(c,0),g.2Y&&a(m,g.2Y).3d(z).17("R",i)):(1E(v.1m.O),v.1W(c)),z.3O(1,1),a.23(g.1X)?(g.1X.1K(z,v),z.38("3P",9(a){j.1K(Q,a),a()})):g.1X===e?(z[d](),j.1K(z)):z.4T(3i,b?1:0,j),b&&g.12.29("17-"+t+"-1N");N v},O:9(a){N v.26(d,a)},R:9(a){N v.26(e,a)},2o:9(b){S(!v.1d)N e;P c=a(m),d=1H(z[0].14.34,10),f=g.3z+c.1b,h=a.1l({},b),i,j;z.21(n)||(d!==f&&(c.1e(9(){Q.14.34>d&&(Q.14.34=Q.14.34-1)}),c.3q("."+n).17("1W",h)),j=a.35("7g"),j.36=h,z.29(j,[v,f]),j.3s()||(z.3u(n)[0].14.34=f));N v},1W:9(b){P c=a.1l({},b),d;z.41(n),d=a.35("7h"),d.36=c,z.29(d,[v]);N v},1Y:9(f,k){S(!v.1d||y)N e;y=d;P l=r.15.12,m=r.15,n=m.1L,o=m.2m,p=m.2D,q=z.3a(),s=z.2X(),t=0,u=0,x=a.35("4U"),A=z.W("15")==="2j",C=m.1R.1P?m.1R:a(b),E={U:0,T:0},F=(v.1O.16||{}).1g,G={U:9(a){P b=C.2J,c=n.x==="U"?q:n.x==="1B"?-q:-q/2,d=o.x==="U"?t:o.x==="1B"?-t:-t/2,e=F&&F.1o==="x"?g.2v.14.16.X:0,f=b-a-e,h=a+q-C.X-b+e,i=c-(n.1o==="x"||n.x===n.y?d:0),j=n.x==="1v";f>0&&(n.x!=="U"||h>0)?E.U-=i+(j?0:2*p.x):h>0&&(n.x!=="1B"||f>0)&&(E.U-=j?-i:i+2*p.x),E.U!==a&&j&&(E.U-=p.x),E.U<0&&-E.U>h&&(E.U=a);N E.U-a},T:9(a){P b=C.2y,c=n.y==="T"?s:n.y==="1A"?-s:-s/2,d=o.y==="T"?u:o.y==="1A"?-u:-u/2,e=F&&F.1o==="y"?g.2v.14.16.Y:0,f=b-a-e,h=a+s-C.Y-b+e,i=c-(n.1o==="y"||n.x===n.y?d:0),j=n.y==="1v";f>0&&(n.y!=="T"||h>0)?E.T-=i+(j?0:2*p.y):h>0&&(n.y!=="1A"||f>0)&&(E.T-=j?-i:i+2*p.y),E.T!==a&&j&&(E.T-=p.y),E.T<0&&-E.T>h&&(E.T=a);N E.T-a}};k=k===c||!!k||e,C=C?{3X:C,Y:C[(C[0]===b?"h":"7i")+"7j"](),X:C[(C[0]===b?"w":"7k")+"7l"](),2J:C.2J(),2y:C.2y()}:e;S(l==="24")o={x:"U",y:"T"},f=f&&(f.1z==="2k"||f.1z==="3v")?B.1c:p.24||!f||!f.3n?a.1l({},i):f,E={T:f.3W,U:f.3n};2q{l==="1c"&&(f&&f.12&&f.1z!=="3v"&&f.1z!=="2k"?l=B.12=a(f.12):l=B.12),l=a(l).7m(0);S(l.1b===0)N v;l[0]===1w||l[0]===b?(t=l.X(),u=l.Y(),l[0]===b&&(E={T:A?0:C.2y,U:A?0:C.2J})):l.3U("7n")&&h.4Y?E=h.4Y(l,o):l[0].7o=="7p://7q.7s.7t/7w/3r"&&h.3r?E=h.3r(l,o):(t=l.3a(),u=l.2X(),E=h.1i(l,m.1p)),E.1i&&(t=E.X,u=E.Y,E=E.1i),E.U+=o.x==="1B"?t:o.x==="1v"?t/2:0,E.T+=o.y==="1A"?u:o.y==="1v"?u/2:0}E.U+=p.x+(n.x==="1B"?-q:n.x==="1v"?-q/2:0),E.T+=p.y+(n.y==="1A"?-s:n.y==="1v"?-s/2:0),m.1R.1P&&l[0]!==b&&l[0]!==w?E.37={U:G.U(E.U),T:G.T(E.T)}:E.37={U:0,T:0},z.1a("1T",9(b,c){N a.1a(Q,"1T").2e(/1u-1n-52-\\w+/i,"")}).3u(j+"-52-"+n.4u()),x.36=a.1l({},f),z.29(x,[v,E,C.3X]);S(x.3s())N v;2A E.37,k&&54(E.U,E.T)?D()&&a.23(m.1X)&&(m.1X.1K(z,v,E),z.38(9(b){P c=a(Q);c.W({3Y:"",Y:""}),a.1Q.2w&&Q.14&&Q.14.3Z("3q"),b()})):z.W(E),y=e;N v},30:9(){S(!v.1d||(!a.1Q.2w||a.1Q.3G>=8))N e;P b=j+"-55",c;z.W({X:"40",Y:"40"}).3u(b),c={Y:z.2X(),X:z.3a()},a.1e(["X","Y"],9(a,b){P d=1H(z.W("2z-"+b),10)||0,e=1H(z.W("4V-"+b),10)||0;c[b]=d+e?1r.4V(1r.2z(c[b],e),d):c[b]}),z.W(c).41(b);N v},3T:9(b){P c=l;"2L"!==11 b&&(b=!z.21(c)&&!B.2p),v.1d?(z.2h(c,b),a.1a(z[0],"1J-2p",b)):B.2p=!!b;N v},5g:9(){v.3T(e)},2i:9(){P b=p[0],c=a.1y(b,q);v.1d&&(z.1S(),a.1e(v.1O,9(){Q.2i&&Q.2i()})),1E(v.1m.O),1E(v.1m.R),M(1,1,1,1),a.44(b,"17"),c&&a.1a(b,"13",c),p.3p("1J-3E").1D(".17");N p}})}9 s(b){P c;S(!b||"1f"!==11 b)N e;"1f"!==11 b.1U&&(b.1U={1z:b.1U});S("V"1V b){S("1f"!==11 b.V||b.V.1P)b.V={1j:b.V};c=b.V.1j||e,!a.23(c)&&(!c&&!c.1a||c.1b<1||"1f"===11 c&&!c.1P)&&(b.V.1j=e),"13"1V b.V&&("1f"!==11 b.V.13&&(b.V.13={1j:b.V.13}),c=b.V.13.1j||e,!a.23(c)&&(!c&&!c.1a||c.1b<1||"1f"===11 c&&!c.1P)&&(b.V.13.1j=e))}"15"1V b&&("1f"!==11 b.15&&(b.15={1L:b.15,2m:b.15})),"O"1V b&&("1f"!==11 b.O&&(b.O.1P?b.O={12:b.O}:b.O={1c:b.O})),"R"1V b&&("1f"!==11 b.R&&(b.R.1P?b.R={12:b.R}:b.R={1c:b.R})),"14"1V b&&("1f"!==11 b.14&&(b.14={2O:b.14})),a.1e(h,9(){Q.32&&Q.32(b)});N b}9 r(){P c=b.5t;N c&&(c.3x||c.5v||a.5x).1Z(c,27)}P d=!0,e=!1,f=5z,g,h,i,j="1u-1n",k="1u-2f",l="1u-2K-2p",m="2c.17."+j,n=j+"-2o",o="-5E",p="5H",q="5J";g=a.2l.17=9(b,h,i){P j=2F(b).2t(),k=f,l=j==="3T"?[d]:a.5M(27).5O(1,10),m=l[l.1b-1],n=Q[0]?a.1y(Q[0],"17"):f;S(!27.1b&&n||j==="5P")N n;S("1k"===11 b){Q.1e(9(){P b=a.1y(Q,"17");S(!b)N d;m&&m.5R&&(b.2N.1c=m);S(j==="3o"&&h)S(a.5V(h)||i!==c)b.2M(h,i);2q{k=b.4e(h);N e}2q b[j]&&b[j].1Z(b[j],l)});N k!==f?k:Q}S("1f"===11 b||!27.1b){n=s(a.1l(d,{},b));N g.18.1K(Q,n,m)}},g.18=9(b,c){N Q.1e(9(f){9 p(b){9 c(){o.1M(11 b==="1f"||i.O.2B),k.O.1D(l.O),k.R.1D(l.R)}S(o.2N.2p)N e;o.2N.1c=a.1l({},b),i.O.22>0?(1E(o.1m.O),o.1m.O=2P(c,i.O.22),l.O!==l.R&&k.R.18(l.R,9(){1E(o.1m.O)})):c()}P i,k,l,m=!b.1h||b.1h===e||b.1h.1b<1||a("#"+j+"-"+b.1h).1b?g.3A++:b.1h,n=".17-"+m+"-2g",o=u.1K(Q,m,b);S(o===e)N d;i=o.25,a.1e(h,9(){Q.2C==="2C"&&Q(o)}),k={O:i.O.12,R:i.R.12},l={O:2F(i.O.1c).2e(" ",n+" ")+n,R:2F(i.R.1c).2e(" ",n+" ")+n},k.O.18(l.O,p),(i.O.2B||i.51)&&p(c)})},h=g.1O={2r:9(a){a=2F(a).2e(/([A-Z])/," $1").2e(/6l/4y,"1v").2t(),Q.x=(a.3B(/U|1B/i)||a.3B(/1v/)||["3g"])[0].2t(),Q.y=(a.3B(/T|1A|1v/i)||["3g"])[0].2t(),Q.1o=a.3h(0).4q(/^(t|b)/)>-1?"y":"x",Q.1k=9(){N Q.1o==="y"?Q.y+Q.x:Q.x+Q.y},Q.4u=9(){P a=Q.x.2s(0,1),b=Q.y.2s(0,1);N a===b?a:a==="c"||a!=="c"&&b!=="c"?b+a:a+b}},1i:9(c,d){9 k(a,b){e.U+=b*a.2J(),e.T+=b*a.2y()}P e=c.1i(),f=d,g=0,i=1w.2U,j;S(f){6F{S(f[0]===i)3F;f.W("15")!=="6M"&&(j=f.15(),e.U-=j.U+(1H(f.W("6N"),10)||0),e.T-=j.T+(1H(f.W("6R"),10)||0),g++)}4E(f=f.6V());(d[0]!==i||g>1)&&k(d,1),h.4G&&k(a(b),-1)}N e},4G:6Y((/6Z.+70 ([0-71]{3}).*74.*75/i.4N(78.7a)||[0,"7c"])[1].2e("7e","."))<4.1,2l:{1a:9(b,c){S(Q.1b){P d=Q[0],e="13",f=a.1y(d,"17");S(b===e){S(27.1b<2)N a.1y(d,q);S(11 f==="1f"){f&&f.1d&&f.25.V.1a===e&&f.2N.1a&&f.2M("V.1j",c),a.2l["1a"+p].1Z(Q,27),a.1y(d,q,a.1a(d,e));N Q.3p("13")}}}},4X:9(b){P c=a([]),d;a("*",Q).2n(Q).1e(9(){P b=a.1y(Q,q);b&&(a.1a(Q,"13",b),c=c.2n(Q))}),d=a.2l["4X"+p].1Z(Q,27),c.3p("13");N d},1S:a.1u?f:9(b,c){a(Q).1e(9(){c||(!b||a.3q(b,[Q]).1b)&&a("*",Q).2n(Q).1e(9(){a(Q).7x("1S")})})}}},a.1e(h.2l,9(b,c){S(!c)N d;P e=a.2l[b+p]=a.2l[b];a.2l[b]=9(){N c.1Z(Q,27)||e.1Z(Q,27)}}),a(b).18("2x.17",9(){P b="3t";a(1w).18(b+".17",9(a){i={3n:a.3n,3W:a.3W,1z:b}})}),g.3G="5h",g.3A=0,g.45="3D 5s 3b 43 3t 3l 2V".39(" "),g.3z=5L,g.2v={51:e,1h:e,3L:d,V:{1j:d,1a:"13",13:{1j:e,1x:e}},15:{1L:"T U",2m:"1A 1B",12:e,1p:e,1R:e,2D:{x:0,y:0,24:d,2k:d},1X:d},O:{12:e,1c:"2V",1X:d,22:3i,2Y:e,2B:e},R:{12:e,1c:"3l",1X:d,22:0,2j:e,1N:e},14:{2O:"",2f:e},3y:{1M:f,3N:f,O:f,R:f,26:f,2o:f,1W:f}},h.1t=9(a){P b=a.1O.1t;N"1f"===11 b?b:a.1O.1t=1F v(a)},h.1t.2C="1M",h.1t.32=9(a){P b=a.V,c;b&&"1t"1V b&&(c=b.1t,11 c!=="1f"&&(c=a.V.1t={2a:c}),"2L"!==11 c.1G&&c.1G&&(c.1G=!!c.1G))},a.1l(d,g.2v,{V:{1t:{1G:d}}}),h.16=9(a){P b=a.1O.16;N"1f"===11 b?b:a.1O.16=1F x(a)},h.16.2C="1M",h.16.32=9(a){P b=a.14,c;b&&"16"1V b&&(c=a.14.16,11 c!=="1f"&&(a.14.16={1g:c}),/1k|2L/i.1C(11 c.1g)||(c.1g=d),11 c.X!=="2G"&&2A c.X,11 c.Y!=="2G"&&2A c.Y,11 c.19!=="2G"&&c.19!==d&&2A c.19,11 c.1i!=="2G"&&2A c.1i)},a.1l(d,g.2v,{14:{16:{1g:d,3e:e,X:6,Y:6,19:d,1i:0}}}),h.3r=9(b,c){P d=a(1w),e=b[0],f={X:0,Y:0,1i:{T:4A,U:4A}},g,h,i,j,k;S(e.4v&&e.6d){g=e.4v(),h=e.6q(),i=e.6v||e;S(!i.4B)N f;j=i.4B(),j.x=g.x,j.y=g.y,k=j.4I(h),f.1i.U=k.x,f.1i.T=k.y,j.x+=g.X,j.y+=g.Y,k=j.4I(h),f.X=k.x-f.1i.U,f.Y=k.y-f.1i.T,f.1i.U+=d.2J(),f.1i.T+=d.2y()}N f},h.1q=9(a){P b=a.1O.1q;N"1f"===11 b?b:a.1O.1q=1F y(a)},h.1q.2C="1M",h.1q.32=9(a){a.O&&(11 a.O.1q!=="1f"?a.O.1q={2I:!!a.O.1q}:11 a.O.1q.2I==="5j"&&(a.O.1q.2I=d))},a.1l(d,g.2v,{O:{1q:{2I:e,1X:d,1W:d}}})}(7y,3R)',62,470,'|||||||||function||||||||||||||||||||||||||||||||||||||||return|show|var|this|hide|if|top|left|content|css|width|height|||typeof|target|title|style|position|tip|qtip|bind|border|attr|length|event|rendered|each|object|corner|id|offset|text|string|extend|timers|tooltip|precedance|container|modal|Math|titlebar|ajax|ui|center|document|button|data|type|bottom|right|test|unbind|clearTimeout|new|once|parseInt|overlay|aria|call|my|render|inactive|plugins|jquery|browser|viewport|remove|class|metadata|in|blur|effect|reposition|apply||hasClass|delay|isFunction|mouse|options|toggle|arguments|fill|trigger|url|init|div||replace|widget|create|toggleClass|destroy|fixed|resize|fn|at|add|focus|disabled|else|Corner|substr|toLowerCase|display|defaults|msie|load|scrollTop|max|delete|ready|initialize|adjust|html|String|number|checks|on|scrollLeft|state|boolean|set|cache|classes|setTimeout|appendTo|update|transparent|hidden|body|mouseenter|block|outerHeight|solo|elements|redraw|append|sanitize|color|zIndex|Event|originalEvent|adjusted|queue|split|outerWidth|mousedown|default|not|mimic|visibility|inherit|charAt|90|icon|img|mouseleave|tooltipshow|pageX|option|removeAttr|filter|svg|isDefaultPrevented|mousemove|addClass|scroll|getContext|error|events|zindex|nextid|match|doc|click|describedby|break|version|atomic|sqrt|script|round|overwrite|relatedTarget|move|stop|fx|px|window|vml|disable|is|indexOf|pageY|elem|opacity|removeAttribute|auto|removeClass|3e3|mouseup|removeData|inactiveEvents|absolute|shape|detectColours|lineTo|none|helper|dashed|reset|get|VML|margin|ceil|bottomright|bottomleft|topright|topleft|canvas|name|unfocus|find|search|empty|radius|Close|abbreviation|getBBox|hover|detectCorner|gi|header|1e10|createSVGPoint|webkit|un|while|role|iOS|index|matrixTransform|tooltiphide|case|for|save|exec|push|miter|behavior|out|leave|fadeTo|tooltipmove|min|stroke|clone|imagemap|Number||prerender|pos|fillStyle|isNaN|fluid|use|strict|qtipmodal|visible|cursor|pointer|animated|clearRect|pow|moz|enable|nightly|centercenter|undefined|Color|rgba|background|beginPath|prependTo|coordorigin|children|solid|dblclick|console|restore|log|translate|noop|moveTo|null|closePath|strokeStyle|lineWidth|lineJoin|31000px|xe|antialias|_replacedByqTip|123456|oldtitle|fillcolor|15e3|makeArray|stroked|slice|api|weight|timeStamp|miterlimit|1000|joinstyle|isPlainObject|topcenter|bottomcenter|rightcenter|leftcenter|lefttop|righttop|leftbottom|miterLimit|rightbottom|one|success|context|html5|qtipopts|Function|catch|Unable|parentNode|0px|parse|attribute|backgroundColor|grep|closest|stopPropagation|middle|mouseover|inArray|special|parents|getScreenCTM|abort|unload|join|image|farthestViewportElement|insertBefore|label|prepend|span|close|times|preventDefault|keydown|keyup|do|pushStack|mouseout|HTML5|active|to|down|static|borderLeftWidth|try|pop|builtin|borderTopWidth|unshift|tooltiprender|alert|offsetParent|live|polite|parseFloat|CPU|OS|9_|switch|dimensions|AppleWebkit|Mobile|RegExp|nodeType|navigator|over|userAgent|enter|4_2|has|_|mozilla|tooltipfocus|tooltipblur|outerH|eight|outerW|idth|eq|area|namespaceURI|http|www|filled|w3|org|path|coordsize|2000|triggerHandler|jQuery|100'.split('|'),0,{}))

// jquery.browserdetect.js
$(document).ready(function () { var a = navigator.userAgent.toLowerCase(); $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); if ($.browser.msie) { $('body').addClass('browserIE'); $('body').addClass('browserIE' + $.browser.version.substring(0, 1)) } if ($.browser.chrome) { $('body').addClass('browserChrome'); a = a.substring(a.indexOf('chrome/') + 7); a = a.substring(0, 1); $('body').addClass('browserChrome' + a); $.browser.safari = false } if ($.browser.safari) { $('body').addClass('browserSafari'); a = a.substring(a.indexOf('version/') + 8); a = a.substring(0, 1); $('body').addClass('browserSafari' + a) } if ($.browser.mozilla) { if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) { $('body').addClass('browserFirefox'); a = a.substring(a.indexOf('firefox/') + 8); a = a.substring(0, 1); $('body').addClass('browserFirefox' + a) } else { $('body').addClass('browserMozilla') } } if ($.browser.opera) { $('body').addClass('browserOpera') } });