/**
 * Created by Administrator on 2017/9/15.
 */

//呼叫者
let beCalledInfo = null;
//呼叫成功的信息
let startMediaInfos = null;

let calledInfo = null;
let mapInfo = null;
//呼叫的老人
let oldManName = "";
//呼叫的老人的地址
let oldAddress = "";
//let busy = false;
//客服工号
let _accidYYRobotId = "";
//没有视频设备的时候转成音频设备
const switchToAudioIfNoVideoDevice = true;
//呼叫超时定时器
let callTimer;
//文字显示定时器
let netTimer;

//初始化信令服务器
var signalInited = false;

//保存主叫信息
var map = {};

//后台客服ID
var _accid = '';
var _token = '';
var page = 1;

//请求获取云信提供的token和accid
$.ajax({
	async: false,
	type: "get",
	url: ip + "/admin/adminGetAccidAndToken",
	dataType: 'json',
	success: function(data) {
		_token = data.obj.yunxinToken;
		_accid = data.obj.accid;
		console.log(_accid)
	},
	error: function() {
		console.log("网络出现错误");
	}
});

//通过获取的accid和token进行初始化
var nim = NIM.getInstance({
	debug: true,
	appKey: '40bbbad56481ac90c252be2fb6d02f95',
	account: _accid,
	token: _token,
	onconnect: onConnect,
	onwillreconnect: onWillReconnect,
	ondisconnect: onDisconnect,
	onerror: onError
});

//连接上云信服务器的时候
function onConnect() {
	
	console.log('连接成功');
	var detectType = Netcall.NETDETECT_AUDIO || Netcall.NETDETECT_VIDEO;
	console.log(detectType);
	netcall.netDetect(detectType)
		.then(function(obj) {
			console.log('netDetect success', obj)
			console.log("成功的状态码", obj.code);
			console.log("成功的状态", obj.status);
			var sta = obj.status;
			switch(sta) {
				case Netcall.CHAT_NET_STATUS_VERY_GOOD:
					$("#netTips").html("<span id='netTip'>音视频通话网络良好</span>");
					netTimer = setTimeout(function() {
						hideTip();
					}, 1000 * 10)
					break;
				case Netcall.CHAT_NET_STATUS_GOOD:
					$("#netTips").html("<span id='netTip'>音视频通话网络较好</span>");
					$("#netTip").css("color", "lawngreen");
					netTimer = setTimeout(function() {
						hideTip();
					}, 1000 * 10)
					break;
				case Netcall.CHAT_NET_STATUS_POOR:
					$("#netTips").html("<span id='netTip'>音视频通话网络可怜</span>");
					$("#netTip").css("color", "#ffc800");
					netTimer = setTimeout(function() {
						hideTip();
					}, 1000 * 10)
					break;
				case Netcall.CHAT_NET_STATUS_BAD:
					$("#netTips").html("<span id='netTip'>音视频通话网络较差</span>");
					$("#netTip").css("color", "#ff2200");
					netTimer = setTimeout(function() {
						hideTip();
					}, 1000 * 10)
					break;
				case Netcall.CHAT_NET_STATUS_VERY_BAD:
					$("#netTips").html("<span id='netTip'>音视频通话网络很差</span>");
					$("#netTip").css("color", "#ff0078");
					netTimer = setTimeout(function() {
						hideTip();
					}, 1000 * 10)
					break;
				default:

					break;
			}

		})
		.catch(function(err) {
			console.log('netDetect error', err)
			console.log("失败的状态码", err.code);
		})
}

//云信服务器即将重连
function onWillReconnect(obj) {
	// 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
	console.log('即将重连');
	alert(obj.retryCount);
	alert(obj.duration);
}

//云信服务器连接失败
function onDisconnect(error) {
	// 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
	console.log('丢失连接');
	alert("您已丢失链接，请刷新后重试");
	console.log(error);
	if(error) {
		switch(error.code) {
			// 账号或者密码错误, 请跳转到登录页面并提示错误
			case 302:
				break;
				// 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
			case 417:
				break;
				// 被踢, 请提示错误后跳转到登录页面
			case 'kicked':
				break;
			default:
				break;
		}
	}
}

