(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){e.exports=a.p+"static/media/times-solid.042cb2ae.svg"},18:function(e,t,a){e.exports=a.p+"static/media/camera-solid.84c475e6.svg"},24:function(e,t,a){e.exports=a(46)},30:function(e,t,a){},32:function(e,t,a){},41:function(e,t,a){},43:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(10),l=a.n(n),r=a(0),i=a.n(r),c=a(48),o=a(49),s=a(4),p=a(5),m=a(7),u=a(6),d=a(8),h=a(47),g=a(18),E=a.n(g),f=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).send=function(e){a.setState({loading:!0}),a.props.setImg([URL.createObjectURL(e.target.files[0]),e.target.files[0]]);var t=new FormData;t.append("image",e.target.files[0]),fetch(a.state.host+"/predict/",{method:"POST",body:t}).then(function(e){return e.json()}).then(function(e){a.props.setPrediction(e.data)}).catch(function(e){console.error(e),a.setState({loading:!1,error:e})})};return a.state={loading:!1,host:"https://isthisapple.herokuapp.com",error:null},a}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:{textAlign:"center"}},this.state.loading?i.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},i.a.createElement("div",{className:"lds-ellipsis"},i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null)),i.a.createElement("div",null,"Loading...")):i.a.createElement(i.a.Fragment,null,i.a.createElement("input",{id:"image",type:"file",accept:"image/*",capture:!0,onChange:this.send}),i.a.createElement("label",{htmlFor:"image"},i.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"}},i.a.createElement("div",{className:"button"},i.a.createElement("img",{src:E.a,className:"camera-icon",alt:"Take a photo"})))),null!==this.state.error?i.a.createElement("div",{style:{color:"red",marginTop:"10px",height:0}},String(this.state.error)):null,this.props.children))}}]),t}(r.Component),b=(a(30),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).report=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"report-question report-cell"},"What is this?"),i.a.createElement("div",{className:"apple report-cell clickable",onClick:function(){a.props.report(1),a.setState({report:!1,canBeReported:!1,userLabel:"apple"})}},"Apple"),i.a.createElement("div",{className:"not-apple report-cell clickable",onClick:function(){a.props.report(-1),a.setState({report:!1,canBeReported:!1,userLabel:"not-apple"})}},"Not apple"))},a.state={userLabel:null,report:!1,canBeReported:!0},a}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return this.state.report?this.report():i.a.createElement(i.a.Fragment,null,this.state.userLabel?i.a.createElement("div",{className:"prediction ".concat(this.state.userLabel)},"apple"===this.state.userLabel?"Apple":"Not apple"):i.a.createElement("div",{className:"prediction ".concat(this.props.prediction)},"apple"===this.props.prediction?"Apple":"Not apple"),this.state.canBeReported?i.a.createElement("div",{className:"circle-margin circle-margin-report"},i.a.createElement("div",{className:"report",onClick:function(){return e.setState({report:!0})}},i.a.createElement("p",{style:{margin:"auto",fontSize:"5vmin"}},"!"))):i.a.createElement("div",{style:{margin:"10px",textAlign:"center"}},"Thanks! ",i.a.createElement("span",null,"\u2764\ufe0f")))}}]),t}(r.Component)),v=(a(32),a(11)),y=a.n(v),N=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"result"},i.a.createElement("div",{className:"circle-margin circle-margin-close"},i.a.createElement("div",{className:"close",onClick:this.props.clear},i.a.createElement("img",{src:y.a,alt:"Close"}))),i.a.createElement("div",{className:"image-holder"},i.a.createElement("img",{src:this.props.img,className:"input-image",alt:"Your input"})),i.a.createElement("div",null,i.a.createElement(b,{prediction:0===this.props.prediction[0][0]?"apple":"not-apple",report:this.props.report})))}}]),t}(r.Component),j=a(19),O=a.n(j),k=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).setPrediction=function(e){a.setState({prediction:e})},a.setImg=function(e){a.setState({img:e})},a.sendReport=function(e){var t=new FormData;t.append("label",e),t.append("image",a.state.img[1]),fetch(a.state.host+"/report/",{mode:"no-cors",method:"POST",body:t}).then(function(e){return e.json()}).then(function(e){a.props.setPrediction(e.data)}).catch(function(e){a.setImg(a.state.img)})},a.clearInput=function(){a.setState({prediction:null})};return a.state={img:null,host:"http://isthisapple.pytatki-beta.pl",prediction:null},a}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,null===this.state.prediction?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{style:{flex:1}},i.a.createElement("div",null,i.a.createElement("h1",{className:"title"},"Is this",i.a.createElement("br",null),"apple?")),i.a.createElement(f,{setPrediction:this.setPrediction,setImg:this.setImg},i.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",margin:"35px",marginBottom:0}},i.a.createElement(h.a,{to:"/apple-or-not/",style:{textDecoration:"none",color:"inherit"}},i.a.createElement("div",{className:"button-apple-or-not"},i.a.createElement("span",{role:"img","aria-label":"apple"},"\ud83c\udf4e")," ","or not"))))),i.a.createElement("footer",{className:"footer"},i.a.createElement("p",null,"Made by\xa0",i.a.createElement(O.a,{href:"https://prd-ev.github.io",color:"#31616e",bgColor:"#ecebec"},"PRDev")))):i.a.createElement(i.a.Fragment,null,i.a.createElement(N,{prediction:this.state.prediction,img:this.state.img[0],clear:this.clearInput,report:this.sendReport})))}}]),t}(r.Component),x=(a(41),function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).getPhoto=function(){fetch(a.state.host+"/report/").then(function(e){return e.json()}).then(function(e){a.setState({img:e.data,loading:!1})}).catch(function(e){return console.log(e)})},a.label=function(e){fetch(a.state.host+"/label/",{mode:"no-cors",method:"POST",credentials:"include",body:e.target.getAttribute("label")}).then(a.setState({img:null,loading:!0}))};return a.state={img:null,host:"http://isthisapple.pytatki-beta.pl",loading:!0},a}return Object(d.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.getPhoto()}},{key:"componentDidUpdate",value:function(){this.state.loading&&setTimeout(this.getPhoto(),750)}},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"header"},i.a.createElement(h.a,{to:"/"},i.a.createElement("img",{src:y.a,alt:"Close",style:{position:"absolute",left:"5vmin",height:"34px",cursor:"pointer"}})),i.a.createElement("h1",{style:{fontSize:"inherit",padding:0,margin:0}},i.a.createElement("span",{role:"img","aria-label":"apple"},"\ud83c\udf4e")," ","or not?")),i.a.createElement("div",{className:"label-area"},this.state.loading?i.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},i.a.createElement("div",{className:"lds-ellipsis"},i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null)),i.a.createElement("div",null,"Loading...")):i.a.createElement(i.a.Fragment,null,i.a.createElement("img",{src:"data:image/png;base64, "+this.state.img.slice(2,-1),className:"label-image"}),i.a.createElement("div",{className:"choose"},i.a.createElement("div",{className:"apple choice",label:"apple",onClick:this.label},"Apple"),i.a.createElement("div",{className:"not-apple choice",label:"not-apple",onClick:this.label},"Not apple")))))}}]),t}(r.Component));a(43);l.a.render(i.a.createElement(c.a,{basename:"/isthis"},i.a.createElement("div",{className:"container"},i.a.createElement(o.a,{exact:!0,path:"/",component:k}),i.a.createElement(o.a,{path:"/apple-or-not",component:x}))),document.getElementById("root"))}},[[24,2,1]]]);
//# sourceMappingURL=main.e952c7f6.chunk.js.map