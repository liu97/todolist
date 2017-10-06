require('../css/reset.css');
require('../css/index.css');
import Vue from 'vue'
var indexVue = new Vue({
	el: "#todolist",
	data:{
		ingcount: 0,     //正在进行的事件个数
		edcount: 0,     //已经完成的事件个数
		ingsession: {},     //正在进行的事件内容
		edsession: {},     //已经完成的事件内容
		list: "",     //当前增加的事件内容
		warn: false,      //警告事件输入是否为空
		showp: {},     //控制事件显示状态
		changesession: {},     //事件备份对象，作修改中介
	},
	mounted: function(){
		this.$nextTick(function(){
			this.searchStorage();	
		})
		
	},
	methods: {
		searchStorage: function(){              //更新事件
			this.ingcount=0,this.edcount=0;
			this.ingsession={},this.edsession={};
			if(typeof(Storage)!=="undefined")
			{
				if(JSON.stringify(localStorage)!="{}"){
					for(let item in localStorage){
						if(item.startsWith("ing")){
							this.$set(this.ingsession,item,localStorage[item]);
							this.ingcount++;
						}
						else if(item.startsWith("ed")){
							this.$set(this.edsession,item,localStorage[item]);
							// this.$set(this.changeedsession,item,localStorage[item]);
							this.edcount++;
						}
						this.$set(this.changesession,item,localStorage[item]);
						this.$set(this.showp,item,true);  
			  		}
				}
				else{
					localStorage.listcount=1;
				}
			}
			else
			{
			  alert("对不起，您的浏览器不支持 web 存储");
			}
		},
		addList: function(event){           //增加事件
			if(event.keyCode == 13){
				if(this.list!=""){
					localStorage["ing"+localStorage.listcount++]=this.list;
					this.list="";
					this.searchStorage();
				}
				else{
					this.warn=true;
				}
			}
		},
		removelist: function(value){       //删除事件
			localStorage.removeItem(value);
			this.searchStorage();
		},
		changelist: function(value,key){   //改变事件状态
			localStorage.removeItem(key);
			if(key.startsWith("ing")){
				localStorage["ed"+localStorage.listcount++]=value;
			}
			else if(key.startsWith("ed")){
				localStorage["ing"+localStorage.listcount++]=value;
			}
			this.searchStorage();
		},
		clearlocal: function(){          //将事件全部清除
			localStorage.clear();
			this.searchStorage();
		},
		focus: function(key){       //事件获取焦点，将p变成input
			this.showp[key]=false;
		},
		blur: function(key){        //事件失去焦点，将input改成p，更新事件内容
			localStorage[key]=this.changesession[key];
			this.showp[key]=true;
			this.searchStorage();
		},
		clearwarn: function(){
			this.warn=false;
		}
	},
	directives: {
	    focus: {//事件input获取焦点
	        inserted: function (e) {
	            e.focus();
	        }
    }
}
})