//云信服务器连接发生错误
function onError(error) {
	alert(error);
}
//    }
//使用插件接口
NIM.use(Netcall);
//初始化播放窗口
const netcall = Netcall.getInstance({
	debug: true,
	nim: window.nim,
	container: document.getElementById('container'),
	remoteContainer: document.getElementById('remotecontainer'),
	mirror: true
})

// 信令通道初始化完毕之后, 开发者可以启用音视频通话相关的 UI, 比如说展示呼叫别人的按钮
// 信令通道初始化失败的时候, 请展示错误并禁用所有音视频通话相关的 UI
netcall.initSignal().then(() => {
	console.log('信令已被初始化')
	signalInited = true
}).catch(err => {
	console.log('initSignalError', err)
	alert(err.error);
	signalInited = false
})

// 当信令通道断开时, 会触发 signalClosed 事件
netcall.on('signalClosed', () => {
	console.log('on signalClosed');
	alert("您好！您的插件未安装")
	signalInited = false
	hangup()
})

// 初始化过程中会通过 devices 事件回传所有的设备列表
netcall.on('devices', obj => {
	console.log('on devices', obj)
})

//	启动麦克风
function startDeviceAudioIn() {
	netcall.startDevice({
		type: Netcall.DEVICE_TYPE_AUDIO_IN,
		//					device
	}).then(function() {
		console.log('启动麦克风');
		// 通知对方自己开启了麦克风
		netcall.control({
			command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
		})
	}).catch(function() {
		console.log('启动失败')
	})

}

//关闭麦克风
function stopDeviceAudioIn() {
	netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_IN).then(() => {
		// 通知对方自己关闭了麦克风
		netcall.control({
			command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF
		})
	})
}

//开启自己的声音设备
function startDeviceAudioOutLocal() {
	netcall.startDevice({
		type: Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL,
		device
	}).catch(() => {
		console.log('播放自己的声音失败')
	})
}

//开启自己的摄像头设备
function startDeviceVideo() {
	netcall.startDevice({
		type: Netcall.DEVICE_TYPE_VIDEO,
	}).then(() => {
		// 通知对方自己开启了摄像头
		netcall.control({
			command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON
		})
	}).catch(() => {
		// 通知对方自己的摄像头不可用
		netcall.control({
			command: Netcall.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID
		})
		console.log('启动摄像头失败')
	})
}

//停止自己的摄像头
function stopDeviceVideo() {
	netcall.stopDevice(Netcall.DEVICE_TYPE_VIDEO).then(() => {
		// 通知对方自己关闭了摄像头
		netcall.control({
			command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF
		})
	})
}

//停止自己的声音设备
function stopDeviceAudioOutLocal() {
	netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL)
}
//开启对方外部声音
function startDeviceAudioOutChat() {
	netcall.startDevice({
		type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT,
		//					device
	}).then(function() {
	}).catch(function() {
		console.log('启动失败')
	})
}

//停止外部声音
function stopDeviceAudioOutChat() {
	netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT)
}

//定时器
function clearCallTimer() {
	clearTimeout(callTimer)
}

//清理对话
function resetWhenHangup() {
	//初始化
	calledInfo = null;
	startMediaInfos = null;
	//呼叫遮罩层
	$(".callMask").hide();
	//关闭人像模式
	shutDown();
	$('.off').hide();
	//呼叫时超时的定时器
	clearCallTimer()
	netcall.stopLocalStream()
	netcall.stopRemoteStream()
	// 停止设备麦克风
	netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_IN)
	
	// 停止设备摄像头
	netcall.stopDevice(Netcall.DEVICE_TYPE_VIDEO)
	
	// 停止播放本地音频
	netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL)
	
	// 停止播放对端音频
	netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT)
}


//挂断
function hangup() {
	netcall.hangup();
	resetWhenHangup();
}

var _robotId = "";

