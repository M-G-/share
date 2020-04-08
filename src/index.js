function injectWXjssdk() {
    const js_csdn = "http://res.wx.qq.com/open/js/jweixin-1.6.0.js";
    const scriptEl = document.createElement("script");
    scriptEl.src = js_csdn;
    scriptEl.onload = initWxConfig;
    scriptEl.onerror = function() {
        console.error("jssdk失败");
    };
    document.body.appendChild(scriptEl);
}

function initWxConfig () {
    fetch('home/wx/getJsSdkConfig', {
        method: "POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'url=http%3A%2F%2Fweb.jajyzs.com%2F'
    }).then((response) => response.json()).then(({errCode, data}) => {
        if (errCode === 200)  {
            const { appId, timestamp, nonceStr, signature } = data;
            const option = {
                debug: true,
                appId, // 必填，公众号的唯一标识
                timestamp, // 必填，生成签名的时间戳
                nonceStr, // 必填，生成签名的随机串
                signature, // 必填，签名
                jsApiList: [
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline'
                ]
            };
            // alert(JSON.stringify(option))
            window.wx.config(option);
            share();
        }
    })
}

function share () {
    let option = {
        title: 'test title',
        link: window.location.href,
        // shareUrl: window.location.href,
        imgUrl: window.location.origin + '/images/service_logo.jpg',
        success: function () {
            // 用户确认分享后执行的回调函数
            alert('分享成功');
        },
        // desc: 'test desc'
    };
    // let {desc, ...option2} = option;
    // alert('')
    // window.wx.onMenuShareAppMessage(option);
    window.wx.ready(function () {
        // console.log(option);
        // window.wx.onMenuShareAppMessage(option);
        // window.wx.onMenuShareTimeline(option2);
        // window.wx.updateAppMessageShareData(option);
        window.wx.updateTimelineShareData(option);
    })
    // window.wx.updateAppMessageShareData(option);
    // window.wx.updateTimelineShareData(option2);
    // window.wx.updateAppMessageShareData(option);
    // let {desc, ...option2} = option;
    // window.wx.updateTimelineShareData(option2);
}

injectWXjssdk();
