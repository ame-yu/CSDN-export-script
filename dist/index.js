(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,setImmediate,__dirname){
module.exports=function(e,t){"use strict";var r={};function __webpack_require__(t){if(r[t]){return r[t].exports}var i=r[t]={i:t,l:false,exports:{}};e[t].call(i.exports,i,i.exports,__webpack_require__);i.l=true;return i.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(676)}return startup()}({28:function(e,t,r){"use strict";var i=r(206);var n=r(100);function ArrayReader(e){i.call(this,e);for(var t=0;t<this.data.length;t++){e[t]=e[t]&255}}n.inherits(ArrayReader,i);ArrayReader.prototype.byteAt=function(e){return this.data[this.zero+e]};ArrayReader.prototype.lastIndexOfSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),i=e.charCodeAt(2),n=e.charCodeAt(3);for(var a=this.length-4;a>=0;--a){if(this.data[a]===t&&this.data[a+1]===r&&this.data[a+2]===i&&this.data[a+3]===n){return a-this.zero}}return-1};ArrayReader.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),i=e.charCodeAt(2),n=e.charCodeAt(3),a=this.readData(4);return t===a[0]&&r===a[1]&&i===a[2]&&n===a[3]};ArrayReader.prototype.readData=function(e){this.checkOffset(e);if(e===0){return[]}var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);this.index+=e;return t};e.exports=ArrayReader},30:function(e,t){"use strict";t.LOCAL_FILE_HEADER="PK";t.CENTRAL_FILE_HEADER="PK";t.CENTRAL_DIRECTORY_END="PK";t.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK";t.ZIP64_CENTRAL_DIRECTORY_END="PK";t.DATA_DESCRIPTOR="PK\b"},38:function(e,t,r){"use strict";var i=r(100);var n=r(438);var a=r(628);var i=r(100);var s=r(276);var o=r(774);var f=r(499);function checkEntryCRC32(e){return new n.Promise(function(t,r){var i=e.decompressed.getContentWorker().pipe(new o);i.on("error",function(e){r(e)}).on("end",function(){if(i.streamInfo.crc32!==e.decompressed.crc32){r(new Error("Corrupted zip : CRC32 mismatch"))}else{t()}}).resume()})}e.exports=function(e,t){var r=this;t=i.extend(t||{},{base64:false,checkCRC32:false,optimizedBinaryString:false,createFolders:false,decodeFileName:a.utf8decode});if(f.isNode&&f.isStream(e)){return n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."))}return i.prepareContent("the loaded zip file",e,true,t.optimizedBinaryString,t.base64).then(function(e){var r=new s(t);r.load(e);return r}).then(function checkCRC32(e){var r=[n.Promise.resolve(e)];var i=e.files;if(t.checkCRC32){for(var a=0;a<i.length;a++){r.push(checkEntryCRC32(i[a]))}}return n.Promise.all(r)}).then(function addFiles(e){var i=e.shift();var n=i.files;for(var a=0;a<n.length;a++){var s=n[a];r.file(s.fileNameStr,s.decompressed,{binary:true,optimizedBinaryString:true,date:s.date,dir:s.dir,comment:s.fileCommentStr.length?s.fileCommentStr:null,unixPermissions:s.unixPermissions,dosPermissions:s.dosPermissions,createFolders:t.createFolders})}if(i.zipComment.length){r.comment=i.zipComment}return r})}},43:function(e,t,r){"use strict";var i=r(999);var n=4;var a=0;var s=1;var o=2;function zero(e){var t=e.length;while(--t>=0){e[t]=0}}var f=0;var l=1;var u=2;var h=3;var d=258;var c=29;var p=256;var v=p+1+c;var _=30;var b=19;var m=2*v+1;var g=15;var w=16;var y=7;var k=256;var S=16;var x=17;var E=18;var C=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];var R=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];var T=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];var A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];var B=512;var z=new Array((v+2)*2);zero(z);var I=new Array(_*2);zero(I);var O=new Array(B);zero(O);var D=new Array(d-h+1);zero(D);var N=new Array(c);zero(N);var L=new Array(_);zero(L);function StaticTreeDesc(e,t,r,i,n){this.static_tree=e;this.extra_bits=t;this.extra_base=r;this.elems=i;this.max_length=n;this.has_stree=e&&e.length}var F;var W;var P;function TreeDesc(e,t){this.dyn_tree=e;this.max_code=0;this.stat_desc=t}function d_code(e){return e<256?O[e]:O[256+(e>>>7)]}function put_short(e,t){e.pending_buf[e.pending++]=t&255;e.pending_buf[e.pending++]=t>>>8&255}function send_bits(e,t,r){if(e.bi_valid>w-r){e.bi_buf|=t<<e.bi_valid&65535;put_short(e,e.bi_buf);e.bi_buf=t>>w-e.bi_valid;e.bi_valid+=r-w}else{e.bi_buf|=t<<e.bi_valid&65535;e.bi_valid+=r}}function send_code(e,t,r){send_bits(e,r[t*2],r[t*2+1])}function bi_reverse(e,t){var r=0;do{r|=e&1;e>>>=1;r<<=1}while(--t>0);return r>>>1}function bi_flush(e){if(e.bi_valid===16){put_short(e,e.bi_buf);e.bi_buf=0;e.bi_valid=0}else if(e.bi_valid>=8){e.pending_buf[e.pending++]=e.bi_buf&255;e.bi_buf>>=8;e.bi_valid-=8}}function gen_bitlen(e,t){var r=t.dyn_tree;var i=t.max_code;var n=t.stat_desc.static_tree;var a=t.stat_desc.has_stree;var s=t.stat_desc.extra_bits;var o=t.stat_desc.extra_base;var f=t.stat_desc.max_length;var l;var u,h;var d;var c;var p;var v=0;for(d=0;d<=g;d++){e.bl_count[d]=0}r[e.heap[e.heap_max]*2+1]=0;for(l=e.heap_max+1;l<m;l++){u=e.heap[l];d=r[r[u*2+1]*2+1]+1;if(d>f){d=f;v++}r[u*2+1]=d;if(u>i){continue}e.bl_count[d]++;c=0;if(u>=o){c=s[u-o]}p=r[u*2];e.opt_len+=p*(d+c);if(a){e.static_len+=p*(n[u*2+1]+c)}}if(v===0){return}do{d=f-1;while(e.bl_count[d]===0){d--}e.bl_count[d]--;e.bl_count[d+1]+=2;e.bl_count[f]--;v-=2}while(v>0);for(d=f;d!==0;d--){u=e.bl_count[d];while(u!==0){h=e.heap[--l];if(h>i){continue}if(r[h*2+1]!==d){e.opt_len+=(d-r[h*2+1])*r[h*2];r[h*2+1]=d}u--}}}function gen_codes(e,t,r){var i=new Array(g+1);var n=0;var a;var s;for(a=1;a<=g;a++){i[a]=n=n+r[a-1]<<1}for(s=0;s<=t;s++){var o=e[s*2+1];if(o===0){continue}e[s*2]=bi_reverse(i[o]++,o)}}function tr_static_init(){var e;var t;var r;var i;var n;var a=new Array(g+1);r=0;for(i=0;i<c-1;i++){N[i]=r;for(e=0;e<1<<C[i];e++){D[r++]=i}}D[r-1]=i;n=0;for(i=0;i<16;i++){L[i]=n;for(e=0;e<1<<R[i];e++){O[n++]=i}}n>>=7;for(;i<_;i++){L[i]=n<<7;for(e=0;e<1<<R[i]-7;e++){O[256+n++]=i}}for(t=0;t<=g;t++){a[t]=0}e=0;while(e<=143){z[e*2+1]=8;e++;a[8]++}while(e<=255){z[e*2+1]=9;e++;a[9]++}while(e<=279){z[e*2+1]=7;e++;a[7]++}while(e<=287){z[e*2+1]=8;e++;a[8]++}gen_codes(z,v+1,a);for(e=0;e<_;e++){I[e*2+1]=5;I[e*2]=bi_reverse(e,5)}F=new StaticTreeDesc(z,C,p+1,v,g);W=new StaticTreeDesc(I,R,0,_,g);P=new StaticTreeDesc(new Array(0),T,0,b,y)}function init_block(e){var t;for(t=0;t<v;t++){e.dyn_ltree[t*2]=0}for(t=0;t<_;t++){e.dyn_dtree[t*2]=0}for(t=0;t<b;t++){e.bl_tree[t*2]=0}e.dyn_ltree[k*2]=1;e.opt_len=e.static_len=0;e.last_lit=e.matches=0}function bi_windup(e){if(e.bi_valid>8){put_short(e,e.bi_buf)}else if(e.bi_valid>0){e.pending_buf[e.pending++]=e.bi_buf}e.bi_buf=0;e.bi_valid=0}function copy_block(e,t,r,n){bi_windup(e);if(n){put_short(e,r);put_short(e,~r)}i.arraySet(e.pending_buf,e.window,t,r,e.pending);e.pending+=r}function smaller(e,t,r,i){var n=t*2;var a=r*2;return e[n]<e[a]||e[n]===e[a]&&i[t]<=i[r]}function pqdownheap(e,t,r){var i=e.heap[r];var n=r<<1;while(n<=e.heap_len){if(n<e.heap_len&&smaller(t,e.heap[n+1],e.heap[n],e.depth)){n++}if(smaller(t,i,e.heap[n],e.depth)){break}e.heap[r]=e.heap[n];r=n;n<<=1}e.heap[r]=i}function compress_block(e,t,r){var i;var n;var a=0;var s;var o;if(e.last_lit!==0){do{i=e.pending_buf[e.d_buf+a*2]<<8|e.pending_buf[e.d_buf+a*2+1];n=e.pending_buf[e.l_buf+a];a++;if(i===0){send_code(e,n,t)}else{s=D[n];send_code(e,s+p+1,t);o=C[s];if(o!==0){n-=N[s];send_bits(e,n,o)}i--;s=d_code(i);send_code(e,s,r);o=R[s];if(o!==0){i-=L[s];send_bits(e,i,o)}}}while(a<e.last_lit)}send_code(e,k,t)}function build_tree(e,t){var r=t.dyn_tree;var i=t.stat_desc.static_tree;var n=t.stat_desc.has_stree;var a=t.stat_desc.elems;var s,o;var f=-1;var l;e.heap_len=0;e.heap_max=m;for(s=0;s<a;s++){if(r[s*2]!==0){e.heap[++e.heap_len]=f=s;e.depth[s]=0}else{r[s*2+1]=0}}while(e.heap_len<2){l=e.heap[++e.heap_len]=f<2?++f:0;r[l*2]=1;e.depth[l]=0;e.opt_len--;if(n){e.static_len-=i[l*2+1]}}t.max_code=f;for(s=e.heap_len>>1;s>=1;s--){pqdownheap(e,r,s)}l=a;do{s=e.heap[1];e.heap[1]=e.heap[e.heap_len--];pqdownheap(e,r,1);o=e.heap[1];e.heap[--e.heap_max]=s;e.heap[--e.heap_max]=o;r[l*2]=r[s*2]+r[o*2];e.depth[l]=(e.depth[s]>=e.depth[o]?e.depth[s]:e.depth[o])+1;r[s*2+1]=r[o*2+1]=l;e.heap[1]=l++;pqdownheap(e,r,1)}while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1];gen_bitlen(e,t);gen_codes(r,f,e.bl_count)}function scan_tree(e,t,r){var i;var n=-1;var a;var s=t[0*2+1];var o=0;var f=7;var l=4;if(s===0){f=138;l=3}t[(r+1)*2+1]=65535;for(i=0;i<=r;i++){a=s;s=t[(i+1)*2+1];if(++o<f&&a===s){continue}else if(o<l){e.bl_tree[a*2]+=o}else if(a!==0){if(a!==n){e.bl_tree[a*2]++}e.bl_tree[S*2]++}else if(o<=10){e.bl_tree[x*2]++}else{e.bl_tree[E*2]++}o=0;n=a;if(s===0){f=138;l=3}else if(a===s){f=6;l=3}else{f=7;l=4}}}function send_tree(e,t,r){var i;var n=-1;var a;var s=t[0*2+1];var o=0;var f=7;var l=4;if(s===0){f=138;l=3}for(i=0;i<=r;i++){a=s;s=t[(i+1)*2+1];if(++o<f&&a===s){continue}else if(o<l){do{send_code(e,a,e.bl_tree)}while(--o!==0)}else if(a!==0){if(a!==n){send_code(e,a,e.bl_tree);o--}send_code(e,S,e.bl_tree);send_bits(e,o-3,2)}else if(o<=10){send_code(e,x,e.bl_tree);send_bits(e,o-3,3)}else{send_code(e,E,e.bl_tree);send_bits(e,o-11,7)}o=0;n=a;if(s===0){f=138;l=3}else if(a===s){f=6;l=3}else{f=7;l=4}}}function build_bl_tree(e){var t;scan_tree(e,e.dyn_ltree,e.l_desc.max_code);scan_tree(e,e.dyn_dtree,e.d_desc.max_code);build_tree(e,e.bl_desc);for(t=b-1;t>=3;t--){if(e.bl_tree[A[t]*2+1]!==0){break}}e.opt_len+=3*(t+1)+5+5+4;return t}function send_all_trees(e,t,r,i){var n;send_bits(e,t-257,5);send_bits(e,r-1,5);send_bits(e,i-4,4);for(n=0;n<i;n++){send_bits(e,e.bl_tree[A[n]*2+1],3)}send_tree(e,e.dyn_ltree,t-1);send_tree(e,e.dyn_dtree,r-1)}function detect_data_type(e){var t=4093624447;var r;for(r=0;r<=31;r++,t>>>=1){if(t&1&&e.dyn_ltree[r*2]!==0){return a}}if(e.dyn_ltree[9*2]!==0||e.dyn_ltree[10*2]!==0||e.dyn_ltree[13*2]!==0){return s}for(r=32;r<p;r++){if(e.dyn_ltree[r*2]!==0){return s}}return a}var j=false;function _tr_init(e){if(!j){tr_static_init();j=true}e.l_desc=new TreeDesc(e.dyn_ltree,F);e.d_desc=new TreeDesc(e.dyn_dtree,W);e.bl_desc=new TreeDesc(e.bl_tree,P);e.bi_buf=0;e.bi_valid=0;init_block(e)}function _tr_stored_block(e,t,r,i){send_bits(e,(f<<1)+(i?1:0),3);copy_block(e,t,r,true)}function _tr_align(e){send_bits(e,l<<1,3);send_code(e,k,z);bi_flush(e)}function _tr_flush_block(e,t,r,i){var a,s;var f=0;if(e.level>0){if(e.strm.data_type===o){e.strm.data_type=detect_data_type(e)}build_tree(e,e.l_desc);build_tree(e,e.d_desc);f=build_bl_tree(e);a=e.opt_len+3+7>>>3;s=e.static_len+3+7>>>3;if(s<=a){a=s}}else{a=s=r+5}if(r+4<=a&&t!==-1){_tr_stored_block(e,t,r,i)}else if(e.strategy===n||s===a){send_bits(e,(l<<1)+(i?1:0),3);compress_block(e,z,I)}else{send_bits(e,(u<<1)+(i?1:0),3);send_all_trees(e,e.l_desc.max_code+1,e.d_desc.max_code+1,f+1);compress_block(e,e.dyn_ltree,e.dyn_dtree)}init_block(e);if(i){bi_windup(e)}}function _tr_tally(e,t,r){e.pending_buf[e.d_buf+e.last_lit*2]=t>>>8&255;e.pending_buf[e.d_buf+e.last_lit*2+1]=t&255;e.pending_buf[e.l_buf+e.last_lit]=r&255;e.last_lit++;if(t===0){e.dyn_ltree[r*2]++}else{e.matches++;t--;e.dyn_ltree[(D[r]+p+1)*2]++;e.dyn_dtree[d_code(t)*2]++}return e.last_lit===e.lit_bufsize-1}t._tr_init=_tr_init;t._tr_stored_block=_tr_stored_block;t._tr_flush_block=_tr_flush_block;t._tr_tally=_tr_tally;t._tr_align=_tr_align},68:function(e,t,r){"use strict";var i=r(100);var n=r(967);var a=16*1024;function DataWorker(e){n.call(this,"DataWorker");var t=this;this.dataIsReady=false;this.index=0;this.max=0;this.data=null;this.type="";this._tickScheduled=false;e.then(function(e){t.dataIsReady=true;t.data=e;t.max=e&&e.length||0;t.type=i.getTypeOf(e);if(!t.isPaused){t._tickAndRepeat()}},function(e){t.error(e)})}i.inherits(DataWorker,n);DataWorker.prototype.cleanUp=function(){n.prototype.cleanUp.call(this);this.data=null};DataWorker.prototype.resume=function(){if(!n.prototype.resume.call(this)){return false}if(!this._tickScheduled&&this.dataIsReady){this._tickScheduled=true;i.delay(this._tickAndRepeat,[],this)}return true};DataWorker.prototype._tickAndRepeat=function(){this._tickScheduled=false;if(this.isPaused||this.isFinished){return}this._tick();if(!this.isFinished){i.delay(this._tickAndRepeat,[],this);this._tickScheduled=true}};DataWorker.prototype._tick=function(){if(this.isPaused||this.isFinished){return false}var e=a;var t=null,r=Math.min(this.max,this.index+e);if(this.index>=this.max){return this.end()}else{switch(this.type){case"string":t=this.data.substring(this.index,r);break;case"uint8array":t=this.data.subarray(this.index,r);break;case"array":case"nodebuffer":t=this.data.slice(this.index,r);break}this.index=r;return this.push({data:t,meta:{percent:this.max?this.index/this.max*100:0}})}};e.exports=DataWorker},91:function(e,t,r){"use strict";var i=r(206);var n=r(100);function StringReader(e){i.call(this,e)}n.inherits(StringReader,i);StringReader.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)};StringReader.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero};StringReader.prototype.readAndCheckSignature=function(e){var t=this.readData(4);return e===t};StringReader.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);this.index+=e;return t};e.exports=StringReader},100:function(e,t,r){"use strict";var i=r(130);var n=r(686);var a=r(499);var s=r(163);var o=r(438);function string2binary(e){var t=null;if(i.uint8array){t=new Uint8Array(e.length)}else{t=new Array(e.length)}return stringToArrayLike(e,t)}t.newBlob=function(e,r){t.checkSupport("blob");try{return new Blob([e],{type:r})}catch(t){try{var i=self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder;var n=new i;n.append(e);return n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};function identity(e){return e}function stringToArrayLike(e,t){for(var r=0;r<e.length;++r){t[r]=e.charCodeAt(r)&255}return t}var f={stringifyByChunk:function(e,t,r){var i=[],n=0,a=e.length;if(a<=r){return String.fromCharCode.apply(null,e)}while(n<a){if(t==="array"||t==="nodebuffer"){i.push(String.fromCharCode.apply(null,e.slice(n,Math.min(n+r,a))))}else{i.push(String.fromCharCode.apply(null,e.subarray(n,Math.min(n+r,a))))}n+=r}return i.join("")},stringifyByChar:function(e){var t="";for(var r=0;r<e.length;r++){t+=String.fromCharCode(e[r])}return t},applyCanBeUsed:{uint8array:function(){try{return i.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch(e){return false}}(),nodebuffer:function(){try{return i.nodebuffer&&String.fromCharCode.apply(null,a.allocBuffer(1)).length===1}catch(e){return false}}()}};function arrayLikeToString(e){var r=65536,i=t.getTypeOf(e),n=true;if(i==="uint8array"){n=f.applyCanBeUsed.uint8array}else if(i==="nodebuffer"){n=f.applyCanBeUsed.nodebuffer}if(n){while(r>1){try{return f.stringifyByChunk(e,i,r)}catch(e){r=Math.floor(r/2)}}}return f.stringifyByChar(e)}t.applyFromCharCode=arrayLikeToString;function arrayLikeToArrayLike(e,t){for(var r=0;r<e.length;r++){t[r]=e[r]}return t}var l={};l["string"]={string:identity,array:function(e){return stringToArrayLike(e,new Array(e.length))},arraybuffer:function(e){return l["string"]["uint8array"](e).buffer},uint8array:function(e){return stringToArrayLike(e,new Uint8Array(e.length))},nodebuffer:function(e){return stringToArrayLike(e,a.allocBuffer(e.length))}};l["array"]={string:arrayLikeToString,array:identity,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return a.newBufferFrom(e)}};l["arraybuffer"]={string:function(e){return arrayLikeToString(new Uint8Array(e))},array:function(e){return arrayLikeToArrayLike(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:identity,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return a.newBufferFrom(new Uint8Array(e))}};l["uint8array"]={string:arrayLikeToString,array:function(e){return arrayLikeToArrayLike(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:identity,nodebuffer:function(e){return a.newBufferFrom(e)}};l["nodebuffer"]={string:arrayLikeToString,array:function(e){return arrayLikeToArrayLike(e,new Array(e.length))},arraybuffer:function(e){return l["nodebuffer"]["uint8array"](e).buffer},uint8array:function(e){return arrayLikeToArrayLike(e,new Uint8Array(e.length))},nodebuffer:identity};t.transformTo=function(e,r){if(!r){r=""}if(!e){return r}t.checkSupport(e);var i=t.getTypeOf(r);var n=l[i][e](r);return n};t.getTypeOf=function(e){if(typeof e==="string"){return"string"}if(Object.prototype.toString.call(e)==="[object Array]"){return"array"}if(i.nodebuffer&&a.isBuffer(e)){return"nodebuffer"}if(i.uint8array&&e instanceof Uint8Array){return"uint8array"}if(i.arraybuffer&&e instanceof ArrayBuffer){return"arraybuffer"}};t.checkSupport=function(e){var t=i[e.toLowerCase()];if(!t){throw new Error(e+" is not supported by this platform")}};t.MAX_VALUE_16BITS=65535;t.MAX_VALUE_32BITS=-1;t.pretty=function(e){var t="",r,i;for(i=0;i<(e||"").length;i++){r=e.charCodeAt(i);t+="\\x"+(r<16?"0":"")+r.toString(16).toUpperCase()}return t};t.delay=function(e,t,r){s(function(){e.apply(r||null,t||[])})};t.inherits=function(e,t){var r=function(){};r.prototype=t.prototype;e.prototype=new r};t.extend=function(){var e={},t,r;for(t=0;t<arguments.length;t++){for(r in arguments[t]){if(arguments[t].hasOwnProperty(r)&&typeof e[r]==="undefined"){e[r]=arguments[t][r]}}}return e};t.prepareContent=function(e,r,a,s,f){var l=o.Promise.resolve(r).then(function(e){var t=i.blob&&(e instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(e))!==-1);if(t&&typeof FileReader!=="undefined"){return new o.Promise(function(t,r){var i=new FileReader;i.onload=function(e){t(e.target.result)};i.onerror=function(e){r(e.target.error)};i.readAsArrayBuffer(e)})}else{return e}});return l.then(function(r){var i=t.getTypeOf(r);if(!i){return o.Promise.reject(new Error("Can't read the data of '"+e+"'. Is it "+"in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))}if(i==="arraybuffer"){r=t.transformTo("uint8array",r)}else if(i==="string"){if(f){r=n.decode(r)}else if(a){if(s!==true){r=string2binary(r)}}}return r})}},128:function(e,t,r){"use strict";var i=r(100);var n=r(130);var a=r(28);var s=r(91);var o=r(734);var f=r(720);e.exports=function(e){var t=i.getTypeOf(e);i.checkSupport(t);if(t==="string"&&!n.uint8array){return new s(e)}if(t==="nodebuffer"){return new o(e)}if(n.uint8array){return new f(i.transformTo("uint8array",e))}return new a(i.transformTo("array",e))}},130:function(e,t,r){"use strict";t.base64=true;t.array=true;t.string=true;t.arraybuffer=typeof ArrayBuffer!=="undefined"&&typeof Uint8Array!=="undefined";t.nodebuffer=typeof Buffer!=="undefined";t.uint8array=typeof Uint8Array!=="undefined";if(typeof ArrayBuffer==="undefined"){t.blob=false}else{var i=new ArrayBuffer(0);try{t.blob=new Blob([i],{type:"application/zip"}).size===0}catch(e){try{var n=self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder;var a=new n;a.append(i);t.blob=a.getBlob("application/zip").size===0}catch(e){t.blob=false}}}try{t.nodestream=!!r(574).Readable}catch(e){t.nodestream=false}},141:function(e){"use strict";function adler32(e,t,r,i){var n=e&65535|0,a=e>>>16&65535|0,s=0;while(r!==0){s=r>2e3?2e3:r;r-=s;do{n=n+t[i++]|0;a=a+n|0}while(--s);n%=65521;a%=65521}return n|a<<16|0}e.exports=adler32},149:function(e,t,r){var i=r(293);var n=i.Buffer;function copyProps(e,t){for(var r in e){t[r]=e[r]}}if(n.from&&n.alloc&&n.allocUnsafe&&n.allocUnsafeSlow){e.exports=i}else{copyProps(i,t);t.Buffer=SafeBuffer}function SafeBuffer(e,t,r){return n(e,t,r)}copyProps(n,SafeBuffer);SafeBuffer.from=function(e,t,r){if(typeof e==="number"){throw new TypeError("Argument must not be a number")}return n(e,t,r)};SafeBuffer.alloc=function(e,t,r){if(typeof e!=="number"){throw new TypeError("Argument must be a number")}var i=n(e);if(t!==undefined){if(typeof r==="string"){i.fill(t,r)}else{i.fill(t)}}else{i.fill(0)}return i};SafeBuffer.allocUnsafe=function(e){if(typeof e!=="number"){throw new TypeError("Argument must be a number")}return n(e)};SafeBuffer.allocUnsafeSlow=function(e){if(typeof e!=="number"){throw new TypeError("Argument must be a number")}return i.SlowBuffer(e)}},163:function(e){"use strict";e.exports=typeof setImmediate==="function"?setImmediate:function setImmediate(){var e=[].slice.apply(arguments);e.splice(1,0,0);setTimeout.apply(null,e)}},181:function(e){"use strict";var t=30;var r=12;e.exports=function inflate_fast(e,i){var n;var a;var s;var o;var f;var l;var u;var h;var d;var c;var p;var v;var _;var b;var m;var g;var w;var y;var k;var S;var x;var E;var C;var R,T;n=e.state;a=e.next_in;R=e.input;s=a+(e.avail_in-5);o=e.next_out;T=e.output;f=o-(i-e.avail_out);l=o+(e.avail_out-257);u=n.dmax;h=n.wsize;d=n.whave;c=n.wnext;p=n.window;v=n.hold;_=n.bits;b=n.lencode;m=n.distcode;g=(1<<n.lenbits)-1;w=(1<<n.distbits)-1;e:do{if(_<15){v+=R[a++]<<_;_+=8;v+=R[a++]<<_;_+=8}y=b[v&g];t:for(;;){k=y>>>24;v>>>=k;_-=k;k=y>>>16&255;if(k===0){T[o++]=y&65535}else if(k&16){S=y&65535;k&=15;if(k){if(_<k){v+=R[a++]<<_;_+=8}S+=v&(1<<k)-1;v>>>=k;_-=k}if(_<15){v+=R[a++]<<_;_+=8;v+=R[a++]<<_;_+=8}y=m[v&w];r:for(;;){k=y>>>24;v>>>=k;_-=k;k=y>>>16&255;if(k&16){x=y&65535;k&=15;if(_<k){v+=R[a++]<<_;_+=8;if(_<k){v+=R[a++]<<_;_+=8}}x+=v&(1<<k)-1;if(x>u){e.msg="invalid distance too far back";n.mode=t;break e}v>>>=k;_-=k;k=o-f;if(x>k){k=x-k;if(k>d){if(n.sane){e.msg="invalid distance too far back";n.mode=t;break e}}E=0;C=p;if(c===0){E+=h-k;if(k<S){S-=k;do{T[o++]=p[E++]}while(--k);E=o-x;C=T}}else if(c<k){E+=h+c-k;k-=c;if(k<S){S-=k;do{T[o++]=p[E++]}while(--k);E=0;if(c<S){k=c;S-=k;do{T[o++]=p[E++]}while(--k);E=o-x;C=T}}}else{E+=c-k;if(k<S){S-=k;do{T[o++]=p[E++]}while(--k);E=o-x;C=T}}while(S>2){T[o++]=C[E++];T[o++]=C[E++];T[o++]=C[E++];S-=3}if(S){T[o++]=C[E++];if(S>1){T[o++]=C[E++]}}}else{E=o-x;do{T[o++]=T[E++];T[o++]=T[E++];T[o++]=T[E++];S-=3}while(S>2);if(S){T[o++]=T[E++];if(S>1){T[o++]=T[E++]}}}}else if((k&64)===0){y=m[(y&65535)+(v&(1<<k)-1)];continue r}else{e.msg="invalid distance code";n.mode=t;break e}break}}else if((k&64)===0){y=b[(y&65535)+(v&(1<<k)-1)];continue t}else if(k&32){n.mode=r;break e}else{e.msg="invalid literal/length code";n.mode=t;break e}break}}while(a<s&&o<l);S=_>>3;a-=S;_-=S<<3;v&=(1<<_)-1;e.next_in=a;e.next_out=o;e.avail_in=a<s?5+(s-a):5-(a-s);e.avail_out=o<l?257+(l-o):257-(o-l);n.hold=v;n.bits=_;return}},186:function(e,t,r){"use strict";var i=r(438);var n=r(68);var a=r(886);var s=r(774);var a=r(886);function CompressedObject(e,t,r,i,n){this.compressedSize=e;this.uncompressedSize=t;this.crc32=r;this.compression=i;this.compressedContent=n}CompressedObject.prototype={getContentWorker:function(){var e=new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length"));var t=this;e.on("end",function(){if(this.streamInfo["data_length"]!==t.uncompressedSize){throw new Error("Bug : uncompressed data size mismatch")}});return e},getCompressedWorker:function(){return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}};CompressedObject.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)};e.exports=CompressedObject},206:function(e,t,r){"use strict";var i=r(100);function DataReader(e){this.data=e;this.length=e.length;this.index=0;this.zero=0}DataReader.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0){throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")}},setIndex:function(e){this.checkIndex(e);this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(e){},readInt:function(e){var t=0,r;this.checkOffset(e);for(r=this.index+e-1;r>=this.index;r--){t=(t<<8)+this.byteAt(r)}this.index+=e;return t},readString:function(e){return i.transformTo("string",this.readData(e))},readData:function(e){},lastIndexOfSignature:function(e){},readAndCheckSignature:function(e){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC((e>>25&127)+1980,(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(e&31)<<1))}};e.exports=DataReader},225:function(e,t,r){"use strict";var i=typeof Uint8Array!=="undefined"&&typeof Uint16Array!=="undefined"&&typeof Uint32Array!=="undefined";var n=r(246);var a=r(100);var s=r(967);var o=i?"uint8array":"array";t.magic="\b\0";function FlateWorker(e,t){s.call(this,"FlateWorker/"+e);this._pako=null;this._pakoAction=e;this._pakoOptions=t;this.meta={}}a.inherits(FlateWorker,s);FlateWorker.prototype.processChunk=function(e){this.meta=e.meta;if(this._pako===null){this._createPako()}this._pako.push(a.transformTo(o,e.data),false)};FlateWorker.prototype.flush=function(){s.prototype.flush.call(this);if(this._pako===null){this._createPako()}this._pako.push([],true)};FlateWorker.prototype.cleanUp=function(){s.prototype.cleanUp.call(this);this._pako=null};FlateWorker.prototype._createPako=function(){this._pako=new n[this._pakoAction]({raw:true,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(t){e.push({data:t,meta:e.meta})}};t.compressWorker=function(e){return new FlateWorker("Deflate",e)};t.uncompressWorker=function(){return new FlateWorker("Inflate",{})}},226:function(e,t,r){"use strict";var i=r(822);e.exports=Readable;var n=r(262);var a;Readable.ReadableState=ReadableState;var s=r(614).EventEmitter;var o=function(e,t){return e.listeners(t).length};var f=r(427);var l=r(149).Buffer;var u=global.Uint8Array||function(){};function _uint8ArrayToBuffer(e){return l.from(e)}function _isUint8Array(e){return l.isBuffer(e)||e instanceof u}var h=Object.create(r(286));h.inherits=r(689);var d=r(669);var c=void 0;if(d&&d.debuglog){c=d.debuglog("stream")}else{c=function(){}}var p=r(931);var v=r(232);var _;h.inherits(Readable,f);var b=["error","close","destroy","pause","resume"];function prependListener(e,t,r){if(typeof e.prependListener==="function")return e.prependListener(t,r);if(!e._events||!e._events[t])e.on(t,r);else if(n(e._events[t]))e._events[t].unshift(r);else e._events[t]=[r,e._events[t]]}function ReadableState(e,t){a=a||r(831);e=e||{};var i=t instanceof a;this.objectMode=!!e.objectMode;if(i)this.objectMode=this.objectMode||!!e.readableObjectMode;var n=e.highWaterMark;var s=e.readableHighWaterMark;var o=this.objectMode?16:16*1024;if(n||n===0)this.highWaterMark=n;else if(i&&(s||s===0))this.highWaterMark=s;else this.highWaterMark=o;this.highWaterMark=Math.floor(this.highWaterMark);this.buffer=new p;this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=false;this.endEmitted=false;this.reading=false;this.sync=true;this.needReadable=false;this.emittedReadable=false;this.readableListening=false;this.resumeScheduled=false;this.destroyed=false;this.defaultEncoding=e.defaultEncoding||"utf8";this.awaitDrain=0;this.readingMore=false;this.decoder=null;this.encoding=null;if(e.encoding){if(!_)_=r(674).StringDecoder;this.decoder=new _(e.encoding);this.encoding=e.encoding}}function Readable(e){a=a||r(831);if(!(this instanceof Readable))return new Readable(e);this._readableState=new ReadableState(e,this);this.readable=true;if(e){if(typeof e.read==="function")this._read=e.read;if(typeof e.destroy==="function")this._destroy=e.destroy}f.call(this)}Object.defineProperty(Readable.prototype,"destroyed",{get:function(){if(this._readableState===undefined){return false}return this._readableState.destroyed},set:function(e){if(!this._readableState){return}this._readableState.destroyed=e}});Readable.prototype.destroy=v.destroy;Readable.prototype._undestroy=v.undestroy;Readable.prototype._destroy=function(e,t){this.push(null);t(e)};Readable.prototype.push=function(e,t){var r=this._readableState;var i;if(!r.objectMode){if(typeof e==="string"){t=t||r.defaultEncoding;if(t!==r.encoding){e=l.from(e,t);t=""}i=true}}else{i=true}return readableAddChunk(this,e,t,false,i)};Readable.prototype.unshift=function(e){return readableAddChunk(this,e,null,true,false)};function readableAddChunk(e,t,r,i,n){var a=e._readableState;if(t===null){a.reading=false;onEofChunk(e,a)}else{var s;if(!n)s=chunkInvalid(a,t);if(s){e.emit("error",s)}else if(a.objectMode||t&&t.length>0){if(typeof t!=="string"&&!a.objectMode&&Object.getPrototypeOf(t)!==l.prototype){t=_uint8ArrayToBuffer(t)}if(i){if(a.endEmitted)e.emit("error",new Error("stream.unshift() after end event"));else addChunk(e,a,t,true)}else if(a.ended){e.emit("error",new Error("stream.push() after EOF"))}else{a.reading=false;if(a.decoder&&!r){t=a.decoder.write(t);if(a.objectMode||t.length!==0)addChunk(e,a,t,false);else maybeReadMore(e,a)}else{addChunk(e,a,t,false)}}}else if(!i){a.reading=false}}return needMoreData(a)}function addChunk(e,t,r,i){if(t.flowing&&t.length===0&&!t.sync){e.emit("data",r);e.read(0)}else{t.length+=t.objectMode?1:r.length;if(i)t.buffer.unshift(r);else t.buffer.push(r);if(t.needReadable)emitReadable(e)}maybeReadMore(e,t)}function chunkInvalid(e,t){var r;if(!_isUint8Array(t)&&typeof t!=="string"&&t!==undefined&&!e.objectMode){r=new TypeError("Invalid non-string/buffer chunk")}return r}function needMoreData(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||e.length===0)}Readable.prototype.isPaused=function(){return this._readableState.flowing===false};Readable.prototype.setEncoding=function(e){if(!_)_=r(674).StringDecoder;this._readableState.decoder=new _(e);this._readableState.encoding=e;return this};var m=8388608;function computeNewHighWaterMark(e){if(e>=m){e=m}else{e--;e|=e>>>1;e|=e>>>2;e|=e>>>4;e|=e>>>8;e|=e>>>16;e++}return e}function howMuchToRead(e,t){if(e<=0||t.length===0&&t.ended)return 0;if(t.objectMode)return 1;if(e!==e){if(t.flowing&&t.length)return t.buffer.head.data.length;else return t.length}if(e>t.highWaterMark)t.highWaterMark=computeNewHighWaterMark(e);if(e<=t.length)return e;if(!t.ended){t.needReadable=true;return 0}return t.length}Readable.prototype.read=function(e){c("read",e);e=parseInt(e,10);var t=this._readableState;var r=e;if(e!==0)t.emittedReadable=false;if(e===0&&t.needReadable&&(t.length>=t.highWaterMark||t.ended)){c("read: emitReadable",t.length,t.ended);if(t.length===0&&t.ended)endReadable(this);else emitReadable(this);return null}e=howMuchToRead(e,t);if(e===0&&t.ended){if(t.length===0)endReadable(this);return null}var i=t.needReadable;c("need readable",i);if(t.length===0||t.length-e<t.highWaterMark){i=true;c("length less than watermark",i)}if(t.ended||t.reading){i=false;c("reading or ended",i)}else if(i){c("do read");t.reading=true;t.sync=true;if(t.length===0)t.needReadable=true;this._read(t.highWaterMark);t.sync=false;if(!t.reading)e=howMuchToRead(r,t)}var n;if(e>0)n=fromList(e,t);else n=null;if(n===null){t.needReadable=true;e=0}else{t.length-=e}if(t.length===0){if(!t.ended)t.needReadable=true;if(r!==e&&t.ended)endReadable(this)}if(n!==null)this.emit("data",n);return n};function onEofChunk(e,t){if(t.ended)return;if(t.decoder){var r=t.decoder.end();if(r&&r.length){t.buffer.push(r);t.length+=t.objectMode?1:r.length}}t.ended=true;emitReadable(e)}function emitReadable(e){var t=e._readableState;t.needReadable=false;if(!t.emittedReadable){c("emitReadable",t.flowing);t.emittedReadable=true;if(t.sync)i.nextTick(emitReadable_,e);else emitReadable_(e)}}function emitReadable_(e){c("emit readable");e.emit("readable");flow(e)}function maybeReadMore(e,t){if(!t.readingMore){t.readingMore=true;i.nextTick(maybeReadMore_,e,t)}}function maybeReadMore_(e,t){var r=t.length;while(!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark){c("maybeReadMore read 0");e.read(0);if(r===t.length)break;else r=t.length}t.readingMore=false}Readable.prototype._read=function(e){this.emit("error",new Error("_read() is not implemented"))};Readable.prototype.pipe=function(e,t){var r=this;var n=this._readableState;switch(n.pipesCount){case 0:n.pipes=e;break;case 1:n.pipes=[n.pipes,e];break;default:n.pipes.push(e);break}n.pipesCount+=1;c("pipe count=%d opts=%j",n.pipesCount,t);var a=(!t||t.end!==false)&&e!==process.stdout&&e!==process.stderr;var s=a?onend:unpipe;if(n.endEmitted)i.nextTick(s);else r.once("end",s);e.on("unpipe",onunpipe);function onunpipe(e,t){c("onunpipe");if(e===r){if(t&&t.hasUnpiped===false){t.hasUnpiped=true;cleanup()}}}function onend(){c("onend");e.end()}var f=pipeOnDrain(r);e.on("drain",f);var l=false;function cleanup(){c("cleanup");e.removeListener("close",onclose);e.removeListener("finish",onfinish);e.removeListener("drain",f);e.removeListener("error",onerror);e.removeListener("unpipe",onunpipe);r.removeListener("end",onend);r.removeListener("end",unpipe);r.removeListener("data",ondata);l=true;if(n.awaitDrain&&(!e._writableState||e._writableState.needDrain))f()}var u=false;r.on("data",ondata);function ondata(t){c("ondata");u=false;var i=e.write(t);if(false===i&&!u){if((n.pipesCount===1&&n.pipes===e||n.pipesCount>1&&indexOf(n.pipes,e)!==-1)&&!l){c("false write response, pause",r._readableState.awaitDrain);r._readableState.awaitDrain++;u=true}r.pause()}}function onerror(t){c("onerror",t);unpipe();e.removeListener("error",onerror);if(o(e,"error")===0)e.emit("error",t)}prependListener(e,"error",onerror);function onclose(){e.removeListener("finish",onfinish);unpipe()}e.once("close",onclose);function onfinish(){c("onfinish");e.removeListener("close",onclose);unpipe()}e.once("finish",onfinish);function unpipe(){c("unpipe");r.unpipe(e)}e.emit("pipe",r);if(!n.flowing){c("pipe resume");r.resume()}return e};function pipeOnDrain(e){return function(){var t=e._readableState;c("pipeOnDrain",t.awaitDrain);if(t.awaitDrain)t.awaitDrain--;if(t.awaitDrain===0&&o(e,"data")){t.flowing=true;flow(e)}}}Readable.prototype.unpipe=function(e){var t=this._readableState;var r={hasUnpiped:false};if(t.pipesCount===0)return this;if(t.pipesCount===1){if(e&&e!==t.pipes)return this;if(!e)e=t.pipes;t.pipes=null;t.pipesCount=0;t.flowing=false;if(e)e.emit("unpipe",this,r);return this}if(!e){var i=t.pipes;var n=t.pipesCount;t.pipes=null;t.pipesCount=0;t.flowing=false;for(var a=0;a<n;a++){i[a].emit("unpipe",this,r)}return this}var s=indexOf(t.pipes,e);if(s===-1)return this;t.pipes.splice(s,1);t.pipesCount-=1;if(t.pipesCount===1)t.pipes=t.pipes[0];e.emit("unpipe",this,r);return this};Readable.prototype.on=function(e,t){var r=f.prototype.on.call(this,e,t);if(e==="data"){if(this._readableState.flowing!==false)this.resume()}else if(e==="readable"){var n=this._readableState;if(!n.endEmitted&&!n.readableListening){n.readableListening=n.needReadable=true;n.emittedReadable=false;if(!n.reading){i.nextTick(nReadingNextTick,this)}else if(n.length){emitReadable(this)}}}return r};Readable.prototype.addListener=Readable.prototype.on;function nReadingNextTick(e){c("readable nexttick read 0");e.read(0)}Readable.prototype.resume=function(){var e=this._readableState;if(!e.flowing){c("resume");e.flowing=true;resume(this,e)}return this};function resume(e,t){if(!t.resumeScheduled){t.resumeScheduled=true;i.nextTick(resume_,e,t)}}function resume_(e,t){if(!t.reading){c("resume read 0");e.read(0)}t.resumeScheduled=false;t.awaitDrain=0;e.emit("resume");flow(e);if(t.flowing&&!t.reading)e.read(0)}Readable.prototype.pause=function(){c("call pause flowing=%j",this._readableState.flowing);if(false!==this._readableState.flowing){c("pause");this._readableState.flowing=false;this.emit("pause")}return this};function flow(e){var t=e._readableState;c("flow",t.flowing);while(t.flowing&&e.read()!==null){}}Readable.prototype.wrap=function(e){var t=this;var r=this._readableState;var i=false;e.on("end",function(){c("wrapped end");if(r.decoder&&!r.ended){var e=r.decoder.end();if(e&&e.length)t.push(e)}t.push(null)});e.on("data",function(n){c("wrapped data");if(r.decoder)n=r.decoder.write(n);if(r.objectMode&&(n===null||n===undefined))return;else if(!r.objectMode&&(!n||!n.length))return;var a=t.push(n);if(!a){i=true;e.pause()}});for(var n in e){if(this[n]===undefined&&typeof e[n]==="function"){this[n]=function(t){return function(){return e[t].apply(e,arguments)}}(n)}}for(var a=0;a<b.length;a++){e.on(b[a],this.emit.bind(this,b[a]))}this._read=function(t){c("wrapped _read",t);if(i){i=false;e.resume()}};return this};Object.defineProperty(Readable.prototype,"readableHighWaterMark",{enumerable:false,get:function(){return this._readableState.highWaterMark}});Readable._fromList=fromList;function fromList(e,t){if(t.length===0)return null;var r;if(t.objectMode)r=t.buffer.shift();else if(!e||e>=t.length){if(t.decoder)r=t.buffer.join("");else if(t.buffer.length===1)r=t.buffer.head.data;else r=t.buffer.concat(t.length);t.buffer.clear()}else{r=fromListPartial(e,t.buffer,t.decoder)}return r}function fromListPartial(e,t,r){var i;if(e<t.head.data.length){i=t.head.data.slice(0,e);t.head.data=t.head.data.slice(e)}else if(e===t.head.data.length){i=t.shift()}else{i=r?copyFromBufferString(e,t):copyFromBuffer(e,t)}return i}function copyFromBufferString(e,t){var r=t.head;var i=1;var n=r.data;e-=n.length;while(r=r.next){var a=r.data;var s=e>a.length?a.length:e;if(s===a.length)n+=a;else n+=a.slice(0,e);e-=s;if(e===0){if(s===a.length){++i;if(r.next)t.head=r.next;else t.head=t.tail=null}else{t.head=r;r.data=a.slice(s)}break}++i}t.length-=i;return n}function copyFromBuffer(e,t){var r=l.allocUnsafe(e);var i=t.head;var n=1;i.data.copy(r);e-=i.data.length;while(i=i.next){var a=i.data;var s=e>a.length?a.length:e;a.copy(r,r.length-e,0,s);e-=s;if(e===0){if(s===a.length){++n;if(i.next)t.head=i.next;else t.head=t.tail=null}else{t.head=i;i.data=a.slice(s)}break}++n}t.length-=n;return r}function endReadable(e){var t=e._readableState;if(t.length>0)throw new Error('"endReadable()" called on non-empty stream');if(!t.endEmitted){t.ended=true;i.nextTick(endReadableNT,t,e)}}function endReadableNT(e,t){if(!e.endEmitted&&e.length===0){e.endEmitted=true;t.readable=false;t.emit("end")}}function indexOf(e,t){for(var r=0,i=e.length;r<i;r++){if(e[r]===t)return r}return-1}},232:function(e,t,r){"use strict";var i=r(822);function destroy(e,t){var r=this;var n=this._readableState&&this._readableState.destroyed;var a=this._writableState&&this._writableState.destroyed;if(n||a){if(t){t(e)}else if(e&&(!this._writableState||!this._writableState.errorEmitted)){i.nextTick(emitErrorNT,this,e)}return this}if(this._readableState){this._readableState.destroyed=true}if(this._writableState){this._writableState.destroyed=true}this._destroy(e||null,function(e){if(!t&&e){i.nextTick(emitErrorNT,r,e);if(r._writableState){r._writableState.errorEmitted=true}}else if(t){t(e)}});return this}function undestroy(){if(this._readableState){this._readableState.destroyed=false;this._readableState.reading=false;this._readableState.ended=false;this._readableState.endEmitted=false}if(this._writableState){this._writableState.destroyed=false;this._writableState.ended=false;this._writableState.ending=false;this._writableState.finished=false;this._writableState.errorEmitted=false}}function emitErrorNT(e,t){e.emit("error",t)}e.exports={destroy:destroy,undestroy:undestroy}},239:function(e,t,r){"use strict";var i=r(128);var n=r(100);var a=r(186);var s=r(780);var o=r(628);var f=r(828);var l=r(130);var u=0;var h=3;var d=function(e){for(var t in f){if(!f.hasOwnProperty(t)){continue}if(f[t].magic===e){return f[t]}}return null};function ZipEntry(e,t){this.options=e;this.loadOptions=t}ZipEntry.prototype={isEncrypted:function(){return(this.bitFlag&1)===1},useUTF8:function(){return(this.bitFlag&2048)===2048},readLocalPart:function(e){var t,r;e.skip(22);this.fileNameLength=e.readInt(2);r=e.readInt(2);this.fileName=e.readData(this.fileNameLength);e.skip(r);if(this.compressedSize===-1||this.uncompressedSize===-1){throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory "+"(compressedSize === -1 || uncompressedSize === -1)")}t=d(this.compressionMethod);if(t===null){throw new Error("Corrupted zip : compression "+n.pretty(this.compressionMethod)+" unknown (inner file : "+n.transformTo("string",this.fileName)+")")}this.decompressed=new a(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2);e.skip(2);this.bitFlag=e.readInt(2);this.compressionMethod=e.readString(2);this.date=e.readDate();this.crc32=e.readInt(4);this.compressedSize=e.readInt(4);this.uncompressedSize=e.readInt(4);var t=e.readInt(2);this.extraFieldsLength=e.readInt(2);this.fileCommentLength=e.readInt(2);this.diskNumberStart=e.readInt(2);this.internalFileAttributes=e.readInt(2);this.externalFileAttributes=e.readInt(4);this.localHeaderOffset=e.readInt(4);if(this.isEncrypted()){throw new Error("Encrypted zip are not supported")}e.skip(t);this.readExtraFields(e);this.parseZIP64ExtraField(e);this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null;this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=this.externalFileAttributes&16?true:false;if(e===u){this.dosPermissions=this.externalFileAttributes&63}if(e===h){this.unixPermissions=this.externalFileAttributes>>16&65535}if(!this.dir&&this.fileNameStr.slice(-1)==="/"){this.dir=true}},parseZIP64ExtraField:function(e){if(!this.extraFields[1]){return}var t=i(this.extraFields[1].value);if(this.uncompressedSize===n.MAX_VALUE_32BITS){this.uncompressedSize=t.readInt(8)}if(this.compressedSize===n.MAX_VALUE_32BITS){this.compressedSize=t.readInt(8)}if(this.localHeaderOffset===n.MAX_VALUE_32BITS){this.localHeaderOffset=t.readInt(8)}if(this.diskNumberStart===n.MAX_VALUE_32BITS){this.diskNumberStart=t.readInt(4)}},readExtraFields:function(e){var t=e.index+this.extraFieldsLength,r,i,n;if(!this.extraFields){this.extraFields={}}while(e.index<t){r=e.readInt(2);i=e.readInt(2);n=e.readData(i);this.extraFields[r]={id:r,length:i,value:n}}},handleUTF8:function(){var e=l.uint8array?"uint8array":"array";if(this.useUTF8()){this.fileNameStr=o.utf8decode(this.fileName);this.fileCommentStr=o.utf8decode(this.fileComment)}else{var t=this.findExtraFieldUnicodePath();if(t!==null){this.fileNameStr=t}else{var r=n.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var i=this.findExtraFieldUnicodeComment();if(i!==null){this.fileCommentStr=i}else{var a=n.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(a)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=i(e.value);if(t.readInt(1)!==1){return null}if(s(this.fileName)!==t.readInt(4)){return null}return o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=i(e.value);if(t.readInt(1)!==1){return null}if(s(this.fileComment)!==t.readInt(4)){return null}return o.utf8decode(t.readData(e.length-5))}return null}};e.exports=ZipEntry},241:function(e,t,r){"use strict";var i=r(822);e.exports=Writable;function WriteReq(e,t,r){this.chunk=e;this.encoding=t;this.callback=r;this.next=null}function CorkedRequest(e){var t=this;this.next=null;this.entry=null;this.finish=function(){onCorkedFinish(t,e)}}var n=!process.browser&&["v0.10","v0.9."].indexOf(process.version.slice(0,5))>-1?setImmediate:i.nextTick;var a;Writable.WritableState=WritableState;var s=Object.create(r(286));s.inherits=r(689);var o={deprecate:r(917)};var f=r(427);var l=r(149).Buffer;var u=global.Uint8Array||function(){};function _uint8ArrayToBuffer(e){return l.from(e)}function _isUint8Array(e){return l.isBuffer(e)||e instanceof u}var h=r(232);s.inherits(Writable,f);function nop(){}function WritableState(e,t){a=a||r(831);e=e||{};var i=t instanceof a;this.objectMode=!!e.objectMode;if(i)this.objectMode=this.objectMode||!!e.writableObjectMode;var n=e.highWaterMark;var s=e.writableHighWaterMark;var o=this.objectMode?16:16*1024;if(n||n===0)this.highWaterMark=n;else if(i&&(s||s===0))this.highWaterMark=s;else this.highWaterMark=o;this.highWaterMark=Math.floor(this.highWaterMark);this.finalCalled=false;this.needDrain=false;this.ending=false;this.ended=false;this.finished=false;this.destroyed=false;var f=e.decodeStrings===false;this.decodeStrings=!f;this.defaultEncoding=e.defaultEncoding||"utf8";this.length=0;this.writing=false;this.corked=0;this.sync=true;this.bufferProcessing=false;this.onwrite=function(e){onwrite(t,e)};this.writecb=null;this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;this.pendingcb=0;this.prefinished=false;this.errorEmitted=false;this.bufferedRequestCount=0;this.corkedRequestsFree=new CorkedRequest(this)}WritableState.prototype.getBuffer=function getBuffer(){var e=this.bufferedRequest;var t=[];while(e){t.push(e);e=e.next}return t};(function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:o.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer "+"instead.","DEP0003")})}catch(e){}})();var d;if(typeof Symbol==="function"&&Symbol.hasInstance&&typeof Function.prototype[Symbol.hasInstance]==="function"){d=Function.prototype[Symbol.hasInstance];Object.defineProperty(Writable,Symbol.hasInstance,{value:function(e){if(d.call(this,e))return true;if(this!==Writable)return false;return e&&e._writableState instanceof WritableState}})}else{d=function(e){return e instanceof this}}function Writable(e){a=a||r(831);if(!d.call(Writable,this)&&!(this instanceof a)){return new Writable(e)}this._writableState=new WritableState(e,this);this.writable=true;if(e){if(typeof e.write==="function")this._write=e.write;if(typeof e.writev==="function")this._writev=e.writev;if(typeof e.destroy==="function")this._destroy=e.destroy;if(typeof e.final==="function")this._final=e.final}f.call(this)}Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))};function writeAfterEnd(e,t){var r=new Error("write after end");e.emit("error",r);i.nextTick(t,r)}function validChunk(e,t,r,n){var a=true;var s=false;if(r===null){s=new TypeError("May not write null values to stream")}else if(typeof r!=="string"&&r!==undefined&&!t.objectMode){s=new TypeError("Invalid non-string/buffer chunk")}if(s){e.emit("error",s);i.nextTick(n,s);a=false}return a}Writable.prototype.write=function(e,t,r){var i=this._writableState;var n=false;var a=!i.objectMode&&_isUint8Array(e);if(a&&!l.isBuffer(e)){e=_uint8ArrayToBuffer(e)}if(typeof t==="function"){r=t;t=null}if(a)t="buffer";else if(!t)t=i.defaultEncoding;if(typeof r!=="function")r=nop;if(i.ended)writeAfterEnd(this,r);else if(a||validChunk(this,i,e,r)){i.pendingcb++;n=writeOrBuffer(this,i,a,e,t,r)}return n};Writable.prototype.cork=function(){var e=this._writableState;e.corked++};Writable.prototype.uncork=function(){var e=this._writableState;if(e.corked){e.corked--;if(!e.writing&&!e.corked&&!e.finished&&!e.bufferProcessing&&e.bufferedRequest)clearBuffer(this,e)}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(e){if(typeof e==="string")e=e.toLowerCase();if(!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);this._writableState.defaultEncoding=e;return this};function decodeChunk(e,t,r){if(!e.objectMode&&e.decodeStrings!==false&&typeof t==="string"){t=l.from(t,r)}return t}Object.defineProperty(Writable.prototype,"writableHighWaterMark",{enumerable:false,get:function(){return this._writableState.highWaterMark}});function writeOrBuffer(e,t,r,i,n,a){if(!r){var s=decodeChunk(t,i,n);if(i!==s){r=true;n="buffer";i=s}}var o=t.objectMode?1:i.length;t.length+=o;var f=t.length<t.highWaterMark;if(!f)t.needDrain=true;if(t.writing||t.corked){var l=t.lastBufferedRequest;t.lastBufferedRequest={chunk:i,encoding:n,isBuf:r,callback:a,next:null};if(l){l.next=t.lastBufferedRequest}else{t.bufferedRequest=t.lastBufferedRequest}t.bufferedRequestCount+=1}else{doWrite(e,t,false,o,i,n,a)}return f}function doWrite(e,t,r,i,n,a,s){t.writelen=i;t.writecb=s;t.writing=true;t.sync=true;if(r)e._writev(n,t.onwrite);else e._write(n,a,t.onwrite);t.sync=false}function onwriteError(e,t,r,n,a){--t.pendingcb;if(r){i.nextTick(a,n);i.nextTick(finishMaybe,e,t);e._writableState.errorEmitted=true;e.emit("error",n)}else{a(n);e._writableState.errorEmitted=true;e.emit("error",n);finishMaybe(e,t)}}function onwriteStateUpdate(e){e.writing=false;e.writecb=null;e.length-=e.writelen;e.writelen=0}function onwrite(e,t){var r=e._writableState;var i=r.sync;var a=r.writecb;onwriteStateUpdate(r);if(t)onwriteError(e,r,i,t,a);else{var s=needFinish(r);if(!s&&!r.corked&&!r.bufferProcessing&&r.bufferedRequest){clearBuffer(e,r)}if(i){n(afterWrite,e,r,s,a)}else{afterWrite(e,r,s,a)}}}function afterWrite(e,t,r,i){if(!r)onwriteDrain(e,t);t.pendingcb--;i();finishMaybe(e,t)}function onwriteDrain(e,t){if(t.length===0&&t.needDrain){t.needDrain=false;e.emit("drain")}}function clearBuffer(e,t){t.bufferProcessing=true;var r=t.bufferedRequest;if(e._writev&&r&&r.next){var i=t.bufferedRequestCount;var n=new Array(i);var a=t.corkedRequestsFree;a.entry=r;var s=0;var o=true;while(r){n[s]=r;if(!r.isBuf)o=false;r=r.next;s+=1}n.allBuffers=o;doWrite(e,t,true,t.length,n,"",a.finish);t.pendingcb++;t.lastBufferedRequest=null;if(a.next){t.corkedRequestsFree=a.next;a.next=null}else{t.corkedRequestsFree=new CorkedRequest(t)}t.bufferedRequestCount=0}else{while(r){var f=r.chunk;var l=r.encoding;var u=r.callback;var h=t.objectMode?1:f.length;doWrite(e,t,false,h,f,l,u);r=r.next;t.bufferedRequestCount--;if(t.writing){break}}if(r===null)t.lastBufferedRequest=null}t.bufferedRequest=r;t.bufferProcessing=false}Writable.prototype._write=function(e,t,r){r(new Error("_write() is not implemented"))};Writable.prototype._writev=null;Writable.prototype.end=function(e,t,r){var i=this._writableState;if(typeof e==="function"){r=e;e=null;t=null}else if(typeof t==="function"){r=t;t=null}if(e!==null&&e!==undefined)this.write(e,t);if(i.corked){i.corked=1;this.uncork()}if(!i.ending&&!i.finished)endWritable(this,i,r)};function needFinish(e){return e.ending&&e.length===0&&e.bufferedRequest===null&&!e.finished&&!e.writing}function callFinal(e,t){e._final(function(r){t.pendingcb--;if(r){e.emit("error",r)}t.prefinished=true;e.emit("prefinish");finishMaybe(e,t)})}function prefinish(e,t){if(!t.prefinished&&!t.finalCalled){if(typeof e._final==="function"){t.pendingcb++;t.finalCalled=true;i.nextTick(callFinal,e,t)}else{t.prefinished=true;e.emit("prefinish")}}}function finishMaybe(e,t){var r=needFinish(t);if(r){prefinish(e,t);if(t.pendingcb===0){t.finished=true;e.emit("finish")}}return r}function endWritable(e,t,r){t.ending=true;finishMaybe(e,t);if(r){if(t.finished)i.nextTick(r);else e.once("finish",r)}t.ended=true;e.writable=false}function onCorkedFinish(e,t,r){var i=e.entry;e.entry=null;while(i){var n=i.callback;t.pendingcb--;n(r);i=i.next}if(t.corkedRequestsFree){t.corkedRequestsFree.next=e}else{t.corkedRequestsFree=e}}Object.defineProperty(Writable.prototype,"destroyed",{get:function(){if(this._writableState===undefined){return false}return this._writableState.destroyed},set:function(e){if(!this._writableState){return}this._writableState.destroyed=e}});Writable.prototype.destroy=h.destroy;Writable.prototype._undestroy=h.undestroy;Writable.prototype._destroy=function(e,t){this.end();t(e)}},246:function(e,t,r){"use strict";var i=r(999).assign;var n=r(259);var a=r(832);var s=r(691);var o={};i(o,n,a,s);e.exports=o},259:function(e,t,r){"use strict";var i=r(378);var n=r(999);var a=r(279);var s=r(868);var o=r(991);var f=Object.prototype.toString;var l=0;var u=4;var h=0;var d=1;var c=2;var p=-1;var v=0;var _=8;function Deflate(e){if(!(this instanceof Deflate))return new Deflate(e);this.options=n.assign({level:p,method:_,chunkSize:16384,windowBits:15,memLevel:8,strategy:v,to:""},e||{});var t=this.options;if(t.raw&&t.windowBits>0){t.windowBits=-t.windowBits}else if(t.gzip&&t.windowBits>0&&t.windowBits<16){t.windowBits+=16}this.err=0;this.msg="";this.ended=false;this.chunks=[];this.strm=new o;this.strm.avail_out=0;var r=i.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==h){throw new Error(s[r])}if(t.header){i.deflateSetHeader(this.strm,t.header)}if(t.dictionary){var l;if(typeof t.dictionary==="string"){l=a.string2buf(t.dictionary)}else if(f.call(t.dictionary)==="[object ArrayBuffer]"){l=new Uint8Array(t.dictionary)}else{l=t.dictionary}r=i.deflateSetDictionary(this.strm,l);if(r!==h){throw new Error(s[r])}this._dict_set=true}}Deflate.prototype.push=function(e,t){var r=this.strm;var s=this.options.chunkSize;var o,p;if(this.ended){return false}p=t===~~t?t:t===true?u:l;if(typeof e==="string"){r.input=a.string2buf(e)}else if(f.call(e)==="[object ArrayBuffer]"){r.input=new Uint8Array(e)}else{r.input=e}r.next_in=0;r.avail_in=r.input.length;do{if(r.avail_out===0){r.output=new n.Buf8(s);r.next_out=0;r.avail_out=s}o=i.deflate(r,p);if(o!==d&&o!==h){this.onEnd(o);this.ended=true;return false}if(r.avail_out===0||r.avail_in===0&&(p===u||p===c)){if(this.options.to==="string"){this.onData(a.buf2binstring(n.shrinkBuf(r.output,r.next_out)))}else{this.onData(n.shrinkBuf(r.output,r.next_out))}}}while((r.avail_in>0||r.avail_out===0)&&o!==d);if(p===u){o=i.deflateEnd(this.strm);this.onEnd(o);this.ended=true;return o===h}if(p===c){this.onEnd(h);r.avail_out=0;return true}return true};Deflate.prototype.onData=function(e){this.chunks.push(e)};Deflate.prototype.onEnd=function(e){if(e===h){if(this.options.to==="string"){this.result=this.chunks.join("")}else{this.result=n.flattenChunks(this.chunks)}}this.chunks=[];this.err=e;this.msg=this.strm.msg};function deflate(e,t){var r=new Deflate(t);r.push(e,true);if(r.err){throw r.msg||s[r.err]}return r.result}function deflateRaw(e,t){t=t||{};t.raw=true;return deflate(e,t)}function gzip(e,t){t=t||{};t.gzip=true;return deflate(e,t)}t.Deflate=Deflate;t.deflate=deflate;t.deflateRaw=deflateRaw;t.gzip=gzip},262:function(e){var t={}.toString;e.exports=Array.isArray||function(e){return t.call(e)=="[object Array]"}},276:function(e,t,r){"use strict";var i=r(128);var n=r(100);var a=r(30);var s=r(239);var o=r(628);var f=r(130);function ZipEntries(e){this.files=[];this.loadOptions=e}ZipEntries.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature "+"("+n.pretty(t)+", expected "+n.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var i=this.reader.readString(4);var n=i===t;this.reader.setIndex(r);return n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2);this.diskWithCentralDirStart=this.reader.readInt(2);this.centralDirRecordsOnThisDisk=this.reader.readInt(2);this.centralDirRecords=this.reader.readInt(2);this.centralDirSize=this.reader.readInt(4);this.centralDirOffset=this.reader.readInt(4);this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength);var t=f.uint8array?"uint8array":"array";var r=n.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8);this.reader.skip(4);this.diskNumber=this.reader.readInt(4);this.diskWithCentralDirStart=this.reader.readInt(4);this.centralDirRecordsOnThisDisk=this.reader.readInt(8);this.centralDirRecords=this.reader.readInt(8);this.centralDirSize=this.reader.readInt(8);this.centralDirOffset=this.reader.readInt(8);this.zip64ExtensibleData={};var e=this.zip64EndOfCentralSize-44,t=0,r,i,n;while(t<e){r=this.reader.readInt(2);i=this.reader.readInt(4);n=this.reader.readData(i);this.zip64ExtensibleData[r]={id:r,length:i,value:n}}},readBlockZip64EndOfCentralLocator:function(){this.diskWithZip64CentralDirStart=this.reader.readInt(4);this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8);this.disksCount=this.reader.readInt(4);if(this.disksCount>1){throw new Error("Multi-volumes zip are not supported")}},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++){t=this.files[e];this.reader.setIndex(t.localHeaderOffset);this.checkSignature(a.LOCAL_FILE_HEADER);t.readLocalPart(this.reader);t.handleUTF8();t.processAttributes()}},readCentralDir:function(){var e;this.reader.setIndex(this.centralDirOffset);while(this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER)){e=new s({zip64:this.zip64},this.loadOptions);e.readCentralPart(this.reader);this.files.push(e)}if(this.centralDirRecords!==this.files.length){if(this.centralDirRecords!==0&&this.files.length===0){throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)}else{}}},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);if(e<0){var t=!this.isSignature(0,a.LOCAL_FILE_HEADER);if(t){throw new Error("Can't find end of central directory : is this a zip file ? "+"If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html")}else{throw new Error("Corrupted zip: can't find end of central directory")}}this.reader.setIndex(e);var r=e;this.checkSignature(a.CENTRAL_DIRECTORY_END);this.readBlockEndOfCentral();if(this.diskNumber===n.MAX_VALUE_16BITS||this.diskWithCentralDirStart===n.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===n.MAX_VALUE_16BITS||this.centralDirRecords===n.MAX_VALUE_16BITS||this.centralDirSize===n.MAX_VALUE_32BITS||this.centralDirOffset===n.MAX_VALUE_32BITS){this.zip64=true;e=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR);if(e<0){throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator")}this.reader.setIndex(e);this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR);this.readBlockZip64EndOfCentralLocator();if(!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,a.ZIP64_CENTRAL_DIRECTORY_END)){this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END);if(this.relativeOffsetEndOfZip64CentralDir<0){throw new Error("Corrupted zip: can't find the ZIP64 end of central directory")}}this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END);this.readBlockZip64EndOfCentral()}var i=this.centralDirOffset+this.centralDirSize;if(this.zip64){i+=20;i+=12+this.zip64EndOfCentralSize}var s=r-i;if(s>0){if(this.isSignature(r,a.CENTRAL_FILE_HEADER)){}else{this.reader.zero=s}}else if(s<0){throw new Error("Corrupted zip: missing "+Math.abs(s)+" bytes.")}},prepareReader:function(e){this.reader=i(e)},load:function(e){this.prepareReader(e);this.readEndOfCentral();this.readCentralDir();this.readLocalFiles()}};e.exports=ZipEntries},279:function(e,t,r){"use strict";var i=r(999);var n=true;var a=true;try{String.fromCharCode.apply(null,[0])}catch(e){n=false}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){a=false}var s=new i.Buf8(256);for(var o=0;o<256;o++){s[o]=o>=252?6:o>=248?5:o>=240?4:o>=224?3:o>=192?2:1}s[254]=s[254]=1;t.string2buf=function(e){var t,r,n,a,s,o=e.length,f=0;for(a=0;a<o;a++){r=e.charCodeAt(a);if((r&64512)===55296&&a+1<o){n=e.charCodeAt(a+1);if((n&64512)===56320){r=65536+(r-55296<<10)+(n-56320);a++}}f+=r<128?1:r<2048?2:r<65536?3:4}t=new i.Buf8(f);for(s=0,a=0;s<f;a++){r=e.charCodeAt(a);if((r&64512)===55296&&a+1<o){n=e.charCodeAt(a+1);if((n&64512)===56320){r=65536+(r-55296<<10)+(n-56320);a++}}if(r<128){t[s++]=r}else if(r<2048){t[s++]=192|r>>>6;t[s++]=128|r&63}else if(r<65536){t[s++]=224|r>>>12;t[s++]=128|r>>>6&63;t[s++]=128|r&63}else{t[s++]=240|r>>>18;t[s++]=128|r>>>12&63;t[s++]=128|r>>>6&63;t[s++]=128|r&63}}return t};function buf2binstring(e,t){if(t<65534){if(e.subarray&&a||!e.subarray&&n){return String.fromCharCode.apply(null,i.shrinkBuf(e,t))}}var r="";for(var s=0;s<t;s++){r+=String.fromCharCode(e[s])}return r}t.buf2binstring=function(e){return buf2binstring(e,e.length)};t.binstring2buf=function(e){var t=new i.Buf8(e.length);for(var r=0,n=t.length;r<n;r++){t[r]=e.charCodeAt(r)}return t};t.buf2string=function(e,t){var r,i,n,a;var o=t||e.length;var f=new Array(o*2);for(i=0,r=0;r<o;){n=e[r++];if(n<128){f[i++]=n;continue}a=s[n];if(a>4){f[i++]=65533;r+=a-1;continue}n&=a===2?31:a===3?15:7;while(a>1&&r<o){n=n<<6|e[r++]&63;a--}if(a>1){f[i++]=65533;continue}if(n<65536){f[i++]=n}else{n-=65536;f[i++]=55296|n>>10&1023;f[i++]=56320|n&1023}}return buf2binstring(f,i)};t.utf8border=function(e,t){var r;t=t||e.length;if(t>e.length){t=e.length}r=t-1;while(r>=0&&(e[r]&192)===128){r--}if(r<0){return t}if(r===0){return t}return r+s[e[r]]>t?r:t}},286:function(e,t){function isArray(e){if(Array.isArray){return Array.isArray(e)}return objectToString(e)==="[object Array]"}t.isArray=isArray;function isBoolean(e){return typeof e==="boolean"}t.isBoolean=isBoolean;function isNull(e){return e===null}t.isNull=isNull;function isNullOrUndefined(e){return e==null}t.isNullOrUndefined=isNullOrUndefined;function isNumber(e){return typeof e==="number"}t.isNumber=isNumber;function isString(e){return typeof e==="string"}t.isString=isString;function isSymbol(e){return typeof e==="symbol"}t.isSymbol=isSymbol;function isUndefined(e){return e===void 0}t.isUndefined=isUndefined;function isRegExp(e){return objectToString(e)==="[object RegExp]"}t.isRegExp=isRegExp;function isObject(e){return typeof e==="object"&&e!==null}t.isObject=isObject;function isDate(e){return objectToString(e)==="[object Date]"}t.isDate=isDate;function isError(e){return objectToString(e)==="[object Error]"||e instanceof Error}t.isError=isError;function isFunction(e){return typeof e==="function"}t.isFunction=isFunction;function isPrimitive(e){return e===null||typeof e==="boolean"||typeof e==="number"||typeof e==="string"||typeof e==="symbol"||typeof e==="undefined"}t.isPrimitive=isPrimitive;t.isBuffer=Buffer.isBuffer;function objectToString(e){return Object.prototype.toString.call(e)}},292:function(e,t){"use strict";t.base64=false;t.binary=false;t.dir=false;t.createFolders=true;t.date=null;t.compression=null;t.compressionOptions=null;t.comment=null;t.unixPermissions=null;t.dosPermissions=null},293:function(e){e.exports=require("buffer")},315:function(e){if(typeof Object.create==="function"){e.exports=function inherits(e,t){if(t){e.super_=t;e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})}}}else{e.exports=function inherits(e,t){if(t){e.super_=t;var r=function(){};r.prototype=t.prototype;e.prototype=new r;e.prototype.constructor=e}}}},378:function(e,t,r){"use strict";var i=r(999);var n=r(43);var a=r(141);var s=r(613);var o=r(868);var f=0;var l=1;var u=3;var h=4;var d=5;var c=0;var p=1;var v=-2;var _=-3;var b=-5;var m=-1;var g=1;var w=2;var y=3;var k=4;var S=0;var x=2;var E=8;var C=9;var R=15;var T=8;var A=29;var B=256;var z=B+1+A;var I=30;var O=19;var D=2*z+1;var N=15;var L=3;var F=258;var W=F+L+1;var P=32;var j=42;var U=69;var M=73;var Z=91;var H=103;var q=113;var K=666;var J=1;var X=2;var Y=3;var G=4;var V=3;function err(e,t){e.msg=o[t];return t}function rank(e){return(e<<1)-(e>4?9:0)}function zero(e){var t=e.length;while(--t>=0){e[t]=0}}function flush_pending(e){var t=e.state;var r=t.pending;if(r>e.avail_out){r=e.avail_out}if(r===0){return}i.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out);e.next_out+=r;t.pending_out+=r;e.total_out+=r;e.avail_out-=r;t.pending-=r;if(t.pending===0){t.pending_out=0}}function flush_block_only(e,t){n._tr_flush_block(e,e.block_start>=0?e.block_start:-1,e.strstart-e.block_start,t);e.block_start=e.strstart;flush_pending(e.strm)}function put_byte(e,t){e.pending_buf[e.pending++]=t}function putShortMSB(e,t){e.pending_buf[e.pending++]=t>>>8&255;e.pending_buf[e.pending++]=t&255}function read_buf(e,t,r,n){var o=e.avail_in;if(o>n){o=n}if(o===0){return 0}e.avail_in-=o;i.arraySet(t,e.input,e.next_in,o,r);if(e.state.wrap===1){e.adler=a(e.adler,t,o,r)}else if(e.state.wrap===2){e.adler=s(e.adler,t,o,r)}e.next_in+=o;e.total_in+=o;return o}function longest_match(e,t){var r=e.max_chain_length;var i=e.strstart;var n;var a;var s=e.prev_length;var o=e.nice_match;var f=e.strstart>e.w_size-W?e.strstart-(e.w_size-W):0;var l=e.window;var u=e.w_mask;var h=e.prev;var d=e.strstart+F;var c=l[i+s-1];var p=l[i+s];if(e.prev_length>=e.good_match){r>>=2}if(o>e.lookahead){o=e.lookahead}do{n=t;if(l[n+s]!==p||l[n+s-1]!==c||l[n]!==l[i]||l[++n]!==l[i+1]){continue}i+=2;n++;do{}while(l[++i]===l[++n]&&l[++i]===l[++n]&&l[++i]===l[++n]&&l[++i]===l[++n]&&l[++i]===l[++n]&&l[++i]===l[++n]&&l[++i]===l[++n]&&l[++i]===l[++n]&&i<d);a=F-(d-i);i=d-F;if(a>s){e.match_start=t;s=a;if(a>=o){break}c=l[i+s-1];p=l[i+s]}}while((t=h[t&u])>f&&--r!==0);if(s<=e.lookahead){return s}return e.lookahead}function fill_window(e){var t=e.w_size;var r,n,a,s,o;do{s=e.window_size-e.lookahead-e.strstart;if(e.strstart>=t+(t-W)){i.arraySet(e.window,e.window,t,t,0);e.match_start-=t;e.strstart-=t;e.block_start-=t;n=e.hash_size;r=n;do{a=e.head[--r];e.head[r]=a>=t?a-t:0}while(--n);n=t;r=n;do{a=e.prev[--r];e.prev[r]=a>=t?a-t:0}while(--n);s+=t}if(e.strm.avail_in===0){break}n=read_buf(e.strm,e.window,e.strstart+e.lookahead,s);e.lookahead+=n;if(e.lookahead+e.insert>=L){o=e.strstart-e.insert;e.ins_h=e.window[o];e.ins_h=(e.ins_h<<e.hash_shift^e.window[o+1])&e.hash_mask;while(e.insert){e.ins_h=(e.ins_h<<e.hash_shift^e.window[o+L-1])&e.hash_mask;e.prev[o&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=o;o++;e.insert--;if(e.lookahead+e.insert<L){break}}}}while(e.lookahead<W&&e.strm.avail_in!==0)}function deflate_stored(e,t){var r=65535;if(r>e.pending_buf_size-5){r=e.pending_buf_size-5}for(;;){if(e.lookahead<=1){fill_window(e);if(e.lookahead===0&&t===f){return J}if(e.lookahead===0){break}}e.strstart+=e.lookahead;e.lookahead=0;var i=e.block_start+r;if(e.strstart===0||e.strstart>=i){e.lookahead=e.strstart-i;e.strstart=i;flush_block_only(e,false);if(e.strm.avail_out===0){return J}}if(e.strstart-e.block_start>=e.w_size-W){flush_block_only(e,false);if(e.strm.avail_out===0){return J}}}e.insert=0;if(t===h){flush_block_only(e,true);if(e.strm.avail_out===0){return Y}return G}if(e.strstart>e.block_start){flush_block_only(e,false);if(e.strm.avail_out===0){return J}}return J}function deflate_fast(e,t){var r;var i;for(;;){if(e.lookahead<W){fill_window(e);if(e.lookahead<W&&t===f){return J}if(e.lookahead===0){break}}r=0;if(e.lookahead>=L){e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+L-1])&e.hash_mask;r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart}if(r!==0&&e.strstart-r<=e.w_size-W){e.match_length=longest_match(e,r)}if(e.match_length>=L){i=n._tr_tally(e,e.strstart-e.match_start,e.match_length-L);e.lookahead-=e.match_length;if(e.match_length<=e.max_lazy_match&&e.lookahead>=L){e.match_length--;do{e.strstart++;e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+L-1])&e.hash_mask;r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart}while(--e.match_length!==0);e.strstart++}else{e.strstart+=e.match_length;e.match_length=0;e.ins_h=e.window[e.strstart];e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask}}else{i=n._tr_tally(e,0,e.window[e.strstart]);e.lookahead--;e.strstart++}if(i){flush_block_only(e,false);if(e.strm.avail_out===0){return J}}}e.insert=e.strstart<L-1?e.strstart:L-1;if(t===h){flush_block_only(e,true);if(e.strm.avail_out===0){return Y}return G}if(e.last_lit){flush_block_only(e,false);if(e.strm.avail_out===0){return J}}return X}function deflate_slow(e,t){var r;var i;var a;for(;;){if(e.lookahead<W){fill_window(e);if(e.lookahead<W&&t===f){return J}if(e.lookahead===0){break}}r=0;if(e.lookahead>=L){e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+L-1])&e.hash_mask;r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart}e.prev_length=e.match_length;e.prev_match=e.match_start;e.match_length=L-1;if(r!==0&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-W){e.match_length=longest_match(e,r);if(e.match_length<=5&&(e.strategy===g||e.match_length===L&&e.strstart-e.match_start>4096)){e.match_length=L-1}}if(e.prev_length>=L&&e.match_length<=e.prev_length){a=e.strstart+e.lookahead-L;i=n._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-L);e.lookahead-=e.prev_length-1;e.prev_length-=2;do{if(++e.strstart<=a){e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+L-1])&e.hash_mask;r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart}}while(--e.prev_length!==0);e.match_available=0;e.match_length=L-1;e.strstart++;if(i){flush_block_only(e,false);if(e.strm.avail_out===0){return J}}}else if(e.match_available){i=n._tr_tally(e,0,e.window[e.strstart-1]);if(i){flush_block_only(e,false)}e.strstart++;e.lookahead--;if(e.strm.avail_out===0){return J}}else{e.match_available=1;e.strstart++;e.lookahead--}}if(e.match_available){i=n._tr_tally(e,0,e.window[e.strstart-1]);e.match_available=0}e.insert=e.strstart<L-1?e.strstart:L-1;if(t===h){flush_block_only(e,true);if(e.strm.avail_out===0){return Y}return G}if(e.last_lit){flush_block_only(e,false);if(e.strm.avail_out===0){return J}}return X}function deflate_rle(e,t){var r;var i;var a,s;var o=e.window;for(;;){if(e.lookahead<=F){fill_window(e);if(e.lookahead<=F&&t===f){return J}if(e.lookahead===0){break}}e.match_length=0;if(e.lookahead>=L&&e.strstart>0){a=e.strstart-1;i=o[a];if(i===o[++a]&&i===o[++a]&&i===o[++a]){s=e.strstart+F;do{}while(i===o[++a]&&i===o[++a]&&i===o[++a]&&i===o[++a]&&i===o[++a]&&i===o[++a]&&i===o[++a]&&i===o[++a]&&a<s);e.match_length=F-(s-a);if(e.match_length>e.lookahead){e.match_length=e.lookahead}}}if(e.match_length>=L){r=n._tr_tally(e,1,e.match_length-L);e.lookahead-=e.match_length;e.strstart+=e.match_length;e.match_length=0}else{r=n._tr_tally(e,0,e.window[e.strstart]);e.lookahead--;e.strstart++}if(r){flush_block_only(e,false);if(e.strm.avail_out===0){return J}}}e.insert=0;if(t===h){flush_block_only(e,true);if(e.strm.avail_out===0){return Y}return G}if(e.last_lit){flush_block_only(e,false);if(e.strm.avail_out===0){return J}}return X}function deflate_huff(e,t){var r;for(;;){if(e.lookahead===0){fill_window(e);if(e.lookahead===0){if(t===f){return J}break}}e.match_length=0;r=n._tr_tally(e,0,e.window[e.strstart]);e.lookahead--;e.strstart++;if(r){flush_block_only(e,false);if(e.strm.avail_out===0){return J}}}e.insert=0;if(t===h){flush_block_only(e,true);if(e.strm.avail_out===0){return Y}return G}if(e.last_lit){flush_block_only(e,false);if(e.strm.avail_out===0){return J}}return X}function Config(e,t,r,i,n){this.good_length=e;this.max_lazy=t;this.nice_length=r;this.max_chain=i;this.func=n}var Q;Q=[new Config(0,0,0,0,deflate_stored),new Config(4,4,8,4,deflate_fast),new Config(4,5,16,8,deflate_fast),new Config(4,6,32,32,deflate_fast),new Config(4,4,16,16,deflate_slow),new Config(8,16,32,32,deflate_slow),new Config(8,16,128,128,deflate_slow),new Config(8,32,128,256,deflate_slow),new Config(32,128,258,1024,deflate_slow),new Config(32,258,258,4096,deflate_slow)];function lm_init(e){e.window_size=2*e.w_size;zero(e.head);e.max_lazy_match=Q[e.level].max_lazy;e.good_match=Q[e.level].good_length;e.nice_match=Q[e.level].nice_length;e.max_chain_length=Q[e.level].max_chain;e.strstart=0;e.block_start=0;e.lookahead=0;e.insert=0;e.match_length=e.prev_length=L-1;e.match_available=0;e.ins_h=0}function DeflateState(){this.strm=null;this.status=0;this.pending_buf=null;this.pending_buf_size=0;this.pending_out=0;this.pending=0;this.wrap=0;this.gzhead=null;this.gzindex=0;this.method=E;this.last_flush=-1;this.w_size=0;this.w_bits=0;this.w_mask=0;this.window=null;this.window_size=0;this.prev=null;this.head=null;this.ins_h=0;this.hash_size=0;this.hash_bits=0;this.hash_mask=0;this.hash_shift=0;this.block_start=0;this.match_length=0;this.prev_match=0;this.match_available=0;this.strstart=0;this.match_start=0;this.lookahead=0;this.prev_length=0;this.max_chain_length=0;this.max_lazy_match=0;this.level=0;this.strategy=0;this.good_match=0;this.nice_match=0;this.dyn_ltree=new i.Buf16(D*2);this.dyn_dtree=new i.Buf16((2*I+1)*2);this.bl_tree=new i.Buf16((2*O+1)*2);zero(this.dyn_ltree);zero(this.dyn_dtree);zero(this.bl_tree);this.l_desc=null;this.d_desc=null;this.bl_desc=null;this.bl_count=new i.Buf16(N+1);this.heap=new i.Buf16(2*z+1);zero(this.heap);this.heap_len=0;this.heap_max=0;this.depth=new i.Buf16(2*z+1);zero(this.depth);this.l_buf=0;this.lit_bufsize=0;this.last_lit=0;this.d_buf=0;this.opt_len=0;this.static_len=0;this.matches=0;this.insert=0;this.bi_buf=0;this.bi_valid=0}function deflateResetKeep(e){var t;if(!e||!e.state){return err(e,v)}e.total_in=e.total_out=0;e.data_type=x;t=e.state;t.pending=0;t.pending_out=0;if(t.wrap<0){t.wrap=-t.wrap}t.status=t.wrap?j:q;e.adler=t.wrap===2?0:1;t.last_flush=f;n._tr_init(t);return c}function deflateReset(e){var t=deflateResetKeep(e);if(t===c){lm_init(e.state)}return t}function deflateSetHeader(e,t){if(!e||!e.state){return v}if(e.state.wrap!==2){return v}e.state.gzhead=t;return c}function deflateInit2(e,t,r,n,a,s){if(!e){return v}var o=1;if(t===m){t=6}if(n<0){o=0;n=-n}else if(n>15){o=2;n-=16}if(a<1||a>C||r!==E||n<8||n>15||t<0||t>9||s<0||s>k){return err(e,v)}if(n===8){n=9}var f=new DeflateState;e.state=f;f.strm=e;f.wrap=o;f.gzhead=null;f.w_bits=n;f.w_size=1<<f.w_bits;f.w_mask=f.w_size-1;f.hash_bits=a+7;f.hash_size=1<<f.hash_bits;f.hash_mask=f.hash_size-1;f.hash_shift=~~((f.hash_bits+L-1)/L);f.window=new i.Buf8(f.w_size*2);f.head=new i.Buf16(f.hash_size);f.prev=new i.Buf16(f.w_size);f.lit_bufsize=1<<a+6;f.pending_buf_size=f.lit_bufsize*4;f.pending_buf=new i.Buf8(f.pending_buf_size);f.d_buf=1*f.lit_bufsize;f.l_buf=(1+2)*f.lit_bufsize;f.level=t;f.strategy=s;f.method=r;return deflateReset(e)}function deflateInit(e,t){return deflateInit2(e,t,E,R,T,S)}function deflate(e,t){var r,i;var a,o;if(!e||!e.state||t>d||t<0){return e?err(e,v):v}i=e.state;if(!e.output||!e.input&&e.avail_in!==0||i.status===K&&t!==h){return err(e,e.avail_out===0?b:v)}i.strm=e;r=i.last_flush;i.last_flush=t;if(i.status===j){if(i.wrap===2){e.adler=0;put_byte(i,31);put_byte(i,139);put_byte(i,8);if(!i.gzhead){put_byte(i,0);put_byte(i,0);put_byte(i,0);put_byte(i,0);put_byte(i,0);put_byte(i,i.level===9?2:i.strategy>=w||i.level<2?4:0);put_byte(i,V);i.status=q}else{put_byte(i,(i.gzhead.text?1:0)+(i.gzhead.hcrc?2:0)+(!i.gzhead.extra?0:4)+(!i.gzhead.name?0:8)+(!i.gzhead.comment?0:16));put_byte(i,i.gzhead.time&255);put_byte(i,i.gzhead.time>>8&255);put_byte(i,i.gzhead.time>>16&255);put_byte(i,i.gzhead.time>>24&255);put_byte(i,i.level===9?2:i.strategy>=w||i.level<2?4:0);put_byte(i,i.gzhead.os&255);if(i.gzhead.extra&&i.gzhead.extra.length){put_byte(i,i.gzhead.extra.length&255);put_byte(i,i.gzhead.extra.length>>8&255)}if(i.gzhead.hcrc){e.adler=s(e.adler,i.pending_buf,i.pending,0)}i.gzindex=0;i.status=U}}else{var _=E+(i.w_bits-8<<4)<<8;var m=-1;if(i.strategy>=w||i.level<2){m=0}else if(i.level<6){m=1}else if(i.level===6){m=2}else{m=3}_|=m<<6;if(i.strstart!==0){_|=P}_+=31-_%31;i.status=q;putShortMSB(i,_);if(i.strstart!==0){putShortMSB(i,e.adler>>>16);putShortMSB(i,e.adler&65535)}e.adler=1}}if(i.status===U){if(i.gzhead.extra){a=i.pending;while(i.gzindex<(i.gzhead.extra.length&65535)){if(i.pending===i.pending_buf_size){if(i.gzhead.hcrc&&i.pending>a){e.adler=s(e.adler,i.pending_buf,i.pending-a,a)}flush_pending(e);a=i.pending;if(i.pending===i.pending_buf_size){break}}put_byte(i,i.gzhead.extra[i.gzindex]&255);i.gzindex++}if(i.gzhead.hcrc&&i.pending>a){e.adler=s(e.adler,i.pending_buf,i.pending-a,a)}if(i.gzindex===i.gzhead.extra.length){i.gzindex=0;i.status=M}}else{i.status=M}}if(i.status===M){if(i.gzhead.name){a=i.pending;do{if(i.pending===i.pending_buf_size){if(i.gzhead.hcrc&&i.pending>a){e.adler=s(e.adler,i.pending_buf,i.pending-a,a)}flush_pending(e);a=i.pending;if(i.pending===i.pending_buf_size){o=1;break}}if(i.gzindex<i.gzhead.name.length){o=i.gzhead.name.charCodeAt(i.gzindex++)&255}else{o=0}put_byte(i,o)}while(o!==0);if(i.gzhead.hcrc&&i.pending>a){e.adler=s(e.adler,i.pending_buf,i.pending-a,a)}if(o===0){i.gzindex=0;i.status=Z}}else{i.status=Z}}if(i.status===Z){if(i.gzhead.comment){a=i.pending;do{if(i.pending===i.pending_buf_size){if(i.gzhead.hcrc&&i.pending>a){e.adler=s(e.adler,i.pending_buf,i.pending-a,a)}flush_pending(e);a=i.pending;if(i.pending===i.pending_buf_size){o=1;break}}if(i.gzindex<i.gzhead.comment.length){o=i.gzhead.comment.charCodeAt(i.gzindex++)&255}else{o=0}put_byte(i,o)}while(o!==0);if(i.gzhead.hcrc&&i.pending>a){e.adler=s(e.adler,i.pending_buf,i.pending-a,a)}if(o===0){i.status=H}}else{i.status=H}}if(i.status===H){if(i.gzhead.hcrc){if(i.pending+2>i.pending_buf_size){flush_pending(e)}if(i.pending+2<=i.pending_buf_size){put_byte(i,e.adler&255);put_byte(i,e.adler>>8&255);e.adler=0;i.status=q}}else{i.status=q}}if(i.pending!==0){flush_pending(e);if(e.avail_out===0){i.last_flush=-1;return c}}else if(e.avail_in===0&&rank(t)<=rank(r)&&t!==h){return err(e,b)}if(i.status===K&&e.avail_in!==0){return err(e,b)}if(e.avail_in!==0||i.lookahead!==0||t!==f&&i.status!==K){var g=i.strategy===w?deflate_huff(i,t):i.strategy===y?deflate_rle(i,t):Q[i.level].func(i,t);if(g===Y||g===G){i.status=K}if(g===J||g===Y){if(e.avail_out===0){i.last_flush=-1}return c}if(g===X){if(t===l){n._tr_align(i)}else if(t!==d){n._tr_stored_block(i,0,0,false);if(t===u){zero(i.head);if(i.lookahead===0){i.strstart=0;i.block_start=0;i.insert=0}}}flush_pending(e);if(e.avail_out===0){i.last_flush=-1;return c}}}if(t!==h){return c}if(i.wrap<=0){return p}if(i.wrap===2){put_byte(i,e.adler&255);put_byte(i,e.adler>>8&255);put_byte(i,e.adler>>16&255);put_byte(i,e.adler>>24&255);put_byte(i,e.total_in&255);put_byte(i,e.total_in>>8&255);put_byte(i,e.total_in>>16&255);put_byte(i,e.total_in>>24&255)}else{putShortMSB(i,e.adler>>>16);putShortMSB(i,e.adler&65535)}flush_pending(e);if(i.wrap>0){i.wrap=-i.wrap}return i.pending!==0?c:p}function deflateEnd(e){var t;if(!e||!e.state){return v}t=e.state.status;if(t!==j&&t!==U&&t!==M&&t!==Z&&t!==H&&t!==q&&t!==K){return err(e,v)}e.state=null;return t===q?err(e,_):c}function deflateSetDictionary(e,t){var r=t.length;var n;var s,o;var f;var l;var u;var h;var d;if(!e||!e.state){return v}n=e.state;f=n.wrap;if(f===2||f===1&&n.status!==j||n.lookahead){return v}if(f===1){e.adler=a(e.adler,t,r,0)}n.wrap=0;if(r>=n.w_size){if(f===0){zero(n.head);n.strstart=0;n.block_start=0;n.insert=0}d=new i.Buf8(n.w_size);i.arraySet(d,t,r-n.w_size,n.w_size,0);t=d;r=n.w_size}l=e.avail_in;u=e.next_in;h=e.input;e.avail_in=r;e.next_in=0;e.input=t;fill_window(n);while(n.lookahead>=L){s=n.strstart;o=n.lookahead-(L-1);do{n.ins_h=(n.ins_h<<n.hash_shift^n.window[s+L-1])&n.hash_mask;n.prev[s&n.w_mask]=n.head[n.ins_h];n.head[n.ins_h]=s;s++}while(--o);n.strstart=s;n.lookahead=L-1;fill_window(n)}n.strstart+=n.lookahead;n.block_start=n.strstart;n.insert=n.lookahead;n.lookahead=0;n.match_length=n.prev_length=L-1;n.match_available=0;e.next_in=u;e.input=h;e.avail_in=l;n.wrap=f;return c}t.deflateInit=deflateInit;t.deflateInit2=deflateInit2;t.deflateReset=deflateReset;t.deflateResetKeep=deflateResetKeep;t.deflateSetHeader=deflateSetHeader;t.deflate=deflate;t.deflateEnd=deflateEnd;t.deflateSetDictionary=deflateSetDictionary;t.deflateInfo="pako deflate (from Nodeca project)"},401:function(e,t,r){"use strict";var i=r(999);var n=r(141);var a=r(613);var s=r(181);var o=r(685);var f=0;var l=1;var u=2;var h=4;var d=5;var c=6;var p=0;var v=1;var _=2;var b=-2;var m=-3;var g=-4;var w=-5;var y=8;var k=1;var S=2;var x=3;var E=4;var C=5;var R=6;var T=7;var A=8;var B=9;var z=10;var I=11;var O=12;var D=13;var N=14;var L=15;var F=16;var W=17;var P=18;var j=19;var U=20;var M=21;var Z=22;var H=23;var q=24;var K=25;var J=26;var X=27;var Y=28;var G=29;var V=30;var Q=31;var $=32;var ee=852;var te=592;var re=15;var ie=re;function zswap32(e){return(e>>>24&255)+(e>>>8&65280)+((e&65280)<<8)+((e&255)<<24)}function InflateState(){this.mode=0;this.last=false;this.wrap=0;this.havedict=false;this.flags=0;this.dmax=0;this.check=0;this.total=0;this.head=null;this.wbits=0;this.wsize=0;this.whave=0;this.wnext=0;this.window=null;this.hold=0;this.bits=0;this.length=0;this.offset=0;this.extra=0;this.lencode=null;this.distcode=null;this.lenbits=0;this.distbits=0;this.ncode=0;this.nlen=0;this.ndist=0;this.have=0;this.next=null;this.lens=new i.Buf16(320);this.work=new i.Buf16(288);this.lendyn=null;this.distdyn=null;this.sane=0;this.back=0;this.was=0}function inflateResetKeep(e){var t;if(!e||!e.state){return b}t=e.state;e.total_in=e.total_out=t.total=0;e.msg="";if(t.wrap){e.adler=t.wrap&1}t.mode=k;t.last=0;t.havedict=0;t.dmax=32768;t.head=null;t.hold=0;t.bits=0;t.lencode=t.lendyn=new i.Buf32(ee);t.distcode=t.distdyn=new i.Buf32(te);t.sane=1;t.back=-1;return p}function inflateReset(e){var t;if(!e||!e.state){return b}t=e.state;t.wsize=0;t.whave=0;t.wnext=0;return inflateResetKeep(e)}function inflateReset2(e,t){var r;var i;if(!e||!e.state){return b}i=e.state;if(t<0){r=0;t=-t}else{r=(t>>4)+1;if(t<48){t&=15}}if(t&&(t<8||t>15)){return b}if(i.window!==null&&i.wbits!==t){i.window=null}i.wrap=r;i.wbits=t;return inflateReset(e)}function inflateInit2(e,t){var r;var i;if(!e){return b}i=new InflateState;e.state=i;i.window=null;r=inflateReset2(e,t);if(r!==p){e.state=null}return r}function inflateInit(e){return inflateInit2(e,ie)}var ne=true;var ae,se;function fixedtables(e){if(ne){var t;ae=new i.Buf32(512);se=new i.Buf32(32);t=0;while(t<144){e.lens[t++]=8}while(t<256){e.lens[t++]=9}while(t<280){e.lens[t++]=7}while(t<288){e.lens[t++]=8}o(l,e.lens,0,288,ae,0,e.work,{bits:9});t=0;while(t<32){e.lens[t++]=5}o(u,e.lens,0,32,se,0,e.work,{bits:5});ne=false}e.lencode=ae;e.lenbits=9;e.distcode=se;e.distbits=5}function updatewindow(e,t,r,n){var a;var s=e.state;if(s.window===null){s.wsize=1<<s.wbits;s.wnext=0;s.whave=0;s.window=new i.Buf8(s.wsize)}if(n>=s.wsize){i.arraySet(s.window,t,r-s.wsize,s.wsize,0);s.wnext=0;s.whave=s.wsize}else{a=s.wsize-s.wnext;if(a>n){a=n}i.arraySet(s.window,t,r-n,a,s.wnext);n-=a;if(n){i.arraySet(s.window,t,r-n,n,0);s.wnext=n;s.whave=s.wsize}else{s.wnext+=a;if(s.wnext===s.wsize){s.wnext=0}if(s.whave<s.wsize){s.whave+=a}}}return 0}function inflate(e,t){var r;var ee,te;var re;var ie;var ne,ae;var se;var oe;var fe,le;var ue;var he;var de;var ce=0;var pe,ve,_e;var be,me,ge;var we;var ye;var ke=new i.Buf8(4);var Se;var xe;var Ee=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&e.avail_in!==0){return b}r=e.state;if(r.mode===O){r.mode=D}ie=e.next_out;te=e.output;ae=e.avail_out;re=e.next_in;ee=e.input;ne=e.avail_in;se=r.hold;oe=r.bits;fe=ne;le=ae;ye=p;e:for(;;){switch(r.mode){case k:if(r.wrap===0){r.mode=D;break}while(oe<16){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}if(r.wrap&2&&se===35615){r.check=0;ke[0]=se&255;ke[1]=se>>>8&255;r.check=a(r.check,ke,2,0);se=0;oe=0;r.mode=S;break}r.flags=0;if(r.head){r.head.done=false}if(!(r.wrap&1)||(((se&255)<<8)+(se>>8))%31){e.msg="incorrect header check";r.mode=V;break}if((se&15)!==y){e.msg="unknown compression method";r.mode=V;break}se>>>=4;oe-=4;we=(se&15)+8;if(r.wbits===0){r.wbits=we}else if(we>r.wbits){e.msg="invalid window size";r.mode=V;break}r.dmax=1<<we;e.adler=r.check=1;r.mode=se&512?z:O;se=0;oe=0;break;case S:while(oe<16){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}r.flags=se;if((r.flags&255)!==y){e.msg="unknown compression method";r.mode=V;break}if(r.flags&57344){e.msg="unknown header flags set";r.mode=V;break}if(r.head){r.head.text=se>>8&1}if(r.flags&512){ke[0]=se&255;ke[1]=se>>>8&255;r.check=a(r.check,ke,2,0)}se=0;oe=0;r.mode=x;case x:while(oe<32){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}if(r.head){r.head.time=se}if(r.flags&512){ke[0]=se&255;ke[1]=se>>>8&255;ke[2]=se>>>16&255;ke[3]=se>>>24&255;r.check=a(r.check,ke,4,0)}se=0;oe=0;r.mode=E;case E:while(oe<16){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}if(r.head){r.head.xflags=se&255;r.head.os=se>>8}if(r.flags&512){ke[0]=se&255;ke[1]=se>>>8&255;r.check=a(r.check,ke,2,0)}se=0;oe=0;r.mode=C;case C:if(r.flags&1024){while(oe<16){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}r.length=se;if(r.head){r.head.extra_len=se}if(r.flags&512){ke[0]=se&255;ke[1]=se>>>8&255;r.check=a(r.check,ke,2,0)}se=0;oe=0}else if(r.head){r.head.extra=null}r.mode=R;case R:if(r.flags&1024){ue=r.length;if(ue>ne){ue=ne}if(ue){if(r.head){we=r.head.extra_len-r.length;if(!r.head.extra){r.head.extra=new Array(r.head.extra_len)}i.arraySet(r.head.extra,ee,re,ue,we)}if(r.flags&512){r.check=a(r.check,ee,ue,re)}ne-=ue;re+=ue;r.length-=ue}if(r.length){break e}}r.length=0;r.mode=T;case T:if(r.flags&2048){if(ne===0){break e}ue=0;do{we=ee[re+ue++];if(r.head&&we&&r.length<65536){r.head.name+=String.fromCharCode(we)}}while(we&&ue<ne);if(r.flags&512){r.check=a(r.check,ee,ue,re)}ne-=ue;re+=ue;if(we){break e}}else if(r.head){r.head.name=null}r.length=0;r.mode=A;case A:if(r.flags&4096){if(ne===0){break e}ue=0;do{we=ee[re+ue++];if(r.head&&we&&r.length<65536){r.head.comment+=String.fromCharCode(we)}}while(we&&ue<ne);if(r.flags&512){r.check=a(r.check,ee,ue,re)}ne-=ue;re+=ue;if(we){break e}}else if(r.head){r.head.comment=null}r.mode=B;case B:if(r.flags&512){while(oe<16){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}if(se!==(r.check&65535)){e.msg="header crc mismatch";r.mode=V;break}se=0;oe=0}if(r.head){r.head.hcrc=r.flags>>9&1;r.head.done=true}e.adler=r.check=0;r.mode=O;break;case z:while(oe<32){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}e.adler=r.check=zswap32(se);se=0;oe=0;r.mode=I;case I:if(r.havedict===0){e.next_out=ie;e.avail_out=ae;e.next_in=re;e.avail_in=ne;r.hold=se;r.bits=oe;return _}e.adler=r.check=1;r.mode=O;case O:if(t===d||t===c){break e}case D:if(r.last){se>>>=oe&7;oe-=oe&7;r.mode=X;break}while(oe<3){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}r.last=se&1;se>>>=1;oe-=1;switch(se&3){case 0:r.mode=N;break;case 1:fixedtables(r);r.mode=U;if(t===c){se>>>=2;oe-=2;break e}break;case 2:r.mode=W;break;case 3:e.msg="invalid block type";r.mode=V}se>>>=2;oe-=2;break;case N:se>>>=oe&7;oe-=oe&7;while(oe<32){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}if((se&65535)!==(se>>>16^65535)){e.msg="invalid stored block lengths";r.mode=V;break}r.length=se&65535;se=0;oe=0;r.mode=L;if(t===c){break e}case L:r.mode=F;case F:ue=r.length;if(ue){if(ue>ne){ue=ne}if(ue>ae){ue=ae}if(ue===0){break e}i.arraySet(te,ee,re,ue,ie);ne-=ue;re+=ue;ae-=ue;ie+=ue;r.length-=ue;break}r.mode=O;break;case W:while(oe<14){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}r.nlen=(se&31)+257;se>>>=5;oe-=5;r.ndist=(se&31)+1;se>>>=5;oe-=5;r.ncode=(se&15)+4;se>>>=4;oe-=4;if(r.nlen>286||r.ndist>30){e.msg="too many length or distance symbols";r.mode=V;break}r.have=0;r.mode=P;case P:while(r.have<r.ncode){while(oe<3){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}r.lens[Ee[r.have++]]=se&7;se>>>=3;oe-=3}while(r.have<19){r.lens[Ee[r.have++]]=0}r.lencode=r.lendyn;r.lenbits=7;Se={bits:r.lenbits};ye=o(f,r.lens,0,19,r.lencode,0,r.work,Se);r.lenbits=Se.bits;if(ye){e.msg="invalid code lengths set";r.mode=V;break}r.have=0;r.mode=j;case j:while(r.have<r.nlen+r.ndist){for(;;){ce=r.lencode[se&(1<<r.lenbits)-1];pe=ce>>>24;ve=ce>>>16&255;_e=ce&65535;if(pe<=oe){break}if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}if(_e<16){se>>>=pe;oe-=pe;r.lens[r.have++]=_e}else{if(_e===16){xe=pe+2;while(oe<xe){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}se>>>=pe;oe-=pe;if(r.have===0){e.msg="invalid bit length repeat";r.mode=V;break}we=r.lens[r.have-1];ue=3+(se&3);se>>>=2;oe-=2}else if(_e===17){xe=pe+3;while(oe<xe){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}se>>>=pe;oe-=pe;we=0;ue=3+(se&7);se>>>=3;oe-=3}else{xe=pe+7;while(oe<xe){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}se>>>=pe;oe-=pe;we=0;ue=11+(se&127);se>>>=7;oe-=7}if(r.have+ue>r.nlen+r.ndist){e.msg="invalid bit length repeat";r.mode=V;break}while(ue--){r.lens[r.have++]=we}}}if(r.mode===V){break}if(r.lens[256]===0){e.msg="invalid code -- missing end-of-block";r.mode=V;break}r.lenbits=9;Se={bits:r.lenbits};ye=o(l,r.lens,0,r.nlen,r.lencode,0,r.work,Se);r.lenbits=Se.bits;if(ye){e.msg="invalid literal/lengths set";r.mode=V;break}r.distbits=6;r.distcode=r.distdyn;Se={bits:r.distbits};ye=o(u,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,Se);r.distbits=Se.bits;if(ye){e.msg="invalid distances set";r.mode=V;break}r.mode=U;if(t===c){break e}case U:r.mode=M;case M:if(ne>=6&&ae>=258){e.next_out=ie;e.avail_out=ae;e.next_in=re;e.avail_in=ne;r.hold=se;r.bits=oe;s(e,le);ie=e.next_out;te=e.output;ae=e.avail_out;re=e.next_in;ee=e.input;ne=e.avail_in;se=r.hold;oe=r.bits;if(r.mode===O){r.back=-1}break}r.back=0;for(;;){ce=r.lencode[se&(1<<r.lenbits)-1];pe=ce>>>24;ve=ce>>>16&255;_e=ce&65535;if(pe<=oe){break}if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}if(ve&&(ve&240)===0){be=pe;me=ve;ge=_e;for(;;){ce=r.lencode[ge+((se&(1<<be+me)-1)>>be)];pe=ce>>>24;ve=ce>>>16&255;_e=ce&65535;if(be+pe<=oe){break}if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}se>>>=be;oe-=be;r.back+=be}se>>>=pe;oe-=pe;r.back+=pe;r.length=_e;if(ve===0){r.mode=J;break}if(ve&32){r.back=-1;r.mode=O;break}if(ve&64){e.msg="invalid literal/length code";r.mode=V;break}r.extra=ve&15;r.mode=Z;case Z:if(r.extra){xe=r.extra;while(oe<xe){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}r.length+=se&(1<<r.extra)-1;se>>>=r.extra;oe-=r.extra;r.back+=r.extra}r.was=r.length;r.mode=H;case H:for(;;){ce=r.distcode[se&(1<<r.distbits)-1];pe=ce>>>24;ve=ce>>>16&255;_e=ce&65535;if(pe<=oe){break}if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}if((ve&240)===0){be=pe;me=ve;ge=_e;for(;;){ce=r.distcode[ge+((se&(1<<be+me)-1)>>be)];pe=ce>>>24;ve=ce>>>16&255;_e=ce&65535;if(be+pe<=oe){break}if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}se>>>=be;oe-=be;r.back+=be}se>>>=pe;oe-=pe;r.back+=pe;if(ve&64){e.msg="invalid distance code";r.mode=V;break}r.offset=_e;r.extra=ve&15;r.mode=q;case q:if(r.extra){xe=r.extra;while(oe<xe){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}r.offset+=se&(1<<r.extra)-1;se>>>=r.extra;oe-=r.extra;r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back";r.mode=V;break}r.mode=K;case K:if(ae===0){break e}ue=le-ae;if(r.offset>ue){ue=r.offset-ue;if(ue>r.whave){if(r.sane){e.msg="invalid distance too far back";r.mode=V;break}}if(ue>r.wnext){ue-=r.wnext;he=r.wsize-ue}else{he=r.wnext-ue}if(ue>r.length){ue=r.length}de=r.window}else{de=te;he=ie-r.offset;ue=r.length}if(ue>ae){ue=ae}ae-=ue;r.length-=ue;do{te[ie++]=de[he++]}while(--ue);if(r.length===0){r.mode=M}break;case J:if(ae===0){break e}te[ie++]=r.length;ae--;r.mode=M;break;case X:if(r.wrap){while(oe<32){if(ne===0){break e}ne--;se|=ee[re++]<<oe;oe+=8}le-=ae;e.total_out+=le;r.total+=le;if(le){e.adler=r.check=r.flags?a(r.check,te,le,ie-le):n(r.check,te,le,ie-le)}le=ae;if((r.flags?se:zswap32(se))!==r.check){e.msg="incorrect data check";r.mode=V;break}se=0;oe=0}r.mode=Y;case Y:if(r.wrap&&r.flags){while(oe<32){if(ne===0){break e}ne--;se+=ee[re++]<<oe;oe+=8}if(se!==(r.total&4294967295)){e.msg="incorrect length check";r.mode=V;break}se=0;oe=0}r.mode=G;case G:ye=v;break e;case V:ye=m;break e;case Q:return g;case $:default:return b}}e.next_out=ie;e.avail_out=ae;e.next_in=re;e.avail_in=ne;r.hold=se;r.bits=oe;if(r.wsize||le!==e.avail_out&&r.mode<V&&(r.mode<X||t!==h)){if(updatewindow(e,e.output,e.next_out,le-e.avail_out)){r.mode=Q;return g}}fe-=e.avail_in;le-=e.avail_out;e.total_in+=fe;e.total_out+=le;r.total+=le;if(r.wrap&&le){e.adler=r.check=r.flags?a(r.check,te,le,e.next_out-le):n(r.check,te,le,e.next_out-le)}e.data_type=r.bits+(r.last?64:0)+(r.mode===O?128:0)+(r.mode===U||r.mode===L?256:0);if((fe===0&&le===0||t===h)&&ye===p){ye=w}return ye}function inflateEnd(e){if(!e||!e.state){return b}var t=e.state;if(t.window){t.window=null}e.state=null;return p}function inflateGetHeader(e,t){var r;if(!e||!e.state){return b}r=e.state;if((r.wrap&2)===0){return b}r.head=t;t.done=false;return p}function inflateSetDictionary(e,t){var r=t.length;var i;var a;var s;if(!e||!e.state){return b}i=e.state;if(i.wrap!==0&&i.mode!==I){return b}if(i.mode===I){a=1;a=n(a,t,r,0);if(a!==i.check){return m}}s=updatewindow(e,t,r,r);if(s){i.mode=Q;return g}i.havedict=1;return p}t.inflateReset=inflateReset;t.inflateReset2=inflateReset2;t.inflateResetKeep=inflateResetKeep;t.inflateInit=inflateInit;t.inflateInit2=inflateInit2;t.inflate=inflate;t.inflateEnd=inflateEnd;t.inflateGetHeader=inflateGetHeader;t.inflateSetDictionary=inflateSetDictionary;t.inflateInfo="pako inflate (from Nodeca project)"},413:function(e){e.exports=require("stream")},427:function(e,t,r){e.exports=r(413)},438:function(e,t,r){"use strict";var i=null;if(typeof Promise!=="undefined"){i=Promise}else{i=r(452)}e.exports={Promise:i}},452:function(e,t,r){"use strict";var i=r(655);function INTERNAL(){}var n={};var a=["REJECTED"];var s=["FULFILLED"];var o=["PENDING"];if(!process.browser){var f=["UNHANDLED"]}e.exports=Promise;function Promise(e){if(typeof e!=="function"){throw new TypeError("resolver must be a function")}this.state=o;this.queue=[];this.outcome=void 0;if(!process.browser){this.handled=f}if(e!==INTERNAL){safelyResolveThenable(this,e)}}Promise.prototype.finally=function(e){if(typeof e!=="function"){return this}var t=this.constructor;return this.then(resolve,reject);function resolve(r){function yes(){return r}return t.resolve(e()).then(yes)}function reject(r){function no(){throw r}return t.resolve(e()).then(no)}};Promise.prototype.catch=function(e){return this.then(null,e)};Promise.prototype.then=function(e,t){if(typeof e!=="function"&&this.state===s||typeof t!=="function"&&this.state===a){return this}var r=new this.constructor(INTERNAL);if(!process.browser){if(this.handled===f){this.handled=null}}if(this.state!==o){var i=this.state===s?e:t;unwrap(r,i,this.outcome)}else{this.queue.push(new QueueItem(r,e,t))}return r};function QueueItem(e,t,r){this.promise=e;if(typeof t==="function"){this.onFulfilled=t;this.callFulfilled=this.otherCallFulfilled}if(typeof r==="function"){this.onRejected=r;this.callRejected=this.otherCallRejected}}QueueItem.prototype.callFulfilled=function(e){n.resolve(this.promise,e)};QueueItem.prototype.otherCallFulfilled=function(e){unwrap(this.promise,this.onFulfilled,e)};QueueItem.prototype.callRejected=function(e){n.reject(this.promise,e)};QueueItem.prototype.otherCallRejected=function(e){unwrap(this.promise,this.onRejected,e)};function unwrap(e,t,r){i(function(){var i;try{i=t(r)}catch(t){return n.reject(e,t)}if(i===e){n.reject(e,new TypeError("Cannot resolve promise with itself"))}else{n.resolve(e,i)}})}n.resolve=function(e,t){var r=tryCatch(getThen,t);if(r.status==="error"){return n.reject(e,r.value)}var i=r.value;if(i){safelyResolveThenable(e,i)}else{e.state=s;e.outcome=t;var a=-1;var o=e.queue.length;while(++a<o){e.queue[a].callFulfilled(t)}}return e};n.reject=function(e,t){e.state=a;e.outcome=t;if(!process.browser){if(e.handled===f){i(function(){if(e.handled===f){process.emit("unhandledRejection",t,e)}})}}var r=-1;var n=e.queue.length;while(++r<n){e.queue[r].callRejected(t)}return e};function getThen(e){var t=e&&e.then;if(e&&(typeof e==="object"||typeof e==="function")&&typeof t==="function"){return function appyThen(){t.apply(e,arguments)}}}function safelyResolveThenable(e,t){var r=false;function onError(t){if(r){return}r=true;n.reject(e,t)}function onSuccess(t){if(r){return}r=true;n.resolve(e,t)}function tryToUnwrap(){t(onSuccess,onError)}var i=tryCatch(tryToUnwrap);if(i.status==="error"){onError(i.value)}}function tryCatch(e,t){var r={};try{r.value=e(t);r.status="success"}catch(e){r.status="error";r.value=e}return r}Promise.resolve=resolve;function resolve(e){if(e instanceof this){return e}return n.resolve(new this(INTERNAL),e)}Promise.reject=reject;function reject(e){var t=new this(INTERNAL);return n.reject(t,e)}Promise.all=all;function all(e){var t=this;if(Object.prototype.toString.call(e)!=="[object Array]"){return this.reject(new TypeError("must be an array"))}var r=e.length;var i=false;if(!r){return this.resolve([])}var a=new Array(r);var s=0;var o=-1;var f=new this(INTERNAL);while(++o<r){allResolver(e[o],o)}return f;function allResolver(e,o){t.resolve(e).then(resolveFromAll,function(e){if(!i){i=true;n.reject(f,e)}});function resolveFromAll(e){a[o]=e;if(++s===r&&!i){i=true;n.resolve(f,a)}}}}Promise.race=race;function race(e){var t=this;if(Object.prototype.toString.call(e)!=="[object Array]"){return this.reject(new TypeError("must be an array"))}var r=e.length;var i=false;if(!r){return this.resolve([])}var a=-1;var s=new this(INTERNAL);while(++a<r){resolver(e[a])}return s;function resolver(e){t.resolve(e).then(function(e){if(!i){i=true;n.resolve(s,e)}},function(e){if(!i){i=true;n.reject(s,e)}})}}},496:function(e,t,r){"use strict";var i=r(100);var n=r(967);var a=r(628);var s=r(780);var o=r(30);var f=function(e,t){var r="",i;for(i=0;i<t;i++){r+=String.fromCharCode(e&255);e=e>>>8}return r};var l=function(e,t){var r=e;if(!e){r=t?16893:33204}return(r&65535)<<16};var u=function(e,t){return(e||0)&63};var h=function(e,t,r,n,h,d){var c=e["file"],p=e["compression"],v=d!==a.utf8encode,_=i.transformTo("string",d(c.name)),b=i.transformTo("string",a.utf8encode(c.name)),m=c.comment,g=i.transformTo("string",d(m)),w=i.transformTo("string",a.utf8encode(m)),y=b.length!==c.name.length,k=w.length!==m.length,S,x,E="",C="",R="",T=c.dir,A=c.date;var B={crc32:0,compressedSize:0,uncompressedSize:0};if(!t||r){B.crc32=e["crc32"];B.compressedSize=e["compressedSize"];B.uncompressedSize=e["uncompressedSize"]}var z=0;if(t){z|=8}if(!v&&(y||k)){z|=2048}var I=0;var O=0;if(T){I|=16}if(h==="UNIX"){O=798;I|=l(c.unixPermissions,T)}else{O=20;I|=u(c.dosPermissions,T)}S=A.getUTCHours();S=S<<6;S=S|A.getUTCMinutes();S=S<<5;S=S|A.getUTCSeconds()/2;x=A.getUTCFullYear()-1980;x=x<<4;x=x|A.getUTCMonth()+1;x=x<<5;x=x|A.getUTCDate();if(y){C=f(1,1)+f(s(_),4)+b;E+="up"+f(C.length,2)+C}if(k){R=f(1,1)+f(s(g),4)+w;E+="uc"+f(R.length,2)+R}var D="";D+="\n\0";D+=f(z,2);D+=p.magic;D+=f(S,2);D+=f(x,2);D+=f(B.crc32,4);D+=f(B.compressedSize,4);D+=f(B.uncompressedSize,4);D+=f(_.length,2);D+=f(E.length,2);var N=o.LOCAL_FILE_HEADER+D+_+E;var L=o.CENTRAL_FILE_HEADER+f(O,2)+D+f(g.length,2)+"\0\0"+"\0\0"+f(I,4)+f(n,4)+_+E+g;return{fileRecord:N,dirRecord:L}};var d=function(e,t,r,n,a){var s="";var l=i.transformTo("string",a(n));s=o.CENTRAL_DIRECTORY_END+"\0\0"+"\0\0"+f(e,2)+f(e,2)+f(t,4)+f(r,4)+f(l.length,2)+l;return s};var c=function(e){var t="";t=o.DATA_DESCRIPTOR+f(e["crc32"],4)+f(e["compressedSize"],4)+f(e["uncompressedSize"],4);return t};function ZipFileWorker(e,t,r,i){n.call(this,"ZipFileWorker");this.bytesWritten=0;this.zipComment=t;this.zipPlatform=r;this.encodeFileName=i;this.streamFiles=e;this.accumulate=false;this.contentBuffer=[];this.dirRecords=[];this.currentSourceOffset=0;this.entriesCount=0;this.currentFile=null;this._sources=[]}i.inherits(ZipFileWorker,n);ZipFileWorker.prototype.push=function(e){var t=e.meta.percent||0;var r=this.entriesCount;var i=this._sources.length;if(this.accumulate){this.contentBuffer.push(e)}else{this.bytesWritten+=e.data.length;n.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-i-1))/r:100}})}};ZipFileWorker.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten;this.currentFile=e["file"].name;var t=this.streamFiles&&!e["file"].dir;if(t){var r=h(e,t,false,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else{this.accumulate=true}};ZipFileWorker.prototype.closedSource=function(e){this.accumulate=false;var t=this.streamFiles&&!e["file"].dir;var r=h(e,t,true,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.dirRecords.push(r.dirRecord);if(t){this.push({data:c(e),meta:{percent:100}})}else{this.push({data:r.fileRecord,meta:{percent:0}});while(this.contentBuffer.length){this.push(this.contentBuffer.shift())}}this.currentFile=null};ZipFileWorker.prototype.flush=function(){var e=this.bytesWritten;for(var t=0;t<this.dirRecords.length;t++){this.push({data:this.dirRecords[t],meta:{percent:100}})}var r=this.bytesWritten-e;var i=d(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:i,meta:{percent:100}})};ZipFileWorker.prototype.prepareNextSource=function(){this.previous=this._sources.shift();this.openedSource(this.previous.streamInfo);if(this.isPaused){this.previous.pause()}else{this.previous.resume()}};ZipFileWorker.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;e.on("data",function(e){t.processChunk(e)});e.on("end",function(){t.closedSource(t.previous.streamInfo);if(t._sources.length){t.prepareNextSource()}else{t.end()}});e.on("error",function(e){t.error(e)});return this};ZipFileWorker.prototype.resume=function(){if(!n.prototype.resume.call(this)){return false}if(!this.previous&&this._sources.length){this.prepareNextSource();return true}if(!this.previous&&!this._sources.length&&!this.generatedError){this.end();return true}};ZipFileWorker.prototype.error=function(e){var t=this._sources;if(!n.prototype.error.call(this,e)){return false}for(var r=0;r<t.length;r++){try{t[r].error(e)}catch(e){}}return true};ZipFileWorker.prototype.lock=function(){n.prototype.lock.call(this);var e=this._sources;for(var t=0;t<e.length;t++){e[t].lock()}};e.exports=ZipFileWorker},499:function(e){"use strict";e.exports={isNode:typeof Buffer!=="undefined",newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from){return Buffer.from(e,t)}else{if(typeof e==="number"){throw new Error('The "data" argument must not be a number')}return new Buffer(e,t)}},allocBuffer:function(e){if(Buffer.alloc){return Buffer.alloc(e)}else{var t=new Buffer(e);t.fill(0);return t}},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&typeof e.on==="function"&&typeof e.pause==="function"&&typeof e.resume==="function"}}},501:function(e,t,r){"use strict";var i=r(828);var n=r(496);var a=function(e,t){var r=e||t;var n=i[r];if(!n){throw new Error(r+" is not a valid compression method !")}return n};t.generateWorker=function(e,t,r){var i=new n(t.streamFiles,r,t.platform,t.encodeFileName);var s=0;try{e.forEach(function(e,r){s++;var n=a(r.options.compression,t.compression);var o=r.options.compressionOptions||t.compressionOptions||{};var f=r.dir,l=r.date;r._compressWorker(n,o).withStreamInfo("file",{name:e,dir:f,date:l,comment:r.comment||"",unixPermissions:r.unixPermissions,dosPermissions:r.dosPermissions}).pipe(i)});i.entriesCount=s}catch(e){i.error(e)}return i}},557:function(e,t,r){"use strict";var i=r(824);var n=r(68);var a=r(628);var s=r(186);var o=r(967);var f=function(e,t,r){this.name=e;this.dir=r.dir;this.date=r.date;this.comment=r.comment;this.unixPermissions=r.unixPermissions;this.dosPermissions=r.dosPermissions;this._data=t;this._dataBinary=r.binary;this.options={compression:r.compression,compressionOptions:r.compressionOptions}};f.prototype={internalStream:function(e){var t=null,r="string";try{if(!e){throw new Error("No output type specified.")}r=e.toLowerCase();var n=r==="string"||r==="text";if(r==="binarystring"||r==="text"){r="string"}t=this._decompressWorker();var s=!this._dataBinary;if(s&&!n){t=t.pipe(new a.Utf8EncodeWorker)}if(!s&&n){t=t.pipe(new a.Utf8DecodeWorker)}}catch(e){t=new o("error");t.error(e)}return new i(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof s&&this._data.compression.magic===e.magic){return this._data.getCompressedWorker()}else{var r=this._decompressWorker();if(!this._dataBinary){r=r.pipe(new a.Utf8EncodeWorker)}return s.createWorkerFrom(r,e,t)}},_decompressWorker:function(){if(this._data instanceof s){return this._data.getContentWorker()}else if(this._data instanceof o){return this._data}else{return new n(this._data)}}};var l=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"];var u=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")};for(var h=0;h<l.length;h++){f.prototype[l[h]]=u}e.exports=f},564:function(e,t,r){"use strict";var i=r(574).Readable;var n=r(100);n.inherits(NodejsStreamOutputAdapter,i);function NodejsStreamOutputAdapter(e,t,r){i.call(this,t);this._helper=e;var n=this;e.on("data",function(e,t){if(!n.push(e)){n._helper.pause()}if(r){r(t)}}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}NodejsStreamOutputAdapter.prototype._read=function(){this._helper.resume()};e.exports=NodejsStreamOutputAdapter},574:function(e,t,r){var i=r(413);if(process.env.READABLE_STREAM==="disable"&&i){e.exports=i;t=e.exports=i.Readable;t.Readable=i.Readable;t.Writable=i.Writable;t.Duplex=i.Duplex;t.Transform=i.Transform;t.PassThrough=i.PassThrough;t.Stream=i}else{t=e.exports=r(226);t.Stream=i||t;t.Readable=t;t.Writable=r(241);t.Duplex=r(831);t.Transform=r(925);t.PassThrough=r(882)}},603:function(e,t,r){"use strict";var i=r(967);var n=r(100);function ConvertWorker(e){i.call(this,"ConvertWorker to "+e);this.destType=e}n.inherits(ConvertWorker,i);ConvertWorker.prototype.processChunk=function(e){this.push({data:n.transformTo(this.destType,e.data),meta:e.meta})};e.exports=ConvertWorker},613:function(e){"use strict";function makeTable(){var e,t=[];for(var r=0;r<256;r++){e=r;for(var i=0;i<8;i++){e=e&1?3988292384^e>>>1:e>>>1}t[r]=e}return t}var t=makeTable();function crc32(e,r,i,n){var a=t,s=n+i;e^=-1;for(var o=n;o<s;o++){e=e>>>8^a[(e^r[o])&255]}return e^-1}e.exports=crc32},614:function(e){e.exports=require("events")},628:function(e,t,r){"use strict";var i=r(100);var n=r(130);var a=r(499);var s=r(967);var o=new Array(256);for(var f=0;f<256;f++){o[f]=f>=252?6:f>=248?5:f>=240?4:f>=224?3:f>=192?2:1}o[254]=o[254]=1;var l=function(e){var t,r,i,a,s,o=e.length,f=0;for(a=0;a<o;a++){r=e.charCodeAt(a);if((r&64512)===55296&&a+1<o){i=e.charCodeAt(a+1);if((i&64512)===56320){r=65536+(r-55296<<10)+(i-56320);a++}}f+=r<128?1:r<2048?2:r<65536?3:4}if(n.uint8array){t=new Uint8Array(f)}else{t=new Array(f)}for(s=0,a=0;s<f;a++){r=e.charCodeAt(a);if((r&64512)===55296&&a+1<o){i=e.charCodeAt(a+1);if((i&64512)===56320){r=65536+(r-55296<<10)+(i-56320);a++}}if(r<128){t[s++]=r}else if(r<2048){t[s++]=192|r>>>6;t[s++]=128|r&63}else if(r<65536){t[s++]=224|r>>>12;t[s++]=128|r>>>6&63;t[s++]=128|r&63}else{t[s++]=240|r>>>18;t[s++]=128|r>>>12&63;t[s++]=128|r>>>6&63;t[s++]=128|r&63}}return t};var u=function(e,t){var r;t=t||e.length;if(t>e.length){t=e.length}r=t-1;while(r>=0&&(e[r]&192)===128){r--}if(r<0){return t}if(r===0){return t}return r+o[e[r]]>t?r:t};var h=function(e){var t,r,n,a,s;var f=e.length;var l=new Array(f*2);for(n=0,r=0;r<f;){a=e[r++];if(a<128){l[n++]=a;continue}s=o[a];if(s>4){l[n++]=65533;r+=s-1;continue}a&=s===2?31:s===3?15:7;while(s>1&&r<f){a=a<<6|e[r++]&63;s--}if(s>1){l[n++]=65533;continue}if(a<65536){l[n++]=a}else{a-=65536;l[n++]=55296|a>>10&1023;l[n++]=56320|a&1023}}if(l.length!==n){if(l.subarray){l=l.subarray(0,n)}else{l.length=n}}return i.applyFromCharCode(l)};t.utf8encode=function utf8encode(e){if(n.nodebuffer){return a.newBufferFrom(e,"utf-8")}return l(e)};t.utf8decode=function utf8decode(e){if(n.nodebuffer){return i.transformTo("nodebuffer",e).toString("utf-8")}e=i.transformTo(n.uint8array?"uint8array":"array",e);return h(e)};function Utf8DecodeWorker(){s.call(this,"utf-8 decode");this.leftOver=null}i.inherits(Utf8DecodeWorker,s);Utf8DecodeWorker.prototype.processChunk=function(e){var r=i.transformTo(n.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(n.uint8array){var a=r;r=new Uint8Array(a.length+this.leftOver.length);r.set(this.leftOver,0);r.set(a,this.leftOver.length)}else{r=this.leftOver.concat(r)}this.leftOver=null}var s=u(r);var o=r;if(s!==r.length){if(n.uint8array){o=r.subarray(0,s);this.leftOver=r.subarray(s,r.length)}else{o=r.slice(0,s);this.leftOver=r.slice(s,r.length)}}this.push({data:t.utf8decode(o),meta:e.meta})};Utf8DecodeWorker.prototype.flush=function(){if(this.leftOver&&this.leftOver.length){this.push({data:t.utf8decode(this.leftOver),meta:{}});this.leftOver=null}};t.Utf8DecodeWorker=Utf8DecodeWorker;function Utf8EncodeWorker(){s.call(this,"utf-8 encode")}i.inherits(Utf8EncodeWorker,s);Utf8EncodeWorker.prototype.processChunk=function(e){this.push({data:t.utf8encode(e.data),meta:e.meta})};t.Utf8EncodeWorker=Utf8EncodeWorker},655:function(e){"use strict";var t=global.MutationObserver||global.WebKitMutationObserver;var r;if(process.browser){if(t){var i=0;var n=new t(nextTick);var a=global.document.createTextNode("");n.observe(a,{characterData:true});r=function(){a.data=i=++i%2}}else if(!global.setImmediate&&typeof global.MessageChannel!=="undefined"){var s=new global.MessageChannel;s.port1.onmessage=nextTick;r=function(){s.port2.postMessage(0)}}else if("document"in global&&"onreadystatechange"in global.document.createElement("script")){r=function(){var e=global.document.createElement("script");e.onreadystatechange=function(){nextTick();e.onreadystatechange=null;e.parentNode.removeChild(e);e=null};global.document.documentElement.appendChild(e)}}else{r=function(){setTimeout(nextTick,0)}}}else{r=function(){process.nextTick(nextTick)}}var o;var f=[];function nextTick(){o=true;var e,t;var r=f.length;while(r){t=f;f=[];e=-1;while(++e<r){t[e]()}r=f.length}o=false}e.exports=immediate;function immediate(e){if(f.push(e)===1&&!o){r()}}},669:function(e){e.exports=require("util")},674:function(e,t,r){"use strict";var i=r(149).Buffer;var n=i.isEncoding||function(e){e=""+e;switch(e&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return true;default:return false}};function _normalizeEncoding(e){if(!e)return"utf8";var t;while(true){switch(e){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return e;default:if(t)return;e=(""+e).toLowerCase();t=true}}}function normalizeEncoding(e){var t=_normalizeEncoding(e);if(typeof t!=="string"&&(i.isEncoding===n||!n(e)))throw new Error("Unknown encoding: "+e);return t||e}t.StringDecoder=StringDecoder;function StringDecoder(e){this.encoding=normalizeEncoding(e);var t;switch(this.encoding){case"utf16le":this.text=utf16Text;this.end=utf16End;t=4;break;case"utf8":this.fillLast=utf8FillLast;t=4;break;case"base64":this.text=base64Text;this.end=base64End;t=3;break;default:this.write=simpleWrite;this.end=simpleEnd;return}this.lastNeed=0;this.lastTotal=0;this.lastChar=i.allocUnsafe(t)}StringDecoder.prototype.write=function(e){if(e.length===0)return"";var t;var r;if(this.lastNeed){t=this.fillLast(e);if(t===undefined)return"";r=this.lastNeed;this.lastNeed=0}else{r=0}if(r<e.length)return t?t+this.text(e,r):this.text(e,r);return t||""};StringDecoder.prototype.end=utf8End;StringDecoder.prototype.text=utf8Text;StringDecoder.prototype.fillLast=function(e){if(this.lastNeed<=e.length){e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal)}e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,e.length);this.lastNeed-=e.length};function utf8CheckByte(e){if(e<=127)return 0;else if(e>>5===6)return 2;else if(e>>4===14)return 3;else if(e>>3===30)return 4;return e>>6===2?-1:-2}function utf8CheckIncomplete(e,t,r){var i=t.length-1;if(i<r)return 0;var n=utf8CheckByte(t[i]);if(n>=0){if(n>0)e.lastNeed=n-1;return n}if(--i<r||n===-2)return 0;n=utf8CheckByte(t[i]);if(n>=0){if(n>0)e.lastNeed=n-2;return n}if(--i<r||n===-2)return 0;n=utf8CheckByte(t[i]);if(n>=0){if(n>0){if(n===2)n=0;else e.lastNeed=n-3}return n}return 0}function utf8CheckExtraBytes(e,t,r){if((t[0]&192)!==128){e.lastNeed=0;return"�"}if(e.lastNeed>1&&t.length>1){if((t[1]&192)!==128){e.lastNeed=1;return"�"}if(e.lastNeed>2&&t.length>2){if((t[2]&192)!==128){e.lastNeed=2;return"�"}}}}function utf8FillLast(e){var t=this.lastTotal-this.lastNeed;var r=utf8CheckExtraBytes(this,e,t);if(r!==undefined)return r;if(this.lastNeed<=e.length){e.copy(this.lastChar,t,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal)}e.copy(this.lastChar,t,0,e.length);this.lastNeed-=e.length}function utf8Text(e,t){var r=utf8CheckIncomplete(this,e,t);if(!this.lastNeed)return e.toString("utf8",t);this.lastTotal=r;var i=e.length-(r-this.lastNeed);e.copy(this.lastChar,0,i);return e.toString("utf8",t,i)}function utf8End(e){var t=e&&e.length?this.write(e):"";if(this.lastNeed)return t+"�";return t}function utf16Text(e,t){if((e.length-t)%2===0){var r=e.toString("utf16le",t);if(r){var i=r.charCodeAt(r.length-1);if(i>=55296&&i<=56319){this.lastNeed=2;this.lastTotal=4;this.lastChar[0]=e[e.length-2];this.lastChar[1]=e[e.length-1];return r.slice(0,-1)}}return r}this.lastNeed=1;this.lastTotal=2;this.lastChar[0]=e[e.length-1];return e.toString("utf16le",t,e.length-1)}function utf16End(e){var t=e&&e.length?this.write(e):"";if(this.lastNeed){var r=this.lastTotal-this.lastNeed;return t+this.lastChar.toString("utf16le",0,r)}return t}function base64Text(e,t){var r=(e.length-t)%3;if(r===0)return e.toString("base64",t);this.lastNeed=3-r;this.lastTotal=3;if(r===1){this.lastChar[0]=e[e.length-1]}else{this.lastChar[0]=e[e.length-2];this.lastChar[1]=e[e.length-1]}return e.toString("base64",t,e.length-r)}function base64End(e){var t=e&&e.length?this.write(e):"";if(this.lastNeed)return t+this.lastChar.toString("base64",0,3-this.lastNeed);return t}function simpleWrite(e){return e.toString(this.encoding)}function simpleEnd(e){return e&&e.length?this.write(e):""}},676:function(e,t,r){const i=r(929);const n=r(687);var a=new i;const s={page:"https://blog-console-api.csdn.net/v1/article/list?page=",article:"https://blog-console-api.csdn.net/v1/editor/getArticle?id="};const o=e=>`${s.page}${e}`;const f=e=>`${s.article}${e}`;var l=1;async function nextPage(e){const t=o(e);let r=await(await fetch(t)).json();if(!r.data.list||r.data.list.length===0)return;if(r.code!==200){alert("导出失败。未登录或API已变动。查看Console,前去提交issue吧")}let i=r.data.total;for(info of r.data.list){const e=f(info.ArticleId);let t=await(await fetch(e)).json();const r=t.data.title.replace(/\/|\\/g,"_");a.file(`${r}.md`,t.data.markdowncontent);document.title=`📦 [${l++}/${i}] 已打包`}await nextPage(e+1)}nextPage(1).then(e=>{a.generateAsync({type:"blob"}).then(function(e){n.saveAs(e,"csdn-blog-md.zip")})})},685:function(e,t,r){"use strict";var i=r(999);var n=15;var a=852;var s=592;var o=0;var f=1;var l=2;var u=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0];var h=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78];var d=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0];var c=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function inflate_table(e,t,r,p,v,_,b,m){var g=m.bits;var w=0;var y=0;var k=0,S=0;var x=0;var E=0;var C=0;var R=0;var T=0;var A=0;var B;var z;var I;var O;var D;var N=null;var L=0;var F;var W=new i.Buf16(n+1);var P=new i.Buf16(n+1);var j=null;var U=0;var M,Z,H;for(w=0;w<=n;w++){W[w]=0}for(y=0;y<p;y++){W[t[r+y]]++}x=g;for(S=n;S>=1;S--){if(W[S]!==0){break}}if(x>S){x=S}if(S===0){v[_++]=1<<24|64<<16|0;v[_++]=1<<24|64<<16|0;m.bits=1;return 0}for(k=1;k<S;k++){if(W[k]!==0){break}}if(x<k){x=k}R=1;for(w=1;w<=n;w++){R<<=1;R-=W[w];if(R<0){return-1}}if(R>0&&(e===o||S!==1)){return-1}P[1]=0;for(w=1;w<n;w++){P[w+1]=P[w]+W[w]}for(y=0;y<p;y++){if(t[r+y]!==0){b[P[t[r+y]]++]=y}}if(e===o){N=j=b;F=19}else if(e===f){N=u;L-=257;j=h;U-=257;F=256}else{N=d;j=c;F=-1}A=0;y=0;w=k;D=_;E=x;C=0;I=-1;T=1<<x;O=T-1;if(e===f&&T>a||e===l&&T>s){return 1}for(;;){M=w-C;if(b[y]<F){Z=0;H=b[y]}else if(b[y]>F){Z=j[U+b[y]];H=N[L+b[y]]}else{Z=32+64;H=0}B=1<<w-C;z=1<<E;k=z;do{z-=B;v[D+(A>>C)+z]=M<<24|Z<<16|H|0}while(z!==0);B=1<<w-1;while(A&B){B>>=1}if(B!==0){A&=B-1;A+=B}else{A=0}y++;if(--W[w]===0){if(w===S){break}w=t[r+b[y]]}if(w>x&&(A&O)!==I){if(C===0){C=x}D+=k;E=w-C;R=1<<E;while(E+C<S){R-=W[E+C];if(R<=0){break}E++;R<<=1}T+=1<<E;if(e===f&&T>a||e===l&&T>s){return 1}I=A&O;v[I]=x<<24|E<<16|D-_|0}}if(A!==0){v[D+A]=w-C<<24|64<<16|0}m.bits=x;return 0}},686:function(e,t,r){"use strict";var i=r(100);var n=r(130);var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.encode=function(e){var t=[];var r,n,s,o,f,l,u;var h=0,d=e.length,c=d;var p=i.getTypeOf(e)!=="string";while(h<e.length){c=d-h;if(!p){r=e.charCodeAt(h++);n=h<d?e.charCodeAt(h++):0;s=h<d?e.charCodeAt(h++):0}else{r=e[h++];n=h<d?e[h++]:0;s=h<d?e[h++]:0}o=r>>2;f=(r&3)<<4|n>>4;l=c>1?(n&15)<<2|s>>6:64;u=c>2?s&63:64;t.push(a.charAt(o)+a.charAt(f)+a.charAt(l)+a.charAt(u))}return t.join("")};t.decode=function(e){var t,r,i;var s,o,f,l;var u=0,h=0;var d="data:";if(e.substr(0,d.length)===d){throw new Error("Invalid base64 input, it looks like a data url.")}e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");var c=e.length*3/4;if(e.charAt(e.length-1)===a.charAt(64)){c--}if(e.charAt(e.length-2)===a.charAt(64)){c--}if(c%1!==0){throw new Error("Invalid base64 input, bad content length.")}var p;if(n.uint8array){p=new Uint8Array(c|0)}else{p=new Array(c|0)}while(u<e.length){s=a.indexOf(e.charAt(u++));o=a.indexOf(e.charAt(u++));f=a.indexOf(e.charAt(u++));l=a.indexOf(e.charAt(u++));t=s<<2|o>>4;r=(o&15)<<4|f>>2;i=(f&3)<<6|l;p[h++]=t;if(f!==64){p[h++]=r}if(l!==64){p[h++]=i}}return p}},687:function(t){(function(e,t){if("function"==typeof define&&define.amd)define([],t);else if(true)t();else{}})(this,function(){"use strict";function b(e,t){return"undefined"==typeof t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function c(e,t,r){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){i(n.response,t,r)},n.onerror=function(){console.error("could not download file")},n.send()}function d(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function e(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(r){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var r="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,i=r.saveAs||("object"!=typeof window||window!==r?function(){}:"download"in HTMLAnchorElement.prototype?function(t,i,n){var a=r.URL||r.webkitURL,s=document.createElement("a");i=i||t.name||"download",s.download=i,s.rel="noopener","string"==typeof t?(s.href=t,s.origin===location.origin?e(s):d(s.href)?c(t,i,n):e(s,s.target="_blank")):(s.href=a.createObjectURL(t),setTimeout(function(){a.revokeObjectURL(s.href)},4e4),setTimeout(function(){e(s)},0))}:"msSaveOrOpenBlob"in navigator?function(t,r,i){if(r=r||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(b(t,i),r);else if(d(t))c(t,r,i);else{var n=document.createElement("a");n.href=t,n.target="_blank",setTimeout(function(){e(n)})}}:function(e,t,i,n){if(n=n||open("","_blank"),n&&(n.document.title=n.document.body.innerText="downloading..."),"string"==typeof e)return c(e,t,i);var a="application/octet-stream"===e.type,s=/constructor/i.test(r.HTMLElement)||r.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent);if((o||a&&s)&&"object"==typeof FileReader){var f=new FileReader;f.onloadend=function(){var e=f.result;e=o?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=e:location=e,n=null},f.readAsDataURL(e)}else{var l=r.URL||r.webkitURL,u=l.createObjectURL(e);n?n.location=u:location.href=u,n=null,setTimeout(function(){l.revokeObjectURL(u)},4e4)}});r.saveAs=i.saveAs=i,true&&(t.exports=i)})},689:function(e,t,r){try{var i=r(669);if(typeof i.inherits!=="function")throw"";e.exports=i.inherits}catch(t){e.exports=r(315)}},691:function(e){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},720:function(e,t,r){"use strict";var i=r(28);var n=r(100);function Uint8ArrayReader(e){i.call(this,e)}n.inherits(Uint8ArrayReader,i);Uint8ArrayReader.prototype.readData=function(e){this.checkOffset(e);if(e===0){return new Uint8Array(0)}var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);this.index+=e;return t};e.exports=Uint8ArrayReader},734:function(e,t,r){"use strict";var i=r(720);var n=r(100);function NodeBufferReader(e){i.call(this,e)}n.inherits(NodeBufferReader,i);NodeBufferReader.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);this.index+=e;return t};e.exports=NodeBufferReader},774:function(e,t,r){"use strict";var i=r(967);var n=r(780);var a=r(100);function Crc32Probe(){i.call(this,"Crc32Probe");this.withStreamInfo("crc32",0)}a.inherits(Crc32Probe,i);Crc32Probe.prototype.processChunk=function(e){this.streamInfo.crc32=n(e.data,this.streamInfo.crc32||0);this.push(e)};e.exports=Crc32Probe},780:function(e,t,r){"use strict";var i=r(100);function makeTable(){var e,t=[];for(var r=0;r<256;r++){e=r;for(var i=0;i<8;i++){e=e&1?3988292384^e>>>1:e>>>1}t[r]=e}return t}var n=makeTable();function crc32(e,t,r,i){var a=n,s=i+r;e=e^-1;for(var o=i;o<s;o++){e=e>>>8^a[(e^t[o])&255]}return e^-1}function crc32str(e,t,r,i){var a=n,s=i+r;e=e^-1;for(var o=i;o<s;o++){e=e>>>8^a[(e^t.charCodeAt(o))&255]}return e^-1}e.exports=function crc32wrapper(e,t){if(typeof e==="undefined"||!e.length){return 0}var r=i.getTypeOf(e)!=="string";if(r){return crc32(t|0,e,e.length,0)}else{return crc32str(t|0,e,e.length,0)}}},806:function(e,t,r){"use strict";var i=r(628);var n=r(100);var a=r(967);var s=r(824);var o=r(292);var f=r(186);var l=r(557);var u=r(501);var h=r(499);var d=r(881);var c=function(e,t,r){var i=n.getTypeOf(t),s;var u=n.extend(r||{},o);u.date=u.date||new Date;if(u.compression!==null){u.compression=u.compression.toUpperCase()}if(typeof u.unixPermissions==="string"){u.unixPermissions=parseInt(u.unixPermissions,8)}if(u.unixPermissions&&u.unixPermissions&16384){u.dir=true}if(u.dosPermissions&&u.dosPermissions&16){u.dir=true}if(u.dir){e=v(e)}if(u.createFolders&&(s=p(e))){_.call(this,s,true)}var c=i==="string"&&u.binary===false&&u.base64===false;if(!r||typeof r.binary==="undefined"){u.binary=!c}var b=t instanceof f&&t.uncompressedSize===0;if(b||u.dir||!t||t.length===0){u.base64=false;u.binary=true;t="";u.compression="STORE";i="string"}var m=null;if(t instanceof f||t instanceof a){m=t}else if(h.isNode&&h.isStream(t)){m=new d(e,t)}else{m=n.prepareContent(e,t,u.binary,u.optimizedBinaryString,u.base64)}var g=new l(e,m,u);this.files[e]=g};var p=function(e){if(e.slice(-1)==="/"){e=e.substring(0,e.length-1)}var t=e.lastIndexOf("/");return t>0?e.substring(0,t):""};var v=function(e){if(e.slice(-1)!=="/"){e+="/"}return e};var _=function(e,t){t=typeof t!=="undefined"?t:o.createFolders;e=v(e);if(!this.files[e]){c.call(this,e,null,{dir:true,createFolders:t})}return this.files[e]};function isRegExp(e){return Object.prototype.toString.call(e)==="[object RegExp]"}var b={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,i;for(t in this.files){if(!this.files.hasOwnProperty(t)){continue}i=this.files[t];r=t.slice(this.root.length,t.length);if(r&&t.slice(0,this.root.length)===this.root){e(r,i)}}},filter:function(e){var t=[];this.forEach(function(r,i){if(e(r,i)){t.push(i)}});return t},file:function(e,t,r){if(arguments.length===1){if(isRegExp(e)){var i=e;return this.filter(function(e,t){return!t.dir&&i.test(e)})}else{var n=this.files[this.root+e];if(n&&!n.dir){return n}else{return null}}}else{e=this.root+e;c.call(this,e,t,r)}return this},folder:function(e){if(!e){return this}if(isRegExp(e)){return this.filter(function(t,r){return r.dir&&e.test(t)})}var t=this.root+e;var r=_.call(this,t);var i=this.clone();i.root=r.name;return i},remove:function(e){e=this.root+e;var t=this.files[e];if(!t){if(e.slice(-1)!=="/"){e+="/"}t=this.files[e]}if(t&&!t.dir){delete this.files[e]}else{var r=this.filter(function(t,r){return r.name.slice(0,e.length)===e});for(var i=0;i<r.length;i++){delete this.files[r[i].name]}}return this},generate:function(e){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{r=n.extend(e||{},{streamFiles:false,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode});r.type=r.type.toLowerCase();r.compression=r.compression.toUpperCase();if(r.type==="binarystring"){r.type="string"}if(!r.type){throw new Error("No output type specified.")}n.checkSupport(r.type);if(r.platform==="darwin"||r.platform==="freebsd"||r.platform==="linux"||r.platform==="sunos"){r.platform="UNIX"}if(r.platform==="win32"){r.platform="DOS"}var o=r.comment||this.comment||"";t=u.generateWorker(this,r,o)}catch(e){t=new a("error");t.error(e)}return new s(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){e=e||{};if(!e.type){e.type="nodebuffer"}return this.generateInternalStream(e).toNodejsStream(t)}};e.exports=b},822:function(e){"use strict";if(typeof process==="undefined"||!process.version||process.version.indexOf("v0.")===0||process.version.indexOf("v1.")===0&&process.version.indexOf("v1.8.")!==0){e.exports={nextTick:nextTick}}else{e.exports=process}function nextTick(e,t,r,i){if(typeof e!=="function"){throw new TypeError('"callback" argument must be a function')}var n=arguments.length;var a,s;switch(n){case 0:case 1:return process.nextTick(e);case 2:return process.nextTick(function afterTickOne(){e.call(null,t)});case 3:return process.nextTick(function afterTickTwo(){e.call(null,t,r)});case 4:return process.nextTick(function afterTickThree(){e.call(null,t,r,i)});default:a=new Array(n-1);s=0;while(s<a.length){a[s++]=arguments[s]}return process.nextTick(function afterTick(){e.apply(null,a)})}}},824:function(e,t,r){"use strict";var i=r(100);var n=r(603);var a=r(967);var s=r(686);var o=r(130);var f=r(438);var l=null;if(o.nodestream){try{l=r(564)}catch(e){}}function transformZipOutput(e,t,r){switch(e){case"blob":return i.newBlob(i.transformTo("arraybuffer",t),r);case"base64":return s.encode(t);default:return i.transformTo(e,t)}}function concat(e,t){var r,i=0,n=null,a=0;for(r=0;r<t.length;r++){a+=t[r].length}switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":n=new Uint8Array(a);for(r=0;r<t.length;r++){n.set(t[r],i);i+=t[r].length}return n;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}function accumulate(e,t){return new f.Promise(function(r,i){var n=[];var a=e._internalType,s=e._outputType,o=e._mimeType;e.on("data",function(e,r){n.push(e);if(t){t(r)}}).on("error",function(e){n=[];i(e)}).on("end",function(){try{var e=transformZipOutput(s,concat(a,n),o);r(e)}catch(e){i(e)}n=[]}).resume()})}function StreamHelper(e,t,r){var s=t;switch(t){case"blob":case"arraybuffer":s="uint8array";break;case"base64":s="string";break}try{this._internalType=s;this._outputType=t;this._mimeType=r;i.checkSupport(s);this._worker=e.pipe(new n(s));e.lock()}catch(e){this._worker=new a("error");this._worker.error(e)}}StreamHelper.prototype={accumulate:function(e){return accumulate(this,e)},on:function(e,t){var r=this;if(e==="data"){this._worker.on(e,function(e){t.call(r,e.data,e.meta)})}else{this._worker.on(e,function(){i.delay(t,arguments,r)})}return this},resume:function(){i.delay(this._worker.resume,[],this._worker);return this},pause:function(){this._worker.pause();return this},toNodejsStream:function(e){i.checkSupport("nodestream");if(this._outputType!=="nodebuffer"){throw new Error(this._outputType+" is not supported by this method")}return new l(this,{objectMode:this._outputType!=="nodebuffer"},e)}};e.exports=StreamHelper},828:function(e,t,r){"use strict";var i=r(967);t.STORE={magic:"\0\0",compressWorker:function(e){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}};t.DEFLATE=r(225)},831:function(e,t,r){"use strict";var i=r(822);var n=Object.keys||function(e){var t=[];for(var r in e){t.push(r)}return t};e.exports=Duplex;var a=Object.create(r(286));a.inherits=r(689);var s=r(226);var o=r(241);a.inherits(Duplex,s);{var f=n(o.prototype);for(var l=0;l<f.length;l++){var u=f[l];if(!Duplex.prototype[u])Duplex.prototype[u]=o.prototype[u]}}function Duplex(e){if(!(this instanceof Duplex))return new Duplex(e);s.call(this,e);o.call(this,e);if(e&&e.readable===false)this.readable=false;if(e&&e.writable===false)this.writable=false;this.allowHalfOpen=true;if(e&&e.allowHalfOpen===false)this.allowHalfOpen=false;this.once("end",onend)}Object.defineProperty(Duplex.prototype,"writableHighWaterMark",{enumerable:false,get:function(){return this._writableState.highWaterMark}});function onend(){if(this.allowHalfOpen||this._writableState.ended)return;i.nextTick(onEndNT,this)}function onEndNT(e){e.end()}Object.defineProperty(Duplex.prototype,"destroyed",{get:function(){if(this._readableState===undefined||this._writableState===undefined){return false}return this._readableState.destroyed&&this._writableState.destroyed},set:function(e){if(this._readableState===undefined||this._writableState===undefined){return}this._readableState.destroyed=e;this._writableState.destroyed=e}});Duplex.prototype._destroy=function(e,t){this.push(null);this.end();i.nextTick(t,e)}},832:function(e,t,r){"use strict";var i=r(401);var n=r(999);var a=r(279);var s=r(691);var o=r(868);var f=r(991);var l=r(969);var u=Object.prototype.toString;function Inflate(e){if(!(this instanceof Inflate))return new Inflate(e);this.options=n.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;if(t.raw&&t.windowBits>=0&&t.windowBits<16){t.windowBits=-t.windowBits;if(t.windowBits===0){t.windowBits=-15}}if(t.windowBits>=0&&t.windowBits<16&&!(e&&e.windowBits)){t.windowBits+=32}if(t.windowBits>15&&t.windowBits<48){if((t.windowBits&15)===0){t.windowBits|=15}}this.err=0;this.msg="";this.ended=false;this.chunks=[];this.strm=new f;this.strm.avail_out=0;var r=i.inflateInit2(this.strm,t.windowBits);if(r!==s.Z_OK){throw new Error(o[r])}this.header=new l;i.inflateGetHeader(this.strm,this.header);if(t.dictionary){if(typeof t.dictionary==="string"){t.dictionary=a.string2buf(t.dictionary)}else if(u.call(t.dictionary)==="[object ArrayBuffer]"){t.dictionary=new Uint8Array(t.dictionary)}if(t.raw){r=i.inflateSetDictionary(this.strm,t.dictionary);if(r!==s.Z_OK){throw new Error(o[r])}}}}Inflate.prototype.push=function(e,t){var r=this.strm;var o=this.options.chunkSize;var f=this.options.dictionary;var l,h;var d,c,p;var v=false;if(this.ended){return false}h=t===~~t?t:t===true?s.Z_FINISH:s.Z_NO_FLUSH;if(typeof e==="string"){r.input=a.binstring2buf(e)}else if(u.call(e)==="[object ArrayBuffer]"){r.input=new Uint8Array(e)}else{r.input=e}r.next_in=0;r.avail_in=r.input.length;do{if(r.avail_out===0){r.output=new n.Buf8(o);r.next_out=0;r.avail_out=o}l=i.inflate(r,s.Z_NO_FLUSH);if(l===s.Z_NEED_DICT&&f){l=i.inflateSetDictionary(this.strm,f)}if(l===s.Z_BUF_ERROR&&v===true){l=s.Z_OK;v=false}if(l!==s.Z_STREAM_END&&l!==s.Z_OK){this.onEnd(l);this.ended=true;return false}if(r.next_out){if(r.avail_out===0||l===s.Z_STREAM_END||r.avail_in===0&&(h===s.Z_FINISH||h===s.Z_SYNC_FLUSH)){if(this.options.to==="string"){d=a.utf8border(r.output,r.next_out);c=r.next_out-d;p=a.buf2string(r.output,d);r.next_out=c;r.avail_out=o-c;if(c){n.arraySet(r.output,r.output,d,c,0)}this.onData(p)}else{this.onData(n.shrinkBuf(r.output,r.next_out))}}}if(r.avail_in===0&&r.avail_out===0){v=true}}while((r.avail_in>0||r.avail_out===0)&&l!==s.Z_STREAM_END);if(l===s.Z_STREAM_END){h=s.Z_FINISH}if(h===s.Z_FINISH){l=i.inflateEnd(this.strm);this.onEnd(l);this.ended=true;return l===s.Z_OK}if(h===s.Z_SYNC_FLUSH){this.onEnd(s.Z_OK);r.avail_out=0;return true}return true};Inflate.prototype.onData=function(e){this.chunks.push(e)};Inflate.prototype.onEnd=function(e){if(e===s.Z_OK){if(this.options.to==="string"){this.result=this.chunks.join("")}else{this.result=n.flattenChunks(this.chunks)}}this.chunks=[];this.err=e;this.msg=this.strm.msg};function inflate(e,t){var r=new Inflate(t);r.push(e,true);if(r.err){throw r.msg||o[r.err]}return r.result}function inflateRaw(e,t){t=t||{};t.raw=true;return inflate(e,t)}t.Inflate=Inflate;t.inflate=inflate;t.inflateRaw=inflateRaw;t.ungzip=inflate},868:function(e){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},881:function(e,t,r){"use strict";var i=r(100);var n=r(967);function NodejsStreamInputAdapter(e,t){n.call(this,"Nodejs stream input adapter for "+e);this._upstreamEnded=false;this._bindStream(t)}i.inherits(NodejsStreamInputAdapter,n);NodejsStreamInputAdapter.prototype._bindStream=function(e){var t=this;this._stream=e;e.pause();e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){if(t.isPaused){this.generatedError=e}else{t.error(e)}}).on("end",function(){if(t.isPaused){t._upstreamEnded=true}else{t.end()}})};NodejsStreamInputAdapter.prototype.pause=function(){if(!n.prototype.pause.call(this)){return false}this._stream.pause();return true};NodejsStreamInputAdapter.prototype.resume=function(){if(!n.prototype.resume.call(this)){return false}if(this._upstreamEnded){this.end()}else{this._stream.resume()}return true};e.exports=NodejsStreamInputAdapter},882:function(e,t,r){"use strict";e.exports=PassThrough;var i=r(925);var n=Object.create(r(286));n.inherits=r(689);n.inherits(PassThrough,i);function PassThrough(e){if(!(this instanceof PassThrough))return new PassThrough(e);i.call(this,e)}PassThrough.prototype._transform=function(e,t,r){r(null,e)}},886:function(e,t,r){"use strict";var i=r(100);var n=r(967);function DataLengthProbe(e){n.call(this,"DataLengthProbe for "+e);this.propName=e;this.withStreamInfo(e,0)}i.inherits(DataLengthProbe,n);DataLengthProbe.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}n.prototype.processChunk.call(this,e)};e.exports=DataLengthProbe},917:function(e,t,r){e.exports=r(669).deprecate},925:function(e,t,r){"use strict";e.exports=Transform;var i=r(831);var n=Object.create(r(286));n.inherits=r(689);n.inherits(Transform,i);function afterTransform(e,t){var r=this._transformState;r.transforming=false;var i=r.writecb;if(!i){return this.emit("error",new Error("write callback called multiple times"))}r.writechunk=null;r.writecb=null;if(t!=null)this.push(t);i(e);var n=this._readableState;n.reading=false;if(n.needReadable||n.length<n.highWaterMark){this._read(n.highWaterMark)}}function Transform(e){if(!(this instanceof Transform))return new Transform(e);i.call(this,e);this._transformState={afterTransform:afterTransform.bind(this),needTransform:false,transforming:false,writecb:null,writechunk:null,writeencoding:null};this._readableState.needReadable=true;this._readableState.sync=false;if(e){if(typeof e.transform==="function")this._transform=e.transform;if(typeof e.flush==="function")this._flush=e.flush}this.on("prefinish",prefinish)}function prefinish(){var e=this;if(typeof this._flush==="function"){this._flush(function(t,r){done(e,t,r)})}else{done(this,null,null)}}Transform.prototype.push=function(e,t){this._transformState.needTransform=false;return i.prototype.push.call(this,e,t)};Transform.prototype._transform=function(e,t,r){throw new Error("_transform() is not implemented")};Transform.prototype._write=function(e,t,r){var i=this._transformState;i.writecb=r;i.writechunk=e;i.writeencoding=t;if(!i.transforming){var n=this._readableState;if(i.needTransform||n.needReadable||n.length<n.highWaterMark)this._read(n.highWaterMark)}};Transform.prototype._read=function(e){var t=this._transformState;if(t.writechunk!==null&&t.writecb&&!t.transforming){t.transforming=true;this._transform(t.writechunk,t.writeencoding,t.afterTransform)}else{t.needTransform=true}};Transform.prototype._destroy=function(e,t){var r=this;i.prototype._destroy.call(this,e,function(e){t(e);r.emit("close")})};function done(e,t,r){if(t)return e.emit("error",t);if(r!=null)e.push(r);if(e._writableState.length)throw new Error("Calling transform done when ws.length != 0");if(e._transformState.transforming)throw new Error("Calling transform done when still transforming");return e.push(null)}},929:function(e,t,r){"use strict";function JSZip(){if(!(this instanceof JSZip)){return new JSZip}if(arguments.length){throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.")}this.files={};this.comment=null;this.root="";this.clone=function(){var e=new JSZip;for(var t in this){if(typeof this[t]!=="function"){e[t]=this[t]}}return e}}JSZip.prototype=r(806);JSZip.prototype.loadAsync=r(38);JSZip.support=r(130);JSZip.defaults=r(292);JSZip.version="3.2.0";JSZip.loadAsync=function(e,t){return(new JSZip).loadAsync(e,t)};JSZip.external=r(438);e.exports=JSZip},931:function(e,t,r){"use strict";function _classCallCheck(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var i=r(149).Buffer;var n=r(669);function copyBuffer(e,t,r){e.copy(t,r)}e.exports=function(){function BufferList(){_classCallCheck(this,BufferList);this.head=null;this.tail=null;this.length=0}BufferList.prototype.push=function push(e){var t={data:e,next:null};if(this.length>0)this.tail.next=t;else this.head=t;this.tail=t;++this.length};BufferList.prototype.unshift=function unshift(e){var t={data:e,next:this.head};if(this.length===0)this.tail=t;this.head=t;++this.length};BufferList.prototype.shift=function shift(){if(this.length===0)return;var e=this.head.data;if(this.length===1)this.head=this.tail=null;else this.head=this.head.next;--this.length;return e};BufferList.prototype.clear=function clear(){this.head=this.tail=null;this.length=0};BufferList.prototype.join=function join(e){if(this.length===0)return"";var t=this.head;var r=""+t.data;while(t=t.next){r+=e+t.data}return r};BufferList.prototype.concat=function concat(e){if(this.length===0)return i.alloc(0);if(this.length===1)return this.head.data;var t=i.allocUnsafe(e>>>0);var r=this.head;var n=0;while(r){copyBuffer(r.data,t,n);n+=r.data.length;r=r.next}return t};return BufferList}();if(n&&n.inspect&&n.inspect.custom){e.exports.prototype[n.inspect.custom]=function(){var e=n.inspect({length:this.length});return this.constructor.name+" "+e}}},967:function(e){"use strict";function GenericWorker(e){this.name=e||"default";this.streamInfo={};this.generatedError=null;this.extraStreamInfo={};this.isPaused=true;this.isFinished=false;this.isLocked=false;this._listeners={data:[],end:[],error:[]};this.previous=null}GenericWorker.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished){return false}this.flush();try{this.emit("end");this.cleanUp();this.isFinished=true}catch(e){this.emit("error",e)}return true},error:function(e){if(this.isFinished){return false}if(this.isPaused){this.generatedError=e}else{this.isFinished=true;this.emit("error",e);if(this.previous){this.previous.error(e)}this.cleanUp()}return true},on:function(e,t){this._listeners[e].push(t);return this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null;this._listeners=[]},emit:function(e,t){if(this._listeners[e]){for(var r=0;r<this._listeners[e].length;r++){this._listeners[e][r].call(this,t)}}},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked){throw new Error("The stream '"+this+"' has already been used.")}this.streamInfo=e.streamInfo;this.mergeStreamInfo();this.previous=e;var t=this;e.on("data",function(e){t.processChunk(e)});e.on("end",function(){t.end()});e.on("error",function(e){t.error(e)});return this},pause:function(){if(this.isPaused||this.isFinished){return false}this.isPaused=true;if(this.previous){this.previous.pause()}return true},resume:function(){if(!this.isPaused||this.isFinished){return false}this.isPaused=false;var e=false;if(this.generatedError){this.error(this.generatedError);e=true}if(this.previous){this.previous.resume()}return!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){this.extraStreamInfo[e]=t;this.mergeStreamInfo();return this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo){if(!this.extraStreamInfo.hasOwnProperty(e)){continue}this.streamInfo[e]=this.extraStreamInfo[e]}},lock:function(){if(this.isLocked){throw new Error("The stream '"+this+"' has already been used.")}this.isLocked=true;if(this.previous){this.previous.lock()}},toString:function(){var e="Worker "+this.name;if(this.previous){return this.previous+" -> "+e}else{return e}}};e.exports=GenericWorker},969:function(e){"use strict";function GZheader(){this.text=0;this.time=0;this.xflags=0;this.os=0;this.extra=null;this.extra_len=0;this.name="";this.comment="";this.hcrc=0;this.done=false}e.exports=GZheader},991:function(e){"use strict";function ZStream(){this.input=null;this.next_in=0;this.avail_in=0;this.total_in=0;this.output=null;this.next_out=0;this.avail_out=0;this.total_out=0;this.msg="";this.state=null;this.data_type=2;this.adler=0}e.exports=ZStream},999:function(e,t){"use strict";var r=typeof Uint8Array!=="undefined"&&typeof Uint16Array!=="undefined"&&typeof Int32Array!=="undefined";function _has(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.assign=function(e){var t=Array.prototype.slice.call(arguments,1);while(t.length){var r=t.shift();if(!r){continue}if(typeof r!=="object"){throw new TypeError(r+"must be non-object")}for(var i in r){if(_has(r,i)){e[i]=r[i]}}}return e};t.shrinkBuf=function(e,t){if(e.length===t){return e}if(e.subarray){return e.subarray(0,t)}e.length=t;return e};var i={arraySet:function(e,t,r,i,n){if(t.subarray&&e.subarray){e.set(t.subarray(r,r+i),n);return}for(var a=0;a<i;a++){e[n+a]=t[r+a]}},flattenChunks:function(e){var t,r,i,n,a,s;i=0;for(t=0,r=e.length;t<r;t++){i+=e[t].length}s=new Uint8Array(i);n=0;for(t=0,r=e.length;t<r;t++){a=e[t];s.set(a,n);n+=a.length}return s}};var n={arraySet:function(e,t,r,i,n){for(var a=0;a<i;a++){e[n+a]=t[r+a]}},flattenChunks:function(e){return[].concat.apply([],e)}};t.setTyped=function(e){if(e){t.Buf8=Uint8Array;t.Buf16=Uint16Array;t.Buf32=Int32Array;t.assign(t,i)}else{t.Buf8=Array;t.Buf16=Array;t.Buf32=Array;t.assign(t,n)}};t.setTyped(r)}});
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],require("timers").setImmediate,"/dist/module")
},{"_process":16,"buffer":4,"events":5,"stream":31,"timers":6,"util":9}],2:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? Symbol.for('nodejs.util.inspect.custom')
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

}).call(this,require("buffer").Buffer)
},{"base64-js":2,"buffer":4,"ieee754":11}],5:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],6:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":16,"timers":6}],7:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],8:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],9:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":8,"_process":16,"inherits":7}],10:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":13}],11:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],12:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],13:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],14:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],15:[function(require,module,exports){
(function (process){
'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


}).call(this,require('_process'))
},{"_process":16}],16:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],17:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":18}],18:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};
},{"./_stream_readable":20,"./_stream_writable":22,"core-util-is":10,"inherits":12,"process-nextick-args":15}],19:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":21,"core-util-is":10,"inherits":12}],20:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":18,"./internal/streams/BufferList":23,"./internal/streams/destroy":24,"./internal/streams/stream":25,"_process":16,"core-util-is":10,"events":5,"inherits":12,"isarray":14,"process-nextick-args":15,"safe-buffer":30,"string_decoder/":32,"util":3}],21:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":18,"core-util-is":10,"inherits":12}],22:[function(require,module,exports){
(function (process,global,setImmediate){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"./_stream_duplex":18,"./internal/streams/destroy":24,"./internal/streams/stream":25,"_process":16,"core-util-is":10,"inherits":12,"process-nextick-args":15,"safe-buffer":30,"timers":6,"util-deprecate":33}],23:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
var util = require('util');

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
},{"safe-buffer":30,"util":3}],24:[function(require,module,exports){
'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":15}],25:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":5}],26:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":27}],27:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":18,"./lib/_stream_passthrough.js":19,"./lib/_stream_readable.js":20,"./lib/_stream_transform.js":21,"./lib/_stream_writable.js":22}],28:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":27}],29:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":22}],30:[function(require,module,exports){
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":4}],31:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":5,"inherits":12,"readable-stream/duplex.js":17,"readable-stream/passthrough.js":26,"readable-stream/readable.js":27,"readable-stream/transform.js":28,"readable-stream/writable.js":29}],32:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":30}],33:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