//发起音视频呼叫接口
function startMedia(robotId) {
	//动态添加挂断按钮
	$("#hangupBtn").html('<i class="icon off" onclick="rejectMedia(\'' + robotId + '\')"></i>');
	rotbotMap[robotId] = 1;
	if(map.hasOwnProperty(robotId)) {
		delete map[robotId];
	}
    //通话类型是视频
	type = Netcall.NETCALL_TYPE_VIDEO;
	_robotId = robotId;
	$("#" + robotId).remove();
	// 在没有摄像头设备的时候切换到音频通话
	netcall.getDevicesOfType(type).then(obj => {
		if(type === Netcall.NETCALL_TYPE_VIDEO && switchToAudioIfNoVideoDevice && !obj.devices.length) {
			type = Netcall.NETCALL_TYPE_AUDIO
		}
		console.log("calling b")
		netcall.call({
			type,
			account: robotId,
			webrtcEnable: true,
			pushConfig: {
				enable: true,
				needBadge: true,
				needPushNick: true,
				pushContent: '推送内容',
				custom: JSON.stringify({
					message: '我要和你视频',
					accid: _accid,
					isWeb: true
				})
			},
			sessionConfig: {
				videoQuality: Netcall.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_NORMAL,
				videoBitrate: 0,
				recordVideo: false,
				recordAudio: false,
				highAudio: false
			}
		}).then(obj => {
			console.log('call success', obj)
			mapInfo = null;
			calledInfo = null;
			startMediaInfos = obj;
			// 设置超时计时器
			callTimer = setTimeout(() => {
				if(!netcall.callAccepted) {
					console.log('超时未接听, hangup')
					hangup();
				}
			}, 1000 * 30)

			$.ajax({
				url: ip + "/admin/robotRingOff",
				data: {
					robotId: robotId
				},
				success: function(data) {
					if(data.code == 1) {}
				}
			});
			$(".callMask").show();
			oldManAllOrder(page);
			otherAreaAdmin()
			labelList(); //产品列表

			//电话接听后，根据robotId查询老人信息
			var buyerId = "";
			$.ajax({
				//接口地址
				url: ip + '/admin/getBuyerInfoByRobotId',
				//传参
				data: {
					robotId: robotId
				},
				//请求方式
				type: 'get',
				//返回数据类型
				dataType: 'json',
				//请求成功时处理方式
				success: function(data) {
					console.log(data);
					if(data.code == 1) {
						var result = data.obj;
						console.log(result);
						//将从接口返回的数据拼装html语句
						var html = "";
						html += `
						   <tr id="${result.buyerId}">
								<td>${result.userName}</td>
								<td>${result.telephone}</td>
								<td>${result.phone}</td>
								<td colspan="2" style="width:280px;overflow: hidden;text-overflow: ellipsis;">${result.province+result.city+result.district+result.street+result.community+result.address}</td>
						   </tr>
							`;
						$("#oldInfo").html(html);
					}
				},
				//请求失败时处理方式
				error: function() {
					console.log("网络出现故障");
				}
			});

			//全部信息显示
			function allInfoShow() {
				$.ajax({
					//接口地址
					url: ip + '/admin/getBuyerInfoByRobotId',
					//传参
					data: {
						robotId: robotId
					},
					//请求方式
					type: 'get',
					//返回数据类型
					dataType: 'json',
					async: false,
					//请求成功时处理方式
					success: function(data) {
						console.log(data);
						if(data.code == 1) {
							var result = data.obj;
							console.log(result);
							//将从接口返回的数据拼装html语句
							var html = "";
							var idCard = result.idCard;
							var medicalIntention = result.medicalIntention;
							var alternateContact1 = result.alternateContact1;
							var alPhone1 = result.alPhone1;
							if(idCard == null) {
								idCard = "";
							}
							if(medicalIntention == null) {
								medicalIntention = "";
							}
							if(alternateContact1 == null) {
								alternateContact1 = "";
							}
							if(alPhone1 == null) {
								alPhone1 = "";
							}
							html += `
							<li>${result.userName}</li>
							<li>${result.telephone}</li>
							<li>${result.phone}</li>
							<li>${result.district+result.street}</li>
							<li style="line-height:20px;">${result.province+result.city+result.district+result.street+result.community+result.address}</li>
							<li>${idCard}</li>
							<li>${medicalIntention}</li>
							<li>${alternateContact1}  ${alPhone1}</li>
							`;
							$("#listAllInfo").html(html);
						}
					},
					//请求失败时处理方式
					error: function() {
						console.log("网络出现故障");
					}
				});
			}
			allInfoShow();
		}, err => {
			// 被叫不在线
			if(err.code === 11001) {
				console.log('callee offline', err);
				$("#hangupBtn").html("");
				$(".callMask").hide();
				//调用接口
				var offline = err.message.slice(18);
				alert(offline);
			} else if(err.code === 404) {
				$("#hangupBtn").html("");
				$(".callMask").hide();
				var info = err.message.slice(18);
				alert(info);
			}
		})
	})
}

