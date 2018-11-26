function ctysofttool() {
	/*通用遮罩层*/
	this.footermask = $("<div class='all-mask'></div>");

	/*从左到右展示列表*/
	this.openpanelltr = function(id) {

			$('#' + id).toggleClass("righ-pop-right");
			$('#' + id).find(".righ-pop-cont").height($(window).height() - $('#' + id).offset().top)
		}
	
	/*展示底部菜单*/
	this.showfooterpop = function(id) {
			$('#' + id).addClass('footer-pop-cur');
			this.footermask.addClass('footer-mask-show');
		}
	/*隐藏底部菜单*/
	this.hidefooterpop = function() {
		$('.footer-pop').removeClass('footer-pop-cur');
		this.footermask.removeClass('footer-mask-show');
	}


	/*弹出窗口提交表单*/
	this.showopenform = function(id,title) {
		$('#' + id).fadeIn();
		this.footermask.addClass('all-mask-show');

		$('#' + id).prepend("<div class='all-popup-hd'>"+title+"<a href='javascript:void(0);' class='all-popup-colse'>&#10005</a></div>   "); 	
		$('#' + id).find('.all-popup-colse').bind("click", function(){
			$('#' + id).hide();	
			$('#' + id).find('.all-popup-hd').remove();	
			$('.footer-mask').removeClass('all-mask-show');

		});


	}


	/*隐藏窗口提交表单*/
	this.hideopenform = function(id) {
		$(".all-popup") .fadeOut();
		this.footermask.removeClass('all-mask-show');			
	}


	/*活动评论*/
	this.actdppop = function(id) {
		$('#'+ id).addClass('act-dp-pop-cur');
		this.footermask.addClass('all-mask-show');			
	}

	/*活动评论关闭*/
	this.actdppopHide = function(id) {
		$('#'+ id).removeClass('act-dp-pop-cur');
		this.footermask.removeClass('all-mask-show');			
	}

	/*我要报名*/
	this.bmPopup = function(id) {
		$('#'+ id).addClass('bm-popup-cur');
		this.footermask.addClass('all-mask-show');			
	}

	/*我要报名关闭*/
	this.bmPopupHide = function(id) {
		$('#'+ id).removeClass('bm-popup-cur');
		this.footermask.removeClass('all-mask-show');			
	}


	/*导航类型*/
	// this.pagenavLx = function(id) {
	// 	// alert(2)
	// 	$('#'+ id).addClass('page-nav-down-cur');
	// 	$('#'+ id).find('ul li').click(function(){
 //            $(this).addClass('cur').siblings().removeClass('cur');          
 //            $('.page-nav li').removeClass('cur');
         	

 //            this.footermask.removeClass('all-mask-show');	

 //         });

	// 	this.footermask.addClass('all-mask-show');			
	// }


	/*必要的初始化*/
	this.init = function() {
		$(window.document.body).append(this.footermask);
		$(".footer-pop").each(function() {
			var obj = $("<div class='footer-pop-close'>&#10005 </div>");
			obj.bind("click", function() {
				_ctool.hidefooterpop();
			})
			$(this).prepend(obj)
		});


		$('.all-mask').click(function(){
			$(this).removeClass('all-mask-show');	
			$('#act-dp-pop').removeClass('act-dp-pop-cur');
			$('#bm-popup').removeClass('bm-popup-cur');
			$('.page-nav-down').removeClass('page-nav-down-cur');
		});

		// 点赞
		// $('.activity-dz').click(function(){		
		// 	if($(this).hasClass('cur')){				
		// 		 $(this).removeClass('cur');				
		// 	}else{				
		// 		$(this).addClass('cur');
		// 	}
		// });
	}
}



var _ctool = new ctysofttool();
_ctool.init()