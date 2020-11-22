---
title: bookmarklets
created: 2016-05-29
tags:
  - bookmarklets
  - js
---

I want to take one short blogs post just to share my bookmarklets.

If you don't know what that means, don't worry.

There once was a time when browser extensions/add-ons didn't exist, and a
slightly later time when they did exist but still really sucked. And, I mean,
you can still get a lot more out of arbitrary JS than you can out of an
extension, usually.

Bookmarklets are little bits of JS saved as a bookmark. When you click or
navigate to that bookmark, the browser just executes it. You can do some pretty
nifty things with them. I have [45748 bookmarks saved on Pinboard](https://pinboard.in/u:zacanger),
and the only bookmarks I have in my browsers are little snippets of JavaScript.

I'm not going to post all of them here (I have about 150), just some of the most
useful ones.

You can save any bit of JS you'd like as a bookmark. Just prepend `javascript:`
to some code, as in `javascript:console.log('foo');alert('bar');`.

--------

a little text editor thing

```html
data:text/html, <title>pad<%2Ftitle> <link href%3D'http%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DSource%2BCode%2BPro%3A400%2C700' rel%3D'stylesheet' type%3D'text%2Fcss'> <body contenteditable style%3D" background-color%3A %2335322f%3B color%3A %23cbc5c1%3B font-family%3A 'Source Code Pro'%2C monospace%3B font-size%3A 1.5em%3B line-height%3A 1.5%3B max-width%3A 28em%3B margin%3A 0 auto%3B padding%3A 4em 1.3em%3B -webkit-font-smoothing%3A antialiased%3B " spellcheck%3D"false"> <h1 style%3D"line-height%3A 1.2%3B">pad<%2Fh1> <p>write stuff here<br %2F>do it
```

element outliner (helps when doing css)

```javascript
javascript:[].forEach.call(document.querySelectorAll('*'),function(a){a.style.outline='1px solid #'+(~~(Math.random()*(1<<24))).toString(16)})
```

switch to view-source (same as ctrl-u in chromium)

```javascript
javascript:location='http://viewsource.in/'+location
```

view rendered html on github that isn't in a gh-pages branch

```javascript
javascript:void('http://htmlpreview.github.io/'==window.location?alert('Drag me to your bookmarks bar!'):window.location='http://htmlpreview.github.io/?'+window.location)
```

switch from github to the gh-pages (foo.github.io) page

```javascript
javascript:(function()%20{%20var%20host%20=%20location.host.split('.');%20var%20path%20=%20location.pathname.slice(1).split('/');%20window.location%20=%20host[2]%20===%20'io'%20?%20'https://github.com/'%20+%20host[0]%20+%20'/'%20+%20path[0]%20:%20'http://'%20+%20path[0]%20+%20'.github.io/'%20+%20path[1];%20})();
```

go to referrer (where you just came from)

```javascript
javascript:if(!document.referrer) alert("No referrer!"); else document.location = document.referrer; void 0
```

view current page as markdown

```javascript
javascript:(function()%7Bfunction%20callback()%7B(function(%24)%7Bvar%20jQuery%3D%24%3B%24('link%5Brel%3Dstylesheet%5D').add('style').remove()%3B%24('%5Bstyle%5D').attr('style'%2C%20'')%3B%24('head').append('%3Clink%20rel%3D%22stylesheet%22%20href%3D%22http%3A%2F%2Fmrcoles.com%2Fmedia%2Ftest%2Fmarkdown-css%2Fmarkdown.css%22%20type%3D%22text%2Fcss%22%20%2F%3E')%3B%24('body').addClass('markdown').css(%7Bwidth%3A%20'600px'%2C%20margin%3A%20'2em%20auto'%2C%20'word-wrap'%3A%20'break-word'%7D)%3B%24('a%20img').css(%7B'max-height'%3A%20'1em'%2C%20'max-width'%3A%20'1em'%7D)%7D)(jQuery.noConflict(true))%7Dvar%20s%3Ddocument.createElement(%22script%22)%3Bs.src%3D%22https%3A%2F%2Fajax.googleapis.com%2Fajax%2Flibs%2Fjquery%2F1.7.1%2Fjquery.min.js%22%3Bif(s.addEventListener)%7Bs.addEventListener(%22load%22%2Ccallback%2Cfalse)%7Delse%20if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()
```

open an ace editor (javascript)

```javascript
data:text/html, <style type="text/css">#e{position:absolute;top:0;right:0;bottom:0;left:0;}</style><div id="e"></div><script src="http://ace.c9.io/build/src-noconflict/ace.js" type="text/javascript" charset="utf-8"></script><script src="http://ace.c9.io/build/src-noconflict/ext-language_tools.js" type="text/javascript" charset="utf-8"></script><script>var e=ace.edit("e");e.setTheme("ace/theme/monokai");e.setOptions({enableBasicAutocompletion:true});e.getSession().setMode("ace/mode/javascript");addEventListener("keydown",function(evt){if(evt.ctrlKey && evt.keyCode==13) eval(e.getSession().getValue());});var link=document.createElement("link");link.type="image/x-icon";link.rel="shortcut icon";link.href="https://raw.githubusercontent.com/diegocard/diegocard.github.io/master/images/icon.png";document.getElementsByTagName("head")[0].appendChild(link);</script>
```

go up (eg from foo.bar/quux/baz.html to foo.bar/quux)

```javascript
javascript:(function(f,a,c,e,t,i,o,u,s){a=f.href;c=f.pathname;e=a.split('#')[0];t=e.split('?')[0];i=f.host.split('.');o=i.length==2?'www.':'';u=i.slice(o==''&&isNaN((i.slice(-1)+'').split(':')[0])?1:0).join('.');s=e!=a?e:t!=a?t:c.substring(0,c.substring(0,c.length-1).lastIndexOf('/')+1);f.href=s?s:f.protocol+'//'+o+u})(top.location)
```

check the current page on the internet archive

```javascript
javascript:void((function(){location.href=%22http://web.archive.org/web/*/%22+location.href;})())
```

tiny little element inspector (useful on for example mobile browsers that don't
have devtools)

```javascript
javascript:(function(d){var%20I=d.createElement('input'),S=I.style;I.type='text';S.width='256px';S.padding='2px';S.border='4px%20solid%20#fff';S.borderRadius='8px';S.boxShadow='1px%201px%203px%201px%20rgba(0,0,0,0.7)';S.background='#000';S.color='#fff';S.fontSize='13px';S.textShadow='none';S.position='fixed';S.top=S.right='3px';S.zIndex='999999';d.body.appendChild(I);window.addEventListener('mousemove',function(e){var%20E=d.elementFromPoint(e.x,e.y);var%20A=[];A[0]=E.tagName;if(E.id){A[1]='#'+E.id;}if(E.className){A[2]='.'+E.className.split('%20').join('.');}I.value=A.join('');},true)})(document);
```

show password field text

```javascript
javascript:var%20e=document.getElementsByTagName('input');for(i=0;i<e.length;i++){if(e[i].type=='password'){e[i].type='text';}}void(0);
```

replace text that contains urls with actual clickable links

```javascript
javascript:(function(){var%20D=document;%20D.body.normalize();%20F(D.body);%20function%20F(n){var%20u,A,M,R,c,x;%20if(n.nodeType==3){%20u=n.data.search(/https?\:\/\/[^\s]*[^.,;'%22>\s\)\]]/);%20if(u>=0)%20{%20M=n.splitText(u);%20R=M.splitText(RegExp.lastMatch.length);%20A=document.createElement(%22A%22);%20A.href=M.data;%20A.appendChild(M);%20R.parentNode.insertBefore(A,R);%20}%20}else%20if(n.tagName!=%22STYLE%22%20&&%20n.tagName!=%22SCRIPT%22%20&&%20n.tagName!=%22A%22)for(c=0;x=n.childNodes[c];++c)F(x);%20}%20})();
```

search for links in the current page

```javascript
javascript:(function(){var x,n,nD,z,i; function htmlEscape(s){s=s.replace(/&/g,'&amp;');s=s.replace(/>/g,'&gt;');s=s.replace(/</g,'&lt;');return s;} function attrQuoteEscape(s){s=s.replace(/&/g,'&amp;'); s=s.replace(/"/g, '&quot;');return s;} x=prompt("show links with this word/phrase in link text or target url (leave blank to list all links):", ""); n=0; if(x!=null) { x=x.toLowerCase(); nD = window.open().document; nD.writeln('<html><head><title>Links containing "'+htmlEscape(x)+'"</title><base target="_blank"></head><body>'); nD.writeln('Links on <a href="'+attrQuoteEscape(location.href)+'">'+htmlEscape(location.href)+'</a><br> with link text or target url containing &quot;' + htmlEscape(x) + '&quot;<br><hr>'); z = document.links; for (i = 0; i < z.length; ++i) { if ((z[i].innerHTML && z[i].innerHTML.toLowerCase().indexOf(x) != -1) || z[i].href.toLowerCase().indexOf(x) != -1 ) { nD.writeln(++n + '. <a href="' + attrQuoteEscape(z[i].href) + '">' + (z[i].innerHTML || htmlEscape(z[i].href)) + '</a><br>'); } } nD.writeln('<hr></body></html>'); nD.close(); } })();
```

show the urls for any links on the page (including image links)

```javascript
javascript:(function(){var%20i,c,x,h;%20for(i=0;x=document.links[i];++i)%20{%20h=x.href;%20x.title+=%22%20%22%20+%20x.innerHTML;%20while(c=x.firstChild)x.removeChild(c);%20x.appendChild(document.createTextNode(h));%20}%20})()
```

get rid of all presentational crap on the page

```javascript
javascript:(function(){function%20R(w){try{var%20d=w.document,j,i,t,T,N,b,r=1,C;for(j=0;t=[%22object%22,%22embed%22,%22applet%22,%22iframe%22][j];++j){T=d.getElementsByTagName(t);for(i=T.length-1;(i+1)&&(N=T[i]);--i)if(j!=3||!R((C=N.contentWindow)?C:N.contentDocument.defaultView)){b=d.createElement(%22div%22);b.style.width=N.width;%20b.style.height=N.height;b.innerHTML=%22<del>%22+(j==3?%22third-party%20%22+t:t)+%22</del>%22;N.parentNode.replaceChild(b,N);}}}catch(E){r=0}return%20r}R(self);var%20i,x;for(i=0;x=frames[i];++i)R(x)})();%20javascript:(function(){var%20newSS,%20styles='*%20{%20background:%20white%20!%20important;%20color:%20black%20!important%20}%20:link,%20:link%20*%20{%20color:%20#0000EE%20!important%20}%20:visited,%20:visited%20*%20{%20color:%20#551A8B%20!important%20}';%20if(document.createStyleSheet)%20{%20document.createStyleSheet(%22javascript:'%22+styles+%22'%22);%20}%20else%20{%20newSS=document.createElement('link');%20newSS.rel='stylesheet';%20newSS.href='data:text/css,'+escape(styles);%20document.getElementsByTagName(%22head%22)[0].appendChild(newSS);%20}%20})();%20javascript:(function(){var%20d=document;%20function%20K(N,w)%20{%20var%20nn%20=%20d.createElement(w),%20C%20=%20N.childNodes,%20i;%20for(i=C.length-1;i>=0;--i)%20nn.insertBefore(C[i],nn.childNodes[0]);%20N.parentNode.replaceChild(nn,N);%20}%20function%20Z(t,w)%20{%20var%20T%20=%20document.getElementsByTagName(t),%20j;%20for%20(j=T.length-1;j>=0;--j)%20K(T[j],w);%20}%20Z(%22blink%22,%20%22span%22);%20Z(%22marquee%22,%20%22div%22);%20})();%20javascript:(function(){var%20H=[%22mouseover%22,%22mouseout%22,%22unload%22,%22resize%22],o=window.opera;%20if(document.addEventListener/*MOZ*/&&!o)%20for(j%20in%20H)document.addEventListener(H[j],function(e){e.stopPropagation();},true);%20else%20if(window.captureEvents/*NS4*/&&!o)%20{%20document.captureEvents(-1/*ALL*/);for(j%20in%20H)window[%22on%22+H[j]]=null;}%20else/*IE*/%20{function%20R(N){var%20i,x;for(j%20in%20H)if(N[%22on%22+H[j]]/*NOT%20TEXTNODE*/)N[%22on%22+H[j]]=null;for(i=0;x=N.childNodes[i];++i)R(x);}R(document);}})();%20javascript:(function()%20{%20var%20c,%20tID,%20iID;%20tID%20=%20setTimeout(function(){},%200);%20for%20(c=1;%20c<1000%20&&%20c<=tID;%20++c)%20clearTimeout(tID%20-%20c);%20iID%20=%20setInterval(function(){},1000);%20for%20(c=0;%20c<1000%20&&%20c<=iID;%20++c)%20clearInterval(iID%20-%20c);%20})();
```

and, just for fun

```javascript
javascript:var setTitle=function(){0!=document.title.indexOf("%E0%B2%A0_%E0%B2%A0")&&(document.title="%E0%B2%A0_%E0%B2%A0 "+document.title)};window.addEventListener("load",function(){titleChange=function(){console.log("changed"),setTimeout(function(){setTitle()},20)};var e=document.getElementsByTagName("title")[0];e.addEventListener("DOMSubtreeModified",titleChange,!1),setTitle()},!1),setTitle();
```