function callMedia(robotId) {
	$("#hangupBtn").html('<i class="icon off" onclick="rejectMedia(\'' + robotId + '\')"></i>');
	//动态添加按钮
	$(".callMask").show();
	rotbotMap[robotId] = 1;
	if(map.hasOwnProperty(robotId)) {
		delete map[robotId];
	}

	type = Netcall.NETCALL_TYPE_VIDEO;
	_robotId = robotId;
	// 在没有摄像头设备的时候切换到音频通话
	netcall.getDevicesOfType(type).then(obj => {
		if(type === Netcall.NETCALL_TYPE_VIDEO && switchToAudioIfNoVideoDevice && !obj.devices.length) {
			type = Netcall.NETCALL_TYPE_AUDIO
		}
		console.log("calling b")
		netcall.call({
			type,
			account: robotId,
			webrtcEnable: true,
			pushConfig: {
				enable: true,
				needBadge: true,
				needPushNick: true,
				pushContent: '推送内容',
				custom: JSON.stringify({
					message: '我要和你视频',
					accid: _accid,
					isWeb: true
				})
			},
			sessionConfig: {
				videoQuality: Netcall.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_NORMAL,
				videoBitrate: 0,
				recordVideo: false,
				recordAudio: false,
				highAudio: false
			}
		}).then(obj => {
			console.log('call success', obj);
			calledInfo = null;
			mapInfo = null;
			startMediaInfos = obj;
			// 设置超时计时器
			callTimer = setTimeout(() => {
				if(!netcall.callAccepted) {
					console.log('超时未接听, hangup')
					hangup();
				}
			}, 1000 * 30)

			$.ajax({
				url: ip + "/admin/robotRingOff",
				data: {
					robotId: robotId
				},
				success: function(data) {
					if(data.code == 1) {}
				}
			});

			//电话接听后，根据robotId查询老人信息
			var buyerId = "";
			$.ajax({
				//接口地址
				url: ip + '/admin/getBuyerInfoByRobotId',
				//传参
				data: {
					robotId: robotId
				},
				//请求方式
				type: 'get',
				//返回数据类型
				dataType: 'json',
				//请求成功时处理方式
				success: function(data) {
					console.log(data);
					if(data.code == 1) {
						var result = data.obj;
						console.log(result);
						//将从接口返回的数据拼装html语句
						var html = "";
						html += `
						   <tr id="${result.buyerId}">
								<td>${result.userName}</td>
								<td>${result.telephone}</td>
								<td>${result.phone}</td>
								<td colspan="2" style="width:280px;overflow: hidden;text-overflow: ellipsis;">${result.province+result.city+result.district+result.street+result.community+result.address}</td>
						   </tr>
							`;
						$("#oldInfo").html(html);
					}
				},
				//请求失败时处理方式
				error: function() {
					console.log("网络出现故障");
				}
			});

			//全部信息显示
			function allInfoShow() {
				$.ajax({
					//接口地址
					url: ip + '/admin/getBuyerInfoByRobotId',
					//传参
					data: {
						robotId: robotId
					},
					//请求方式
					type: 'get',
					//返回数据类型
					dataType: 'json',
					async: false,
					//请求成功时处理方式
					success: function(data) {
						console.log(data);
						if(data.code == 1) {
							var result = data.obj;
							console.log(result);
							//将从接口返回的数据拼装html语句
							var html = "";
							html += `
							<li>${result.userName}</li>
							<li>${result.telephone}</li>
							<li>${result.phone}</li>
							<li>${result.district+result.street}</li>
							<li>${result.province+result.city+result.district+result.street+result.community+result.address}</li>
							<li style="line-height:20px">${result.idCard}</li>
							<li>${result.medicalIntention}</li>
							<li>${result.alternateContact1}  ${result.alPhone1}</li>
							`;
							$("#listAllInfo").html(html);
						}
					},
					//请求失败时处理方式
					error: function() {
						console.log("网络出现故障");
					}
				});
			}
			allInfoShow();
		}, err => {
			// 被叫不在线
			if(err.code === 11001) {
				$("#hangupBtn").html("");
				$(".callMask").hide();
				console.log('callee offline', err);
				//调用接口
				var offline = err.message.slice(18);
				alert(offline);
			} else if(err.code === 404) {
				$("#hangupBtn").html("");
				$(".callMask").hide();
				var info = err.message.slice(18);
				alert(info);
			}
		})
	})
}
/*
       音视频被呼叫
 * */
