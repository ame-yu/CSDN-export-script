(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,setImmediate,__dirname){(function (){
module.exports=function(e,i){"use strict";var r={};function __webpack_require__(i){if(r[i]){return r[i].exports}var a=r[i]={i:i,l:false,exports:{}};var n=true;try{e[i].call(a.exports,a,a.exports,__webpack_require__);n=false}finally{if(n)delete r[i]}a.l=true;return a.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(676)}return startup()}({28:function(e,i,r){"use strict";var a=r(206);var n=r(100);function ArrayReader(e){a.call(this,e);for(var i=0;i<this.data.length;i++){e[i]=e[i]&255}}n.inherits(ArrayReader,a);ArrayReader.prototype.byteAt=function(e){return this.data[this.zero+e]};ArrayReader.prototype.lastIndexOfSignature=function(e){var i=e.charCodeAt(0),r=e.charCodeAt(1),a=e.charCodeAt(2),n=e.charCodeAt(3);for(var t=this.length-4;t>=0;--t){if(this.data[t]===i&&this.data[t+1]===r&&this.data[t+2]===a&&this.data[t+3]===n){return t-this.zero}}return-1};ArrayReader.prototype.readAndCheckSignature=function(e){var i=e.charCodeAt(0),r=e.charCodeAt(1),a=e.charCodeAt(2),n=e.charCodeAt(3),t=this.readData(4);return i===t[0]&&r===t[1]&&a===t[2]&&n===t[3]};ArrayReader.prototype.readData=function(e){this.checkOffset(e);if(e===0){return[]}var i=this.data.slice(this.zero+this.index,this.zero+this.index+e);this.index+=e;return i};e.exports=ArrayReader},30:function(e,i){"use strict";i.LOCAL_FILE_HEADER="PK";i.CENTRAL_FILE_HEADER="PK";i.CENTRAL_DIRECTORY_END="PK";i.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK";i.ZIP64_CENTRAL_DIRECTORY_END="PK";i.DATA_DESCRIPTOR="PK\b"},38:function(e,i,r){"use strict";var a=r(100);var n=r(438);var t=r(628);var h=r(276);var l=r(774);var f=r(499);function checkEntryCRC32(e){return new n.Promise(function(i,r){var a=e.decompressed.getContentWorker().pipe(new l);a.on("error",function(e){r(e)}).on("end",function(){if(a.streamInfo.crc32!==e.decompressed.crc32){r(new Error("Corrupted zip : CRC32 mismatch"))}else{i()}}).resume()})}e.exports=function(e,i){var r=this;i=a.extend(i||{},{base64:false,checkCRC32:false,optimizedBinaryString:false,createFolders:false,decodeFileName:t.utf8decode});if(f.isNode&&f.isStream(e)){return n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."))}return a.prepareContent("the loaded zip file",e,true,i.optimizedBinaryString,i.base64).then(function(e){var r=new h(i);r.load(e);return r}).then(function checkCRC32(e){var r=[n.Promise.resolve(e)];var a=e.files;if(i.checkCRC32){for(var t=0;t<a.length;t++){r.push(checkEntryCRC32(a[t]))}}return n.Promise.all(r)}).then(function addFiles(e){var a=e.shift();var n=a.files;for(var t=0;t<n.length;t++){var h=n[t];r.file(h.fileNameStr,h.decompressed,{binary:true,optimizedBinaryString:true,date:h.date,dir:h.dir,comment:h.fileCommentStr.length?h.fileCommentStr:null,unixPermissions:h.unixPermissions,dosPermissions:h.dosPermissions,createFolders:i.createFolders})}if(a.zipComment.length){r.comment=a.zipComment}return r})}},43:function(e,i,r){"use strict";var a=r(999);var n=4;var t=0;var h=1;var l=2;function zero(e){var i=e.length;while(--i>=0){e[i]=0}}var f=0;var s=1;var d=2;var c=3;var v=258;var g=29;var y=256;var b=y+1+g;var k=30;var S=19;var u=2*b+1;var R=15;var C=16;var T=7;var E=256;var I=16;var A=17;var O=18;var B=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];var L=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];var W=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];var F=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];var D=512;var N=new Array((b+2)*2);zero(N);var P=new Array(k*2);zero(P);var U=new Array(D);zero(U);var j=new Array(v-c+1);zero(j);var Z=new Array(g);zero(Z);var z=new Array(k);zero(z);function StaticTreeDesc(e,i,r,a,n){this.static_tree=e;this.extra_bits=i;this.extra_base=r;this.elems=a;this.max_length=n;this.has_stree=e&&e.length}var M;var q;var K;function TreeDesc(e,i){this.dyn_tree=e;this.max_code=0;this.stat_desc=i}function d_code(e){return e<256?U[e]:U[256+(e>>>7)]}function put_short(e,i){e.pending_buf[e.pending++]=i&255;e.pending_buf[e.pending++]=i>>>8&255}function send_bits(e,i,r){if(e.bi_valid>C-r){e.bi_buf|=i<<e.bi_valid&65535;put_short(e,e.bi_buf);e.bi_buf=i>>C-e.bi_valid;e.bi_valid+=r-C}else{e.bi_buf|=i<<e.bi_valid&65535;e.bi_valid+=r}}function send_code(e,i,r){send_bits(e,r[i*2],r[i*2+1])}function bi_reverse(e,i){var r=0;do{r|=e&1;e>>>=1;r<<=1}while(--i>0);return r>>>1}function bi_flush(e){if(e.bi_valid===16){put_short(e,e.bi_buf);e.bi_buf=0;e.bi_valid=0}else if(e.bi_valid>=8){e.pending_buf[e.pending++]=e.bi_buf&255;e.bi_buf>>=8;e.bi_valid-=8}}function gen_bitlen(e,i){var r=i.dyn_tree;var a=i.max_code;var n=i.stat_desc.static_tree;var t=i.stat_desc.has_stree;var h=i.stat_desc.extra_bits;var l=i.stat_desc.extra_base;var f=i.stat_desc.max_length;var s;var d,c;var v;var g;var y;var b=0;for(v=0;v<=R;v++){e.bl_count[v]=0}r[e.heap[e.heap_max]*2+1]=0;for(s=e.heap_max+1;s<u;s++){d=e.heap[s];v=r[r[d*2+1]*2+1]+1;if(v>f){v=f;b++}r[d*2+1]=v;if(d>a){continue}e.bl_count[v]++;g=0;if(d>=l){g=h[d-l]}y=r[d*2];e.opt_len+=y*(v+g);if(t){e.static_len+=y*(n[d*2+1]+g)}}if(b===0){return}do{v=f-1;while(e.bl_count[v]===0){v--}e.bl_count[v]--;e.bl_count[v+1]+=2;e.bl_count[f]--;b-=2}while(b>0);for(v=f;v!==0;v--){d=e.bl_count[v];while(d!==0){c=e.heap[--s];if(c>a){continue}if(r[c*2+1]!==v){e.opt_len+=(v-r[c*2+1])*r[c*2];r[c*2+1]=v}d--}}}function gen_codes(e,i,r){var a=new Array(R+1);var n=0;var t;var h;for(t=1;t<=R;t++){a[t]=n=n+r[t-1]<<1}for(h=0;h<=i;h++){var l=e[h*2+1];if(l===0){continue}e[h*2]=bi_reverse(a[l]++,l)}}function tr_static_init(){var e;var i;var r;var a;var n;var t=new Array(R+1);r=0;for(a=0;a<g-1;a++){Z[a]=r;for(e=0;e<1<<B[a];e++){j[r++]=a}}j[r-1]=a;n=0;for(a=0;a<16;a++){z[a]=n;for(e=0;e<1<<L[a];e++){U[n++]=a}}n>>=7;for(;a<k;a++){z[a]=n<<7;for(e=0;e<1<<L[a]-7;e++){U[256+n++]=a}}for(i=0;i<=R;i++){t[i]=0}e=0;while(e<=143){N[e*2+1]=8;e++;t[8]++}while(e<=255){N[e*2+1]=9;e++;t[9]++}while(e<=279){N[e*2+1]=7;e++;t[7]++}while(e<=287){N[e*2+1]=8;e++;t[8]++}gen_codes(N,b+1,t);for(e=0;e<k;e++){P[e*2+1]=5;P[e*2]=bi_reverse(e,5)}M=new StaticTreeDesc(N,B,y+1,b,R);q=new StaticTreeDesc(P,L,0,k,R);K=new StaticTreeDesc(new Array(0),W,0,S,T)}function init_block(e){var i;for(i=0;i<b;i++){e.dyn_ltree[i*2]=0}for(i=0;i<k;i++){e.dyn_dtree[i*2]=0}for(i=0;i<S;i++){e.bl_tree[i*2]=0}e.dyn_ltree[E*2]=1;e.opt_len=e.static_len=0;e.last_lit=e.matches=0}function bi_windup(e){if(e.bi_valid>8){put_short(e,e.bi_buf)}else if(e.bi_valid>0){e.pending_buf[e.pending++]=e.bi_buf}e.bi_buf=0;e.bi_valid=0}function copy_block(e,i,r,n){bi_windup(e);if(n){put_short(e,r);put_short(e,~r)}a.arraySet(e.pending_buf,e.window,i,r,e.pending);e.pending+=r}function smaller(e,i,r,a){var n=i*2;var t=r*2;return e[n]<e[t]||e[n]===e[t]&&a[i]<=a[r]}function pqdownheap(e,i,r){var a=e.heap[r];var n=r<<1;while(n<=e.heap_len){if(n<e.heap_len&&smaller(i,e.heap[n+1],e.heap[n],e.depth)){n++}if(smaller(i,a,e.heap[n],e.depth)){break}e.heap[r]=e.heap[n];r=n;n<<=1}e.heap[r]=a}function compress_block(e,i,r){var a;var n;var t=0;var h;var l;if(e.last_lit!==0){do{a=e.pending_buf[e.d_buf+t*2]<<8|e.pending_buf[e.d_buf+t*2+1];n=e.pending_buf[e.l_buf+t];t++;if(a===0){send_code(e,n,i)}else{h=j[n];send_code(e,h+y+1,i);l=B[h];if(l!==0){n-=Z[h];send_bits(e,n,l)}a--;h=d_code(a);send_code(e,h,r);l=L[h];if(l!==0){a-=z[h];send_bits(e,a,l)}}}while(t<e.last_lit)}send_code(e,E,i)}function build_tree(e,i){var r=i.dyn_tree;var a=i.stat_desc.static_tree;var n=i.stat_desc.has_stree;var t=i.stat_desc.elems;var h,l;var f=-1;var s;e.heap_len=0;e.heap_max=u;for(h=0;h<t;h++){if(r[h*2]!==0){e.heap[++e.heap_len]=f=h;e.depth[h]=0}else{r[h*2+1]=0}}while(e.heap_len<2){s=e.heap[++e.heap_len]=f<2?++f:0;r[s*2]=1;e.depth[s]=0;e.opt_len--;if(n){e.static_len-=a[s*2+1]}}i.max_code=f;for(h=e.heap_len>>1;h>=1;h--){pqdownheap(e,r,h)}s=t;do{h=e.heap[1];e.heap[1]=e.heap[e.heap_len--];pqdownheap(e,r,1);l=e.heap[1];e.heap[--e.heap_max]=h;e.heap[--e.heap_max]=l;r[s*2]=r[h*2]+r[l*2];e.depth[s]=(e.depth[h]>=e.depth[l]?e.depth[h]:e.depth[l])+1;r[h*2+1]=r[l*2+1]=s;e.heap[1]=s++;pqdownheap(e,r,1)}while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1];gen_bitlen(e,i);gen_codes(r,f,e.bl_count)}function scan_tree(e,i,r){var a;var n=-1;var t;var h=i[0*2+1];var l=0;var f=7;var s=4;if(h===0){f=138;s=3}i[(r+1)*2+1]=65535;for(a=0;a<=r;a++){t=h;h=i[(a+1)*2+1];if(++l<f&&t===h){continue}else if(l<s){e.bl_tree[t*2]+=l}else if(t!==0){if(t!==n){e.bl_tree[t*2]++}e.bl_tree[I*2]++}else if(l<=10){e.bl_tree[A*2]++}else{e.bl_tree[O*2]++}l=0;n=t;if(h===0){f=138;s=3}else if(t===h){f=6;s=3}else{f=7;s=4}}}function send_tree(e,i,r){var a;var n=-1;var t;var h=i[0*2+1];var l=0;var f=7;var s=4;if(h===0){f=138;s=3}for(a=0;a<=r;a++){t=h;h=i[(a+1)*2+1];if(++l<f&&t===h){continue}else if(l<s){do{send_code(e,t,e.bl_tree)}while(--l!==0)}else if(t!==0){if(t!==n){send_code(e,t,e.bl_tree);l--}send_code(e,I,e.bl_tree);send_bits(e,l-3,2)}else if(l<=10){send_code(e,A,e.bl_tree);send_bits(e,l-3,3)}else{send_code(e,O,e.bl_tree);send_bits(e,l-11,7)}l=0;n=t;if(h===0){f=138;s=3}else if(t===h){f=6;s=3}else{f=7;s=4}}}function build_bl_tree(e){var i;scan_tree(e,e.dyn_ltree,e.l_desc.max_code);scan_tree(e,e.dyn_dtree,e.d_desc.max_code);build_tree(e,e.bl_desc);for(i=S-1;i>=3;i--){if(e.bl_tree[F[i]*2+1]!==0){break}}e.opt_len+=3*(i+1)+5+5+4;return i}function send_all_trees(e,i,r,a){var n;send_bits(e,i-257,5);send_bits(e,r-1,5);send_bits(e,a-4,4);for(n=0;n<a;n++){send_bits(e,e.bl_tree[F[n]*2+1],3)}send_tree(e,e.dyn_ltree,i-1);send_tree(e,e.dyn_dtree,r-1)}function detect_data_type(e){var i=4093624447;var r;for(r=0;r<=31;r++,i>>>=1){if(i&1&&e.dyn_ltree[r*2]!==0){return t}}if(e.dyn_ltree[9*2]!==0||e.dyn_ltree[10*2]!==0||e.dyn_ltree[13*2]!==0){return h}for(r=32;r<y;r++){if(e.dyn_ltree[r*2]!==0){return h}}return t}var J=false;function _tr_init(e){if(!J){tr_static_init();J=true}e.l_desc=new TreeDesc(e.dyn_ltree,M);e.d_desc=new TreeDesc(e.dyn_dtree,q);e.bl_desc=new TreeDesc(e.bl_tree,K);e.bi_buf=0;e.bi_valid=0;init_block(e)}function _tr_stored_block(e,i,r,a){send_bits(e,(f<<1)+(a?1:0),3);copy_block(e,i,r,true)}function _tr_align(e){send_bits(e,s<<1,3);send_code(e,E,N);bi_flush(e)}function _tr_flush_block(e,i,r,a){var t,h;var f=0;if(e.level>0){if(e.strm.data_type===l){e.strm.data_type=detect_data_type(e)}build_tree(e,e.l_desc);build_tree(e,e.d_desc);f=build_bl_tree(e);t=e.opt_len+3+7>>>3;h=e.static_len+3+7>>>3;if(h<=t){t=h}}else{t=h=r+5}if(r+4<=t&&i!==-1){_tr_stored_block(e,i,r,a)}else if(e.strategy===n||h===t){send_bits(e,(s<<1)+(a?1:0),3);compress_block(e,N,P)}else{send_bits(e,(d<<1)+(a?1:0),3);send_all_trees(e,e.l_desc.max_code+1,e.d_desc.max_code+1,f+1);compress_block(e,e.dyn_ltree,e.dyn_dtree)}init_block(e);if(a){bi_windup(e)}}function _tr_tally(e,i,r){e.pending_buf[e.d_buf+e.last_lit*2]=i>>>8&255;e.pending_buf[e.d_buf+e.last_lit*2+1]=i&255;e.pending_buf[e.l_buf+e.last_lit]=r&255;e.last_lit++;if(i===0){e.dyn_ltree[r*2]++}else{e.matches++;i--;e.dyn_ltree[(j[r]+y+1)*2]++;e.dyn_dtree[d_code(i)*2]++}return e.last_lit===e.lit_bufsize-1}i._tr_init=_tr_init;i._tr_stored_block=_tr_stored_block;i._tr_flush_block=_tr_flush_block;i._tr_tally=_tr_tally;i._tr_align=_tr_align},68:function(e,i,r){"use strict";var a=r(100);var n=r(967);var t=16*1024;function DataWorker(e){n.call(this,"DataWorker");var i=this;this.dataIsReady=false;this.index=0;this.max=0;this.data=null;this.type="";this._tickScheduled=false;e.then(function(e){i.dataIsReady=true;i.data=e;i.max=e&&e.length||0;i.type=a.getTypeOf(e);if(!i.isPaused){i._tickAndRepeat()}},function(e){i.error(e)})}a.inherits(DataWorker,n);DataWorker.prototype.cleanUp=function(){n.prototype.cleanUp.call(this);this.data=null};DataWorker.prototype.resume=function(){if(!n.prototype.resume.call(this)){return false}if(!this._tickScheduled&&this.dataIsReady){this._tickScheduled=true;a.delay(this._tickAndRepeat,[],this)}return true};DataWorker.prototype._tickAndRepeat=function(){this._tickScheduled=false;if(this.isPaused||this.isFinished){return}this._tick();if(!this.isFinished){a.delay(this._tickAndRepeat,[],this);this._tickScheduled=true}};DataWorker.prototype._tick=function(){if(this.isPaused||this.isFinished){return false}var e=t;var i=null,r=Math.min(this.max,this.index+e);if(this.index>=this.max){return this.end()}else{switch(this.type){case"string":i=this.data.substring(this.index,r);break;case"uint8array":i=this.data.subarray(this.index,r);break;case"array":case"nodebuffer":i=this.data.slice(this.index,r);break}this.index=r;return this.push({data:i,meta:{percent:this.max?this.index/this.max*100:0}})}};e.exports=DataWorker},91:function(e,i,r){"use strict";var a=r(206);var n=r(100);function StringReader(e){a.call(this,e)}n.inherits(StringReader,a);StringReader.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)};StringReader.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero};StringReader.prototype.readAndCheckSignature=function(e){var i=this.readData(4);return e===i};StringReader.prototype.readData=function(e){this.checkOffset(e);var i=this.data.slice(this.zero+this.index,this.zero+this.index+e);this.index+=e;return i};e.exports=StringReader},100:function(e,i,r){"use strict";var a=r(130);var n=r(686);var t=r(499);var h=r(163);var l=r(438);function string2binary(e){var i=null;if(a.uint8array){i=new Uint8Array(e.length)}else{i=new Array(e.length)}return stringToArrayLike(e,i)}i.newBlob=function(e,r){i.checkSupport("blob");try{return new Blob([e],{type:r})}catch(i){try{var a=self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder;var n=new a;n.append(e);return n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};function identity(e){return e}function stringToArrayLike(e,i){for(var r=0;r<e.length;++r){i[r]=e.charCodeAt(r)&255}return i}var f={stringifyByChunk:function(e,i,r){var a=[],n=0,t=e.length;if(t<=r){return String.fromCharCode.apply(null,e)}while(n<t){if(i==="array"||i==="nodebuffer"){a.push(String.fromCharCode.apply(null,e.slice(n,Math.min(n+r,t))))}else{a.push(String.fromCharCode.apply(null,e.subarray(n,Math.min(n+r,t))))}n+=r}return a.join("")},stringifyByChar:function(e){var i="";for(var r=0;r<e.length;r++){i+=String.fromCharCode(e[r])}return i},applyCanBeUsed:{uint8array:function(){try{return a.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch(e){return false}}(),nodebuffer:function(){try{return a.nodebuffer&&String.fromCharCode.apply(null,t.allocBuffer(1)).length===1}catch(e){return false}}()}};function arrayLikeToString(e){var r=65536,a=i.getTypeOf(e),n=true;if(a==="uint8array"){n=f.applyCanBeUsed.uint8array}else if(a==="nodebuffer"){n=f.applyCanBeUsed.nodebuffer}if(n){while(r>1){try{return f.stringifyByChunk(e,a,r)}catch(e){r=Math.floor(r/2)}}}return f.stringifyByChar(e)}i.applyFromCharCode=arrayLikeToString;function arrayLikeToArrayLike(e,i){for(var r=0;r<e.length;r++){i[r]=e[r]}return i}var s={};s["string"]={string:identity,array:function(e){return stringToArrayLike(e,new Array(e.length))},arraybuffer:function(e){return s["string"]["uint8array"](e).buffer},uint8array:function(e){return stringToArrayLike(e,new Uint8Array(e.length))},nodebuffer:function(e){return stringToArrayLike(e,t.allocBuffer(e.length))}};s["array"]={string:arrayLikeToString,array:identity,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return t.newBufferFrom(e)}};s["arraybuffer"]={string:function(e){return arrayLikeToString(new Uint8Array(e))},array:function(e){return arrayLikeToArrayLike(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:identity,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return t.newBufferFrom(new Uint8Array(e))}};s["uint8array"]={string:arrayLikeToString,array:function(e){return arrayLikeToArrayLike(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:identity,nodebuffer:function(e){return t.newBufferFrom(e)}};s["nodebuffer"]={string:arrayLikeToString,array:function(e){return arrayLikeToArrayLike(e,new Array(e.length))},arraybuffer:function(e){return s["nodebuffer"]["uint8array"](e).buffer},uint8array:function(e){return arrayLikeToArrayLike(e,new Uint8Array(e.length))},nodebuffer:identity};i.transformTo=function(e,r){if(!r){r=""}if(!e){return r}i.checkSupport(e);var a=i.getTypeOf(r);var n=s[a][e](r);return n};i.getTypeOf=function(e){if(typeof e==="string"){return"string"}if(Object.prototype.toString.call(e)==="[object Array]"){return"array"}if(a.nodebuffer&&t.isBuffer(e)){return"nodebuffer"}if(a.uint8array&&e instanceof Uint8Array){return"uint8array"}if(a.arraybuffer&&e instanceof ArrayBuffer){return"arraybuffer"}};i.checkSupport=function(e){var i=a[e.toLowerCase()];if(!i){throw new Error(e+" is not supported by this platform")}};i.MAX_VALUE_16BITS=65535;i.MAX_VALUE_32BITS=-1;i.pretty=function(e){var i="",r,a;for(a=0;a<(e||"").length;a++){r=e.charCodeAt(a);i+="\\x"+(r<16?"0":"")+r.toString(16).toUpperCase()}return i};i.delay=function(e,i,r){h(function(){e.apply(r||null,i||[])})};i.inherits=function(e,i){var r=function(){};r.prototype=i.prototype;e.prototype=new r};i.extend=function(){var e={},i,r;for(i=0;i<arguments.length;i++){for(r in arguments[i]){if(arguments[i].hasOwnProperty(r)&&typeof e[r]==="undefined"){e[r]=arguments[i][r]}}}return e};i.prepareContent=function(e,r,t,h,f){var s=l.Promise.resolve(r).then(function(e){var i=a.blob&&(e instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(e))!==-1);if(i&&typeof FileReader!=="undefined"){return new l.Promise(function(i,r){var a=new FileReader;a.onload=function(e){i(e.target.result)};a.onerror=function(e){r(e.target.error)};a.readAsArrayBuffer(e)})}else{return e}});return s.then(function(r){var a=i.getTypeOf(r);if(!a){return l.Promise.reject(new Error("Can't read the data of '"+e+"'. Is it "+"in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))}if(a==="arraybuffer"){r=i.transformTo("uint8array",r)}else if(a==="string"){if(f){r=n.decode(r)}else if(t){if(h!==true){r=string2binary(r)}}}return r})}},128:function(e,i,r){"use strict";var a=r(100);var n=r(130);var t=r(28);var h=r(91);var l=r(734);var f=r(720);e.exports=function(e){var i=a.getTypeOf(e);a.checkSupport(i);if(i==="string"&&!n.uint8array){return new h(e)}if(i==="nodebuffer"){return new l(e)}if(n.uint8array){return new f(a.transformTo("uint8array",e))}return new t(a.transformTo("array",e))}},130:function(e,i,r){"use strict";i.base64=true;i.array=true;i.string=true;i.arraybuffer=typeof ArrayBuffer!=="undefined"&&typeof Uint8Array!=="undefined";i.nodebuffer=typeof Buffer!=="undefined";i.uint8array=typeof Uint8Array!=="undefined";if(typeof ArrayBuffer==="undefined"){i.blob=false}else{var a=new ArrayBuffer(0);try{i.blob=new Blob([a],{type:"application/zip"}).size===0}catch(e){try{var n=self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder;var t=new n;t.append(a);i.blob=t.getBlob("application/zip").size===0}catch(e){i.blob=false}}}try{i.nodestream=!!r(574).Readable}catch(e){i.nodestream=false}},141:function(e){"use strict";function adler32(e,i,r,a){var n=e&65535|0,t=e>>>16&65535|0,h=0;while(r!==0){h=r>2e3?2e3:r;r-=h;do{n=n+i[a++]|0;t=t+n|0}while(--h);n%=65521;t%=65521}return n|t<<16|0}e.exports=adler32},163:function(e){"use strict";e.exports=typeof setImmediate==="function"?setImmediate:function setImmediate(){var e=[].slice.apply(arguments);e.splice(1,0,0);setTimeout.apply(null,e)}},181:function(e){"use strict";var i=30;var r=12;e.exports=function inflate_fast(e,a){var n;var t;var h;var l;var f;var s;var d;var c;var v;var g;var y;var b;var k;var S;var u;var R;var C;var T;var E;var I;var A;var O;var B;var L,W;n=e.state;t=e.next_in;L=e.input;h=t+(e.avail_in-5);l=e.next_out;W=e.output;f=l-(a-e.avail_out);s=l+(e.avail_out-257);d=n.dmax;c=n.wsize;v=n.whave;g=n.wnext;y=n.window;b=n.hold;k=n.bits;S=n.lencode;u=n.distcode;R=(1<<n.lenbits)-1;C=(1<<n.distbits)-1;e:do{if(k<15){b+=L[t++]<<k;k+=8;b+=L[t++]<<k;k+=8}T=S[b&R];i:for(;;){E=T>>>24;b>>>=E;k-=E;E=T>>>16&255;if(E===0){W[l++]=T&65535}else if(E&16){I=T&65535;E&=15;if(E){if(k<E){b+=L[t++]<<k;k+=8}I+=b&(1<<E)-1;b>>>=E;k-=E}if(k<15){b+=L[t++]<<k;k+=8;b+=L[t++]<<k;k+=8}T=u[b&C];r:for(;;){E=T>>>24;b>>>=E;k-=E;E=T>>>16&255;if(E&16){A=T&65535;E&=15;if(k<E){b+=L[t++]<<k;k+=8;if(k<E){b+=L[t++]<<k;k+=8}}A+=b&(1<<E)-1;if(A>d){e.msg="invalid distance too far back";n.mode=i;break e}b>>>=E;k-=E;E=l-f;if(A>E){E=A-E;if(E>v){if(n.sane){e.msg="invalid distance too far back";n.mode=i;break e}}O=0;B=y;if(g===0){O+=c-E;if(E<I){I-=E;do{W[l++]=y[O++]}while(--E);O=l-A;B=W}}else if(g<E){O+=c+g-E;E-=g;if(E<I){I-=E;do{W[l++]=y[O++]}while(--E);O=0;if(g<I){E=g;I-=E;do{W[l++]=y[O++]}while(--E);O=l-A;B=W}}}else{O+=g-E;if(E<I){I-=E;do{W[l++]=y[O++]}while(--E);O=l-A;B=W}}while(I>2){W[l++]=B[O++];W[l++]=B[O++];W[l++]=B[O++];I-=3}if(I){W[l++]=B[O++];if(I>1){W[l++]=B[O++]}}}else{O=l-A;do{W[l++]=W[O++];W[l++]=W[O++];W[l++]=W[O++];I-=3}while(I>2);if(I){W[l++]=W[O++];if(I>1){W[l++]=W[O++]}}}}else if((E&64)===0){T=u[(T&65535)+(b&(1<<E)-1)];continue r}else{e.msg="invalid distance code";n.mode=i;break e}break}}else if((E&64)===0){T=S[(T&65535)+(b&(1<<E)-1)];continue i}else if(E&32){n.mode=r;break e}else{e.msg="invalid literal/length code";n.mode=i;break e}break}}while(t<h&&l<s);I=k>>3;t-=I;k-=I<<3;b&=(1<<k)-1;e.next_in=t;e.next_out=l;e.avail_in=t<h?5+(h-t):5-(t-h);e.avail_out=l<s?257+(s-l):257-(l-s);n.hold=b;n.bits=k;return}},186:function(e,i,r){"use strict";var a=r(438);var n=r(68);var t=r(774);var h=r(886);function CompressedObject(e,i,r,a,n){this.compressedSize=e;this.uncompressedSize=i;this.crc32=r;this.compression=a;this.compressedContent=n}CompressedObject.prototype={getContentWorker:function(){var e=new n(a.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new h("data_length"));var i=this;e.on("end",function(){if(this.streamInfo["data_length"]!==i.uncompressedSize){throw new Error("Bug : uncompressed data size mismatch")}});return e},getCompressedWorker:function(){return new n(a.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}};CompressedObject.createWorkerFrom=function(e,i,r){return e.pipe(new t).pipe(new h("uncompressedSize")).pipe(i.compressWorker(r)).pipe(new h("compressedSize")).withStreamInfo("compression",i)};e.exports=CompressedObject},206:function(e,i,r){"use strict";var a=r(100);function DataReader(e){this.data=e;this.length=e.length;this.index=0;this.zero=0}DataReader.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0){throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")}},setIndex:function(e){this.checkIndex(e);this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(e){},readInt:function(e){var i=0,r;this.checkOffset(e);for(r=this.index+e-1;r>=this.index;r--){i=(i<<8)+this.byteAt(r)}this.index+=e;return i},readString:function(e){return a.transformTo("string",this.readData(e))},readData:function(e){},lastIndexOfSignature:function(e){},readAndCheckSignature:function(e){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC((e>>25&127)+1980,(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(e&31)<<1))}};e.exports=DataReader},225:function(e,i,r){"use strict";var a=typeof Uint8Array!=="undefined"&&typeof Uint16Array!=="undefined"&&typeof Uint32Array!=="undefined";var n=r(246);var t=r(100);var h=r(967);var l=a?"uint8array":"array";i.magic="\b\0";function FlateWorker(e,i){h.call(this,"FlateWorker/"+e);this._pako=null;this._pakoAction=e;this._pakoOptions=i;this.meta={}}t.inherits(FlateWorker,h);FlateWorker.prototype.processChunk=function(e){this.meta=e.meta;if(this._pako===null){this._createPako()}this._pako.push(t.transformTo(l,e.data),false)};FlateWorker.prototype.flush=function(){h.prototype.flush.call(this);if(this._pako===null){this._createPako()}this._pako.push([],true)};FlateWorker.prototype.cleanUp=function(){h.prototype.cleanUp.call(this);this._pako=null};FlateWorker.prototype._createPako=function(){this._pako=new n[this._pakoAction]({raw:true,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(i){e.push({data:i,meta:e.meta})}};i.compressWorker=function(e){return new FlateWorker("Deflate",e)};i.uncompressWorker=function(){return new FlateWorker("Inflate",{})}},226:function(e,i,r){"use strict";var a=r(822);e.exports=Readable;var n=r(262);var t;Readable.ReadableState=ReadableState;var h=r(614).EventEmitter;var l=function(e,i){return e.listeners(i).length};var f=r(427);var s=r(321).Buffer;var d=global.Uint8Array||function(){};function _uint8ArrayToBuffer(e){return s.from(e)}function _isUint8Array(e){return s.isBuffer(e)||e instanceof d}var c=Object.create(r(286));c.inherits=r(689);var v=r(669);var g=void 0;if(v&&v.debuglog){g=v.debuglog("stream")}else{g=function(){}}var y=r(931);var b=r(232);var k;c.inherits(Readable,f);var S=["error","close","destroy","pause","resume"];function prependListener(e,i,r){if(typeof e.prependListener==="function")return e.prependListener(i,r);if(!e._events||!e._events[i])e.on(i,r);else if(n(e._events[i]))e._events[i].unshift(r);else e._events[i]=[r,e._events[i]]}function ReadableState(e,i){t=t||r(831);e=e||{};var a=i instanceof t;this.objectMode=!!e.objectMode;if(a)this.objectMode=this.objectMode||!!e.readableObjectMode;var n=e.highWaterMark;var h=e.readableHighWaterMark;var l=this.objectMode?16:16*1024;if(n||n===0)this.highWaterMark=n;else if(a&&(h||h===0))this.highWaterMark=h;else this.highWaterMark=l;this.highWaterMark=Math.floor(this.highWaterMark);this.buffer=new y;this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=false;this.endEmitted=false;this.reading=false;this.sync=true;this.needReadable=false;this.emittedReadable=false;this.readableListening=false;this.resumeScheduled=false;this.destroyed=false;this.defaultEncoding=e.defaultEncoding||"utf8";this.awaitDrain=0;this.readingMore=false;this.decoder=null;this.encoding=null;if(e.encoding){if(!k)k=r(750).StringDecoder;this.decoder=new k(e.encoding);this.encoding=e.encoding}}function Readable(e){t=t||r(831);if(!(this instanceof Readable))return new Readable(e);this._readableState=new ReadableState(e,this);this.readable=true;if(e){if(typeof e.read==="function")this._read=e.read;if(typeof e.destroy==="function")this._destroy=e.destroy}f.call(this)}Object.defineProperty(Readable.prototype,"destroyed",{get:function(){if(this._readableState===undefined){return false}return this._readableState.destroyed},set:function(e){if(!this._readableState){return}this._readableState.destroyed=e}});Readable.prototype.destroy=b.destroy;Readable.prototype._undestroy=b.undestroy;Readable.prototype._destroy=function(e,i){this.push(null);i(e)};Readable.prototype.push=function(e,i){var r=this._readableState;var a;if(!r.objectMode){if(typeof e==="string"){i=i||r.defaultEncoding;if(i!==r.encoding){e=s.from(e,i);i=""}a=true}}else{a=true}return readableAddChunk(this,e,i,false,a)};Readable.prototype.unshift=function(e){return readableAddChunk(this,e,null,true,false)};function readableAddChunk(e,i,r,a,n){var t=e._readableState;if(i===null){t.reading=false;onEofChunk(e,t)}else{var h;if(!n)h=chunkInvalid(t,i);if(h){e.emit("error",h)}else if(t.objectMode||i&&i.length>0){if(typeof i!=="string"&&!t.objectMode&&Object.getPrototypeOf(i)!==s.prototype){i=_uint8ArrayToBuffer(i)}if(a){if(t.endEmitted)e.emit("error",new Error("stream.unshift() after end event"));else addChunk(e,t,i,true)}else if(t.ended){e.emit("error",new Error("stream.push() after EOF"))}else{t.reading=false;if(t.decoder&&!r){i=t.decoder.write(i);if(t.objectMode||i.length!==0)addChunk(e,t,i,false);else maybeReadMore(e,t)}else{addChunk(e,t,i,false)}}}else if(!a){t.reading=false}}return needMoreData(t)}function addChunk(e,i,r,a){if(i.flowing&&i.length===0&&!i.sync){e.emit("data",r);e.read(0)}else{i.length+=i.objectMode?1:r.length;if(a)i.buffer.unshift(r);else i.buffer.push(r);if(i.needReadable)emitReadable(e)}maybeReadMore(e,i)}function chunkInvalid(e,i){var r;if(!_isUint8Array(i)&&typeof i!=="string"&&i!==undefined&&!e.objectMode){r=new TypeError("Invalid non-string/buffer chunk")}return r}function needMoreData(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||e.length===0)}Readable.prototype.isPaused=function(){return this._readableState.flowing===false};Readable.prototype.setEncoding=function(e){if(!k)k=r(750).StringDecoder;this._readableState.decoder=new k(e);this._readableState.encoding=e;return this};var u=8388608;function computeNewHighWaterMark(e){if(e>=u){e=u}else{e--;e|=e>>>1;e|=e>>>2;e|=e>>>4;e|=e>>>8;e|=e>>>16;e++}return e}function howMuchToRead(e,i){if(e<=0||i.length===0&&i.ended)return 0;if(i.objectMode)return 1;if(e!==e){if(i.flowing&&i.length)return i.buffer.head.data.length;else return i.length}if(e>i.highWaterMark)i.highWaterMark=computeNewHighWaterMark(e);if(e<=i.length)return e;if(!i.ended){i.needReadable=true;return 0}return i.length}Readable.prototype.read=function(e){g("read",e);e=parseInt(e,10);var i=this._readableState;var r=e;if(e!==0)i.emittedReadable=false;if(e===0&&i.needReadable&&(i.length>=i.highWaterMark||i.ended)){g("read: emitReadable",i.length,i.ended);if(i.length===0&&i.ended)endReadable(this);else emitReadable(this);return null}e=howMuchToRead(e,i);if(e===0&&i.ended){if(i.length===0)endReadable(this);return null}var a=i.needReadable;g("need readable",a);if(i.length===0||i.length-e<i.highWaterMark){a=true;g("length less than watermark",a)}if(i.ended||i.reading){a=false;g("reading or ended",a)}else if(a){g("do read");i.reading=true;i.sync=true;if(i.length===0)i.needReadable=true;this._read(i.highWaterMark);i.sync=false;if(!i.reading)e=howMuchToRead(r,i)}var n;if(e>0)n=fromList(e,i);else n=null;if(n===null){i.needReadable=true;e=0}else{i.length-=e}if(i.length===0){if(!i.ended)i.needReadable=true;if(r!==e&&i.ended)endReadable(this)}if(n!==null)this.emit("data",n);return n};function onEofChunk(e,i){if(i.ended)return;if(i.decoder){var r=i.decoder.end();if(r&&r.length){i.buffer.push(r);i.length+=i.objectMode?1:r.length}}i.ended=true;emitReadable(e)}function emitReadable(e){var i=e._readableState;i.needReadable=false;if(!i.emittedReadable){g("emitReadable",i.flowing);i.emittedReadable=true;if(i.sync)a.nextTick(emitReadable_,e);else emitReadable_(e)}}function emitReadable_(e){g("emit readable");e.emit("readable");flow(e)}function maybeReadMore(e,i){if(!i.readingMore){i.readingMore=true;a.nextTick(maybeReadMore_,e,i)}}function maybeReadMore_(e,i){var r=i.length;while(!i.reading&&!i.flowing&&!i.ended&&i.length<i.highWaterMark){g("maybeReadMore read 0");e.read(0);if(r===i.length)break;else r=i.length}i.readingMore=false}Readable.prototype._read=function(e){this.emit("error",new Error("_read() is not implemented"))};Readable.prototype.pipe=function(e,i){var r=this;var n=this._readableState;switch(n.pipesCount){case 0:n.pipes=e;break;case 1:n.pipes=[n.pipes,e];break;default:n.pipes.push(e);break}n.pipesCount+=1;g("pipe count=%d opts=%j",n.pipesCount,i);var t=(!i||i.end!==false)&&e!==process.stdout&&e!==process.stderr;var h=t?onend:unpipe;if(n.endEmitted)a.nextTick(h);else r.once("end",h);e.on("unpipe",onunpipe);function onunpipe(e,i){g("onunpipe");if(e===r){if(i&&i.hasUnpiped===false){i.hasUnpiped=true;cleanup()}}}function onend(){g("onend");e.end()}var f=pipeOnDrain(r);e.on("drain",f);var s=false;function cleanup(){g("cleanup");e.removeListener("close",onclose);e.removeListener("finish",onfinish);e.removeListener("drain",f);e.removeListener("error",onerror);e.removeListener("unpipe",onunpipe);r.removeListener("end",onend);r.removeListener("end",unpipe);r.removeListener("data",ondata);s=true;if(n.awaitDrain&&(!e._writableState||e._writableState.needDrain))f()}var d=false;r.on("data",ondata);function ondata(i){g("ondata");d=false;var a=e.write(i);if(false===a&&!d){if((n.pipesCount===1&&n.pipes===e||n.pipesCount>1&&indexOf(n.pipes,e)!==-1)&&!s){g("false write response, pause",r._readableState.awaitDrain);r._readableState.awaitDrain++;d=true}r.pause()}}function onerror(i){g("onerror",i);unpipe();e.removeListener("error",onerror);if(l(e,"error")===0)e.emit("error",i)}prependListener(e,"error",onerror);function onclose(){e.removeListener("finish",onfinish);unpipe()}e.once("close",onclose);function onfinish(){g("onfinish");e.removeListener("close",onclose);unpipe()}e.once("finish",onfinish);function unpipe(){g("unpipe");r.unpipe(e)}e.emit("pipe",r);if(!n.flowing){g("pipe resume");r.resume()}return e};function pipeOnDrain(e){return function(){var i=e._readableState;g("pipeOnDrain",i.awaitDrain);if(i.awaitDrain)i.awaitDrain--;if(i.awaitDrain===0&&l(e,"data")){i.flowing=true;flow(e)}}}Readable.prototype.unpipe=function(e){var i=this._readableState;var r={hasUnpiped:false};if(i.pipesCount===0)return this;if(i.pipesCount===1){if(e&&e!==i.pipes)return this;if(!e)e=i.pipes;i.pipes=null;i.pipesCount=0;i.flowing=false;if(e)e.emit("unpipe",this,r);return this}if(!e){var a=i.pipes;var n=i.pipesCount;i.pipes=null;i.pipesCount=0;i.flowing=false;for(var t=0;t<n;t++){a[t].emit("unpipe",this,r)}return this}var h=indexOf(i.pipes,e);if(h===-1)return this;i.pipes.splice(h,1);i.pipesCount-=1;if(i.pipesCount===1)i.pipes=i.pipes[0];e.emit("unpipe",this,r);return this};Readable.prototype.on=function(e,i){var r=f.prototype.on.call(this,e,i);if(e==="data"){if(this._readableState.flowing!==false)this.resume()}else if(e==="readable"){var n=this._readableState;if(!n.endEmitted&&!n.readableListening){n.readableListening=n.needReadable=true;n.emittedReadable=false;if(!n.reading){a.nextTick(nReadingNextTick,this)}else if(n.length){emitReadable(this)}}}return r};Readable.prototype.addListener=Readable.prototype.on;function nReadingNextTick(e){g("readable nexttick read 0");e.read(0)}Readable.prototype.resume=function(){var e=this._readableState;if(!e.flowing){g("resume");e.flowing=true;resume(this,e)}return this};function resume(e,i){if(!i.resumeScheduled){i.resumeScheduled=true;a.nextTick(resume_,e,i)}}function resume_(e,i){if(!i.reading){g("resume read 0");e.read(0)}i.resumeScheduled=false;i.awaitDrain=0;e.emit("resume");flow(e);if(i.flowing&&!i.reading)e.read(0)}Readable.prototype.pause=function(){g("call pause flowing=%j",this._readableState.flowing);if(false!==this._readableState.flowing){g("pause");this._readableState.flowing=false;this.emit("pause")}return this};function flow(e){var i=e._readableState;g("flow",i.flowing);while(i.flowing&&e.read()!==null){}}Readable.prototype.wrap=function(e){var i=this;var r=this._readableState;var a=false;e.on("end",function(){g("wrapped end");if(r.decoder&&!r.ended){var e=r.decoder.end();if(e&&e.length)i.push(e)}i.push(null)});e.on("data",function(n){g("wrapped data");if(r.decoder)n=r.decoder.write(n);if(r.objectMode&&(n===null||n===undefined))return;else if(!r.objectMode&&(!n||!n.length))return;var t=i.push(n);if(!t){a=true;e.pause()}});for(var n in e){if(this[n]===undefined&&typeof e[n]==="function"){this[n]=function(i){return function(){return e[i].apply(e,arguments)}}(n)}}for(var t=0;t<S.length;t++){e.on(S[t],this.emit.bind(this,S[t]))}this._read=function(i){g("wrapped _read",i);if(a){a=false;e.resume()}};return this};Object.defineProperty(Readable.prototype,"readableHighWaterMark",{enumerable:false,get:function(){return this._readableState.highWaterMark}});Readable._fromList=fromList;function fromList(e,i){if(i.length===0)return null;var r;if(i.objectMode)r=i.buffer.shift();else if(!e||e>=i.length){if(i.decoder)r=i.buffer.join("");else if(i.buffer.length===1)r=i.buffer.head.data;else r=i.buffer.concat(i.length);i.buffer.clear()}else{r=fromListPartial(e,i.buffer,i.decoder)}return r}function fromListPartial(e,i,r){var a;if(e<i.head.data.length){a=i.head.data.slice(0,e);i.head.data=i.head.data.slice(e)}else if(e===i.head.data.length){a=i.shift()}else{a=r?copyFromBufferString(e,i):copyFromBuffer(e,i)}return a}function copyFromBufferString(e,i){var r=i.head;var a=1;var n=r.data;e-=n.length;while(r=r.next){var t=r.data;var h=e>t.length?t.length:e;if(h===t.length)n+=t;else n+=t.slice(0,e);e-=h;if(e===0){if(h===t.length){++a;if(r.next)i.head=r.next;else i.head=i.tail=null}else{i.head=r;r.data=t.slice(h)}break}++a}i.length-=a;return n}function copyFromBuffer(e,i){var r=s.allocUnsafe(e);var a=i.head;var n=1;a.data.copy(r);e-=a.data.length;while(a=a.next){var t=a.data;var h=e>t.length?t.length:e;t.copy(r,r.length-e,0,h);e-=h;if(e===0){if(h===t.length){++n;if(a.next)i.head=a.next;else i.head=i.tail=null}else{i.head=a;a.data=t.slice(h)}break}++n}i.length-=n;return r}function endReadable(e){var i=e._readableState;if(i.length>0)throw new Error('"endReadable()" called on non-empty stream');if(!i.endEmitted){i.ended=true;a.nextTick(endReadableNT,i,e)}}function endReadableNT(e,i){if(!e.endEmitted&&e.length===0){e.endEmitted=true;i.readable=false;i.emit("end")}}function indexOf(e,i){for(var r=0,a=e.length;r<a;r++){if(e[r]===i)return r}return-1}},232:function(e,i,r){"use strict";var a=r(822);function destroy(e,i){var r=this;var n=this._readableState&&this._readableState.destroyed;var t=this._writableState&&this._writableState.destroyed;if(n||t){if(i){i(e)}else if(e&&(!this._writableState||!this._writableState.errorEmitted)){a.nextTick(emitErrorNT,this,e)}return this}if(this._readableState){this._readableState.destroyed=true}if(this._writableState){this._writableState.destroyed=true}this._destroy(e||null,function(e){if(!i&&e){a.nextTick(emitErrorNT,r,e);if(r._writableState){r._writableState.errorEmitted=true}}else if(i){i(e)}});return this}function undestroy(){if(this._readableState){this._readableState.destroyed=false;this._readableState.reading=false;this._readableState.ended=false;this._readableState.endEmitted=false}if(this._writableState){this._writableState.destroyed=false;this._writableState.ended=false;this._writableState.ending=false;this._writableState.finished=false;this._writableState.errorEmitted=false}}function emitErrorNT(e,i){e.emit("error",i)}e.exports={destroy:destroy,undestroy:undestroy}},239:function(e,i,r){"use strict";var a=r(128);var n=r(100);var t=r(186);var h=r(780);var l=r(628);var f=r(828);var s=r(130);var d=0;var c=3;var v=function(e){for(var i in f){if(!f.hasOwnProperty(i)){continue}if(f[i].magic===e){return f[i]}}return null};function ZipEntry(e,i){this.options=e;this.loadOptions=i}ZipEntry.prototype={isEncrypted:function(){return(this.bitFlag&1)===1},useUTF8:function(){return(this.bitFlag&2048)===2048},readLocalPart:function(e){var i,r;e.skip(22);this.fileNameLength=e.readInt(2);r=e.readInt(2);this.fileName=e.readData(this.fileNameLength);e.skip(r);if(this.compressedSize===-1||this.uncompressedSize===-1){throw new Error("Bug or corrupted zip : didn't get enough information from the central directory "+"(compressedSize === -1 || uncompressedSize === -1)")}i=v(this.compressionMethod);if(i===null){throw new Error("Corrupted zip : compression "+n.pretty(this.compressionMethod)+" unknown (inner file : "+n.transformTo("string",this.fileName)+")")}this.decompressed=new t(this.compressedSize,this.uncompressedSize,this.crc32,i,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2);e.skip(2);this.bitFlag=e.readInt(2);this.compressionMethod=e.readString(2);this.date=e.readDate();this.crc32=e.readInt(4);this.compressedSize=e.readInt(4);this.uncompressedSize=e.readInt(4);var i=e.readInt(2);this.extraFieldsLength=e.readInt(2);this.fileCommentLength=e.readInt(2);this.diskNumberStart=e.readInt(2);this.internalFileAttributes=e.readInt(2);this.externalFileAttributes=e.readInt(4);this.localHeaderOffset=e.readInt(4);if(this.isEncrypted()){throw new Error("Encrypted zip are not supported")}e.skip(i);this.readExtraFields(e);this.parseZIP64ExtraField(e);this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null;this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=this.externalFileAttributes&16?true:false;if(e===d){this.dosPermissions=this.externalFileAttributes&63}if(e===c){this.unixPermissions=this.externalFileAttributes>>16&65535}if(!this.dir&&this.fileNameStr.slice(-1)==="/"){this.dir=true}},parseZIP64ExtraField:function(e){if(!this.extraFields[1]){return}var i=a(this.extraFields[1].value);if(this.uncompressedSize===n.MAX_VALUE_32BITS){this.uncompressedSize=i.readInt(8)}if(this.compressedSize===n.MAX_VALUE_32BITS){this.compressedSize=i.readInt(8)}if(this.localHeaderOffset===n.MAX_VALUE_32BITS){this.localHeaderOffset=i.readInt(8)}if(this.diskNumberStart===n.MAX_VALUE_32BITS){this.diskNumberStart=i.readInt(4)}},readExtraFields:function(e){var i=e.index+this.extraFieldsLength,r,a,n;if(!this.extraFields){this.extraFields={}}while(e.index+4<i){r=e.readInt(2);a=e.readInt(2);n=e.readData(a);this.extraFields[r]={id:r,length:a,value:n}}e.setIndex(i)},handleUTF8:function(){var e=s.uint8array?"uint8array":"array";if(this.useUTF8()){this.fileNameStr=l.utf8decode(this.fileName);this.fileCommentStr=l.utf8decode(this.fileComment)}else{var i=this.findExtraFieldUnicodePath();if(i!==null){this.fileNameStr=i}else{var r=n.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var a=this.findExtraFieldUnicodeComment();if(a!==null){this.fileCommentStr=a}else{var t=n.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(t)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var i=a(e.value);if(i.readInt(1)!==1){return null}if(h(this.fileName)!==i.readInt(4)){return null}return l.utf8decode(i.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var i=a(e.value);if(i.readInt(1)!==1){return null}if(h(this.fileComment)!==i.readInt(4)){return null}return l.utf8decode(i.readData(e.length-5))}return null}};e.exports=ZipEntry},241:function(e,i,r){"use strict";var a=r(822);e.exports=Writable;function WriteReq(e,i,r){this.chunk=e;this.encoding=i;this.callback=r;this.next=null}function CorkedRequest(e){var i=this;this.next=null;this.entry=null;this.finish=function(){onCorkedFinish(i,e)}}var n=!process.browser&&["v0.10","v0.9."].indexOf(process.version.slice(0,5))>-1?setImmediate:a.nextTick;var t;Writable.WritableState=WritableState;var h=Object.create(r(286));h.inherits=r(689);var l={deprecate:r(917)};var f=r(427);var s=r(321).Buffer;var d=global.Uint8Array||function(){};function _uint8ArrayToBuffer(e){return s.from(e)}function _isUint8Array(e){return s.isBuffer(e)||e instanceof d}var c=r(232);h.inherits(Writable,f);function nop(){}function WritableState(e,i){t=t||r(831);e=e||{};var a=i instanceof t;this.objectMode=!!e.objectMode;if(a)this.objectMode=this.objectMode||!!e.writableObjectMode;var n=e.highWaterMark;var h=e.writableHighWaterMark;var l=this.objectMode?16:16*1024;if(n||n===0)this.highWaterMark=n;else if(a&&(h||h===0))this.highWaterMark=h;else this.highWaterMark=l;this.highWaterMark=Math.floor(this.highWaterMark);this.finalCalled=false;this.needDrain=false;this.ending=false;this.ended=false;this.finished=false;this.destroyed=false;var f=e.decodeStrings===false;this.decodeStrings=!f;this.defaultEncoding=e.defaultEncoding||"utf8";this.length=0;this.writing=false;this.corked=0;this.sync=true;this.bufferProcessing=false;this.onwrite=function(e){onwrite(i,e)};this.writecb=null;this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;this.pendingcb=0;this.prefinished=false;this.errorEmitted=false;this.bufferedRequestCount=0;this.corkedRequestsFree=new CorkedRequest(this)}WritableState.prototype.getBuffer=function getBuffer(){var e=this.bufferedRequest;var i=[];while(e){i.push(e);e=e.next}return i};(function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:l.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer "+"instead.","DEP0003")})}catch(e){}})();var v;if(typeof Symbol==="function"&&Symbol.hasInstance&&typeof Function.prototype[Symbol.hasInstance]==="function"){v=Function.prototype[Symbol.hasInstance];Object.defineProperty(Writable,Symbol.hasInstance,{value:function(e){if(v.call(this,e))return true;if(this!==Writable)return false;return e&&e._writableState instanceof WritableState}})}else{v=function(e){return e instanceof this}}function Writable(e){t=t||r(831);if(!v.call(Writable,this)&&!(this instanceof t)){return new Writable(e)}this._writableState=new WritableState(e,this);this.writable=true;if(e){if(typeof e.write==="function")this._write=e.write;if(typeof e.writev==="function")this._writev=e.writev;if(typeof e.destroy==="function")this._destroy=e.destroy;if(typeof e.final==="function")this._final=e.final}f.call(this)}Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))};function writeAfterEnd(e,i){var r=new Error("write after end");e.emit("error",r);a.nextTick(i,r)}function validChunk(e,i,r,n){var t=true;var h=false;if(r===null){h=new TypeError("May not write null values to stream")}else if(typeof r!=="string"&&r!==undefined&&!i.objectMode){h=new TypeError("Invalid non-string/buffer chunk")}if(h){e.emit("error",h);a.nextTick(n,h);t=false}return t}Writable.prototype.write=function(e,i,r){var a=this._writableState;var n=false;var t=!a.objectMode&&_isUint8Array(e);if(t&&!s.isBuffer(e)){e=_uint8ArrayToBuffer(e)}if(typeof i==="function"){r=i;i=null}if(t)i="buffer";else if(!i)i=a.defaultEncoding;if(typeof r!=="function")r=nop;if(a.ended)writeAfterEnd(this,r);else if(t||validChunk(this,a,e,r)){a.pendingcb++;n=writeOrBuffer(this,a,t,e,i,r)}return n};Writable.prototype.cork=function(){var e=this._writableState;e.corked++};Writable.prototype.uncork=function(){var e=this._writableState;if(e.corked){e.corked--;if(!e.writing&&!e.corked&&!e.finished&&!e.bufferProcessing&&e.bufferedRequest)clearBuffer(this,e)}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(e){if(typeof e==="string")e=e.toLowerCase();if(!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);this._writableState.defaultEncoding=e;return this};function decodeChunk(e,i,r){if(!e.objectMode&&e.decodeStrings!==false&&typeof i==="string"){i=s.from(i,r)}return i}Object.defineProperty(Writable.prototype,"writableHighWaterMark",{enumerable:false,get:function(){return this._writableState.highWaterMark}});function writeOrBuffer(e,i,r,a,n,t){if(!r){var h=decodeChunk(i,a,n);if(a!==h){r=true;n="buffer";a=h}}var l=i.objectMode?1:a.length;i.length+=l;var f=i.length<i.highWaterMark;if(!f)i.needDrain=true;if(i.writing||i.corked){var s=i.lastBufferedRequest;i.lastBufferedRequest={chunk:a,encoding:n,isBuf:r,callback:t,next:null};if(s){s.next=i.lastBufferedRequest}else{i.bufferedRequest=i.lastBufferedRequest}i.bufferedRequestCount+=1}else{doWrite(e,i,false,l,a,n,t)}return f}function doWrite(e,i,r,a,n,t,h){i.writelen=a;i.writecb=h;i.writing=true;i.sync=true;if(r)e._writev(n,i.onwrite);else e._write(n,t,i.onwrite);i.sync=false}function onwriteError(e,i,r,n,t){--i.pendingcb;if(r){a.nextTick(t,n);a.nextTick(finishMaybe,e,i);e._writableState.errorEmitted=true;e.emit("error",n)}else{t(n);e._writableState.errorEmitted=true;e.emit("error",n);finishMaybe(e,i)}}function onwriteStateUpdate(e){e.writing=false;e.writecb=null;e.length-=e.writelen;e.writelen=0}function onwrite(e,i){var r=e._writableState;var a=r.sync;var t=r.writecb;onwriteStateUpdate(r);if(i)onwriteError(e,r,a,i,t);else{var h=needFinish(r);if(!h&&!r.corked&&!r.bufferProcessing&&r.bufferedRequest){clearBuffer(e,r)}if(a){n(afterWrite,e,r,h,t)}else{afterWrite(e,r,h,t)}}}function afterWrite(e,i,r,a){if(!r)onwriteDrain(e,i);i.pendingcb--;a();finishMaybe(e,i)}function onwriteDrain(e,i){if(i.length===0&&i.needDrain){i.needDrain=false;e.emit("drain")}}function clearBuffer(e,i){i.bufferProcessing=true;var r=i.bufferedRequest;if(e._writev&&r&&r.next){var a=i.bufferedRequestCount;var n=new Array(a);var t=i.corkedRequestsFree;t.entry=r;var h=0;var l=true;while(r){n[h]=r;if(!r.isBuf)l=false;r=r.next;h+=1}n.allBuffers=l;doWrite(e,i,true,i.length,n,"",t.finish);i.pendingcb++;i.lastBufferedRequest=null;if(t.next){i.corkedRequestsFree=t.next;t.next=null}else{i.corkedRequestsFree=new CorkedRequest(i)}i.bufferedRequestCount=0}else{while(r){var f=r.chunk;var s=r.encoding;var d=r.callback;var c=i.objectMode?1:f.length;doWrite(e,i,false,c,f,s,d);r=r.next;i.bufferedRequestCount--;if(i.writing){break}}if(r===null)i.lastBufferedRequest=null}i.bufferedRequest=r;i.bufferProcessing=false}Writable.prototype._write=function(e,i,r){r(new Error("_write() is not implemented"))};Writable.prototype._writev=null;Writable.prototype.end=function(e,i,r){var a=this._writableState;if(typeof e==="function"){r=e;e=null;i=null}else if(typeof i==="function"){r=i;i=null}if(e!==null&&e!==undefined)this.write(e,i);if(a.corked){a.corked=1;this.uncork()}if(!a.ending&&!a.finished)endWritable(this,a,r)};function needFinish(e){return e.ending&&e.length===0&&e.bufferedRequest===null&&!e.finished&&!e.writing}function callFinal(e,i){e._final(function(r){i.pendingcb--;if(r){e.emit("error",r)}i.prefinished=true;e.emit("prefinish");finishMaybe(e,i)})}function prefinish(e,i){if(!i.prefinished&&!i.finalCalled){if(typeof e._final==="function"){i.pendingcb++;i.finalCalled=true;a.nextTick(callFinal,e,i)}else{i.prefinished=true;e.emit("prefinish")}}}function finishMaybe(e,i){var r=needFinish(i);if(r){prefinish(e,i);if(i.pendingcb===0){i.finished=true;e.emit("finish")}}return r}function endWritable(e,i,r){i.ending=true;finishMaybe(e,i);if(r){if(i.finished)a.nextTick(r);else e.once("finish",r)}i.ended=true;e.writable=false}function onCorkedFinish(e,i,r){var a=e.entry;e.entry=null;while(a){var n=a.callback;i.pendingcb--;n(r);a=a.next}if(i.corkedRequestsFree){i.corkedRequestsFree.next=e}else{i.corkedRequestsFree=e}}Object.defineProperty(Writable.prototype,"destroyed",{get:function(){if(this._writableState===undefined){return false}return this._writableState.destroyed},set:function(e){if(!this._writableState){return}this._writableState.destroyed=e}});Writable.prototype.destroy=c.destroy;Writable.prototype._undestroy=c.undestroy;Writable.prototype._destroy=function(e,i){this.end();i(e)}},246:function(e,i,r){"use strict";var a=r(999).assign;var n=r(259);var t=r(832);var h=r(691);var l={};a(l,n,t,h);e.exports=l},259:function(e,i,r){"use strict";var a=r(378);var n=r(999);var t=r(279);var h=r(868);var l=r(991);var f=Object.prototype.toString;var s=0;var d=4;var c=0;var v=1;var g=2;var y=-1;var b=0;var k=8;function Deflate(e){if(!(this instanceof Deflate))return new Deflate(e);this.options=n.assign({level:y,method:k,chunkSize:16384,windowBits:15,memLevel:8,strategy:b,to:""},e||{});var i=this.options;if(i.raw&&i.windowBits>0){i.windowBits=-i.windowBits}else if(i.gzip&&i.windowBits>0&&i.windowBits<16){i.windowBits+=16}this.err=0;this.msg="";this.ended=false;this.chunks=[];this.strm=new l;this.strm.avail_out=0;var r=a.deflateInit2(this.strm,i.level,i.method,i.windowBits,i.memLevel,i.strategy);if(r!==c){throw new Error(h[r])}if(i.header){a.deflateSetHeader(this.strm,i.header)}if(i.dictionary){var s;if(typeof i.dictionary==="string"){s=t.string2buf(i.dictionary)}else if(f.call(i.dictionary)==="[object ArrayBuffer]"){s=new Uint8Array(i.dictionary)}else{s=i.dictionary}r=a.deflateSetDictionary(this.strm,s);if(r!==c){throw new Error(h[r])}this._dict_set=true}}Deflate.prototype.push=function(e,i){var r=this.strm;var h=this.options.chunkSize;var l,y;if(this.ended){return false}y=i===~~i?i:i===true?d:s;if(typeof e==="string"){r.input=t.string2buf(e)}else if(f.call(e)==="[object ArrayBuffer]"){r.input=new Uint8Array(e)}else{r.input=e}r.next_in=0;r.avail_in=r.input.length;do{if(r.avail_out===0){r.output=new n.Buf8(h);r.next_out=0;r.avail_out=h}l=a.deflate(r,y);if(l!==v&&l!==c){this.onEnd(l);this.ended=true;return false}if(r.avail_out===0||r.avail_in===0&&(y===d||y===g)){if(this.options.to==="string"){this.onData(t.buf2binstring(n.shrinkBuf(r.output,r.next_out)))}else{this.onData(n.shrinkBuf(r.output,r.next_out))}}}while((r.avail_in>0||r.avail_out===0)&&l!==v);if(y===d){l=a.deflateEnd(this.strm);this.onEnd(l);this.ended=true;return l===c}if(y===g){this.onEnd(c);r.avail_out=0;return true}return true};Deflate.prototype.onData=function(e){this.chunks.push(e)};Deflate.prototype.onEnd=function(e){if(e===c){if(this.options.to==="string"){this.result=this.chunks.join("")}else{this.result=n.flattenChunks(this.chunks)}}this.chunks=[];this.err=e;this.msg=this.strm.msg};function deflate(e,i){var r=new Deflate(i);r.push(e,true);if(r.err){throw r.msg||h[r.err]}return r.result}function deflateRaw(e,i){i=i||{};i.raw=true;return deflate(e,i)}function gzip(e,i){i=i||{};i.gzip=true;return deflate(e,i)}i.Deflate=Deflate;i.deflate=deflate;i.deflateRaw=deflateRaw;i.gzip=gzip},262:function(e){var i={}.toString;e.exports=Array.isArray||function(e){return i.call(e)=="[object Array]"}},276:function(e,i,r){"use strict";var a=r(128);var n=r(100);var t=r(30);var h=r(239);var l=r(628);var f=r(130);function ZipEntries(e){this.files=[];this.loadOptions=e}ZipEntries.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var i=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature "+"("+n.pretty(i)+", expected "+n.pretty(e)+")")}},isSignature:function(e,i){var r=this.reader.index;this.reader.setIndex(e);var a=this.reader.readString(4);var n=a===i;this.reader.setIndex(r);return n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2);this.diskWithCentralDirStart=this.reader.readInt(2);this.centralDirRecordsOnThisDisk=this.reader.readInt(2);this.centralDirRecords=this.reader.readInt(2);this.centralDirSize=this.reader.readInt(4);this.centralDirOffset=this.reader.readInt(4);this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength);var i=f.uint8array?"uint8array":"array";var r=n.transformTo(i,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8);this.reader.skip(4);this.diskNumber=this.reader.readInt(4);this.diskWithCentralDirStart=this.reader.readInt(4);this.centralDirRecordsOnThisDisk=this.reader.readInt(8);this.centralDirRecords=this.reader.readInt(8);this.centralDirSize=this.reader.readInt(8);this.centralDirOffset=this.reader.readInt(8);this.zip64ExtensibleData={};var e=this.zip64EndOfCentralSize-44,i=0,r,a,n;while(i<e){r=this.reader.readInt(2);a=this.reader.readInt(4);n=this.reader.readData(a);this.zip64ExtensibleData[r]={id:r,length:a,value:n}}},readBlockZip64EndOfCentralLocator:function(){this.diskWithZip64CentralDirStart=this.reader.readInt(4);this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8);this.disksCount=this.reader.readInt(4);if(this.disksCount>1){throw new Error("Multi-volumes zip are not supported")}},readLocalFiles:function(){var e,i;for(e=0;e<this.files.length;e++){i=this.files[e];this.reader.setIndex(i.localHeaderOffset);this.checkSignature(t.LOCAL_FILE_HEADER);i.readLocalPart(this.reader);i.handleUTF8();i.processAttributes()}},readCentralDir:function(){var e;this.reader.setIndex(this.centralDirOffset);while(this.reader.readAndCheckSignature(t.CENTRAL_FILE_HEADER)){e=new h({zip64:this.zip64},this.loadOptions);e.readCentralPart(this.reader);this.files.push(e)}if(this.centralDirRecords!==this.files.length){if(this.centralDirRecords!==0&&this.files.length===0){throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)}else{}}},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(t.CENTRAL_DIRECTORY_END);if(e<0){var i=!this.isSignature(0,t.LOCAL_FILE_HEADER);if(i){throw new Error("Can't find end of central directory : is this a zip file ? "+"If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html")}else{throw new Error("Corrupted zip: can't find end of central directory")}}this.reader.setIndex(e);var r=e;this.checkSignature(t.CENTRAL_DIRECTORY_END);this.readBlockEndOfCentral();if(this.diskNumber===n.MAX_VALUE_16BITS||this.diskWithCentralDirStart===n.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===n.MAX_VALUE_16BITS||this.centralDirRecords===n.MAX_VALUE_16BITS||this.centralDirSize===n.MAX_VALUE_32BITS||this.centralDirOffset===n.MAX_VALUE_32BITS){this.zip64=true;e=this.reader.lastIndexOfSignature(t.ZIP64_CENTRAL_DIRECTORY_LOCATOR);if(e<0){throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator")}this.reader.setIndex(e);this.checkSignature(t.ZIP64_CENTRAL_DIRECTORY_LOCATOR);this.readBlockZip64EndOfCentralLocator();if(!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,t.ZIP64_CENTRAL_DIRECTORY_END)){this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(t.ZIP64_CENTRAL_DIRECTORY_END);if(this.relativeOffsetEndOfZip64CentralDir<0){throw new Error("Corrupted zip: can't find the ZIP64 end of central directory")}}this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);this.checkSignature(t.ZIP64_CENTRAL_DIRECTORY_END);this.readBlockZip64EndOfCentral()}var a=this.centralDirOffset+this.centralDirSize;if(this.zip64){a+=20;a+=12+this.zip64EndOfCentralSize}var h=r-a;if(h>0){if(this.isSignature(r,t.CENTRAL_FILE_HEADER)){}else{this.reader.zero=h}}else if(h<0){throw new Error("Corrupted zip: missing "+Math.abs(h)+" bytes.")}},prepareReader:function(e){this.reader=a(e)},load:function(e){this.prepareReader(e);this.readEndOfCentral();this.readCentralDir();this.readLocalFiles()}};e.exports=ZipEntries},279:function(e,i,r){"use strict";var a=r(999);var n=true;var t=true;try{String.fromCharCode.apply(null,[0])}catch(e){n=false}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){t=false}var h=new a.Buf8(256);for(var l=0;l<256;l++){h[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1}h[254]=h[254]=1;i.string2buf=function(e){var i,r,n,t,h,l=e.length,f=0;for(t=0;t<l;t++){r=e.charCodeAt(t);if((r&64512)===55296&&t+1<l){n=e.charCodeAt(t+1);if((n&64512)===56320){r=65536+(r-55296<<10)+(n-56320);t++}}f+=r<128?1:r<2048?2:r<65536?3:4}i=new a.Buf8(f);for(h=0,t=0;h<f;t++){r=e.charCodeAt(t);if((r&64512)===55296&&t+1<l){n=e.charCodeAt(t+1);if((n&64512)===56320){r=65536+(r-55296<<10)+(n-56320);t++}}if(r<128){i[h++]=r}else if(r<2048){i[h++]=192|r>>>6;i[h++]=128|r&63}else if(r<65536){i[h++]=224|r>>>12;i[h++]=128|r>>>6&63;i[h++]=128|r&63}else{i[h++]=240|r>>>18;i[h++]=128|r>>>12&63;i[h++]=128|r>>>6&63;i[h++]=128|r&63}}return i};function buf2binstring(e,i){if(i<65534){if(e.subarray&&t||!e.subarray&&n){return String.fromCharCode.apply(null,a.shrinkBuf(e,i))}}var r="";for(var h=0;h<i;h++){r+=String.fromCharCode(e[h])}return r}i.buf2binstring=function(e){return buf2binstring(e,e.length)};i.binstring2buf=function(e){var i=new a.Buf8(e.length);for(var r=0,n=i.length;r<n;r++){i[r]=e.charCodeAt(r)}return i};i.buf2string=function(e,i){var r,a,n,t;var l=i||e.length;var f=new Array(l*2);for(a=0,r=0;r<l;){n=e[r++];if(n<128){f[a++]=n;continue}t=h[n];if(t>4){f[a++]=65533;r+=t-1;continue}n&=t===2?31:t===3?15:7;while(t>1&&r<l){n=n<<6|e[r++]&63;t--}if(t>1){f[a++]=65533;continue}if(n<65536){f[a++]=n}else{n-=65536;f[a++]=55296|n>>10&1023;f[a++]=56320|n&1023}}return buf2binstring(f,a)};i.utf8border=function(e,i){var r;i=i||e.length;if(i>e.length){i=e.length}r=i-1;while(r>=0&&(e[r]&192)===128){r--}if(r<0){return i}if(r===0){return i}return r+h[e[r]]>i?r:i}},286:function(e,i){function isArray(e){if(Array.isArray){return Array.isArray(e)}return objectToString(e)==="[object Array]"}i.isArray=isArray;function isBoolean(e){return typeof e==="boolean"}i.isBoolean=isBoolean;function isNull(e){return e===null}i.isNull=isNull;function isNullOrUndefined(e){return e==null}i.isNullOrUndefined=isNullOrUndefined;function isNumber(e){return typeof e==="number"}i.isNumber=isNumber;function isString(e){return typeof e==="string"}i.isString=isString;function isSymbol(e){return typeof e==="symbol"}i.isSymbol=isSymbol;function isUndefined(e){return e===void 0}i.isUndefined=isUndefined;function isRegExp(e){return objectToString(e)==="[object RegExp]"}i.isRegExp=isRegExp;function isObject(e){return typeof e==="object"&&e!==null}i.isObject=isObject;function isDate(e){return objectToString(e)==="[object Date]"}i.isDate=isDate;function isError(e){return objectToString(e)==="[object Error]"||e instanceof Error}i.isError=isError;function isFunction(e){return typeof e==="function"}i.isFunction=isFunction;function isPrimitive(e){return e===null||typeof e==="boolean"||typeof e==="number"||typeof e==="string"||typeof e==="symbol"||typeof e==="undefined"}i.isPrimitive=isPrimitive;i.isBuffer=Buffer.isBuffer;function objectToString(e){return Object.prototype.toString.call(e)}},292:function(e,i){"use strict";i.base64=false;i.binary=false;i.dir=false;i.createFolders=true;i.date=null;i.compression=null;i.compressionOptions=null;i.comment=null;i.unixPermissions=null;i.dosPermissions=null},293:function(e){e.exports=require("buffer")},315:function(e){if(typeof Object.create==="function"){e.exports=function inherits(e,i){if(i){e.super_=i;e.prototype=Object.create(i.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})}}}else{e.exports=function inherits(e,i){if(i){e.super_=i;var r=function(){};r.prototype=i.prototype;e.prototype=new r;e.prototype.constructor=e}}}},321:function(e,i,r){var a=r(293);var n=a.Buffer;function copyProps(e,i){for(var r in e){i[r]=e[r]}}if(n.from&&n.alloc&&n.allocUnsafe&&n.allocUnsafeSlow){e.exports=a}else{copyProps(a,i);i.Buffer=SafeBuffer}function SafeBuffer(e,i,r){return n(e,i,r)}copyProps(n,SafeBuffer);SafeBuffer.from=function(e,i,r){if(typeof e==="number"){throw new TypeError("Argument must not be a number")}return n(e,i,r)};SafeBuffer.alloc=function(e,i,r){if(typeof e!=="number"){throw new TypeError("Argument must be a number")}var a=n(e);if(i!==undefined){if(typeof r==="string"){a.fill(i,r)}else{a.fill(i)}}else{a.fill(0)}return a};SafeBuffer.allocUnsafe=function(e){if(typeof e!=="number"){throw new TypeError("Argument must be a number")}return n(e)};SafeBuffer.allocUnsafeSlow=function(e){if(typeof e!=="number"){throw new TypeError("Argument must be a number")}return a.SlowBuffer(e)}},378:function(e,i,r){"use strict";var a=r(999);var n=r(43);var t=r(141);var h=r(613);var l=r(868);var f=0;var s=1;var d=3;var c=4;var v=5;var g=0;var y=1;var b=-2;var k=-3;var S=-5;var u=-1;var R=1;var C=2;var T=3;var E=4;var I=0;var A=2;var O=8;var B=9;var L=15;var W=8;var F=29;var D=256;var N=D+1+F;var P=30;var U=19;var j=2*N+1;var Z=15;var z=3;var M=258;var q=M+z+1;var K=32;var J=42;var X=69;var G=73;var V=91;var H=103;var Q=113;var $=666;var Y=1;var x=2;var w=3;var _=4;var p=3;function err(e,i){e.msg=l[i];return i}function rank(e){return(e<<1)-(e>4?9:0)}function zero(e){var i=e.length;while(--i>=0){e[i]=0}}function flush_pending(e){var i=e.state;var r=i.pending;if(r>e.avail_out){r=e.avail_out}if(r===0){return}a.arraySet(e.output,i.pending_buf,i.pending_out,r,e.next_out);e.next_out+=r;i.pending_out+=r;e.total_out+=r;e.avail_out-=r;i.pending-=r;if(i.pending===0){i.pending_out=0}}function flush_block_only(e,i){n._tr_flush_block(e,e.block_start>=0?e.block_start:-1,e.strstart-e.block_start,i);e.block_start=e.strstart;flush_pending(e.strm)}function put_byte(e,i){e.pending_buf[e.pending++]=i}function putShortMSB(e,i){e.pending_buf[e.pending++]=i>>>8&255;e.pending_buf[e.pending++]=i&255}function read_buf(e,i,r,n){var l=e.avail_in;if(l>n){l=n}if(l===0){return 0}e.avail_in-=l;a.arraySet(i,e.input,e.next_in,l,r);if(e.state.wrap===1){e.adler=t(e.adler,i,l,r)}else if(e.state.wrap===2){e.adler=h(e.adler,i,l,r)}e.next_in+=l;e.total_in+=l;return l}function longest_match(e,i){var r=e.max_chain_length;var a=e.strstart;var n;var t;var h=e.prev_length;var l=e.nice_match;var f=e.strstart>e.w_size-q?e.strstart-(e.w_size-q):0;var s=e.window;var d=e.w_mask;var c=e.prev;var v=e.strstart+M;var g=s[a+h-1];var y=s[a+h];if(e.prev_length>=e.good_match){r>>=2}if(l>e.lookahead){l=e.lookahead}do{n=i;if(s[n+h]!==y||s[n+h-1]!==g||s[n]!==s[a]||s[++n]!==s[a+1]){continue}a+=2;n++;do{}while(s[++a]===s[++n]&&s[++a]===s[++n]&&s[++a]===s[++n]&&s[++a]===s[++n]&&s[++a]===s[++n]&&s[++a]===s[++n]&&s[++a]===s[++n]&&s[++a]===s[++n]&&a<v);t=M-(v-a);a=v-M;if(t>h){e.match_start=i;h=t;if(t>=l){break}g=s[a+h-1];y=s[a+h]}}while((i=c[i&d])>f&&--r!==0);if(h<=e.lookahead){return h}return e.lookahead}function fill_window(e){var i=e.w_size;var r,n,t,h,l;do{h=e.window_size-e.lookahead-e.strstart;if(e.strstart>=i+(i-q)){a.arraySet(e.window,e.window,i,i,0);e.match_start-=i;e.strstart-=i;e.block_start-=i;n=e.hash_size;r=n;do{t=e.head[--r];e.head[r]=t>=i?t-i:0}while(--n);n=i;r=n;do{t=e.prev[--r];e.prev[r]=t>=i?t-i:0}while(--n);h+=i}if(e.strm.avail_in===0){break}n=read_buf(e.strm,e.window,e.strstart+e.lookahead,h);e.lookahead+=n;if(e.lookahead+e.insert>=z){l=e.strstart-e.insert;e.ins_h=e.window[l];e.ins_h=(e.ins_h<<e.hash_shift^e.window[l+1])&e.hash_mask;while(e.insert){e.ins_h=(e.ins_h<<e.hash_shift^e.window[l+z-1])&e.hash_mask;e.prev[l&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=l;l++;e.insert--;if(e.lookahead+e.insert<z){break}}}}while(e.lookahead<q&&e.strm.avail_in!==0)}function deflate_stored(e,i){var r=65535;if(r>e.pending_buf_size-5){r=e.pending_buf_size-5}for(;;){if(e.lookahead<=1){fill_window(e);if(e.lookahead===0&&i===f){return Y}if(e.lookahead===0){break}}e.strstart+=e.lookahead;e.lookahead=0;var a=e.block_start+r;if(e.strstart===0||e.strstart>=a){e.lookahead=e.strstart-a;e.strstart=a;flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}if(e.strstart-e.block_start>=e.w_size-q){flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}}e.insert=0;if(i===c){flush_block_only(e,true);if(e.strm.avail_out===0){return w}return _}if(e.strstart>e.block_start){flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}return Y}function deflate_fast(e,i){var r;var a;for(;;){if(e.lookahead<q){fill_window(e);if(e.lookahead<q&&i===f){return Y}if(e.lookahead===0){break}}r=0;if(e.lookahead>=z){e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+z-1])&e.hash_mask;r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart}if(r!==0&&e.strstart-r<=e.w_size-q){e.match_length=longest_match(e,r)}if(e.match_length>=z){a=n._tr_tally(e,e.strstart-e.match_start,e.match_length-z);e.lookahead-=e.match_length;if(e.match_length<=e.max_lazy_match&&e.lookahead>=z){e.match_length--;do{e.strstart++;e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+z-1])&e.hash_mask;r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart}while(--e.match_length!==0);e.strstart++}else{e.strstart+=e.match_length;e.match_length=0;e.ins_h=e.window[e.strstart];e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask}}else{a=n._tr_tally(e,0,e.window[e.strstart]);e.lookahead--;e.strstart++}if(a){flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}}e.insert=e.strstart<z-1?e.strstart:z-1;if(i===c){flush_block_only(e,true);if(e.strm.avail_out===0){return w}return _}if(e.last_lit){flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}return x}function deflate_slow(e,i){var r;var a;var t;for(;;){if(e.lookahead<q){fill_window(e);if(e.lookahead<q&&i===f){return Y}if(e.lookahead===0){break}}r=0;if(e.lookahead>=z){e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+z-1])&e.hash_mask;r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart}e.prev_length=e.match_length;e.prev_match=e.match_start;e.match_length=z-1;if(r!==0&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-q){e.match_length=longest_match(e,r);if(e.match_length<=5&&(e.strategy===R||e.match_length===z&&e.strstart-e.match_start>4096)){e.match_length=z-1}}if(e.prev_length>=z&&e.match_length<=e.prev_length){t=e.strstart+e.lookahead-z;a=n._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-z);e.lookahead-=e.prev_length-1;e.prev_length-=2;do{if(++e.strstart<=t){e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+z-1])&e.hash_mask;r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h];e.head[e.ins_h]=e.strstart}}while(--e.prev_length!==0);e.match_available=0;e.match_length=z-1;e.strstart++;if(a){flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}}else if(e.match_available){a=n._tr_tally(e,0,e.window[e.strstart-1]);if(a){flush_block_only(e,false)}e.strstart++;e.lookahead--;if(e.strm.avail_out===0){return Y}}else{e.match_available=1;e.strstart++;e.lookahead--}}if(e.match_available){a=n._tr_tally(e,0,e.window[e.strstart-1]);e.match_available=0}e.insert=e.strstart<z-1?e.strstart:z-1;if(i===c){flush_block_only(e,true);if(e.strm.avail_out===0){return w}return _}if(e.last_lit){flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}return x}function deflate_rle(e,i){var r;var a;var t,h;var l=e.window;for(;;){if(e.lookahead<=M){fill_window(e);if(e.lookahead<=M&&i===f){return Y}if(e.lookahead===0){break}}e.match_length=0;if(e.lookahead>=z&&e.strstart>0){t=e.strstart-1;a=l[t];if(a===l[++t]&&a===l[++t]&&a===l[++t]){h=e.strstart+M;do{}while(a===l[++t]&&a===l[++t]&&a===l[++t]&&a===l[++t]&&a===l[++t]&&a===l[++t]&&a===l[++t]&&a===l[++t]&&t<h);e.match_length=M-(h-t);if(e.match_length>e.lookahead){e.match_length=e.lookahead}}}if(e.match_length>=z){r=n._tr_tally(e,1,e.match_length-z);e.lookahead-=e.match_length;e.strstart+=e.match_length;e.match_length=0}else{r=n._tr_tally(e,0,e.window[e.strstart]);e.lookahead--;e.strstart++}if(r){flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}}e.insert=0;if(i===c){flush_block_only(e,true);if(e.strm.avail_out===0){return w}return _}if(e.last_lit){flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}return x}function deflate_huff(e,i){var r;for(;;){if(e.lookahead===0){fill_window(e);if(e.lookahead===0){if(i===f){return Y}break}}e.match_length=0;r=n._tr_tally(e,0,e.window[e.strstart]);e.lookahead--;e.strstart++;if(r){flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}}e.insert=0;if(i===c){flush_block_only(e,true);if(e.strm.avail_out===0){return w}return _}if(e.last_lit){flush_block_only(e,false);if(e.strm.avail_out===0){return Y}}return x}function Config(e,i,r,a,n){this.good_length=e;this.max_lazy=i;this.nice_length=r;this.max_chain=a;this.func=n}var m;m=[new Config(0,0,0,0,deflate_stored),new Config(4,4,8,4,deflate_fast),new Config(4,5,16,8,deflate_fast),new Config(4,6,32,32,deflate_fast),new Config(4,4,16,16,deflate_slow),new Config(8,16,32,32,deflate_slow),new Config(8,16,128,128,deflate_slow),new Config(8,32,128,256,deflate_slow),new Config(32,128,258,1024,deflate_slow),new Config(32,258,258,4096,deflate_slow)];function lm_init(e){e.window_size=2*e.w_size;zero(e.head);e.max_lazy_match=m[e.level].max_lazy;e.good_match=m[e.level].good_length;e.nice_match=m[e.level].nice_length;e.max_chain_length=m[e.level].max_chain;e.strstart=0;e.block_start=0;e.lookahead=0;e.insert=0;e.match_length=e.prev_length=z-1;e.match_available=0;e.ins_h=0}function DeflateState(){this.strm=null;this.status=0;this.pending_buf=null;this.pending_buf_size=0;this.pending_out=0;this.pending=0;this.wrap=0;this.gzhead=null;this.gzindex=0;this.method=O;this.last_flush=-1;this.w_size=0;this.w_bits=0;this.w_mask=0;this.window=null;this.window_size=0;this.prev=null;this.head=null;this.ins_h=0;this.hash_size=0;this.hash_bits=0;this.hash_mask=0;this.hash_shift=0;this.block_start=0;this.match_length=0;this.prev_match=0;this.match_available=0;this.strstart=0;this.match_start=0;this.lookahead=0;this.prev_length=0;this.max_chain_length=0;this.max_lazy_match=0;this.level=0;this.strategy=0;this.good_match=0;this.nice_match=0;this.dyn_ltree=new a.Buf16(j*2);this.dyn_dtree=new a.Buf16((2*P+1)*2);this.bl_tree=new a.Buf16((2*U+1)*2);zero(this.dyn_ltree);zero(this.dyn_dtree);zero(this.bl_tree);this.l_desc=null;this.d_desc=null;this.bl_desc=null;this.bl_count=new a.Buf16(Z+1);this.heap=new a.Buf16(2*N+1);zero(this.heap);this.heap_len=0;this.heap_max=0;this.depth=new a.Buf16(2*N+1);zero(this.depth);this.l_buf=0;this.lit_bufsize=0;this.last_lit=0;this.d_buf=0;this.opt_len=0;this.static_len=0;this.matches=0;this.insert=0;this.bi_buf=0;this.bi_valid=0}function deflateResetKeep(e){var i;if(!e||!e.state){return err(e,b)}e.total_in=e.total_out=0;e.data_type=A;i=e.state;i.pending=0;i.pending_out=0;if(i.wrap<0){i.wrap=-i.wrap}i.status=i.wrap?J:Q;e.adler=i.wrap===2?0:1;i.last_flush=f;n._tr_init(i);return g}function deflateReset(e){var i=deflateResetKeep(e);if(i===g){lm_init(e.state)}return i}function deflateSetHeader(e,i){if(!e||!e.state){return b}if(e.state.wrap!==2){return b}e.state.gzhead=i;return g}function deflateInit2(e,i,r,n,t,h){if(!e){return b}var l=1;if(i===u){i=6}if(n<0){l=0;n=-n}else if(n>15){l=2;n-=16}if(t<1||t>B||r!==O||n<8||n>15||i<0||i>9||h<0||h>E){return err(e,b)}if(n===8){n=9}var f=new DeflateState;e.state=f;f.strm=e;f.wrap=l;f.gzhead=null;f.w_bits=n;f.w_size=1<<f.w_bits;f.w_mask=f.w_size-1;f.hash_bits=t+7;f.hash_size=1<<f.hash_bits;f.hash_mask=f.hash_size-1;f.hash_shift=~~((f.hash_bits+z-1)/z);f.window=new a.Buf8(f.w_size*2);f.head=new a.Buf16(f.hash_size);f.prev=new a.Buf16(f.w_size);f.lit_bufsize=1<<t+6;f.pending_buf_size=f.lit_bufsize*4;f.pending_buf=new a.Buf8(f.pending_buf_size);f.d_buf=1*f.lit_bufsize;f.l_buf=(1+2)*f.lit_bufsize;f.level=i;f.strategy=h;f.method=r;return deflateReset(e)}function deflateInit(e,i){return deflateInit2(e,i,O,L,W,I)}function deflate(e,i){var r,a;var t,l;if(!e||!e.state||i>v||i<0){return e?err(e,b):b}a=e.state;if(!e.output||!e.input&&e.avail_in!==0||a.status===$&&i!==c){return err(e,e.avail_out===0?S:b)}a.strm=e;r=a.last_flush;a.last_flush=i;if(a.status===J){if(a.wrap===2){e.adler=0;put_byte(a,31);put_byte(a,139);put_byte(a,8);if(!a.gzhead){put_byte(a,0);put_byte(a,0);put_byte(a,0);put_byte(a,0);put_byte(a,0);put_byte(a,a.level===9?2:a.strategy>=C||a.level<2?4:0);put_byte(a,p);a.status=Q}else{put_byte(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(!a.gzhead.extra?0:4)+(!a.gzhead.name?0:8)+(!a.gzhead.comment?0:16));put_byte(a,a.gzhead.time&255);put_byte(a,a.gzhead.time>>8&255);put_byte(a,a.gzhead.time>>16&255);put_byte(a,a.gzhead.time>>24&255);put_byte(a,a.level===9?2:a.strategy>=C||a.level<2?4:0);put_byte(a,a.gzhead.os&255);if(a.gzhead.extra&&a.gzhead.extra.length){put_byte(a,a.gzhead.extra.length&255);put_byte(a,a.gzhead.extra.length>>8&255)}if(a.gzhead.hcrc){e.adler=h(e.adler,a.pending_buf,a.pending,0)}a.gzindex=0;a.status=X}}else{var k=O+(a.w_bits-8<<4)<<8;var u=-1;if(a.strategy>=C||a.level<2){u=0}else if(a.level<6){u=1}else if(a.level===6){u=2}else{u=3}k|=u<<6;if(a.strstart!==0){k|=K}k+=31-k%31;a.status=Q;putShortMSB(a,k);if(a.strstart!==0){putShortMSB(a,e.adler>>>16);putShortMSB(a,e.adler&65535)}e.adler=1}}if(a.status===X){if(a.gzhead.extra){t=a.pending;while(a.gzindex<(a.gzhead.extra.length&65535)){if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>t){e.adler=h(e.adler,a.pending_buf,a.pending-t,t)}flush_pending(e);t=a.pending;if(a.pending===a.pending_buf_size){break}}put_byte(a,a.gzhead.extra[a.gzindex]&255);a.gzindex++}if(a.gzhead.hcrc&&a.pending>t){e.adler=h(e.adler,a.pending_buf,a.pending-t,t)}if(a.gzindex===a.gzhead.extra.length){a.gzindex=0;a.status=G}}else{a.status=G}}if(a.status===G){if(a.gzhead.name){t=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>t){e.adler=h(e.adler,a.pending_buf,a.pending-t,t)}flush_pending(e);t=a.pending;if(a.pending===a.pending_buf_size){l=1;break}}if(a.gzindex<a.gzhead.name.length){l=a.gzhead.name.charCodeAt(a.gzindex++)&255}else{l=0}put_byte(a,l)}while(l!==0);if(a.gzhead.hcrc&&a.pending>t){e.adler=h(e.adler,a.pending_buf,a.pending-t,t)}if(l===0){a.gzindex=0;a.status=V}}else{a.status=V}}if(a.status===V){if(a.gzhead.comment){t=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>t){e.adler=h(e.adler,a.pending_buf,a.pending-t,t)}flush_pending(e);t=a.pending;if(a.pending===a.pending_buf_size){l=1;break}}if(a.gzindex<a.gzhead.comment.length){l=a.gzhead.comment.charCodeAt(a.gzindex++)&255}else{l=0}put_byte(a,l)}while(l!==0);if(a.gzhead.hcrc&&a.pending>t){e.adler=h(e.adler,a.pending_buf,a.pending-t,t)}if(l===0){a.status=H}}else{a.status=H}}if(a.status===H){if(a.gzhead.hcrc){if(a.pending+2>a.pending_buf_size){flush_pending(e)}if(a.pending+2<=a.pending_buf_size){put_byte(a,e.adler&255);put_byte(a,e.adler>>8&255);e.adler=0;a.status=Q}}else{a.status=Q}}if(a.pending!==0){flush_pending(e);if(e.avail_out===0){a.last_flush=-1;return g}}else if(e.avail_in===0&&rank(i)<=rank(r)&&i!==c){return err(e,S)}if(a.status===$&&e.avail_in!==0){return err(e,S)}if(e.avail_in!==0||a.lookahead!==0||i!==f&&a.status!==$){var R=a.strategy===C?deflate_huff(a,i):a.strategy===T?deflate_rle(a,i):m[a.level].func(a,i);if(R===w||R===_){a.status=$}if(R===Y||R===w){if(e.avail_out===0){a.last_flush=-1}return g}if(R===x){if(i===s){n._tr_align(a)}else if(i!==v){n._tr_stored_block(a,0,0,false);if(i===d){zero(a.head);if(a.lookahead===0){a.strstart=0;a.block_start=0;a.insert=0}}}flush_pending(e);if(e.avail_out===0){a.last_flush=-1;return g}}}if(i!==c){return g}if(a.wrap<=0){return y}if(a.wrap===2){put_byte(a,e.adler&255);put_byte(a,e.adler>>8&255);put_byte(a,e.adler>>16&255);put_byte(a,e.adler>>24&255);put_byte(a,e.total_in&255);put_byte(a,e.total_in>>8&255);put_byte(a,e.total_in>>16&255);put_byte(a,e.total_in>>24&255)}else{putShortMSB(a,e.adler>>>16);putShortMSB(a,e.adler&65535)}flush_pending(e);if(a.wrap>0){a.wrap=-a.wrap}return a.pending!==0?g:y}function deflateEnd(e){var i;if(!e||!e.state){return b}i=e.state.status;if(i!==J&&i!==X&&i!==G&&i!==V&&i!==H&&i!==Q&&i!==$){return err(e,b)}e.state=null;return i===Q?err(e,k):g}function deflateSetDictionary(e,i){var r=i.length;var n;var h,l;var f;var s;var d;var c;var v;if(!e||!e.state){return b}n=e.state;f=n.wrap;if(f===2||f===1&&n.status!==J||n.lookahead){return b}if(f===1){e.adler=t(e.adler,i,r,0)}n.wrap=0;if(r>=n.w_size){if(f===0){zero(n.head);n.strstart=0;n.block_start=0;n.insert=0}v=new a.Buf8(n.w_size);a.arraySet(v,i,r-n.w_size,n.w_size,0);i=v;r=n.w_size}s=e.avail_in;d=e.next_in;c=e.input;e.avail_in=r;e.next_in=0;e.input=i;fill_window(n);while(n.lookahead>=z){h=n.strstart;l=n.lookahead-(z-1);do{n.ins_h=(n.ins_h<<n.hash_shift^n.window[h+z-1])&n.hash_mask;n.prev[h&n.w_mask]=n.head[n.ins_h];n.head[n.ins_h]=h;h++}while(--l);n.strstart=h;n.lookahead=z-1;fill_window(n)}n.strstart+=n.lookahead;n.block_start=n.strstart;n.insert=n.lookahead;n.lookahead=0;n.match_length=n.prev_length=z-1;n.match_available=0;e.next_in=d;e.input=c;e.avail_in=s;n.wrap=f;return g}i.deflateInit=deflateInit;i.deflateInit2=deflateInit2;i.deflateReset=deflateReset;i.deflateResetKeep=deflateResetKeep;i.deflateSetHeader=deflateSetHeader;i.deflate=deflate;i.deflateEnd=deflateEnd;i.deflateSetDictionary=deflateSetDictionary;i.deflateInfo="pako deflate (from Nodeca project)"},401:function(e,i,r){"use strict";var a=r(999);var n=r(141);var t=r(613);var h=r(181);var l=r(685);var f=0;var s=1;var d=2;var c=4;var v=5;var g=6;var y=0;var b=1;var k=2;var S=-2;var u=-3;var R=-4;var C=-5;var T=8;var E=1;var I=2;var A=3;var O=4;var B=5;var L=6;var W=7;var F=8;var D=9;var N=10;var P=11;var U=12;var j=13;var Z=14;var z=15;var M=16;var q=17;var K=18;var J=19;var X=20;var G=21;var V=22;var H=23;var Q=24;var $=25;var Y=26;var x=27;var w=28;var _=29;var p=30;var m=31;var o=32;var ee=852;var ie=592;var re=15;var ae=re;function zswap32(e){return(e>>>24&255)+(e>>>8&65280)+((e&65280)<<8)+((e&255)<<24)}function InflateState(){this.mode=0;this.last=false;this.wrap=0;this.havedict=false;this.flags=0;this.dmax=0;this.check=0;this.total=0;this.head=null;this.wbits=0;this.wsize=0;this.whave=0;this.wnext=0;this.window=null;this.hold=0;this.bits=0;this.length=0;this.offset=0;this.extra=0;this.lencode=null;this.distcode=null;this.lenbits=0;this.distbits=0;this.ncode=0;this.nlen=0;this.ndist=0;this.have=0;this.next=null;this.lens=new a.Buf16(320);this.work=new a.Buf16(288);this.lendyn=null;this.distdyn=null;this.sane=0;this.back=0;this.was=0}function inflateResetKeep(e){var i;if(!e||!e.state){return S}i=e.state;e.total_in=e.total_out=i.total=0;e.msg="";if(i.wrap){e.adler=i.wrap&1}i.mode=E;i.last=0;i.havedict=0;i.dmax=32768;i.head=null;i.hold=0;i.bits=0;i.lencode=i.lendyn=new a.Buf32(ee);i.distcode=i.distdyn=new a.Buf32(ie);i.sane=1;i.back=-1;return y}function inflateReset(e){var i;if(!e||!e.state){return S}i=e.state;i.wsize=0;i.whave=0;i.wnext=0;return inflateResetKeep(e)}function inflateReset2(e,i){var r;var a;if(!e||!e.state){return S}a=e.state;if(i<0){r=0;i=-i}else{r=(i>>4)+1;if(i<48){i&=15}}if(i&&(i<8||i>15)){return S}if(a.window!==null&&a.wbits!==i){a.window=null}a.wrap=r;a.wbits=i;return inflateReset(e)}function inflateInit2(e,i){var r;var a;if(!e){return S}a=new InflateState;e.state=a;a.window=null;r=inflateReset2(e,i);if(r!==y){e.state=null}return r}function inflateInit(e){return inflateInit2(e,ae)}var ne=true;var te,he;function fixedtables(e){if(ne){var i;te=new a.Buf32(512);he=new a.Buf32(32);i=0;while(i<144){e.lens[i++]=8}while(i<256){e.lens[i++]=9}while(i<280){e.lens[i++]=7}while(i<288){e.lens[i++]=8}l(s,e.lens,0,288,te,0,e.work,{bits:9});i=0;while(i<32){e.lens[i++]=5}l(d,e.lens,0,32,he,0,e.work,{bits:5});ne=false}e.lencode=te;e.lenbits=9;e.distcode=he;e.distbits=5}function updatewindow(e,i,r,n){var t;var h=e.state;if(h.window===null){h.wsize=1<<h.wbits;h.wnext=0;h.whave=0;h.window=new a.Buf8(h.wsize)}if(n>=h.wsize){a.arraySet(h.window,i,r-h.wsize,h.wsize,0);h.wnext=0;h.whave=h.wsize}else{t=h.wsize-h.wnext;if(t>n){t=n}a.arraySet(h.window,i,r-n,t,h.wnext);n-=t;if(n){a.arraySet(h.window,i,r-n,n,0);h.wnext=n;h.whave=h.wsize}else{h.wnext+=t;if(h.wnext===h.wsize){h.wnext=0}if(h.whave<h.wsize){h.whave+=t}}}return 0}function inflate(e,i){var r;var ee,ie;var re;var ae;var ne,te;var he;var le;var fe,se;var de;var ce;var ve;var ge=0;var ye,be,ke;var Se,ue,Re;var Ce;var Te;var Ee=new a.Buf8(4);var Ie;var Ae;var Oe=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&e.avail_in!==0){return S}r=e.state;if(r.mode===U){r.mode=j}ae=e.next_out;ie=e.output;te=e.avail_out;re=e.next_in;ee=e.input;ne=e.avail_in;he=r.hold;le=r.bits;fe=ne;se=te;Te=y;e:for(;;){switch(r.mode){case E:if(r.wrap===0){r.mode=j;break}while(le<16){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}if(r.wrap&2&&he===35615){r.check=0;Ee[0]=he&255;Ee[1]=he>>>8&255;r.check=t(r.check,Ee,2,0);he=0;le=0;r.mode=I;break}r.flags=0;if(r.head){r.head.done=false}if(!(r.wrap&1)||(((he&255)<<8)+(he>>8))%31){e.msg="incorrect header check";r.mode=p;break}if((he&15)!==T){e.msg="unknown compression method";r.mode=p;break}he>>>=4;le-=4;Ce=(he&15)+8;if(r.wbits===0){r.wbits=Ce}else if(Ce>r.wbits){e.msg="invalid window size";r.mode=p;break}r.dmax=1<<Ce;e.adler=r.check=1;r.mode=he&512?N:U;he=0;le=0;break;case I:while(le<16){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}r.flags=he;if((r.flags&255)!==T){e.msg="unknown compression method";r.mode=p;break}if(r.flags&57344){e.msg="unknown header flags set";r.mode=p;break}if(r.head){r.head.text=he>>8&1}if(r.flags&512){Ee[0]=he&255;Ee[1]=he>>>8&255;r.check=t(r.check,Ee,2,0)}he=0;le=0;r.mode=A;case A:while(le<32){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}if(r.head){r.head.time=he}if(r.flags&512){Ee[0]=he&255;Ee[1]=he>>>8&255;Ee[2]=he>>>16&255;Ee[3]=he>>>24&255;r.check=t(r.check,Ee,4,0)}he=0;le=0;r.mode=O;case O:while(le<16){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}if(r.head){r.head.xflags=he&255;r.head.os=he>>8}if(r.flags&512){Ee[0]=he&255;Ee[1]=he>>>8&255;r.check=t(r.check,Ee,2,0)}he=0;le=0;r.mode=B;case B:if(r.flags&1024){while(le<16){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}r.length=he;if(r.head){r.head.extra_len=he}if(r.flags&512){Ee[0]=he&255;Ee[1]=he>>>8&255;r.check=t(r.check,Ee,2,0)}he=0;le=0}else if(r.head){r.head.extra=null}r.mode=L;case L:if(r.flags&1024){de=r.length;if(de>ne){de=ne}if(de){if(r.head){Ce=r.head.extra_len-r.length;if(!r.head.extra){r.head.extra=new Array(r.head.extra_len)}a.arraySet(r.head.extra,ee,re,de,Ce)}if(r.flags&512){r.check=t(r.check,ee,de,re)}ne-=de;re+=de;r.length-=de}if(r.length){break e}}r.length=0;r.mode=W;case W:if(r.flags&2048){if(ne===0){break e}de=0;do{Ce=ee[re+de++];if(r.head&&Ce&&r.length<65536){r.head.name+=String.fromCharCode(Ce)}}while(Ce&&de<ne);if(r.flags&512){r.check=t(r.check,ee,de,re)}ne-=de;re+=de;if(Ce){break e}}else if(r.head){r.head.name=null}r.length=0;r.mode=F;case F:if(r.flags&4096){if(ne===0){break e}de=0;do{Ce=ee[re+de++];if(r.head&&Ce&&r.length<65536){r.head.comment+=String.fromCharCode(Ce)}}while(Ce&&de<ne);if(r.flags&512){r.check=t(r.check,ee,de,re)}ne-=de;re+=de;if(Ce){break e}}else if(r.head){r.head.comment=null}r.mode=D;case D:if(r.flags&512){while(le<16){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}if(he!==(r.check&65535)){e.msg="header crc mismatch";r.mode=p;break}he=0;le=0}if(r.head){r.head.hcrc=r.flags>>9&1;r.head.done=true}e.adler=r.check=0;r.mode=U;break;case N:while(le<32){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}e.adler=r.check=zswap32(he);he=0;le=0;r.mode=P;case P:if(r.havedict===0){e.next_out=ae;e.avail_out=te;e.next_in=re;e.avail_in=ne;r.hold=he;r.bits=le;return k}e.adler=r.check=1;r.mode=U;case U:if(i===v||i===g){break e}case j:if(r.last){he>>>=le&7;le-=le&7;r.mode=x;break}while(le<3){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}r.last=he&1;he>>>=1;le-=1;switch(he&3){case 0:r.mode=Z;break;case 1:fixedtables(r);r.mode=X;if(i===g){he>>>=2;le-=2;break e}break;case 2:r.mode=q;break;case 3:e.msg="invalid block type";r.mode=p}he>>>=2;le-=2;break;case Z:he>>>=le&7;le-=le&7;while(le<32){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}if((he&65535)!==(he>>>16^65535)){e.msg="invalid stored block lengths";r.mode=p;break}r.length=he&65535;he=0;le=0;r.mode=z;if(i===g){break e}case z:r.mode=M;case M:de=r.length;if(de){if(de>ne){de=ne}if(de>te){de=te}if(de===0){break e}a.arraySet(ie,ee,re,de,ae);ne-=de;re+=de;te-=de;ae+=de;r.length-=de;break}r.mode=U;break;case q:while(le<14){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}r.nlen=(he&31)+257;he>>>=5;le-=5;r.ndist=(he&31)+1;he>>>=5;le-=5;r.ncode=(he&15)+4;he>>>=4;le-=4;if(r.nlen>286||r.ndist>30){e.msg="too many length or distance symbols";r.mode=p;break}r.have=0;r.mode=K;case K:while(r.have<r.ncode){while(le<3){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}r.lens[Oe[r.have++]]=he&7;he>>>=3;le-=3}while(r.have<19){r.lens[Oe[r.have++]]=0}r.lencode=r.lendyn;r.lenbits=7;Ie={bits:r.lenbits};Te=l(f,r.lens,0,19,r.lencode,0,r.work,Ie);r.lenbits=Ie.bits;if(Te){e.msg="invalid code lengths set";r.mode=p;break}r.have=0;r.mode=J;case J:while(r.have<r.nlen+r.ndist){for(;;){ge=r.lencode[he&(1<<r.lenbits)-1];ye=ge>>>24;be=ge>>>16&255;ke=ge&65535;if(ye<=le){break}if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}if(ke<16){he>>>=ye;le-=ye;r.lens[r.have++]=ke}else{if(ke===16){Ae=ye+2;while(le<Ae){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}he>>>=ye;le-=ye;if(r.have===0){e.msg="invalid bit length repeat";r.mode=p;break}Ce=r.lens[r.have-1];de=3+(he&3);he>>>=2;le-=2}else if(ke===17){Ae=ye+3;while(le<Ae){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}he>>>=ye;le-=ye;Ce=0;de=3+(he&7);he>>>=3;le-=3}else{Ae=ye+7;while(le<Ae){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}he>>>=ye;le-=ye;Ce=0;de=11+(he&127);he>>>=7;le-=7}if(r.have+de>r.nlen+r.ndist){e.msg="invalid bit length repeat";r.mode=p;break}while(de--){r.lens[r.have++]=Ce}}}if(r.mode===p){break}if(r.lens[256]===0){e.msg="invalid code -- missing end-of-block";r.mode=p;break}r.lenbits=9;Ie={bits:r.lenbits};Te=l(s,r.lens,0,r.nlen,r.lencode,0,r.work,Ie);r.lenbits=Ie.bits;if(Te){e.msg="invalid literal/lengths set";r.mode=p;break}r.distbits=6;r.distcode=r.distdyn;Ie={bits:r.distbits};Te=l(d,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,Ie);r.distbits=Ie.bits;if(Te){e.msg="invalid distances set";r.mode=p;break}r.mode=X;if(i===g){break e}case X:r.mode=G;case G:if(ne>=6&&te>=258){e.next_out=ae;e.avail_out=te;e.next_in=re;e.avail_in=ne;r.hold=he;r.bits=le;h(e,se);ae=e.next_out;ie=e.output;te=e.avail_out;re=e.next_in;ee=e.input;ne=e.avail_in;he=r.hold;le=r.bits;if(r.mode===U){r.back=-1}break}r.back=0;for(;;){ge=r.lencode[he&(1<<r.lenbits)-1];ye=ge>>>24;be=ge>>>16&255;ke=ge&65535;if(ye<=le){break}if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}if(be&&(be&240)===0){Se=ye;ue=be;Re=ke;for(;;){ge=r.lencode[Re+((he&(1<<Se+ue)-1)>>Se)];ye=ge>>>24;be=ge>>>16&255;ke=ge&65535;if(Se+ye<=le){break}if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}he>>>=Se;le-=Se;r.back+=Se}he>>>=ye;le-=ye;r.back+=ye;r.length=ke;if(be===0){r.mode=Y;break}if(be&32){r.back=-1;r.mode=U;break}if(be&64){e.msg="invalid literal/length code";r.mode=p;break}r.extra=be&15;r.mode=V;case V:if(r.extra){Ae=r.extra;while(le<Ae){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}r.length+=he&(1<<r.extra)-1;he>>>=r.extra;le-=r.extra;r.back+=r.extra}r.was=r.length;r.mode=H;case H:for(;;){ge=r.distcode[he&(1<<r.distbits)-1];ye=ge>>>24;be=ge>>>16&255;ke=ge&65535;if(ye<=le){break}if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}if((be&240)===0){Se=ye;ue=be;Re=ke;for(;;){ge=r.distcode[Re+((he&(1<<Se+ue)-1)>>Se)];ye=ge>>>24;be=ge>>>16&255;ke=ge&65535;if(Se+ye<=le){break}if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}he>>>=Se;le-=Se;r.back+=Se}he>>>=ye;le-=ye;r.back+=ye;if(be&64){e.msg="invalid distance code";r.mode=p;break}r.offset=ke;r.extra=be&15;r.mode=Q;case Q:if(r.extra){Ae=r.extra;while(le<Ae){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}r.offset+=he&(1<<r.extra)-1;he>>>=r.extra;le-=r.extra;r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back";r.mode=p;break}r.mode=$;case $:if(te===0){break e}de=se-te;if(r.offset>de){de=r.offset-de;if(de>r.whave){if(r.sane){e.msg="invalid distance too far back";r.mode=p;break}}if(de>r.wnext){de-=r.wnext;ce=r.wsize-de}else{ce=r.wnext-de}if(de>r.length){de=r.length}ve=r.window}else{ve=ie;ce=ae-r.offset;de=r.length}if(de>te){de=te}te-=de;r.length-=de;do{ie[ae++]=ve[ce++]}while(--de);if(r.length===0){r.mode=G}break;case Y:if(te===0){break e}ie[ae++]=r.length;te--;r.mode=G;break;case x:if(r.wrap){while(le<32){if(ne===0){break e}ne--;he|=ee[re++]<<le;le+=8}se-=te;e.total_out+=se;r.total+=se;if(se){e.adler=r.check=r.flags?t(r.check,ie,se,ae-se):n(r.check,ie,se,ae-se)}se=te;if((r.flags?he:zswap32(he))!==r.check){e.msg="incorrect data check";r.mode=p;break}he=0;le=0}r.mode=w;case w:if(r.wrap&&r.flags){while(le<32){if(ne===0){break e}ne--;he+=ee[re++]<<le;le+=8}if(he!==(r.total&4294967295)){e.msg="incorrect length check";r.mode=p;break}he=0;le=0}r.mode=_;case _:Te=b;break e;case p:Te=u;break e;case m:return R;case o:default:return S}}e.next_out=ae;e.avail_out=te;e.next_in=re;e.avail_in=ne;r.hold=he;r.bits=le;if(r.wsize||se!==e.avail_out&&r.mode<p&&(r.mode<x||i!==c)){if(updatewindow(e,e.output,e.next_out,se-e.avail_out)){r.mode=m;return R}}fe-=e.avail_in;se-=e.avail_out;e.total_in+=fe;e.total_out+=se;r.total+=se;if(r.wrap&&se){e.adler=r.check=r.flags?t(r.check,ie,se,e.next_out-se):n(r.check,ie,se,e.next_out-se)}e.data_type=r.bits+(r.last?64:0)+(r.mode===U?128:0)+(r.mode===X||r.mode===z?256:0);if((fe===0&&se===0||i===c)&&Te===y){Te=C}return Te}function inflateEnd(e){if(!e||!e.state){return S}var i=e.state;if(i.window){i.window=null}e.state=null;return y}function inflateGetHeader(e,i){var r;if(!e||!e.state){return S}r=e.state;if((r.wrap&2)===0){return S}r.head=i;i.done=false;return y}function inflateSetDictionary(e,i){var r=i.length;var a;var t;var h;if(!e||!e.state){return S}a=e.state;if(a.wrap!==0&&a.mode!==P){return S}if(a.mode===P){t=1;t=n(t,i,r,0);if(t!==a.check){return u}}h=updatewindow(e,i,r,r);if(h){a.mode=m;return R}a.havedict=1;return y}i.inflateReset=inflateReset;i.inflateReset2=inflateReset2;i.inflateResetKeep=inflateResetKeep;i.inflateInit=inflateInit;i.inflateInit2=inflateInit2;i.inflate=inflate;i.inflateEnd=inflateEnd;i.inflateGetHeader=inflateGetHeader;i.inflateSetDictionary=inflateSetDictionary;i.inflateInfo="pako inflate (from Nodeca project)"},413:function(e){e.exports=require("stream")},427:function(e,i,r){e.exports=r(413)},438:function(e,i,r){"use strict";var a=null;if(typeof Promise!=="undefined"){a=Promise}else{a=r(452)}e.exports={Promise:a}},452:function(e,i,r){"use strict";var a=r(655);function INTERNAL(){}var n={};var t=["REJECTED"];var h=["FULFILLED"];var l=["PENDING"];if(!process.browser){var f=["UNHANDLED"]}e.exports=Promise;function Promise(e){if(typeof e!=="function"){throw new TypeError("resolver must be a function")}this.state=l;this.queue=[];this.outcome=void 0;if(!process.browser){this.handled=f}if(e!==INTERNAL){safelyResolveThenable(this,e)}}Promise.prototype.finally=function(e){if(typeof e!=="function"){return this}var i=this.constructor;return this.then(resolve,reject);function resolve(r){function yes(){return r}return i.resolve(e()).then(yes)}function reject(r){function no(){throw r}return i.resolve(e()).then(no)}};Promise.prototype.catch=function(e){return this.then(null,e)};Promise.prototype.then=function(e,i){if(typeof e!=="function"&&this.state===h||typeof i!=="function"&&this.state===t){return this}var r=new this.constructor(INTERNAL);if(!process.browser){if(this.handled===f){this.handled=null}}if(this.state!==l){var a=this.state===h?e:i;unwrap(r,a,this.outcome)}else{this.queue.push(new QueueItem(r,e,i))}return r};function QueueItem(e,i,r){this.promise=e;if(typeof i==="function"){this.onFulfilled=i;this.callFulfilled=this.otherCallFulfilled}if(typeof r==="function"){this.onRejected=r;this.callRejected=this.otherCallRejected}}QueueItem.prototype.callFulfilled=function(e){n.resolve(this.promise,e)};QueueItem.prototype.otherCallFulfilled=function(e){unwrap(this.promise,this.onFulfilled,e)};QueueItem.prototype.callRejected=function(e){n.reject(this.promise,e)};QueueItem.prototype.otherCallRejected=function(e){unwrap(this.promise,this.onRejected,e)};function unwrap(e,i,r){a(function(){var a;try{a=i(r)}catch(i){return n.reject(e,i)}if(a===e){n.reject(e,new TypeError("Cannot resolve promise with itself"))}else{n.resolve(e,a)}})}n.resolve=function(e,i){var r=tryCatch(getThen,i);if(r.status==="error"){return n.reject(e,r.value)}var a=r.value;if(a){safelyResolveThenable(e,a)}else{e.state=h;e.outcome=i;var t=-1;var l=e.queue.length;while(++t<l){e.queue[t].callFulfilled(i)}}return e};n.reject=function(e,i){e.state=t;e.outcome=i;if(!process.browser){if(e.handled===f){a(function(){if(e.handled===f){process.emit("unhandledRejection",i,e)}})}}var r=-1;var n=e.queue.length;while(++r<n){e.queue[r].callRejected(i)}return e};function getThen(e){var i=e&&e.then;if(e&&(typeof e==="object"||typeof e==="function")&&typeof i==="function"){return function appyThen(){i.apply(e,arguments)}}}function safelyResolveThenable(e,i){var r=false;function onError(i){if(r){return}r=true;n.reject(e,i)}function onSuccess(i){if(r){return}r=true;n.resolve(e,i)}function tryToUnwrap(){i(onSuccess,onError)}var a=tryCatch(tryToUnwrap);if(a.status==="error"){onError(a.value)}}function tryCatch(e,i){var r={};try{r.value=e(i);r.status="success"}catch(e){r.status="error";r.value=e}return r}Promise.resolve=resolve;function resolve(e){if(e instanceof this){return e}return n.resolve(new this(INTERNAL),e)}Promise.reject=reject;function reject(e){var i=new this(INTERNAL);return n.reject(i,e)}Promise.all=all;function all(e){var i=this;if(Object.prototype.toString.call(e)!=="[object Array]"){return this.reject(new TypeError("must be an array"))}var r=e.length;var a=false;if(!r){return this.resolve([])}var t=new Array(r);var h=0;var l=-1;var f=new this(INTERNAL);while(++l<r){allResolver(e[l],l)}return f;function allResolver(e,l){i.resolve(e).then(resolveFromAll,function(e){if(!a){a=true;n.reject(f,e)}});function resolveFromAll(e){t[l]=e;if(++h===r&&!a){a=true;n.resolve(f,t)}}}}Promise.race=race;function race(e){var i=this;if(Object.prototype.toString.call(e)!=="[object Array]"){return this.reject(new TypeError("must be an array"))}var r=e.length;var a=false;if(!r){return this.resolve([])}var t=-1;var h=new this(INTERNAL);while(++t<r){resolver(e[t])}return h;function resolver(e){i.resolve(e).then(function(e){if(!a){a=true;n.resolve(h,e)}},function(e){if(!a){a=true;n.reject(h,e)}})}}},496:function(e,i,r){"use strict";var a=r(100);var n=r(967);var t=r(628);var h=r(780);var l=r(30);var f=function(e,i){var r="",a;for(a=0;a<i;a++){r+=String.fromCharCode(e&255);e=e>>>8}return r};var s=function(e,i){var r=e;if(!e){r=i?16893:33204}return(r&65535)<<16};var d=function(e,i){return(e||0)&63};var c=function(e,i,r,n,c,v){var g=e["file"],y=e["compression"],b=v!==t.utf8encode,k=a.transformTo("string",v(g.name)),S=a.transformTo("string",t.utf8encode(g.name)),u=g.comment,R=a.transformTo("string",v(u)),C=a.transformTo("string",t.utf8encode(u)),T=S.length!==g.name.length,E=C.length!==u.length,I,A,O="",B="",L="",W=g.dir,F=g.date;var D={crc32:0,compressedSize:0,uncompressedSize:0};if(!i||r){D.crc32=e["crc32"];D.compressedSize=e["compressedSize"];D.uncompressedSize=e["uncompressedSize"]}var N=0;if(i){N|=8}if(!b&&(T||E)){N|=2048}var P=0;var U=0;if(W){P|=16}if(c==="UNIX"){U=798;P|=s(g.unixPermissions,W)}else{U=20;P|=d(g.dosPermissions,W)}I=F.getUTCHours();I=I<<6;I=I|F.getUTCMinutes();I=I<<5;I=I|F.getUTCSeconds()/2;A=F.getUTCFullYear()-1980;A=A<<4;A=A|F.getUTCMonth()+1;A=A<<5;A=A|F.getUTCDate();if(T){B=f(1,1)+f(h(k),4)+S;O+="up"+f(B.length,2)+B}if(E){L=f(1,1)+f(h(R),4)+C;O+="uc"+f(L.length,2)+L}var j="";j+="\n\0";j+=f(N,2);j+=y.magic;j+=f(I,2);j+=f(A,2);j+=f(D.crc32,4);j+=f(D.compressedSize,4);j+=f(D.uncompressedSize,4);j+=f(k.length,2);j+=f(O.length,2);var Z=l.LOCAL_FILE_HEADER+j+k+O;var z=l.CENTRAL_FILE_HEADER+f(U,2)+j+f(R.length,2)+"\0\0"+"\0\0"+f(P,4)+f(n,4)+k+O+R;return{fileRecord:Z,dirRecord:z}};var v=function(e,i,r,n,t){var h="";var s=a.transformTo("string",t(n));h=l.CENTRAL_DIRECTORY_END+"\0\0"+"\0\0"+f(e,2)+f(e,2)+f(i,4)+f(r,4)+f(s.length,2)+s;return h};var g=function(e){var i="";i=l.DATA_DESCRIPTOR+f(e["crc32"],4)+f(e["compressedSize"],4)+f(e["uncompressedSize"],4);return i};function ZipFileWorker(e,i,r,a){n.call(this,"ZipFileWorker");this.bytesWritten=0;this.zipComment=i;this.zipPlatform=r;this.encodeFileName=a;this.streamFiles=e;this.accumulate=false;this.contentBuffer=[];this.dirRecords=[];this.currentSourceOffset=0;this.entriesCount=0;this.currentFile=null;this._sources=[]}a.inherits(ZipFileWorker,n);ZipFileWorker.prototype.push=function(e){var i=e.meta.percent||0;var r=this.entriesCount;var a=this._sources.length;if(this.accumulate){this.contentBuffer.push(e)}else{this.bytesWritten+=e.data.length;n.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(i+100*(r-a-1))/r:100}})}};ZipFileWorker.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten;this.currentFile=e["file"].name;var i=this.streamFiles&&!e["file"].dir;if(i){var r=c(e,i,false,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else{this.accumulate=true}};ZipFileWorker.prototype.closedSource=function(e){this.accumulate=false;var i=this.streamFiles&&!e["file"].dir;var r=c(e,i,true,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.dirRecords.push(r.dirRecord);if(i){this.push({data:g(e),meta:{percent:100}})}else{this.push({data:r.fileRecord,meta:{percent:0}});while(this.contentBuffer.length){this.push(this.contentBuffer.shift())}}this.currentFile=null};ZipFileWorker.prototype.flush=function(){var e=this.bytesWritten;for(var i=0;i<this.dirRecords.length;i++){this.push({data:this.dirRecords[i],meta:{percent:100}})}var r=this.bytesWritten-e;var a=v(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:a,meta:{percent:100}})};ZipFileWorker.prototype.prepareNextSource=function(){this.previous=this._sources.shift();this.openedSource(this.previous.streamInfo);if(this.isPaused){this.previous.pause()}else{this.previous.resume()}};ZipFileWorker.prototype.registerPrevious=function(e){this._sources.push(e);var i=this;e.on("data",function(e){i.processChunk(e)});e.on("end",function(){i.closedSource(i.previous.streamInfo);if(i._sources.length){i.prepareNextSource()}else{i.end()}});e.on("error",function(e){i.error(e)});return this};ZipFileWorker.prototype.resume=function(){if(!n.prototype.resume.call(this)){return false}if(!this.previous&&this._sources.length){this.prepareNextSource();return true}if(!this.previous&&!this._sources.length&&!this.generatedError){this.end();return true}};ZipFileWorker.prototype.error=function(e){var i=this._sources;if(!n.prototype.error.call(this,e)){return false}for(var r=0;r<i.length;r++){try{i[r].error(e)}catch(e){}}return true};ZipFileWorker.prototype.lock=function(){n.prototype.lock.call(this);var e=this._sources;for(var i=0;i<e.length;i++){e[i].lock()}};e.exports=ZipFileWorker},499:function(e){"use strict";e.exports={isNode:typeof Buffer!=="undefined",newBufferFrom:function(e,i){if(Buffer.from&&Buffer.from!==Uint8Array.from){return Buffer.from(e,i)}else{if(typeof e==="number"){throw new Error('The "data" argument must not be a number')}return new Buffer(e,i)}},allocBuffer:function(e){if(Buffer.alloc){return Buffer.alloc(e)}else{var i=new Buffer(e);i.fill(0);return i}},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&typeof e.on==="function"&&typeof e.pause==="function"&&typeof e.resume==="function"}}},501:function(e,i,r){"use strict";var a=r(828);var n=r(496);var t=function(e,i){var r=e||i;var n=a[r];if(!n){throw new Error(r+" is not a valid compression method !")}return n};i.generateWorker=function(e,i,r){var a=new n(i.streamFiles,r,i.platform,i.encodeFileName);var h=0;try{e.forEach(function(e,r){h++;var n=t(r.options.compression,i.compression);var l=r.options.compressionOptions||i.compressionOptions||{};var f=r.dir,s=r.date;r._compressWorker(n,l).withStreamInfo("file",{name:e,dir:f,date:s,comment:r.comment||"",unixPermissions:r.unixPermissions,dosPermissions:r.dosPermissions}).pipe(a)});a.entriesCount=h}catch(e){a.error(e)}return a}},557:function(e,i,r){"use strict";var a=r(824);var n=r(68);var t=r(628);var h=r(186);var l=r(967);var f=function(e,i,r){this.name=e;this.dir=r.dir;this.date=r.date;this.comment=r.comment;this.unixPermissions=r.unixPermissions;this.dosPermissions=r.dosPermissions;this._data=i;this._dataBinary=r.binary;this.options={compression:r.compression,compressionOptions:r.compressionOptions}};f.prototype={internalStream:function(e){var i=null,r="string";try{if(!e){throw new Error("No output type specified.")}r=e.toLowerCase();var n=r==="string"||r==="text";if(r==="binarystring"||r==="text"){r="string"}i=this._decompressWorker();var h=!this._dataBinary;if(h&&!n){i=i.pipe(new t.Utf8EncodeWorker)}if(!h&&n){i=i.pipe(new t.Utf8DecodeWorker)}}catch(e){i=new l("error");i.error(e)}return new a(i,r,"")},async:function(e,i){return this.internalStream(e).accumulate(i)},nodeStream:function(e,i){return this.internalStream(e||"nodebuffer").toNodejsStream(i)},_compressWorker:function(e,i){if(this._data instanceof h&&this._data.compression.magic===e.magic){return this._data.getCompressedWorker()}else{var r=this._decompressWorker();if(!this._dataBinary){r=r.pipe(new t.Utf8EncodeWorker)}return h.createWorkerFrom(r,e,i)}},_decompressWorker:function(){if(this._data instanceof h){return this._data.getContentWorker()}else if(this._data instanceof l){return this._data}else{return new n(this._data)}}};var s=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"];var d=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")};for(var c=0;c<s.length;c++){f.prototype[s[c]]=d}e.exports=f},564:function(e,i,r){"use strict";var a=r(574).Readable;var n=r(100);n.inherits(NodejsStreamOutputAdapter,a);function NodejsStreamOutputAdapter(e,i,r){a.call(this,i);this._helper=e;var n=this;e.on("data",function(e,i){if(!n.push(e)){n._helper.pause()}if(r){r(i)}}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}NodejsStreamOutputAdapter.prototype._read=function(){this._helper.resume()};e.exports=NodejsStreamOutputAdapter},574:function(e,i,r){var a=r(413);if(process.env.READABLE_STREAM==="disable"&&a){e.exports=a;i=e.exports=a.Readable;i.Readable=a.Readable;i.Writable=a.Writable;i.Duplex=a.Duplex;i.Transform=a.Transform;i.PassThrough=a.PassThrough;i.Stream=a}else{i=e.exports=r(226);i.Stream=a||i;i.Readable=i;i.Writable=r(241);i.Duplex=r(831);i.Transform=r(925);i.PassThrough=r(882)}},613:function(e){"use strict";function makeTable(){var e,i=[];for(var r=0;r<256;r++){e=r;for(var a=0;a<8;a++){e=e&1?3988292384^e>>>1:e>>>1}i[r]=e}return i}var i=makeTable();function crc32(e,r,a,n){var t=i,h=n+a;e^=-1;for(var l=n;l<h;l++){e=e>>>8^t[(e^r[l])&255]}return e^-1}e.exports=crc32},614:function(e){e.exports=require("events")},628:function(e,i,r){"use strict";var a=r(100);var n=r(130);var t=r(499);var h=r(967);var l=new Array(256);for(var f=0;f<256;f++){l[f]=f>=252?6:f>=248?5:f>=240?4:f>=224?3:f>=192?2:1}l[254]=l[254]=1;var s=function(e){var i,r,a,t,h,l=e.length,f=0;for(t=0;t<l;t++){r=e.charCodeAt(t);if((r&64512)===55296&&t+1<l){a=e.charCodeAt(t+1);if((a&64512)===56320){r=65536+(r-55296<<10)+(a-56320);t++}}f+=r<128?1:r<2048?2:r<65536?3:4}if(n.uint8array){i=new Uint8Array(f)}else{i=new Array(f)}for(h=0,t=0;h<f;t++){r=e.charCodeAt(t);if((r&64512)===55296&&t+1<l){a=e.charCodeAt(t+1);if((a&64512)===56320){r=65536+(r-55296<<10)+(a-56320);t++}}if(r<128){i[h++]=r}else if(r<2048){i[h++]=192|r>>>6;i[h++]=128|r&63}else if(r<65536){i[h++]=224|r>>>12;i[h++]=128|r>>>6&63;i[h++]=128|r&63}else{i[h++]=240|r>>>18;i[h++]=128|r>>>12&63;i[h++]=128|r>>>6&63;i[h++]=128|r&63}}return i};var d=function(e,i){var r;i=i||e.length;if(i>e.length){i=e.length}r=i-1;while(r>=0&&(e[r]&192)===128){r--}if(r<0){return i}if(r===0){return i}return r+l[e[r]]>i?r:i};var c=function(e){var i,r,n,t,h;var f=e.length;var s=new Array(f*2);for(n=0,r=0;r<f;){t=e[r++];if(t<128){s[n++]=t;continue}h=l[t];if(h>4){s[n++]=65533;r+=h-1;continue}t&=h===2?31:h===3?15:7;while(h>1&&r<f){t=t<<6|e[r++]&63;h--}if(h>1){s[n++]=65533;continue}if(t<65536){s[n++]=t}else{t-=65536;s[n++]=55296|t>>10&1023;s[n++]=56320|t&1023}}if(s.length!==n){if(s.subarray){s=s.subarray(0,n)}else{s.length=n}}return a.applyFromCharCode(s)};i.utf8encode=function utf8encode(e){if(n.nodebuffer){return t.newBufferFrom(e,"utf-8")}return s(e)};i.utf8decode=function utf8decode(e){if(n.nodebuffer){return a.transformTo("nodebuffer",e).toString("utf-8")}e=a.transformTo(n.uint8array?"uint8array":"array",e);return c(e)};function Utf8DecodeWorker(){h.call(this,"utf-8 decode");this.leftOver=null}a.inherits(Utf8DecodeWorker,h);Utf8DecodeWorker.prototype.processChunk=function(e){var r=a.transformTo(n.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(n.uint8array){var t=r;r=new Uint8Array(t.length+this.leftOver.length);r.set(this.leftOver,0);r.set(t,this.leftOver.length)}else{r=this.leftOver.concat(r)}this.leftOver=null}var h=d(r);var l=r;if(h!==r.length){if(n.uint8array){l=r.subarray(0,h);this.leftOver=r.subarray(h,r.length)}else{l=r.slice(0,h);this.leftOver=r.slice(h,r.length)}}this.push({data:i.utf8decode(l),meta:e.meta})};Utf8DecodeWorker.prototype.flush=function(){if(this.leftOver&&this.leftOver.length){this.push({data:i.utf8decode(this.leftOver),meta:{}});this.leftOver=null}};i.Utf8DecodeWorker=Utf8DecodeWorker;function Utf8EncodeWorker(){h.call(this,"utf-8 encode")}a.inherits(Utf8EncodeWorker,h);Utf8EncodeWorker.prototype.processChunk=function(e){this.push({data:i.utf8encode(e.data),meta:e.meta})};i.Utf8EncodeWorker=Utf8EncodeWorker},655:function(e){"use strict";var i=global.MutationObserver||global.WebKitMutationObserver;var r;if(process.browser){if(i){var a=0;var n=new i(nextTick);var t=global.document.createTextNode("");n.observe(t,{characterData:true});r=function(){t.data=a=++a%2}}else if(!global.setImmediate&&typeof global.MessageChannel!=="undefined"){var h=new global.MessageChannel;h.port1.onmessage=nextTick;r=function(){h.port2.postMessage(0)}}else if("document"in global&&"onreadystatechange"in global.document.createElement("script")){r=function(){var e=global.document.createElement("script");e.onreadystatechange=function(){nextTick();e.onreadystatechange=null;e.parentNode.removeChild(e);e=null};global.document.documentElement.appendChild(e)}}else{r=function(){setTimeout(nextTick,0)}}}else{r=function(){process.nextTick(nextTick)}}var l;var f=[];function nextTick(){l=true;var e,i;var r=f.length;while(r){i=f;f=[];e=-1;while(++e<r){i[e]()}r=f.length}l=false}e.exports=immediate;function immediate(e){if(f.push(e)===1&&!l){r()}}},669:function(e){e.exports=require("util")},674:function(e,i,r){"use strict";var a=r(967);var n=r(100);function ConvertWorker(e){a.call(this,"ConvertWorker to "+e);this.destType=e}n.inherits(ConvertWorker,a);ConvertWorker.prototype.processChunk=function(e){this.push({data:n.transformTo(this.destType,e.data),meta:e.meta})};e.exports=ConvertWorker},676:function(e,i,r){const a=r(929);const n=r(687);var t=new a;const h={page:"https://blog-console-api.csdn.net/v1/article/list?page=",article:"https://blog-console-api.csdn.net/v1/editor/getArticle?id="};const l=e=>`${h.page}${e}`;const f=e=>`${h.article}${e}`;var s=1;async function nextPage(e){const i=l(e);let r=await(await fetch(i)).json();if(!r.data.list||r.data.list.length===0)return;if(r.code!==200){alert("导出失败。未登录或API已变动。查看Console,前去提交issue吧")}let a=r.data.total;for(info of r.data.list){const e=f(info.ArticleId);let i=await(await fetch(e)).json();const r=i.data.title.replace(/\/|\\/g,"_");t.file(`${r}.md`,i.data.markdowncontent);document.title=`📦 [${s++}/${a}] 已打包`}await nextPage(e+1)}nextPage(1).then(e=>{t.generateAsync({type:"blob"}).then(function(e){n.saveAs(e,"csdn-blog-md.zip")})})},685:function(e,i,r){"use strict";var a=r(999);var n=15;var t=852;var h=592;var l=0;var f=1;var s=2;var d=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0];var c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78];var v=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0];var g=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function inflate_table(e,i,r,y,b,k,S,u){var R=u.bits;var C=0;var T=0;var E=0,I=0;var A=0;var O=0;var B=0;var L=0;var W=0;var F=0;var D;var N;var P;var U;var j;var Z=null;var z=0;var M;var q=new a.Buf16(n+1);var K=new a.Buf16(n+1);var J=null;var X=0;var G,V,H;for(C=0;C<=n;C++){q[C]=0}for(T=0;T<y;T++){q[i[r+T]]++}A=R;for(I=n;I>=1;I--){if(q[I]!==0){break}}if(A>I){A=I}if(I===0){b[k++]=1<<24|64<<16|0;b[k++]=1<<24|64<<16|0;u.bits=1;return 0}for(E=1;E<I;E++){if(q[E]!==0){break}}if(A<E){A=E}L=1;for(C=1;C<=n;C++){L<<=1;L-=q[C];if(L<0){return-1}}if(L>0&&(e===l||I!==1)){return-1}K[1]=0;for(C=1;C<n;C++){K[C+1]=K[C]+q[C]}for(T=0;T<y;T++){if(i[r+T]!==0){S[K[i[r+T]]++]=T}}if(e===l){Z=J=S;M=19}else if(e===f){Z=d;z-=257;J=c;X-=257;M=256}else{Z=v;J=g;M=-1}F=0;T=0;C=E;j=k;O=A;B=0;P=-1;W=1<<A;U=W-1;if(e===f&&W>t||e===s&&W>h){return 1}for(;;){G=C-B;if(S[T]<M){V=0;H=S[T]}else if(S[T]>M){V=J[X+S[T]];H=Z[z+S[T]]}else{V=32+64;H=0}D=1<<C-B;N=1<<O;E=N;do{N-=D;b[j+(F>>B)+N]=G<<24|V<<16|H|0}while(N!==0);D=1<<C-1;while(F&D){D>>=1}if(D!==0){F&=D-1;F+=D}else{F=0}T++;if(--q[C]===0){if(C===I){break}C=i[r+S[T]]}if(C>A&&(F&U)!==P){if(B===0){B=A}j+=E;O=C-B;L=1<<O;while(O+B<I){L-=q[O+B];if(L<=0){break}O++;L<<=1}W+=1<<O;if(e===f&&W>t||e===s&&W>h){return 1}P=F&U;b[P]=A<<24|O<<16|j-k|0}}if(F!==0){b[j+F]=C-B<<24|64<<16|0}u.bits=A;return 0}},686:function(e,i,r){"use strict";var a=r(100);var n=r(130);var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";i.encode=function(e){var i=[];var r,n,h,l,f,s,d;var c=0,v=e.length,g=v;var y=a.getTypeOf(e)!=="string";while(c<e.length){g=v-c;if(!y){r=e.charCodeAt(c++);n=c<v?e.charCodeAt(c++):0;h=c<v?e.charCodeAt(c++):0}else{r=e[c++];n=c<v?e[c++]:0;h=c<v?e[c++]:0}l=r>>2;f=(r&3)<<4|n>>4;s=g>1?(n&15)<<2|h>>6:64;d=g>2?h&63:64;i.push(t.charAt(l)+t.charAt(f)+t.charAt(s)+t.charAt(d))}return i.join("")};i.decode=function(e){var i,r,a;var h,l,f,s;var d=0,c=0;var v="data:";if(e.substr(0,v.length)===v){throw new Error("Invalid base64 input, it looks like a data url.")}e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");var g=e.length*3/4;if(e.charAt(e.length-1)===t.charAt(64)){g--}if(e.charAt(e.length-2)===t.charAt(64)){g--}if(g%1!==0){throw new Error("Invalid base64 input, bad content length.")}var y;if(n.uint8array){y=new Uint8Array(g|0)}else{y=new Array(g|0)}while(d<e.length){h=t.indexOf(e.charAt(d++));l=t.indexOf(e.charAt(d++));f=t.indexOf(e.charAt(d++));s=t.indexOf(e.charAt(d++));i=h<<2|l>>4;r=(l&15)<<4|f>>2;a=(f&3)<<6|s;y[c++]=i;if(f!==64){y[c++]=r}if(s!==64){y[c++]=a}}return y}},687:function(i){(function(e,i){if("function"==typeof define&&define.amd)define([],i);else if(true)i();else{}})(this,function(){"use strict";function b(e,i){return"undefined"==typeof i?i={autoBom:!1}:"object"!=typeof i&&(console.warn("Deprecated: Expected third argument to be a object"),i={autoBom:!i}),i.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function c(e,i,r){var a=new XMLHttpRequest;a.open("GET",e),a.responseType="blob",a.onload=function(){n(a.response,i,r)},a.onerror=function(){console.error("could not download file")},a.send()}function d(e){var i=new XMLHttpRequest;i.open("HEAD",e,!1);try{i.send()}catch(e){}return 200<=i.status&&299>=i.status}function e(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(r){var i=document.createEvent("MouseEvents");i.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(i)}}var r="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=r.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),n=r.saveAs||("object"!=typeof window||window!==r?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(i,a,n){var t=r.URL||r.webkitURL,h=document.createElement("a");a=a||i.name||"download",h.download=a,h.rel="noopener","string"==typeof i?(h.href=i,h.origin===location.origin?e(h):d(h.href)?c(i,a,n):e(h,h.target="_blank")):(h.href=t.createObjectURL(i),setTimeout(function(){t.revokeObjectURL(h.href)},4e4),setTimeout(function(){e(h)},0))}:"msSaveOrOpenBlob"in navigator?function(i,r,a){if(r=r||i.name||"download","string"!=typeof i)navigator.msSaveOrOpenBlob(b(i,a),r);else if(d(i))c(i,r,a);else{var n=document.createElement("a");n.href=i,n.target="_blank",setTimeout(function(){e(n)})}}:function(e,i,n,t){if(t=t||open("","_blank"),t&&(t.document.title=t.document.body.innerText="downloading..."),"string"==typeof e)return c(e,i,n);var h="application/octet-stream"===e.type,l=/constructor/i.test(r.HTMLElement)||r.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent);if((f||h&&l||a)&&"undefined"!=typeof FileReader){var s=new FileReader;s.onloadend=function(){var e=s.result;e=f?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),t?t.location.href=e:location=e,t=null},s.readAsDataURL(e)}else{var d=r.URL||r.webkitURL,v=d.createObjectURL(e);t?t.location=v:location.href=v,t=null,setTimeout(function(){d.revokeObjectURL(v)},4e4)}});r.saveAs=n.saveAs=n,true&&(i.exports=n)})},689:function(e,i,r){try{var a=r(669);if(typeof a.inherits!=="function")throw"";e.exports=a.inherits}catch(i){e.exports=r(315)}},691:function(e){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},720:function(e,i,r){"use strict";var a=r(28);var n=r(100);function Uint8ArrayReader(e){a.call(this,e)}n.inherits(Uint8ArrayReader,a);Uint8ArrayReader.prototype.readData=function(e){this.checkOffset(e);if(e===0){return new Uint8Array(0)}var i=this.data.subarray(this.zero+this.index,this.zero+this.index+e);this.index+=e;return i};e.exports=Uint8ArrayReader},734:function(e,i,r){"use strict";var a=r(720);var n=r(100);function NodeBufferReader(e){a.call(this,e)}n.inherits(NodeBufferReader,a);NodeBufferReader.prototype.readData=function(e){this.checkOffset(e);var i=this.data.slice(this.zero+this.index,this.zero+this.index+e);this.index+=e;return i};e.exports=NodeBufferReader},750:function(e,i,r){"use strict";var a=r(321).Buffer;var n=a.isEncoding||function(e){e=""+e;switch(e&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return true;default:return false}};function _normalizeEncoding(e){if(!e)return"utf8";var i;while(true){switch(e){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return e;default:if(i)return;e=(""+e).toLowerCase();i=true}}}function normalizeEncoding(e){var i=_normalizeEncoding(e);if(typeof i!=="string"&&(a.isEncoding===n||!n(e)))throw new Error("Unknown encoding: "+e);return i||e}i.StringDecoder=StringDecoder;function StringDecoder(e){this.encoding=normalizeEncoding(e);var i;switch(this.encoding){case"utf16le":this.text=utf16Text;this.end=utf16End;i=4;break;case"utf8":this.fillLast=utf8FillLast;i=4;break;case"base64":this.text=base64Text;this.end=base64End;i=3;break;default:this.write=simpleWrite;this.end=simpleEnd;return}this.lastNeed=0;this.lastTotal=0;this.lastChar=a.allocUnsafe(i)}StringDecoder.prototype.write=function(e){if(e.length===0)return"";var i;var r;if(this.lastNeed){i=this.fillLast(e);if(i===undefined)return"";r=this.lastNeed;this.lastNeed=0}else{r=0}if(r<e.length)return i?i+this.text(e,r):this.text(e,r);return i||""};StringDecoder.prototype.end=utf8End;StringDecoder.prototype.text=utf8Text;StringDecoder.prototype.fillLast=function(e){if(this.lastNeed<=e.length){e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal)}e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,e.length);this.lastNeed-=e.length};function utf8CheckByte(e){if(e<=127)return 0;else if(e>>5===6)return 2;else if(e>>4===14)return 3;else if(e>>3===30)return 4;return e>>6===2?-1:-2}function utf8CheckIncomplete(e,i,r){var a=i.length-1;if(a<r)return 0;var n=utf8CheckByte(i[a]);if(n>=0){if(n>0)e.lastNeed=n-1;return n}if(--a<r||n===-2)return 0;n=utf8CheckByte(i[a]);if(n>=0){if(n>0)e.lastNeed=n-2;return n}if(--a<r||n===-2)return 0;n=utf8CheckByte(i[a]);if(n>=0){if(n>0){if(n===2)n=0;else e.lastNeed=n-3}return n}return 0}function utf8CheckExtraBytes(e,i,r){if((i[0]&192)!==128){e.lastNeed=0;return"�"}if(e.lastNeed>1&&i.length>1){if((i[1]&192)!==128){e.lastNeed=1;return"�"}if(e.lastNeed>2&&i.length>2){if((i[2]&192)!==128){e.lastNeed=2;return"�"}}}}function utf8FillLast(e){var i=this.lastTotal-this.lastNeed;var r=utf8CheckExtraBytes(this,e,i);if(r!==undefined)return r;if(this.lastNeed<=e.length){e.copy(this.lastChar,i,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal)}e.copy(this.lastChar,i,0,e.length);this.lastNeed-=e.length}function utf8Text(e,i){var r=utf8CheckIncomplete(this,e,i);if(!this.lastNeed)return e.toString("utf8",i);this.lastTotal=r;var a=e.length-(r-this.lastNeed);e.copy(this.lastChar,0,a);return e.toString("utf8",i,a)}function utf8End(e){var i=e&&e.length?this.write(e):"";if(this.lastNeed)return i+"�";return i}function utf16Text(e,i){if((e.length-i)%2===0){var r=e.toString("utf16le",i);if(r){var a=r.charCodeAt(r.length-1);if(a>=55296&&a<=56319){this.lastNeed=2;this.lastTotal=4;this.lastChar[0]=e[e.length-2];this.lastChar[1]=e[e.length-1];return r.slice(0,-1)}}return r}this.lastNeed=1;this.lastTotal=2;this.lastChar[0]=e[e.length-1];return e.toString("utf16le",i,e.length-1)}function utf16End(e){var i=e&&e.length?this.write(e):"";if(this.lastNeed){var r=this.lastTotal-this.lastNeed;return i+this.lastChar.toString("utf16le",0,r)}return i}function base64Text(e,i){var r=(e.length-i)%3;if(r===0)return e.toString("base64",i);this.lastNeed=3-r;this.lastTotal=3;if(r===1){this.lastChar[0]=e[e.length-1]}else{this.lastChar[0]=e[e.length-2];this.lastChar[1]=e[e.length-1]}return e.toString("base64",i,e.length-r)}function base64End(e){var i=e&&e.length?this.write(e):"";if(this.lastNeed)return i+this.lastChar.toString("base64",0,3-this.lastNeed);return i}function simpleWrite(e){return e.toString(this.encoding)}function simpleEnd(e){return e&&e.length?this.write(e):""}},774:function(e,i,r){"use strict";var a=r(967);var n=r(780);var t=r(100);function Crc32Probe(){a.call(this,"Crc32Probe");this.withStreamInfo("crc32",0)}t.inherits(Crc32Probe,a);Crc32Probe.prototype.processChunk=function(e){this.streamInfo.crc32=n(e.data,this.streamInfo.crc32||0);this.push(e)};e.exports=Crc32Probe},780:function(e,i,r){"use strict";var a=r(100);function makeTable(){var e,i=[];for(var r=0;r<256;r++){e=r;for(var a=0;a<8;a++){e=e&1?3988292384^e>>>1:e>>>1}i[r]=e}return i}var n=makeTable();function crc32(e,i,r,a){var t=n,h=a+r;e=e^-1;for(var l=a;l<h;l++){e=e>>>8^t[(e^i[l])&255]}return e^-1}function crc32str(e,i,r,a){var t=n,h=a+r;e=e^-1;for(var l=a;l<h;l++){e=e>>>8^t[(e^i.charCodeAt(l))&255]}return e^-1}e.exports=function crc32wrapper(e,i){if(typeof e==="undefined"||!e.length){return 0}var r=a.getTypeOf(e)!=="string";if(r){return crc32(i|0,e,e.length,0)}else{return crc32str(i|0,e,e.length,0)}}},806:function(e,i,r){"use strict";var a=r(628);var n=r(100);var t=r(967);var h=r(824);var l=r(292);var f=r(186);var s=r(557);var d=r(501);var c=r(499);var v=r(881);var g=function(e,i,r){var a=n.getTypeOf(i),h;var d=n.extend(r||{},l);d.date=d.date||new Date;if(d.compression!==null){d.compression=d.compression.toUpperCase()}if(typeof d.unixPermissions==="string"){d.unixPermissions=parseInt(d.unixPermissions,8)}if(d.unixPermissions&&d.unixPermissions&16384){d.dir=true}if(d.dosPermissions&&d.dosPermissions&16){d.dir=true}if(d.dir){e=b(e)}if(d.createFolders&&(h=y(e))){k.call(this,h,true)}var g=a==="string"&&d.binary===false&&d.base64===false;if(!r||typeof r.binary==="undefined"){d.binary=!g}var S=i instanceof f&&i.uncompressedSize===0;if(S||d.dir||!i||i.length===0){d.base64=false;d.binary=true;i="";d.compression="STORE";a="string"}var u=null;if(i instanceof f||i instanceof t){u=i}else if(c.isNode&&c.isStream(i)){u=new v(e,i)}else{u=n.prepareContent(e,i,d.binary,d.optimizedBinaryString,d.base64)}var R=new s(e,u,d);this.files[e]=R};var y=function(e){if(e.slice(-1)==="/"){e=e.substring(0,e.length-1)}var i=e.lastIndexOf("/");return i>0?e.substring(0,i):""};var b=function(e){if(e.slice(-1)!=="/"){e+="/"}return e};var k=function(e,i){i=typeof i!=="undefined"?i:l.createFolders;e=b(e);if(!this.files[e]){g.call(this,e,null,{dir:true,createFolders:i})}return this.files[e]};function isRegExp(e){return Object.prototype.toString.call(e)==="[object RegExp]"}var S={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var i,r,a;for(i in this.files){a=this.files[i];r=i.slice(this.root.length,i.length);if(r&&i.slice(0,this.root.length)===this.root){e(r,a)}}},filter:function(e){var i=[];this.forEach(function(r,a){if(e(r,a)){i.push(a)}});return i},file:function(e,i,r){if(arguments.length===1){if(isRegExp(e)){var a=e;return this.filter(function(e,i){return!i.dir&&a.test(e)})}else{var n=this.files[this.root+e];if(n&&!n.dir){return n}else{return null}}}else{e=this.root+e;g.call(this,e,i,r)}return this},folder:function(e){if(!e){return this}if(isRegExp(e)){return this.filter(function(i,r){return r.dir&&e.test(i)})}var i=this.root+e;var r=k.call(this,i);var a=this.clone();a.root=r.name;return a},remove:function(e){e=this.root+e;var i=this.files[e];if(!i){if(e.slice(-1)!=="/"){e+="/"}i=this.files[e]}if(i&&!i.dir){delete this.files[e]}else{var r=this.filter(function(i,r){return r.name.slice(0,e.length)===e});for(var a=0;a<r.length;a++){delete this.files[r[a].name]}}return this},generate:function(e){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var i,r={};try{r=n.extend(e||{},{streamFiles:false,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:a.utf8encode});r.type=r.type.toLowerCase();r.compression=r.compression.toUpperCase();if(r.type==="binarystring"){r.type="string"}if(!r.type){throw new Error("No output type specified.")}n.checkSupport(r.type);if(r.platform==="darwin"||r.platform==="freebsd"||r.platform==="linux"||r.platform==="sunos"){r.platform="UNIX"}if(r.platform==="win32"){r.platform="DOS"}var l=r.comment||this.comment||"";i=d.generateWorker(this,r,l)}catch(e){i=new t("error");i.error(e)}return new h(i,r.type||"string",r.mimeType)},generateAsync:function(e,i){return this.generateInternalStream(e).accumulate(i)},generateNodeStream:function(e,i){e=e||{};if(!e.type){e.type="nodebuffer"}return this.generateInternalStream(e).toNodejsStream(i)}};e.exports=S},822:function(e){"use strict";if(typeof process==="undefined"||!process.version||process.version.indexOf("v0.")===0||process.version.indexOf("v1.")===0&&process.version.indexOf("v1.8.")!==0){e.exports={nextTick:nextTick}}else{e.exports=process}function nextTick(e,i,r,a){if(typeof e!=="function"){throw new TypeError('"callback" argument must be a function')}var n=arguments.length;var t,h;switch(n){case 0:case 1:return process.nextTick(e);case 2:return process.nextTick(function afterTickOne(){e.call(null,i)});case 3:return process.nextTick(function afterTickTwo(){e.call(null,i,r)});case 4:return process.nextTick(function afterTickThree(){e.call(null,i,r,a)});default:t=new Array(n-1);h=0;while(h<t.length){t[h++]=arguments[h]}return process.nextTick(function afterTick(){e.apply(null,t)})}}},824:function(e,i,r){"use strict";var a=r(100);var n=r(674);var t=r(967);var h=r(686);var l=r(130);var f=r(438);var s=null;if(l.nodestream){try{s=r(564)}catch(e){}}function transformZipOutput(e,i,r){switch(e){case"blob":return a.newBlob(a.transformTo("arraybuffer",i),r);case"base64":return h.encode(i);default:return a.transformTo(e,i)}}function concat(e,i){var r,a=0,n=null,t=0;for(r=0;r<i.length;r++){t+=i[r].length}switch(e){case"string":return i.join("");case"array":return Array.prototype.concat.apply([],i);case"uint8array":n=new Uint8Array(t);for(r=0;r<i.length;r++){n.set(i[r],a);a+=i[r].length}return n;case"nodebuffer":return Buffer.concat(i);default:throw new Error("concat : unsupported type '"+e+"'")}}function accumulate(e,i){return new f.Promise(function(r,a){var n=[];var t=e._internalType,h=e._outputType,l=e._mimeType;e.on("data",function(e,r){n.push(e);if(i){i(r)}}).on("error",function(e){n=[];a(e)}).on("end",function(){try{var e=transformZipOutput(h,concat(t,n),l);r(e)}catch(e){a(e)}n=[]}).resume()})}function StreamHelper(e,i,r){var h=i;switch(i){case"blob":case"arraybuffer":h="uint8array";break;case"base64":h="string";break}try{this._internalType=h;this._outputType=i;this._mimeType=r;a.checkSupport(h);this._worker=e.pipe(new n(h));e.lock()}catch(e){this._worker=new t("error");this._worker.error(e)}}StreamHelper.prototype={accumulate:function(e){return accumulate(this,e)},on:function(e,i){var r=this;if(e==="data"){this._worker.on(e,function(e){i.call(r,e.data,e.meta)})}else{this._worker.on(e,function(){a.delay(i,arguments,r)})}return this},resume:function(){a.delay(this._worker.resume,[],this._worker);return this},pause:function(){this._worker.pause();return this},toNodejsStream:function(e){a.checkSupport("nodestream");if(this._outputType!=="nodebuffer"){throw new Error(this._outputType+" is not supported by this method")}return new s(this,{objectMode:this._outputType!=="nodebuffer"},e)}};e.exports=StreamHelper},828:function(e,i,r){"use strict";var a=r(967);i.STORE={magic:"\0\0",compressWorker:function(e){return new a("STORE compression")},uncompressWorker:function(){return new a("STORE decompression")}};i.DEFLATE=r(225)},831:function(e,i,r){"use strict";var a=r(822);var n=Object.keys||function(e){var i=[];for(var r in e){i.push(r)}return i};e.exports=Duplex;var t=Object.create(r(286));t.inherits=r(689);var h=r(226);var l=r(241);t.inherits(Duplex,h);{var f=n(l.prototype);for(var s=0;s<f.length;s++){var d=f[s];if(!Duplex.prototype[d])Duplex.prototype[d]=l.prototype[d]}}function Duplex(e){if(!(this instanceof Duplex))return new Duplex(e);h.call(this,e);l.call(this,e);if(e&&e.readable===false)this.readable=false;if(e&&e.writable===false)this.writable=false;this.allowHalfOpen=true;if(e&&e.allowHalfOpen===false)this.allowHalfOpen=false;this.once("end",onend)}Object.defineProperty(Duplex.prototype,"writableHighWaterMark",{enumerable:false,get:function(){return this._writableState.highWaterMark}});function onend(){if(this.allowHalfOpen||this._writableState.ended)return;a.nextTick(onEndNT,this)}function onEndNT(e){e.end()}Object.defineProperty(Duplex.prototype,"destroyed",{get:function(){if(this._readableState===undefined||this._writableState===undefined){return false}return this._readableState.destroyed&&this._writableState.destroyed},set:function(e){if(this._readableState===undefined||this._writableState===undefined){return}this._readableState.destroyed=e;this._writableState.destroyed=e}});Duplex.prototype._destroy=function(e,i){this.push(null);this.end();a.nextTick(i,e)}},832:function(e,i,r){"use strict";var a=r(401);var n=r(999);var t=r(279);var h=r(691);var l=r(868);var f=r(991);var s=r(969);var d=Object.prototype.toString;function Inflate(e){if(!(this instanceof Inflate))return new Inflate(e);this.options=n.assign({chunkSize:16384,windowBits:0,to:""},e||{});var i=this.options;if(i.raw&&i.windowBits>=0&&i.windowBits<16){i.windowBits=-i.windowBits;if(i.windowBits===0){i.windowBits=-15}}if(i.windowBits>=0&&i.windowBits<16&&!(e&&e.windowBits)){i.windowBits+=32}if(i.windowBits>15&&i.windowBits<48){if((i.windowBits&15)===0){i.windowBits|=15}}this.err=0;this.msg="";this.ended=false;this.chunks=[];this.strm=new f;this.strm.avail_out=0;var r=a.inflateInit2(this.strm,i.windowBits);if(r!==h.Z_OK){throw new Error(l[r])}this.header=new s;a.inflateGetHeader(this.strm,this.header);if(i.dictionary){if(typeof i.dictionary==="string"){i.dictionary=t.string2buf(i.dictionary)}else if(d.call(i.dictionary)==="[object ArrayBuffer]"){i.dictionary=new Uint8Array(i.dictionary)}if(i.raw){r=a.inflateSetDictionary(this.strm,i.dictionary);if(r!==h.Z_OK){throw new Error(l[r])}}}}Inflate.prototype.push=function(e,i){var r=this.strm;var l=this.options.chunkSize;var f=this.options.dictionary;var s,c;var v,g,y;var b=false;if(this.ended){return false}c=i===~~i?i:i===true?h.Z_FINISH:h.Z_NO_FLUSH;if(typeof e==="string"){r.input=t.binstring2buf(e)}else if(d.call(e)==="[object ArrayBuffer]"){r.input=new Uint8Array(e)}else{r.input=e}r.next_in=0;r.avail_in=r.input.length;do{if(r.avail_out===0){r.output=new n.Buf8(l);r.next_out=0;r.avail_out=l}s=a.inflate(r,h.Z_NO_FLUSH);if(s===h.Z_NEED_DICT&&f){s=a.inflateSetDictionary(this.strm,f)}if(s===h.Z_BUF_ERROR&&b===true){s=h.Z_OK;b=false}if(s!==h.Z_STREAM_END&&s!==h.Z_OK){this.onEnd(s);this.ended=true;return false}if(r.next_out){if(r.avail_out===0||s===h.Z_STREAM_END||r.avail_in===0&&(c===h.Z_FINISH||c===h.Z_SYNC_FLUSH)){if(this.options.to==="string"){v=t.utf8border(r.output,r.next_out);g=r.next_out-v;y=t.buf2string(r.output,v);r.next_out=g;r.avail_out=l-g;if(g){n.arraySet(r.output,r.output,v,g,0)}this.onData(y)}else{this.onData(n.shrinkBuf(r.output,r.next_out))}}}if(r.avail_in===0&&r.avail_out===0){b=true}}while((r.avail_in>0||r.avail_out===0)&&s!==h.Z_STREAM_END);if(s===h.Z_STREAM_END){c=h.Z_FINISH}if(c===h.Z_FINISH){s=a.inflateEnd(this.strm);this.onEnd(s);this.ended=true;return s===h.Z_OK}if(c===h.Z_SYNC_FLUSH){this.onEnd(h.Z_OK);r.avail_out=0;return true}return true};Inflate.prototype.onData=function(e){this.chunks.push(e)};Inflate.prototype.onEnd=function(e){if(e===h.Z_OK){if(this.options.to==="string"){this.result=this.chunks.join("")}else{this.result=n.flattenChunks(this.chunks)}}this.chunks=[];this.err=e;this.msg=this.strm.msg};function inflate(e,i){var r=new Inflate(i);r.push(e,true);if(r.err){throw r.msg||l[r.err]}return r.result}function inflateRaw(e,i){i=i||{};i.raw=true;return inflate(e,i)}i.Inflate=Inflate;i.inflate=inflate;i.inflateRaw=inflateRaw;i.ungzip=inflate},868:function(e){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},881:function(e,i,r){"use strict";var a=r(100);var n=r(967);function NodejsStreamInputAdapter(e,i){n.call(this,"Nodejs stream input adapter for "+e);this._upstreamEnded=false;this._bindStream(i)}a.inherits(NodejsStreamInputAdapter,n);NodejsStreamInputAdapter.prototype._bindStream=function(e){var i=this;this._stream=e;e.pause();e.on("data",function(e){i.push({data:e,meta:{percent:0}})}).on("error",function(e){if(i.isPaused){this.generatedError=e}else{i.error(e)}}).on("end",function(){if(i.isPaused){i._upstreamEnded=true}else{i.end()}})};NodejsStreamInputAdapter.prototype.pause=function(){if(!n.prototype.pause.call(this)){return false}this._stream.pause();return true};NodejsStreamInputAdapter.prototype.resume=function(){if(!n.prototype.resume.call(this)){return false}if(this._upstreamEnded){this.end()}else{this._stream.resume()}return true};e.exports=NodejsStreamInputAdapter},882:function(e,i,r){"use strict";e.exports=PassThrough;var a=r(925);var n=Object.create(r(286));n.inherits=r(689);n.inherits(PassThrough,a);function PassThrough(e){if(!(this instanceof PassThrough))return new PassThrough(e);a.call(this,e)}PassThrough.prototype._transform=function(e,i,r){r(null,e)}},886:function(e,i,r){"use strict";var a=r(100);var n=r(967);function DataLengthProbe(e){n.call(this,"DataLengthProbe for "+e);this.propName=e;this.withStreamInfo(e,0)}a.inherits(DataLengthProbe,n);DataLengthProbe.prototype.processChunk=function(e){if(e){var i=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=i+e.data.length}n.prototype.processChunk.call(this,e)};e.exports=DataLengthProbe},917:function(e,i,r){e.exports=r(669).deprecate},925:function(e,i,r){"use strict";e.exports=Transform;var a=r(831);var n=Object.create(r(286));n.inherits=r(689);n.inherits(Transform,a);function afterTransform(e,i){var r=this._transformState;r.transforming=false;var a=r.writecb;if(!a){return this.emit("error",new Error("write callback called multiple times"))}r.writechunk=null;r.writecb=null;if(i!=null)this.push(i);a(e);var n=this._readableState;n.reading=false;if(n.needReadable||n.length<n.highWaterMark){this._read(n.highWaterMark)}}function Transform(e){if(!(this instanceof Transform))return new Transform(e);a.call(this,e);this._transformState={afterTransform:afterTransform.bind(this),needTransform:false,transforming:false,writecb:null,writechunk:null,writeencoding:null};this._readableState.needReadable=true;this._readableState.sync=false;if(e){if(typeof e.transform==="function")this._transform=e.transform;if(typeof e.flush==="function")this._flush=e.flush}this.on("prefinish",prefinish)}function prefinish(){var e=this;if(typeof this._flush==="function"){this._flush(function(i,r){done(e,i,r)})}else{done(this,null,null)}}Transform.prototype.push=function(e,i){this._transformState.needTransform=false;return a.prototype.push.call(this,e,i)};Transform.prototype._transform=function(e,i,r){throw new Error("_transform() is not implemented")};Transform.prototype._write=function(e,i,r){var a=this._transformState;a.writecb=r;a.writechunk=e;a.writeencoding=i;if(!a.transforming){var n=this._readableState;if(a.needTransform||n.needReadable||n.length<n.highWaterMark)this._read(n.highWaterMark)}};Transform.prototype._read=function(e){var i=this._transformState;if(i.writechunk!==null&&i.writecb&&!i.transforming){i.transforming=true;this._transform(i.writechunk,i.writeencoding,i.afterTransform)}else{i.needTransform=true}};Transform.prototype._destroy=function(e,i){var r=this;a.prototype._destroy.call(this,e,function(e){i(e);r.emit("close")})};function done(e,i,r){if(i)return e.emit("error",i);if(r!=null)e.push(r);if(e._writableState.length)throw new Error("Calling transform done when ws.length != 0");if(e._transformState.transforming)throw new Error("Calling transform done when still transforming");return e.push(null)}},929:function(e,i,r){"use strict";function JSZip(){if(!(this instanceof JSZip)){return new JSZip}if(arguments.length){throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.")}this.files=Object.create(null);this.comment=null;this.root="";this.clone=function(){var e=new JSZip;for(var i in this){if(typeof this[i]!=="function"){e[i]=this[i]}}return e}}JSZip.prototype=r(806);JSZip.prototype.loadAsync=r(38);JSZip.support=r(130);JSZip.defaults=r(292);JSZip.version="3.7.1";JSZip.loadAsync=function(e,i){return(new JSZip).loadAsync(e,i)};JSZip.external=r(438);e.exports=JSZip},931:function(e,i,r){"use strict";function _classCallCheck(e,i){if(!(e instanceof i)){throw new TypeError("Cannot call a class as a function")}}var a=r(321).Buffer;var n=r(669);function copyBuffer(e,i,r){e.copy(i,r)}e.exports=function(){function BufferList(){_classCallCheck(this,BufferList);this.head=null;this.tail=null;this.length=0}BufferList.prototype.push=function push(e){var i={data:e,next:null};if(this.length>0)this.tail.next=i;else this.head=i;this.tail=i;++this.length};BufferList.prototype.unshift=function unshift(e){var i={data:e,next:this.head};if(this.length===0)this.tail=i;this.head=i;++this.length};BufferList.prototype.shift=function shift(){if(this.length===0)return;var e=this.head.data;if(this.length===1)this.head=this.tail=null;else this.head=this.head.next;--this.length;return e};BufferList.prototype.clear=function clear(){this.head=this.tail=null;this.length=0};BufferList.prototype.join=function join(e){if(this.length===0)return"";var i=this.head;var r=""+i.data;while(i=i.next){r+=e+i.data}return r};BufferList.prototype.concat=function concat(e){if(this.length===0)return a.alloc(0);if(this.length===1)return this.head.data;var i=a.allocUnsafe(e>>>0);var r=this.head;var n=0;while(r){copyBuffer(r.data,i,n);n+=r.data.length;r=r.next}return i};return BufferList}();if(n&&n.inspect&&n.inspect.custom){e.exports.prototype[n.inspect.custom]=function(){var e=n.inspect({length:this.length});return this.constructor.name+" "+e}}},967:function(e){"use strict";function GenericWorker(e){this.name=e||"default";this.streamInfo={};this.generatedError=null;this.extraStreamInfo={};this.isPaused=true;this.isFinished=false;this.isLocked=false;this._listeners={data:[],end:[],error:[]};this.previous=null}GenericWorker.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished){return false}this.flush();try{this.emit("end");this.cleanUp();this.isFinished=true}catch(e){this.emit("error",e)}return true},error:function(e){if(this.isFinished){return false}if(this.isPaused){this.generatedError=e}else{this.isFinished=true;this.emit("error",e);if(this.previous){this.previous.error(e)}this.cleanUp()}return true},on:function(e,i){this._listeners[e].push(i);return this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null;this._listeners=[]},emit:function(e,i){if(this._listeners[e]){for(var r=0;r<this._listeners[e].length;r++){this._listeners[e][r].call(this,i)}}},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked){throw new Error("The stream '"+this+"' has already been used.")}this.streamInfo=e.streamInfo;this.mergeStreamInfo();this.previous=e;var i=this;e.on("data",function(e){i.processChunk(e)});e.on("end",function(){i.end()});e.on("error",function(e){i.error(e)});return this},pause:function(){if(this.isPaused||this.isFinished){return false}this.isPaused=true;if(this.previous){this.previous.pause()}return true},resume:function(){if(!this.isPaused||this.isFinished){return false}this.isPaused=false;var e=false;if(this.generatedError){this.error(this.generatedError);e=true}if(this.previous){this.previous.resume()}return!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,i){this.extraStreamInfo[e]=i;this.mergeStreamInfo();return this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo){if(!this.extraStreamInfo.hasOwnProperty(e)){continue}this.streamInfo[e]=this.extraStreamInfo[e]}},lock:function(){if(this.isLocked){throw new Error("The stream '"+this+"' has already been used.")}this.isLocked=true;if(this.previous){this.previous.lock()}},toString:function(){var e="Worker "+this.name;if(this.previous){return this.previous+" -> "+e}else{return e}}};e.exports=GenericWorker},969:function(e){"use strict";function GZheader(){this.text=0;this.time=0;this.xflags=0;this.os=0;this.extra=null;this.extra_len=0;this.name="";this.comment="";this.hcrc=0;this.done=false}e.exports=GZheader},991:function(e){"use strict";function ZStream(){this.input=null;this.next_in=0;this.avail_in=0;this.total_in=0;this.output=null;this.next_out=0;this.avail_out=0;this.total_out=0;this.msg="";this.state=null;this.data_type=2;this.adler=0}e.exports=ZStream},999:function(e,i){"use strict";var r=typeof Uint8Array!=="undefined"&&typeof Uint16Array!=="undefined"&&typeof Int32Array!=="undefined";function _has(e,i){return Object.prototype.hasOwnProperty.call(e,i)}i.assign=function(e){var i=Array.prototype.slice.call(arguments,1);while(i.length){var r=i.shift();if(!r){continue}if(typeof r!=="object"){throw new TypeError(r+"must be non-object")}for(var a in r){if(_has(r,a)){e[a]=r[a]}}}return e};i.shrinkBuf=function(e,i){if(e.length===i){return e}if(e.subarray){return e.subarray(0,i)}e.length=i;return e};var a={arraySet:function(e,i,r,a,n){if(i.subarray&&e.subarray){e.set(i.subarray(r,r+a),n);return}for(var t=0;t<a;t++){e[n+t]=i[r+t]}},flattenChunks:function(e){var i,r,a,n,t,h;a=0;for(i=0,r=e.length;i<r;i++){a+=e[i].length}h=new Uint8Array(a);n=0;for(i=0,r=e.length;i<r;i++){t=e[i];h.set(t,n);n+=t.length}return h}};var n={arraySet:function(e,i,r,a,n){for(var t=0;t<a;t++){e[n+t]=i[r+t]}},flattenChunks:function(e){return[].concat.apply([],e)}};i.setTyped=function(e){if(e){i.Buf8=Uint8Array;i.Buf16=Uint16Array;i.Buf32=Int32Array;i.assign(i,a)}else{i.Buf8=Array;i.Buf16=Array;i.Buf32=Array;i.assign(i,n)}};i.setTyped(r)}});
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],require("timers").setImmediate,"/dist/module")
},{"_process":23,"buffer":5,"events":9,"stream":25,"timers":41,"util":45}],2:[function(require,module,exports){
(function (global){(function (){
'use strict';

var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof global[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
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
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
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

},{}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
(function (Buffer){(function (){
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
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
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
  buf.__proto__ = Buffer.prototype
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
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
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
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

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
  buf.__proto__ = Buffer.prototype
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
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
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
    out += toHex(buf[i])
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
  newBuf.__proto__ = Buffer.prototype
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

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
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

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":3,"buffer":5,"ieee754":18}],6:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":7,"get-intrinsic":13}],7:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":12,"get-intrinsic":13}],8:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"get-intrinsic":13}],9:[function(require,module,exports){
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

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
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
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
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
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
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

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

},{}],10:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],11:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],12:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":11}],13:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"function-bind":12,"has":17,"has-symbols":14}],14:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":15}],15:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],16:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":15}],17:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":12}],18:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
'use strict';

var hasToStringTag = require('has-tostringtag/shams')();
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

},{"call-bind/callBound":6,"has-tostringtag/shams":16}],21:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = require('has-tostringtag/shams')();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};

},{"has-tostringtag/shams":16}],22:[function(require,module,exports){
(function (global){(function (){
'use strict';

var forEach = require('foreach');
var availableTypedArrays = require('available-typed-arrays');
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = require('has-tostringtag/shams')();

var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = require('es-abstract/helpers/getOwnPropertyDescriptor');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new global[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"available-typed-arrays":2,"call-bind/callBound":6,"es-abstract/helpers/getOwnPropertyDescriptor":8,"foreach":10,"has-tostringtag/shams":16}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
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

SafeBuffer.prototype = Object.create(Buffer.prototype)

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

},{"buffer":5}],25:[function(require,module,exports){
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
Stream.Readable = require('readable-stream/lib/_stream_readable.js');
Stream.Writable = require('readable-stream/lib/_stream_writable.js');
Stream.Duplex = require('readable-stream/lib/_stream_duplex.js');
Stream.Transform = require('readable-stream/lib/_stream_transform.js');
Stream.PassThrough = require('readable-stream/lib/_stream_passthrough.js');
Stream.finished = require('readable-stream/lib/internal/streams/end-of-stream.js')
Stream.pipeline = require('readable-stream/lib/internal/streams/pipeline.js')

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

},{"events":9,"inherits":19,"readable-stream/lib/_stream_duplex.js":27,"readable-stream/lib/_stream_passthrough.js":28,"readable-stream/lib/_stream_readable.js":29,"readable-stream/lib/_stream_transform.js":30,"readable-stream/lib/_stream_writable.js":31,"readable-stream/lib/internal/streams/end-of-stream.js":35,"readable-stream/lib/internal/streams/pipeline.js":37}],26:[function(require,module,exports){
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;

},{}],27:[function(require,module,exports){
(function (process){(function (){
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

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
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
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
}).call(this)}).call(this,require('_process'))
},{"./_stream_readable":29,"./_stream_writable":31,"_process":23,"inherits":19}],28:[function(require,module,exports){
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

require('inherits')(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":30,"inherits":19}],29:[function(require,module,exports){
(function (process,global){(function (){
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

module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = require('util');

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

require('inherits')(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

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
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
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
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
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
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
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
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
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
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
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
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
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
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
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
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

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
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
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
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
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
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
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

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = require('./internal/streams/from');
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":26,"./_stream_duplex":27,"./internal/streams/async_iterator":32,"./internal/streams/buffer_list":33,"./internal/streams/destroy":34,"./internal/streams/from":36,"./internal/streams/state":38,"./internal/streams/stream":39,"_process":23,"buffer":5,"events":9,"inherits":19,"string_decoder/":40,"util":4}],30:[function(require,module,exports){
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

var _require$codes = require('../errors').codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require('./_stream_duplex');

require('inherits')(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
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
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
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
}; // This is the part where you do stuff!
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
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
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
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
},{"../errors":26,"./_stream_duplex":27,"inherits":19}],31:[function(require,module,exports){
(function (process,global){(function (){
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

module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
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


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
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
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
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
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

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
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
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
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

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
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
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
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
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
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


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
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
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
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
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
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
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

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
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

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
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
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":26,"./_stream_duplex":27,"./internal/streams/destroy":34,"./internal/streams/state":38,"./internal/streams/stream":39,"_process":23,"buffer":5,"inherits":19,"util-deprecate":42}],32:[function(require,module,exports){
(function (process){(function (){
'use strict';

var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = require('./end-of-stream');

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;
}).call(this)}).call(this,require('_process'))
},{"./end-of-stream":35,"_process":23}],33:[function(require,module,exports){
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('buffer'),
    Buffer = _require.Buffer;

var _require2 = require('util'),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
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
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
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
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();
},{"buffer":5,"util":4}],34:[function(require,module,exports){
(function (process){(function (){
'use strict'; // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
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
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};
}).call(this)}).call(this,require('_process'))
},{"_process":23}],35:[function(require,module,exports){
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;
},{"../../../errors":26}],36:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],37:[function(require,module,exports){
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = require('../../../errors').codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = require('./end-of-stream');
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;
},{"../../../errors":26,"./end-of-stream":35}],38:[function(require,module,exports){
'use strict';

var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};
},{"../../../errors":26}],39:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":9}],40:[function(require,module,exports){
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
},{"safe-buffer":24}],41:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
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
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":23,"timers":41}],42:[function(require,module,exports){
(function (global){(function (){

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

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],43:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],44:[function(require,module,exports){
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9

'use strict';

var isArgumentsObject = require('is-arguments');
var isGeneratorFunction = require('is-generator-function');
var whichTypedArray = require('which-typed-array');
var isTypedArray = require('is-typed-array');

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});

},{"is-arguments":20,"is-generator-function":21,"is-typed-array":22,"which-typed-array":46}],45:[function(require,module,exports){
(function (process){(function (){
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

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

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
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
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
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
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
exports.types = require('./support/types');

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
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

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

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

}).call(this)}).call(this,require('_process'))
},{"./support/isBuffer":43,"./support/types":44,"_process":23,"inherits":19}],46:[function(require,module,exports){
(function (global){(function (){
'use strict';

var forEach = require('foreach');
var availableTypedArrays = require('available-typed-arrays');
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = require('has-tostringtag/shams')();

var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = require('es-abstract/helpers/getOwnPropertyDescriptor');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof global[typedArray] === 'function') {
			var arr = new global[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = require('is-typed-array');

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"available-typed-arrays":2,"call-bind/callBound":6,"es-abstract/helpers/getOwnPropertyDescriptor":8,"foreach":10,"has-tostringtag/shams":16,"is-typed-array":22}]},{},[1]);
