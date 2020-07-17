var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
	 this.$toast('请在浏览器打开');
        return 
    } else if (ua.indexOf('qq/') > -1) {
		this.$toast('请在浏览器打开');
        return 
    } 
let goods_id = this.$route.query.id
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if (isAndroid) {
	var loadDateTime = new Date().getTime();
	window.setTimeout(function() {
		var timeOutDateTime = new Date().getTime();
		// alert("loadDateTime:"+loadDateTime+"--"+"timeOutDateTime"+timeOutDateTime)
		if (timeOutDateTime - loadDateTime < 3000) {
			 // window.location.href = "http:";//下载链接
		} else {
			 // window.close();
		}
	}, 1500);
	window.location.href = 'htl://htl:8080/loadtooldetail?goods_id='+goods_id; //android app协议
}
if (isiOS) {
	var loadDateTime = new Date().getTime();
	window.setTimeout(function() {
		var timeOutDateTime = new Date().getTime();
		// alert("loadDateTime:"+loadDateTime+"--"+"timeOutDateTime"+timeOutDateTime)
		if (timeOutDateTime - loadDateTime < 3000) {
			// window.location.href = "http:";//下载链接
		} else {
			window.close();
		}
	}, 1500);
	window.location.href = "CLGreyWolf://CLShareGoods/"+goods_id; //ios app协议
}