var _audio = document.getElementById('audio');
var audioarr = [];
netcall.on('beCalling', obj => {
	console.log('on beCalling', obj)

	_audio.currentTime = 0;
	/*收到呼叫的回调提示音*/

	_robotId = obj.account;
    audioarr.push(_robotId);
    unique1(audioarr);
     //获取机器传过来的客服工号
	_accidYYRobotId = obj.pushConfig.pushPayload;

	console.log(_accidYYRobotId);
	// 获取通话标识符 channelId, 每一通会话的 channelId 都不一样
	const {
		channelId
	} = obj
	// 通知对方自己已经收到此次通话的请求
	netcall.control({
		channelId,
		command: Netcall.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
	})

	beCalledInfo = obj;
	searchBuyInfo();
	/*判断机器人传过来的客服工号，和后台的cookie里存的客服工号相等,表示对应的是当前客服*/
	if(_accid === _accidYYRobotId) {
		//把呼叫按钮变接听，删除呼叫按钮，添加接听按钮
		if(map.hasOwnProperty(_robotId)) {
			$("#" + _robotId).remove();
		}

		map[_robotId] = beCalledInfo;
        mapInfo = map[_robotId];
        if (startMediaInfos) {
        	mapInfo = null;
        	calledInfo = null;
        }
		var html = "";
		html += `
			                           <tr id='${_robotId}'>
			                              <td>${oldManName}</td>
			                              <td>${oldAddress}</td>
			                              <td>
			                                 <img class='btn-del' alt='${_robotId}' onclick="receiveVideo('${_robotId}')" src="/html/images/51.gif"/>
			                              </td>
			                           </tr>
			                        `;

		if($("#addData").html() == "") {
			$("#addData").append(html);
		} else {
			$("#addData:last-child").append(html);
		}

		_audio.play();

	}
  
})
//通话中或已通话的标识
var rotbotMap = {};

