// 列表
var list = document.getElementById('list');
var videolist = document.getElementById('video-list');
var closelist = document.getElementById('close-list');

// 点击列表展开音乐列表
list.addEventListener('click', function (event) {
    videolist.classList.remove("list-card-hide");
    videolist.classList.add("list-card-show");
    videolist.style.display = "inherit";
    closelist.style.display = "inherit";
    closelist.addEventListener('click', closeListBoard);
});

// 点击关闭面板关闭音乐列表
function closeListBoard() {
    videolist.classList.remove("list-card-show");
    videolist.classList.add("list-card-hide");
    closelist.style.display = "none";
}

let videoname = [
			"刘惜君 - 我很快乐",
			"范玮琪 - 是非题",
			"范玮琪 - 最初的梦想",
			"许志安 - 烂泥",
			"李宇春 - 野蛮生长",
			"李宇春 - 下个，路口，见",
			"李宇春 - 一趟",
			"张杰 - 《剑心》（电视剧《古剑奇谭》的片头曲）",
			"张杰 - 三生三世（电视剧《三生三世十里桃花》主题曲）",
			"张杰 - 很奇怪我爱你"];
			
//读取fileService中音频信息
let fileList = '';
let realDirectory = new Array(videoname.length);
$.ajax({
			type: 'get',
			url: "https://video.heiyu707.cn/fileServer/findJSONByFileService?type=video",
			dataType: "json",
			success: function(res) {
                console.log('success');
				fileList = res;
			},
            complete: function (data) { // 请求完成时调用，无论请求失败或成功。
                console.log('complete');				
                console.log('fileList.length: '+ fileList.length);
				if (fileList.length > 0) {
					videoname = new Array(fileList.length);
					realDirectory = new Array(fileList.length);
            		for (let i = 0; i < fileList.length; i++) {
            			videoname[i] = fileList[i].oldFileName.replace(fileList[i].ext,'');
						realDirectory[i] = "./video/"+fileList[i].newFileName;
            			init(i);
            		}
            	} else{
					for (let i = 0; i < videoname.length; i++) {
						realDirectory[i] = "./localvideo/"+i+".mp4";
            			init(i);
            		}
				}
				
            }
		})


function init(num){
		d(num);
		shipin(num);
		text(videoname[num]);

}

function d(id){
	window.div=document.createElement("div");		//创建电影栏目div用于保存一个电影信息
	div.setAttribute("id",id);					//setAttribute() ：方法添加指定的属性，并为其赋指定的值。
	document.getElementById("selector").appendChild(div);
}

function shipin(){
	window.div.onclick=function(){				//电影栏目的		onclick事件
		document.getElementById("video").src=realDirectory[this.id];
		document.getElementById("name").innerHTML=videoname[this.id]; //动态改变视频名称
		document.getElementById("name").title=videoname[this.id]; //动态改变视频名称
	}
}
				//电影名列表
function text(name){
	var div2 = document.createElement("div");
	div2.innerHTML = name;
	div2.title = name;
	window.div.appendChild(div2);
}