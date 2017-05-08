exports.view=View={Game:{},Board:{},Move:{}},function(){var e,a,i;View.Game.cbTargetMesh="/res/ring-target.js",View.Game.cbTargetSelectColor=16777215,View.Game.cbTargetCancelColor=16746496,View.Game.cbPromoSize=2e3,View.Game.xdInit=function(i){this.g.fullPath=this.mViewOptions.fullPath,this.cbPieceByType={},e=this.cbVar,a=this.cbDefineView(),this.cbView=a,this.cbClearPieces(),this.cbCreateLights(i),this.cbCreateScreens(i),this.cbCreateBoard(i),this.cbCreatePromo(i),this.cbCreatePieces(i),this.cbCreateCells(i)},View.Game.cbMakeDummyMesh=function(e){return"undefined"!=typeof THREE?new THREE.Mesh(new THREE.CubeGeometry(1e-4,1e-4,1e-4),new THREE.MeshLambertMaterial):null},View.Game.cbCurrentGame=function(){return i},View.Game.cbCreatePieces=function(e){for(var a=this.cbMakeDummyMesh(e),i=0;i<this.cbPiecesCount;i++)e.createGadget("piece#"+i,{base:{},"2d":{type:"sprite"},"3d":{type:"custommesh3d",create:function(e,i,t){return a}}})},View.Game.cbCreateBoard=function(e){var a=this.cbMakeDummyMesh(e);e.createGadget("board",{base:{},"2d":{type:"canvas",width:12e3,height:12e3,draw:function(e){console.warn("board draw must be overridden")}},"3d":{type:"custommesh3d",receiveShadow:!0,create:function(e,i,t){return a}}})},View.Game.cbCreateCells=function(e){for(var a=this,i=0;i<this.g.boardSize;i++)!function(i){e.createGadget("cell#"+i,{"2d":{z:101,type:"element",initialClasses:a.cbCellClass(e,i),width:1300,height:1300}}),e.createGadget("clicker#"+i,$.extend(!0,{"2d":{z:103,type:"element",initialClasses:"cb-clicker"},"3d":{type:"meshfile",file:a.g.fullPath+a.cbTargetMesh,flatShading:!0,castShadow:!0,smooth:0,scale:[.9,.9,.9],materials:{square:{transparent:!0,opacity:0},ring:{color:a.cbTargetSelectColor,opacity:1}}}},a.cbView.clicker))}(i)},View.Game.cbCreatePromo=function(e){e.createGadget("promo-board",{base:{type:"element",x:0,y:0,width:2e3,height:2e3,z:108,css:{"background-color":"White"}}}),e.createGadget("promo-cancel",{base:{type:"image",file:this.g.fullPath+"/res/images/cancel.png",x:0,y:0,width:800,height:800,z:109}});for(var a=0;a<this.g.pTypes.length;a++)e.createGadget("promo#"+a,{base:{y:0,z:109,type:"sprite",clipwidth:100,clipheight:100,width:1200,height:1200}})},View.Game.xdBuildScene=function(t){i=this,e=this.cbVar,a=this.cbDefineView(),this.cbView=a;for(var r=0;r<this.cbExtraLights.length;r++)t.updateGadget("extralights#"+r,{"3d":{visible:!0}});t.updateGadget("board",$.extend({base:{visible:!0}},this.cbView.board));for(var s=0;s<this.g.boardSize;s++)!function(e){var a=i.cbMakeDisplaySpec(e,0),r=$.extend(!0,{},a,{base:{visible:!0}},i.cbView.clicker,i.cbView.cell);t.updateGadget("cell#"+e,r),$.extend(!0,a,i.cbView.clicker),t.updateGadget("clicker#"+e,a)}(s);t.updateGadget("videoa",{"3d":{visible:!0,playerSide:1,z:3e3,y:1==this.mViewAs?1e4:-1e4,rotate:1==this.mViewAs?-180:-0,rotateX:1==this.mViewAs?25:-25,scale:[3,3,3]}}),t.updateGadget("videoabis",{"3d":{visible:!0,playerSide:-1,z:1500,x:1==this.mViewAs?-5500:5500,y:1==this.mViewAs?8900:-8900,rotate:1==this.mViewAs?-180:-0,rotateX:1==this.mViewAs?25:-25,scale:[.75,.75,.75]}}),t.updateGadget("videob",{"3d":{visible:!0,playerSide:-1,z:3e3,y:1==this.mViewAs?-1e4:1e4,rotate:1==this.mViewAs?-0:-180,rotateX:1==this.mViewAs?-25:25,scale:[3,3,3]}}),t.updateGadget("videobbis",{"3d":{visible:!0,playerSide:1,z:1500,x:1==this.mViewAs?5500:-5500,y:1==this.mViewAs?-8900:8900,rotate:1==this.mViewAs?-0:-180,rotateX:1==this.mViewAs?-25:25,scale:[.75,.75,.75]}}),t.updateGadget("promo-board",{base:{visible:!1}}),t.updateGadget("promo-cancel",{base:{visible:!1}});for(var r=0;r<this.g.pTypes.length;r++)t.updateGadget("promo#"+r,{base:{visible:!1}})},View.Game.cbDisplayBoardFn=function(e){var a=this;return function(t,r,s){var n=e.style+"_"+e.margins.x+"_"+e.margins.y+"_"+a.mNotation+"_"+a.mViewAs,c=this;n!=this._cbKey&&(this._cbKey=n,e.display.call(i,e,c,function(e){c.replaceMesh(e,r,s)}))}},View.Game.cbDrawBoardFn=function(e){return function(a){e.draw.call(i,e,this,a)}},View.Game.cbMakeDisplaySpec=function(e,a){var i={};for(var t in this.cbView.coords){var r=this.cbView.coords[t],s=r.call(this,e);i[t]={x:s.x||0,y:s.y||0,z:s.z||0,rotateX:s.rx||0,rotateY:(s.ry||0)*("3d"==t?this.mViewAs*a<0?-1:1:0),rotate:(s.rz||0)+("3d"==t&&this.mViewAs*a<0?180:0)}}return i},View.Game.cbMakeDisplaySpecForPiece=function(i,t,r){function s(e,a,i){return a?$.extend(!0,e,a.default,a[i]):{}}var n=this.cbMakeDisplaySpec(t,r.s);if(void 0===e.pieceTypes[r.t])return void console.warn("Piece type",r.t,"not defined in model");var c=e.pieceTypes[r.t].aspect||e.pieceTypes[r.t].name;return c?(a.pieces&&(n=s(n,a.pieces,c),a.pieces[r.s]&&(n=s(n,a.pieces[r.s],c))),n):void console.warn("Piece type",r.t,"has no aspect defined")},View.Board.xdDisplay=function(e,a){for(var i=0;i<this.pieces.length;i++){var t=this.pieces[i];if(t.p<0)e.updateGadget("piece#"+i,{base:{visible:!1}});else{var r=a.cbMakeDisplaySpecForPiece(a,t.p,t);r=$.extend(!0,{base:{visible:!0},"2d":{opacity:1},"3d":{positionEasingUpdate:null}},r),e.updateGadget("piece#"+i,r)}}for(;i<a.cbPiecesCount;i++)e.updateGadget("piece#"+i,{base:{visible:!1}})},View.Game.cbExtraLights=[{color:16777215,intensity:.8,position:[9,14,-9],props:{shadowCameraNear:10,shadowCameraFar:25,castShadow:!0,shadowMapWidth:2048,shadowMapHeight:2048}}],View.Game.cbCreateLights=function(e){for(var a=0;a<this.cbExtraLights.length;a++)!function(a,i){e.createGadget("extralights#"+i,{"3d":{type:"custommesh3d",create:function(e){var i=new THREE.SpotLight(a.color,a.intensity);i.shadow.camera.far=a.props.shadowCameraFar,i.shadow.camera.near=a.props.shadowCameraNear,i.shadow.mapSize.width=a.props.shadowMapWidth,i.shadow.mapSize.height=a.props.shadowMapHeight,i.position.set.apply(i.position,a.position);var t=new THREE.Mesh;t.add(i);var r=new THREE.Object3D;t.add(r),i.target=r,e(t)}}})}(this.cbExtraLights[a],a)},View.Game.cbCreateScreen=function(e){var a=new THREE.PlaneGeometry(4,3,1,1),i=new THREE.MeshPhongMaterial({color:16777215,map:e,shading:THREE.FlatShading,emissive:{r:1,g:1,b:1}}),t=new THREE.Mesh(a,i);return this.objectReady(t),null},View.Game.cbCreateScreens=function(e){var a=this;e.createGadget("videoa",{"3d":{type:"video3d",makeMesh:function(e){return a.cbCreateScreen.call(this,e)}}}),e.createGadget("videoabis",{"3d":{type:"video3d",makeMesh:function(e){return a.cbCreateScreen.call(this,e)}}}),e.createGadget("videob",{"3d":{type:"video3d",makeMesh:function(e){return a.cbCreateScreen.call(this,e)}}}),e.createGadget("videobbis",{"3d":{type:"video3d",makeMesh:function(e){return a.cbCreateScreen.call(this,e)}}})},View.Board.xdInput=function(a,i){function t(){a.updateGadget("promo-board",{base:{visible:!1}}),a.updateGadget("promo-cancel",{base:{visible:!1}})}return{initial:{f:null,t:null,pr:null},getActions:function(r,s){var n={};if(null==s.f)r.forEach(function(e){void 0===n[e.f]&&(n[e.f]={f:e.f,moves:[],click:["piece#"+this.board[e.f],"clicker#"+e.f],view:["clicker#"+e.f],highlight:function(t){a.updateGadget("cell#"+e.f,{"2d":{classes:"select"==t?"cb-cell-select":"cb-cell-cancel",opacity:i.mShowMoves||"cancel"==t?1:0}}),a.updateGadget("clicker#"+e.f,{"3d":{materials:{ring:{color:"select"==t?i.cbTargetSelectColor:i.cbTargetCancelColor,opacity:i.mShowMoves||"cancel"==t?1:0,transparent:!i.mShowMoves&&"cancel"!=t}},castShadow:i.mShowMoves||"cancel"==t}})},unhighlight:function(){a.updateGadget("cell#"+e.f,{"2d":{classes:""}})},validate:{f:e.f}}),n[e.f].moves.push(e)},this);else if(null==s.t)r.forEach(function(r){var s=void 0===r.cg?r.t:r.cg;void 0===n[s]&&(n[s]={t:r.t,moves:[],click:["piece#"+this.board[s],"clicker#"+s],view:["clicker#"+s],highlight:function(e){a.updateGadget("cell#"+s,{"2d":{classes:"select"==e?"cb-cell-select":"cb-cell-cancel",opacity:i.mShowMoves||"cancel"==e?1:0}}),a.updateGadget("clicker#"+s,{"3d":{materials:{ring:{color:"select"==e?i.cbTargetSelectColor:i.cbTargetCancelColor,opacity:i.mShowMoves||"cancel"==e?1:0,transparent:!i.mShowMoves&&"cancel"!=e}},castShadow:i.mShowMoves||"cancel"==e}})},unhighlight:function(e){a.updateGadget("cell#"+s,{"2d":{classes:""}})},validate:{t:r.t},execute:function(t){var s=this;this.cbAnimate(a,i,r,function(){var c=n[r.t].moves;c.length>1&&(a.updateGadget("promo-board",{base:{visible:!0,width:i.cbPromoSize*(c.length+1)}}),a.updateGadget("promo-cancel",{base:{visible:!0,x:c.length*i.cbPromoSize/2}}),c.forEach(function(t,r){var s=e.pieceTypes[t.pr].aspect||e.pieceTypes[t.pr].name,n=$.extend(!0,{},i.cbView.pieces.default,i.cbView.pieces[s]);i.cbView.pieces[this.mWho]&&(n=$.extend(!0,n,i.cbView.pieces[this.mWho].default,i.cbView.pieces[this.mWho][s])),a.updateGadget("promo#"+t.pr,{base:$.extend(n["2d"],{x:(r-c.length/2)*i.cbPromoSize})})},s)),t()})},unexecute:function(){if(null!=r.c){var e=this.pieces[r.c],s=i.cbMakeDisplaySpecForPiece(i,e.p,e);s=$.extend(!0,{base:{visible:!0},"2d":{opacity:1},"3d":{positionEasingUpdate:null}},s),a.updateGadget("piece#"+r.c,s)}var n=this.pieces[this.board[r.f]],c=i.cbMakeDisplaySpecForPiece(i,n.p,n);a.updateGadget("piece#"+n.i,c),t()}}),void 0!==r.cg&&(n[s].validate.cg=r.cg,n[s].execute=function(e){this.cbAnimate(a,i,r,function(){e()})}),n[s].moves.push(r)},this);else if(null==s.pr){var c=[];r.forEach(function(e){void 0!==e.pr&&(void 0===n[e.pr]&&(n[e.pr]={pr:e.pr,moves:[],click:["promo#"+e.pr],validate:{pr:e.pr},cancel:["promo-cancel"],post:t,skipable:!0},c.push(e.pr)),n[e.pr].moves.push(e))},this),c.length>1&&c.forEach(function(e){n[e].view=["promo#"+e]})}return n}}},View.Game.cbCellClass=function(e,a){return"classic-cell "+((a+(a-a%this.g.NBCOLS)/this.g.ROWS)%2?"classic-cell-black":"classic-cell-white")},View.Board.xdPlayedMove=function(e,a,i){a.mOldBoard.cbAnimate(e,a,i,function(){a.MoveShown()})},View.Board.cbAnimate=function(e,a,i,t){function r(){0==--n&&(c&&a.PlaySound("tac"+(1+Math.floor(3*Math.random()))),t())}var s=this,n=1,c=!1,o=this.pieces[this.board[i.f]],l=a.cbMakeDisplaySpec(i.f,o.s),m=a.cbMakeDisplaySpecForPiece(a,i.t,o);for(var d in l){var f=l[d];void 0!==f.z&&function(e){var t=f.z,r=m[e].z,n=s.cbMoveMidZ(a,i,t,r,e),o=t,l=o-n,d=o-r;n!=(t+r)/2&&(c=!0);var h=4*l-2*d,p=-d*d,u=Math.abs(h*h- -4*p),g=(-h-Math.sqrt(u))/-2,b=(-h+Math.sqrt(u))/-2,y=g,w=-y-d;(0==y||-w/(2*y)<0||-w/(2*y)>1)&&(y=b,w=-y-d),m[e].positionEasingUpdate=function(e){var a=(y*e*e+w*e+o)*this.SCALE3D;this.object3d.position.y=a}}(d)}if(c||a.PlaySound("move"+(1+Math.floor(4*Math.random()))),e.updateGadget("piece#"+o.i,m,600,function(){r()}),null!=i.c){n++;var h={positionEasingUpdate:null};switch(a.cbView.captureAnim3d||"movedown"){case"movedown":h.z=-2e3;break;case"scaledown":h.scale=[0,0,0]}var p=this.pieces[i.c];e.updateGadget("piece#"+p.i,{"2d":{opacity:0},"3d":h},600,r)}if(void 0!==i.cg){var f=a.cbVar.castle[i.f+"/"+i.cg],u=f.r[f.r.length-1],o=this.pieces[this.board[i.cg]],m=a.cbMakeDisplaySpecForPiece(a,u,o);n++,e.updateGadget("piece#"+o.i,m,600,function(){r()})}},View.Board.cbMoveMidZ=function(e,a,i,t){return(i+t)/2}}(),function(){View.Game.cbBaseBoard={TEXTURE_CANVAS_CX:1024,TEXTURE_CANVAS_CY:1024,display:function(e,a,i){var t=this;e.getResource=a.getResource,e.createGeometry.call(this,e,function(a){e.createTextureImages.call(t,e,function(r){var s=["diffuse"].concat(e.extraChannels||[]),n={};s.forEach(function(a){var i=document.createElement("canvas");i.width=e.TEXTURE_CANVAS_CX,i.height=e.TEXTURE_CANVAS_CY,n[a]=i}),e.createMaterial.call(t,e,n,function(s){var c=new THREE.Mesh(a,s);e.modifyMesh.call(t,e,c,function(a){e.paint.call(t,e,n,r,function(){i(a)})})})})})},createTextureImages:function(e,a){var i=this,t={},r=0,s=e.texturesImg||{};for(var n in s)r++;if(0==r)a(t);else for(var n in s)!function(n){e.getResource("image|"+i.g.fullPath+s[n],function(e){t[n]=e,0==--r&&a(t)})}(n)},createMaterial:function(e,a,i){var t=new THREE.Texture(a.diffuse);t.needsUpdate=!0;var r={specular:"#050505",shininess:30,map:t};if(a.bump){var s=new THREE.Texture(a.bump);s.needsUpdate=!0,r.bumpMap=s,r.bumpScale=.05}i(new THREE.MeshPhongMaterial(r))},modifyMesh:function(e,a,i){i(a)},prePaint:function(e,a,i,t,r){r()},paint:function(e,a,i,t,r){r()},postPaint:function(e,a,i,t,r){r()},paintChannel:function(e,a,i,t){},draw:function(e,a,i){var t=this;e.getResource=a.getResource,e.createTextureImages.call(this,e,function(a){e.paintChannel.call(t,e,i,a,"diffuse")})}}}(),function(){function e(e){for(var a=JSON.stringify(e),i=0,t=0;t<a.length;t++)i=(i<<5)-i+a.charCodeAt(t),i&=i;return i}var a,i={};View.Game.cbDisplayPieceFn=function(i){var t=this,r=e(i);return function(e,s,n){a=this.getResource;var c=/^piece#([0-9]+)$/.exec(this.gadget.id);if(!c)return null;var o=parseInt(c[1]),l=t.cbCurrentGame();if(o>=l.mBoard.pieces.length)return null;var m=l.mBoard.pieces[o],d=l.cbVar.pieceTypes[m.t].aspect||l.cbVar.pieceTypes[m.t].name,f=d+"_"+r+"_"+m.s,h=this;f!=this._cbKey&&(this._cbKey=f,h.options=s,l.cbMakePiece(i,d,m.s,function(e){h.replaceMesh(e,h.options,n)}))}},View.Game.cbMakePiece=function(a,t,r,s){function n(e,a,i){return a?$.extend(!0,e,a.default,a[i]):{}}if(!a)return void console.error("piece-view: style is not defined");var c=n({},a,t);a[r]&&(c=n(c,a[r],t));var o=e(c),l=i[o];Array.isArray(l)?l.push(s):l?s(new THREE.Mesh(l.geometry,l.material)):(i[o]=[s],c.loadResources.call(this,c,function(e){c.displayPiece.call(this,c,e,function(){var a=i[o];i[o]={geometry:e.geometry,material:e.material},a.forEach(function(a){a(new THREE.Mesh(e.geometry,e.material))})})}))},View.Game.cbClearPieces=function(){i={}},View.Game.cbBasePieceStyle={default:{mesh:{jsFile:function(e,a){a(new THREE.CubeGeometry(1,1,1),new THREE.MeshPhongMaterial({}))},smooth:0,rotateZ:0},loadMesh:function(e,i){"function"==typeof e.mesh.jsFile?e.mesh.jsFile(e,i):a("smoothedfilegeo|"+e.mesh.smooth+"|"+this.g.fullPath+e.mesh.jsFile,i)},loadImages:function(e,i){function t(){0==--s&&i(n)}var r=this,s=1,n={};for(var c in e.materials){var o=e.materials[c].channels;for(var l in o)if(o[l].texturesImg)for(var m in o[l].texturesImg)!function(e,i){s++,a("image|"+r.g.fullPath+i,function(a){n[e]=a,t()})}(m,o[l].texturesImg[m])}t()},loadResources:function(e,a){function i(){0==--n&&a({geometry:r,images:t,textures:{},loadedMaterials:s})}var t,r,s,n=2;e.loadMesh.call(this,e,function(a,t){if(!a._cbZRotated){var n=new THREE.Matrix4;n.makeRotationY(e.mesh.rotateZ*Math.PI/180),a.applyMatrix(n),a._cbZRotated=!0}r=a,s=t,i()}),e.loadImages.call(this,e,function(e){t=e,i()})},displayPiece:function(e,a,i){e.makeMaterials.call(this,e,a),i()},paintTextureImageClip:function(e,a,i,t,r,s,n,c,o){var l=a.canvas.width,m=a.canvas.height;if(r.patternFill&&r.patternFill[s]){var d=r.patternFill[s];a.save();var f=document.createElement("canvas");f.width=l,f.height=m,ctxTmp=f.getContext("2d"),ctxTmp.fillStyle=d,ctxTmp.fillRect(0,0,l,m),ctxTmp.globalCompositeOperation="destination-in",ctxTmp.drawImage(n,c.x,c.y,c.cx,c.cy,0,0,l,m),a.drawImage(f,0,0,l,m,0,0,l,m),a.restore()}else a.drawImage(n,c.x,c.y,c.cx,c.cy,0,0,l,m)},paintTextureImage:function(e,a,i,t,r,s,n,c){var o;o=r.clipping&&r.clipping[s]?r.clipping[s]:{x:0,y:0,cx:n.width,cy:n.height},e.paintTextureImageClip.call(this,e,a,i,t,r,s,n,o,c)},paintTexture:function(e,a,i,t,r){var s=e.materials[i].channels[t];for(var n in s.texturesImg){var c=r.images[n];e.paintTextureImage.call(this,e,a,i,t,s,n,c,r)}},makeMaterialTextures:function(e,a,i){for(var t in e.materials[a].channels){var r=e.materials[a].channels[t],s=document.createElement("canvas");s.width=r.size.cx,s.height=r.size.cy;var n=s.getContext("2d");e.paintTexture.call(this,e,n,a,t,i);var c=new THREE.Texture(s);c.needsUpdate=!0,i.textures[a][t]=c}},makeMaterials:function(e,a){a.textures={};for(var i in e.materials)a.textures[i]={},e.makeMaterialTextures.call(this,e,i,a),e.makeMaterial.call(this,e,i,a)}}},View.Game.cbTokenPieceStyle3D=$.extend(!0,{},View.Game.cbBasePieceStyle,{default:{makeMaterials:function(e,a){a.textures={};for(var i in e.materials)a.textures[i]={},e.makeMaterialTextures.call(this,e,i,a);var t=[];for(var r in a.loadedMaterials){var s=a.loadedMaterials[r].clone(),n=s.name;if(e.materials[n]){$.extend(!0,s,e.materials[n].params);for(var c in e.materials[n].channels)switch(c){case"diffuse":s.map=a.textures[n][c];break;case"bump":s.bumpMap=a.textures[n][c]}}t.push(s)}var o=new THREE.MultiMaterial(t);a.material=o}}}),View.Game.cbUniformPieceStyle3D=$.extend(!0,{},View.Game.cbBasePieceStyle,{default:{makeMaterial:function(e,a,i){var t=e.materials[a].params;t.map=i.textures[a].diffuse,t.normalMap=i.textures[a].normal;var r=e.materials[a].channels.normal.normalScale||1;t.normalScale=new THREE.Vector2(r,r);var s=new THREE.MeshPhongMaterial(t);i.material=s,i.geometry.mergeVertices(),i.geometry.computeVertexNormals()}}}),View.Game.cbPhongPieceStyle3D=$.extend(!0,{},View.Game.cbBasePieceStyle,{default:{phongProperties:{color:"#ffffff",shininess:300,specular:"#ffffff",emissive:"#222222",shading:"undefined"!=typeof THREE?THREE.FlatShading:0},makeMaterials:function(e,a){var i=new THREE.MeshPhongMaterial(e.phongProperties);a.material=i}}})}(),function(){var e=0,a=0,i={};View.Game.cbEnsureConstants=function(){a||(a=this.cbVar.geometry.height,e=this.cbVar.geometry.width)},View.Game.cbCSize=function(t){this.cbEnsureConstants();var r=i[t.margins.x+"_"+t.margins.y];if(!r){var s,n,c,o,l=e+2*t.margins.x,m=a+2*t.margins.y;s=l/m,o=s<1?12e3*s/l:12e3/s/m,n=(e+2*t.margins.x)*o,c=(a+2*t.margins.y)*o,r={cx:o,cy:o,pieceCx:o,pieceCy:o,ratio:s,width:n,height:c},i[t.margins.x+"_"+t.margins.y]=r}return r},View.Game.cbGridBoard=$.extend({},View.Game.cbBaseBoard,{notationMode:"out",coordsFn:function(i){return i=i||{},i.margins=i.margins||{x:0,y:0},function(t){var r=this.cbCSize(i),s=t%e,n=(t-s)/e;return 1==this.mViewAs&&(n=a-1-n),this.mViewAs==-1&&(s=e-1-s),{x:(s-(e-1)/2)*r.cx,y:(n-(a-1)/2)*r.cy,z:0}}},createGeometry:function(e,a){var i=this.cbCSize(e),t=i.width/1e3,r=i.height/1e3,s=new THREE.PlaneGeometry(t,r),n=new THREE.Matrix4;n.makeRotationX(-Math.PI/2),s.applyMatrix(n);for(var c=s.faceVertexUvs[0],o=0;o<c.length;o++)for(var l=0;l<c[o].length;l++)i.ratio<1&&(c[o][l].x=c[o][l].x*i.ratio+(1-i.ratio)/2),i.ratio>1&&(c[o][l].y=c[o][l].y/i.ratio+(1-1/i.ratio)/2);a(s)},paintBackground:function(e,a,i,t,r,s){i.boardBG&&a.drawImage(i.boardBG,-r/2,-s/2,r,s)},paintChannel:function(e,a,i,t){var r=this.cbCSize(e);e.paintBackground.call(this,e,a,i,t,r.width,r.height)},paint:function(e,a,i,t){for(var r in a){var s=a[r].getContext("2d");s.save(),s.scale(e.TEXTURE_CANVAS_CX/12e3,e.TEXTURE_CANVAS_CY/12e3),s.translate(6e3,6e3),e.paintChannel.call(this,e,s,i,r),s.restore()}t()}}),View.Game.cbGridBoardClassic=$.extend({},View.Game.cbGridBoard,{colorFill:{".":"rgba(160,150,150,0.9)","#":"rgba(0,0,0,1)"," ":"rgba(0,0,0,0)"},texturesImg:{boardBG:"/res/images/wood.jpg"},modifyMesh:function(e,a,i){function t(e,a){var i=new THREE.Shape;return i.moveTo(-e/2,-a/2),i.lineTo(e/2,-a/2),i.lineTo(e/2,a/2),i.lineTo(-e/2,a/2),i}var r=this.cbCSize(e),s=r.width/1e3,n=r.height/1e3,c=t(s+.5+.1,n+.5+.1),o=t(s+.1,n+.1);c.holes.push(o);var l={amount:.4,steps:1,bevelSize:.1,bevelThickness:.04,bevelSegments:1},m=new THREE.ExtrudeGeometry(c,l),d=new THREE.Matrix4;d.makeRotationX(-Math.PI/2),m.applyMatrix(d),blackMat=new THREE.MeshPhongMaterial({color:"#000000",shininess:500,specular:"#888888",emissive:"#000000"});var f=new THREE.Mesh(m,blackMat);f.position.y=-l.amount-.01,a.add(f);var h=new THREE.Mesh(new THREE.BoxGeometry(s,n,.1),blackMat);h.rotation.x=Math.PI/2,h.position.y=-.1,a.add(h),i(a)},paintCell:function(e,a,i,t,r,s,n,c,o){a.strokeStyle="rgba(0,0,0,1)",a.lineWidth=15,a.fillStyle="bump"==t?"#ffffff":e.colorFill[r],a.fillRect(s-c/2,n-o/2,c,o),a.rect(s-c/2,n-o/2,c,o)},paintCells:function(i,t,r,s){for(var n=this.cbCSize(i),c=i.coordsFn(i),o=0;o<a;o++)for(var l=0;l<e;l++){var m=1==this.mViewAs?l+o*e:e*a-(1+l+o*e),d=c.call(this,m),f=this.cbView.boardLayout[a-o-1][l],h=d.x,p=d.y,u=n.cx,g=n.cy;i.paintCell.call(this,i,t,r,s,f,h,p,u,g)}},paintLines:function(i,t,r,s){var n=this.cbCSize(i);t.strokeStyle="#000000",t.lineWidth=40,t.strokeRect(-e*n.cx/2,-a*n.cy/2,e*n.cx,a*n.cy)},paintChannel:function(e,a,i,t){var r=this.cbCSize(e);e.paintBackground.call(this,e,a,i,t,r.width,r.height),e.paintCells.call(this,e,a,i,t),e.paintLines.call(this,e,a,i,t),this.mNotation&&e.paintNotation.call(this,e,a,t)},paintNotation:function(e,a,i){var t=this.cbCSize(e);switch(a.textAlign="center",a.textBaseline="middle",a.fillStyle="#000000",a.font=Math.ceil(t.cx/3)+"px Monospace",e.notationMode){case"out":e.paintOutNotation.apply(this,arguments);break;case"in":e.paintInNotation.apply(this,arguments)}},paintOutNotation:function(i,t,r){for(var s=this.cbCSize(i),n=0;n<a;n++){var c=a-n;this.mViewAs<0&&(c=n+1);var o=-(e/2+i.margins.x/2)*s.cx,l=(n-a/2+.5)*s.cy;t.fillText(c,o,l)}for(var m=0;m<e;m++){var d=m;this.mViewAs<0&&(d=e-m-1);var o=(m-e/2+.5)*s.cx,l=(a/2+i.margins.y/2)*s.cy;t.fillText(String.fromCharCode(97+d),o,l)}},paintInNotation:function(i,t,r){var s=this.cbCSize(i),n=i.coordsFn(i),c=i.colorFill;t.font=Math.ceil(s.cx/5)+"px Monospace";for(var o=0;o<a;o++)for(var l=0;l<e;l++){var m=a-o,d=l;this.mViewAs<0?d=e-l-1:m=o+1;var f=1==this.mViewAs?l+o*e:e*a-(1+l+o*e),h=n.call(this,f);switch(t.fillStyle="rgba(0,0,0,0)","bump"==r&&(t.fillStyle=c["."]),this.cbView.boardLayout[a-o-1][l]){case".":t.fillStyle="bump"==r?c["."]:c["#"];break;case"#":t.fillStyle=c["."]}var p=h.x-s.cx/3,u=h.y-s.cy/3;i.notationDebug?t.fillText(f,p,u):t.fillText(String.fromCharCode(97+d)+m,p,u)}}}),View.Board.cbMoveMidZ=function(e,a,i,t){var r=e.cbVar.geometry,s=r.C(a.f),n=r.C(a.t),c=r.R(a.f),o=r.R(a.t);return n-s==0||o-c==0||Math.abs(n-s)==Math.abs(o-c)?(i+t)/2:Math.max(i,t)+1500},View.Game.cbGridBoardClassic2D=$.extend({},View.Game.cbGridBoardClassic,{colorFill:{".":"#F1D9B3","#":"#C7885D"," ":"rgba(0,0,0,0)"}}),View.Game.cbGridBoardClassic3DMargin=$.extend({},View.Game.cbGridBoardClassic,{margins:{x:.67,y:.67},extraChannels:["bump"]}),View.Game.cbGridBoardClassic2DMargin=$.extend({},View.Game.cbGridBoardClassic2D,{margins:{x:.67,y:.67}}),View.Game.cbGridBoardClassic2DNoMargin=$.extend({},View.Game.cbGridBoardClassic2D,{margins:{x:0,y:0},notationMode:"in",texturesImg:{boardBG:"/res/images/whitebg.png"}})}(),function(){var e={cx:512,cy:512};View.Game.cbFairyPieceStyle=function(e){return $.extend(!0,{1:{default:{"2d":{clipy:0}}},"-1":{default:{"2d":{clipy:100}}},default:{"3d":{display:this.cbDisplayPieceFn(this.cbFairyPieceStyle3D)},"2d":{file:this.mViewOptions.fullPath+"/res/fairy/wikipedia-fairy-sprites.png",clipwidth:100,clipheight:100}},"fr-pawn":{"2d":{clipx:0}},"fr-knight":{"2d":{clipx:100}},"fr-bishop":{"2d":{clipx:200}},"fr-rook":{"2d":{clipx:300}},"fr-queen":{"2d":{clipx:400}},"fr-king":{"2d":{clipx:500}},"fr-cannon":{"2d":{clipx:600}},"fr-cannon2":{"2d":{clipx:600}},"fr-elephant":{"2d":{clipx:700}},"fr-dragon":{"2d":{clipx:800}},"fr-lighthouse":{"2d":{clipx:900}},"fr-admiral":{"2d":{clipx:1e3}},"fr-eagle":{"2d":{clipx:1100}},"fr-lion":{"2d":{clipx:1200}},"fr-camel":{"2d":{clipx:1300}},"fr-amazon":{"2d":{clipx:1400}},"fr-crowned-rook":{"2d":{clipx:1500}},"fr-marshall":{"2d":{clipx:1600}},"fr-cardinal":{"2d":{clipx:1700}},"fr-unicorn":{"2d":{clipx:1800}}},e)},View.Game.cbFairyPieceStyle3D=$.extend(!0,{},View.Game.cbUniformPieceStyle3D,{default:{mesh:{normalScale:1,rotateZ:180},materials:{mat0:{channels:{diffuse:{size:e},normal:{size:e}}}}},1:{default:{materials:{mat0:{params:{specular:131586,shininess:150}}}}},"-1":{default:{materials:{mat0:{params:{specular:263172,shininess:100}}},paintTextureImageClip:function(e,a,i,t,r,s,n,c,o){var l=a.canvas.width,m=a.canvas.height;"diffuse"==t?(a.globalCompositeOperation="normal",a.drawImage(n,c.x,c.y,c.cx,c.cy,0,0,l,m),a.globalCompositeOperation="multiply",a.drawImage(n,c.x,c.y,c.cx,c.cy,0,0,l,m),a.drawImage(n,c.x,c.y,c.cx,c.cy,0,0,l,m),a.globalCompositeOperation="hue",a.fillStyle="rgba(0,0,0,0.7)",a.fillRect(0,0,512,512)):a.drawImage(n,c.x,c.y,c.cx,c.cy,0,0,l,m)}}},"fr-pawn":{mesh:{jsFile:"/res/fairy/pawn/pawn.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/pawn/pawn-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/pawn/pawn-normalmap.jpg"}}}}}},"fr-knight":{mesh:{jsFile:"/res/fairy/knight/knight.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/knight/knight-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/knight/knight-normalmap.jpg"}}}}}},"fr-bishop":{mesh:{jsFile:"/res/fairy/bishop/bishop.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/bishop/bishop-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/bishop/bishop-normalmap.jpg"}}}}}},"fr-rook":{mesh:{jsFile:"/res/fairy/rook/rook.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/rook/rook-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/rook/rook-normalmap.jpg"}}}}}},"fr-queen":{mesh:{jsFile:"/res/fairy/queen/queen.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/queen/queen-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/queen/queen-normalmap.jpg"}}}}}},"fr-king":{mesh:{jsFile:"/res/fairy/king/king.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/king/king-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/king/king-normalmap.jpg"}}}}}},"fr-cannon":{mesh:{jsFile:"/res/fairy/cannon/cannon.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/cannon/cannon-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/cannon/cannon-normalmap.jpg"}}}}}},"fr-cannon2":{mesh:{jsFile:"/res/fairy/cannon2/cannon2.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/cannon2/cannon2-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/cannon2/cannon2-normalmap.jpg"}}}}}},"fr-dragon":{mesh:{jsFile:"/res/fairy/dragon/dragon.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/dragon/dragon-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/dragon/dragon-normalmap.jpg"}}}}}},"fr-lighthouse":{mesh:{jsFile:"/res/fairy/lighthouse/lighthouse.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/lighthouse/lighthouse-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/lighthouse/lighthouse-normalmap.jpg"}}}}}},"fr-elephant":{mesh:{jsFile:"/res/fairy/elephant/elephant.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/elephant/elephant-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/elephant/elephant-normalmap.jpg"}}}}}},"fr-admiral":{mesh:{jsFile:"/res/fairy/admiral/admiral.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/admiral/admiral-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/admiral/admiral-normalmap.jpg"}}}}}},"fr-eagle":{mesh:{jsFile:"/res/fairy/eagle/eagle.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/eagle/eagle-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/eagle/eagle-normalmap.jpg"}}}}}},"fr-lion":{mesh:{jsFile:"/res/fairy/lion/lion.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/lion/lion-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/lion/lion-normalmap.jpg"}}}}}},"fr-camel":{mesh:{jsFile:"/res/fairy/camel/camel.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/camel/camel-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/camel/camel-normalmap.jpg"}}}}}},"fr-marshall":{mesh:{jsFile:"/res/fairy/marshall/marshall.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/marshall/marshall-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/marshall/marshall-normalmap.jpg"}}}}}},"fr-crowned-rook":{mesh:{jsFile:"/res/fairy/crowned-rook/crowned-rook.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/crowned-rook/crowned-rook-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/crowned-rook/crowned-rook-normalmap.jpg"}}}}}},"fr-amazon":{mesh:{jsFile:"/res/fairy/amazon/amazon.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/amazon/amazon-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/amazon/amazon-normalmap.jpg"}}}}}},"fr-cardinal":{mesh:{jsFile:"/res/fairy/cardinal/cardinal.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/cardinal/cardinal-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/cardinal/cardinal-normalmap.jpg"}}}}}},"fr-unicorn":{mesh:{jsFile:"/res/fairy/unicorn/unicorn.js"},materials:{mat0:{channels:{diffuse:{texturesImg:{diffImg:"/res/fairy/unicorn/unicorn-diffusemap.jpg"}},normal:{texturesImg:{normalImg:"/res/fairy/unicorn/unicorn-normalmap.jpg"}}}}}}})}(),function(){View.Game.cbPromoSize=1200,View.Game.cbDefineView=function(){var e={},a=$.extend(!0,{},this.cbGridBoardClassic3DMargin,e),i=$.extend(!0,{},this.cbGridBoardClassic2DNoMargin,e);return{coords:{"2d":this.cbGridBoard.coordsFn.call(this,i),"3d":this.cbGridBoard.coordsFn.call(this,a)},boardLayout:[".#.#.#.#","#.#.#.#.",".#.#.#.#","#.#.#.#.",".#.#.#.#","#.#.#.#.",".#.#.#.#","#.#.#.#."],board:{"2d":{draw:this.cbDrawBoardFn(i)},"3d":{display:this.cbDisplayBoardFn(a)}},clicker:{"2d":{width:1400,height:1400},"3d":{scale:[.75,.75,.75]}},pieces:this.cbFairyPieceStyle({default:{"2d":{width:1300,height:1300},"3d":{scale:[.5,.5,.5]}},"fr-cardinal":{"3d":{scale:[.55,.55,.58]}},"fr-marshall":{"3d":{scale:[.52,.52,.54]}},"fr-amazon":{"3d":{scale:[.5,.5,.6]}}})}},View.Board.cbMoveMidZ=function(e,a,i,t){var r=e.cbVar.geometry,s=r.C(a.f),n=r.C(a.t),c=r.R(a.f),o=r.R(a.t);return n-s==0||o-c==0||Math.abs(n-s)==Math.abs(o-c)?(i+t)/2:Math.max(i,t)+1500}}();