//接听音视频呼叫接口
function receiveVideo(callId) {
	
	//添加挂断按钮
	$("#hangupBtn").html('<i class="icon off" onclick="rejectMedia(\'' + callId + '\')"></i>');	
	
	//添加忙线的情况
	_audio.pause();
     
	calledInfo = map[callId]
	netcall.response({
		accepted: true,
		beCalledInfo: calledInfo,
		sessionConfig: {
			videoQuality: Netcall.CHAT_VIDEO_QUALITY_480P,
			videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_NORMAL,
			videoBitrate: 0,
			recordVideo: false,
			recordAudio: false,
			highAudio: false
		}

	}).catch(err => {
		netcall.control({
			channelId: calledInfo.channelId,
			command: Netcall.NETCALL_CONTROL_COMMAND_BUSY
		})
		netcall.response({
			accepted: false,
			beCalledInfo: calledInfo
		})

		hangup()
		console.log('接听失败', err)
		alert('接听失败',err);
	})
	rotbotMap[callId] = 1;

	$.ajax({
		url: ip + "/admin/robotRingOff",
		data: {
			robotId: callId
		},
		success: function(data) {
			if(data.code == 1) {}
		}
	});
	$("#" + callId).remove();
	$(".callMask").show();
	oldManAllOrder(page);
	otherAreaAdmin();
	labelList(); //产品列表

	//电话接听后，根据robotId查询老人信息
	var buyerId = "";
	$.ajax({
		//接口地址
		url: ip + '/admin/getBuyerInfoByRobotId',
		//传参
		data: {
			robotId: callId
		},
		//请求方式
		type: 'get',
		//返回数据类型
		dataType: 'json',
		//请求成功时处理方式
		success: function(data) {
			console.log(data);
			if(data.code == 1) {
				var result = data.obj;
				console.log(result);
				//将从接口返回的数据拼装html语句
				var html = "";
				html += `
						   <tr id="${result.buyerId}">
								<td>${result.userName}</td>
								<td>${result.telephone}</td>
								<td>${result.phone}</td>
								<td colspan="2" style="width:280px;overflow: hidden;text-overflow: ellipsis;">${result.province+result.city+result.district+result.street+result.community+result.address}</td>
						   </tr>
							`;
				$("#oldInfo").html(html);
			}
		},
		//请求失败时处理方式
		error: function() {
			console.log("网络出现故障");
		}
	});

	//全部信息显示
	function allInfoShow() {
		$.ajax({
			//接口地址
			url: ip + '/admin/getBuyerInfoByRobotId',
			//传参
			data: {
				robotId: callId
			},
			//请求方式
			type: 'get',
			//返回数据类型
			dataType: 'json',
			async: false,
			//请求成功时处理方式
			success: function(data) {
				console.log(data);
				if(data.code == 1) {
					var result = data.obj;
					console.log(result);
					//将从接口返回的数据拼装html语句
					var html = "";
					var idCard = result.idCard;
					var medicalIntention = result.medicalIntention;
					var alternateContact1 = result.alternateContact1;
					var alPhone1 = result.alPhone1;
					if(idCard == null) {
						idCard = "";
					}
					if(medicalIntention == null) {
						medicalIntention = "";
					}
					if(alternateContact1 == null) {
						alternateContact1 = "";
					}
					if(alPhone1 == null) {
						alPhone1 = "";
					}
					html += `
							<li>${result.userName}</li>
							<li>${result.telephone}</li>
							<li>${result.phone}</li>
							<li>${result.district+result.street}</li>
							<li style="line-height:20px">${result.province+result.city+result.district+result.street+result.community+result.address}</li>
							<li>${idCard}</li>
							<li>${medicalIntention}</li>
							<li>${alternateContact1}  ${alPhone1}</li>
							`;
					$("#listAllInfo").html(html);
				}
			},
			//请求失败时处理方式
			error: function() {
				console.log("网络出现故障");
			}
		});
	}
	allInfoShow();

}

netcall.on('callAccepted', obj => {
	var acceptId = obj.account
	//动态添加按钮
	console.log('on callAccepted', obj)
	clearCallTimer()
	if(obj.type === Netcall.NETCALL_TYPE_VIDEO) {
		startDeviceAudioIn()
		//开启外部声音
		startDeviceAudioOutChat()
		startDeviceVideo()
		netcall.startLocalStream()
		netcall.startRemoteStream()
		netcall.setVideoViewRemoteSize({
			width: 397,
			height: 265,
			cut: true
		})
	} else {
		startDeviceAudioIn()
		startDeviceAudioOutChat()
		stopDeviceVideo()
	}
})

var arr = []
// 最简单数组去重法 
function unique1(array){ 
//	 var arr = []; //一个新的临时数组 
	//遍历当前数组 
	for(var i = 0; i < array.length; i++){ 
	//如果当前数组的第i已经保存进了临时数组，那么跳过， 
	//否则把当前项push到临时数组里面 
	if (arr.indexOf(array[i]) == -1) arr.push(array[i]); 
	} 
	return arr; 
}

Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}
//接听挂断
netcall.on('hangup', obj => {
    	if (arr.length<=1) {
    		_audio.pause();
    	}else{
    		arr.removeByValue(obj.account);
    	}
    console.log("=======是否收到挂断==========")
    //挂断类型
    var hangType = obj.type;
    if (hangType===-1) {
    	alert("挂断异常，请重新挂断");
    }
	//定义变量接收老人的名字
	var hangupName = "";
	
	//定义变量接听老人的地址
	var hangupAddress = "";

	console.log('on hangup', obj);

	//当前挂断机器人的id
	var reCallId = obj.account;

	//监听挂断的机器人的id
	$("#" + reCallId).remove();


	//查询电话列表的信息
	$.ajax({
		//接口地址
		url: ip + '/admin/getBuyerInfoByRobotId',
		//请求方式
		type: 'get',
		//返回数据类型
		dataType: 'json',
		data: {
			robotId: reCallId
		},
		async: false,
		//请求成功时处理方式
		success: function(data) {
			if(data.code == 1) {
				var _result = data.obj;
				console.log(_result);
				//将从接口返回的数据拼装html语句

				hangupName = _result.userName;
				hangupAddress = _result.street;

			}
		},
		//请求失败时处理方式
		error: function() {
			console.log("网络出现故障");
		}
	});

	if(_accid === _accidYYRobotId && rotbotMap[reCallId] != 1) {

		var html = "";
		html += `
			                           <tr id='${reCallId}'>
			                              <td>${hangupName}</td>
			                              <td>${hangupAddress}</td>
			                              <td>
			                                 <img class="btn-del" alt='${reCallId}' onclick="startMedia('${reCallId}')" src="/html/images/51.gif"/>
			                              </td>
			                           </tr>
			                        `;
		if($("#addData").html() == "") {
			$("#addData").append(html);
		} else {
			$("#addData:last-child").append(html);
		}
	}
    	// 判断需要挂断的通话是否是当前正在进行中的通话
	if(!calledInfo||calledInfo.channelId===obj.channelId) {
		console.log("======做些清理工作=========")
		if (!startMediaInfos||startMediaInfos.channelId===obj.channelId||mapInfo.channelId==obj.channelId) {
		//清理工作
		resetWhenHangup();	
		}
	
	} 
	delete rotbotMap[reCallId];
    
})

//监听收到机器人拒绝通话
netcall.on('callRejected', obj => {
    	if (arr.length<=1) {
    		_audio.pause();
    	}else{
    		arr.removeByValue(obj.account);
    	}
	var rejectId = obj.account;
	console.log('on callRejected', obj);
	// 判断需要挂断的通话是否是当前正在进行中的通话
	if(!calledInfo||calledInfo.channelId===obj.channelId) {
		console.log("======做些清理工作=========")
		if (!startMediaInfos||startMediaInfos.channelId===obj.channelId||mapInfo.channelId==obj.channelId) {
		//清理工作
		if(map.hasOwnProperty(rejectId)) {
			delete map[rejectId];
		}
		clearCallTimer();
		netcall.stopLocalStream();
		netcall.stopRemoteStream();
		}
	
	} 
	$(".callMask").hide();
	delete rotbotMap[rejectId];

})

//监听设备的状态
netcall.on('deviceStatus', obj => {
	console.log('on deviceStatus', obj)
})

//本地流尺寸的变化
netcall.on('streamResize', obj => {
	console.log('on streamResize', obj)
})

//远程流尺寸的变化
netcall.on('remoteStreamResize', obj => {
	console.log('on remoteStreamResize', obj);
	netcall.setVideoViewRemoteSize({
		width: 397,
		height: 265,
		cut: true
	})
})

//其他端做了处理
netcall.on('callerAckSync', function(obj) {
	console.log('其他端已经做了处理', obj);
	alert("已经被其他客服接听了");
})

//挂断视频通话
function rejectMedia(rejectId) {
	delete rotbotMap[rejectId];
	if(map.hasOwnProperty(rejectId)) {
		delete map[rejectId];
	}
	hangup();
	shutDown();
	$('.off').hide();
	$(".callMask").hide();
}

//监听音量事件
netcall.on('audioVolume', obj => {
	this.audioVolumn = obj
})

//开启人像模式
function sendCrtlCommand() {
	netcall.control({
		command: Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO
	})
	$('.video1').show();
	$('.video').hide();

}

//关闭人像模式
function shutDown() {
	netcall.control({

		command: Netcall.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO
	})
	$('.video').show();
	$('.video1').hide();
}


$(function() {
	$("#blue").slider({
		orientation: "horizontal",
		range: "min",
		max: 255,
		min: 0,
		value: 100,
		change: sliderVolumn,
	});
	//音量调节
	function sliderVolumn() {
		var value = $('#blue').slider('option', 'value');
		netcall.setPlayVolume(value);
	}

});

//文字提示之后的清理工作
function hideTip() {
	$("#netTip").hide();
	clearTimeout(netTimer);
}

//网络探测的回调
netcall.on('netStatus', function(obj) {
	console.log('当前网络情况', obj)
	var statues = obj.status;
	var code = obj.code;
	var statusId = obj.account;
	console.log("我是当前的客服" + statusId);
	if(statusId === _accid && _accidYYRobotId === _accid) {
		switch(statues) {
			case Netcall.CHAT_NET_STATUS_VERY_GOOD:
				$("#netTips").html("<span id='netTip'>您当前网络良好</span>");
				netTimer = setTimeout(function() {
					hideTip();
				}, 1000 * 10)
				break;
			case Netcall.CHAT_NET_STATUS_GOOD:
				$("#netTips").html("<span id='netTip'>您当前网络较好</span>");
				$("#netTip").css("color", "lawngreen");
				netTimer = setTimeout(function() {
					hideTip();
				}, 1000 * 10)
				break;
			case Netcall.CHAT_NET_STATUS_POOR:
				$("#netTips").html("<span id='netTip'>您当前网络可怜</span>");
				$("#netTip").css("color", "#ffc800");
				netTimer = setTimeout(function() {
					hideTip();
				}, 1000 * 10)
				break;
			case Netcall.CHAT_NET_STATUS_BAD:
				$("#netTips").html("<span id='netTip'>您当前网络较差</span>");
				$("#netTip").css("color", "#ff2200");
				netTimer = setTimeout(function() {
					hideTip();
				}, 1000 * 10)
				break;
			case Netcall.CHAT_NET_STATUS_VERY_BAD:
				$("#netTips").html("<span id='netTip'>您当前网络很差</span>");
				$("#netTip").css("color", "#ff0078");
				netTimer = setTimeout(function() {
					hideTip();
				}, 1000 * 10)
				break;
			default:

				break;
		}
	} else if(_accidYYRobotId === _accid && statusId === _robotId) {
		switch(statues) {
			case Netcall.CHAT_NET_STATUS_VERY_GOOD:
				$("#netTips").html("<span id='netTip'>机器人网络良好</span>");
				netTimer = setTimeout(function() {
					hideTip();
				}, 1000 * 10)
				break;
			case Netcall.CHAT_NET_STATUS_GOOD:
				$("#netTips").html("<span id='netTip'>机器人网络较好</span>");
				$("#netTip").css("color", "lawngreen");
				netTimer = setTimeout(function() {
					hideTip();
				}, 1000 * 10)
				break;
			case Netcall.CHAT_NET_STATUS_POOR:
				$("#netTips").html("<span id='netTip'>机器人网络可怜</span>");
				$("#netTip").css("color", "#ffc800");
				netTimer = setTimeout(function() {
					hideTip();
				}, 1000 * 10)
				break;
			case Netcall.CHAT_NET_STATUS_BAD:
				$("#netTips").html("<span id='netTip'>机器人网络较差</span>");
				$("#netTip").css("color", "#ff2200");
				netTimer = setTimeout(function() {
					hideTip();
				}, 1000 * 10)
				break;
			case Netcall.CHAT_NET_STATUS_VERY_BAD:
				$("#netTips").html("<span id='netTip'>机器人网络很差</span>");
				$("#netTip").css("color", "#ff0078");
				netTimer = setTimeout(function() {
					hideTip();
				}, 1000 * 10)
				break;
			default:

				break;
		}
	}

})

	function searchBuyInfo() {
		//查询电话列表的信息
		$.ajax({
			//接口地址
			url: ip + '/admin/getBuyerInfoByRobotId',
			//请求方式
			type: 'get',
			//返回数据类型
			dataType: 'json',
			data: {
				robotId: _robotId
			},
			async: false,
			//请求成功时处理方式
			success: function(data) {
				if(data.code == 1) {
					var result = data.obj;
					console.log(result);
					//将从接口返回的数据拼装html语句
					oldManName = result.userName;
					oldAddress = result.street;
	
				}
			},
			//请求失败时处理方式
			error: function() {
				console.log("网络出现故障");
			}
		});
	}


	window.onbeforeunload=function (){ 
		alert("===onbeforeunload==="); 
		if(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){ 
			hangup();
		alert("你关闭了浏览器"); 
		}else{
			hangup();
		alert("你正在刷新页面"); 
		} 
	} 

