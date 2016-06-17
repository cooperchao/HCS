var hcs_calendar = hcs_calendar || {};
hcs_calendar = {
	default_setting : function( input_boolean , input_boolean2 ) {
		var currentLangCode = "zh-tw";
		var calendar_init ={
			lang: currentLangCode,
			theme: true,
			header: {
				left: "prev,next",
				center: "title",
				right: "agendaWeek,month today"
			},
			allDaySlot: false,               // 全天任務
			defaultView: "agendaWeek",       // 停留頁籤
			// defaultDate: "2015-06-01",       // 預設日期
			eventLimit: true,                // 更多筆數
			firstDay: 1,                     // 起始週期
			titleFormat: {
				week: "YYYY/MM"
			},
			columnFormat: {
				month: "dd",
				week: "M/D dd",
			},
			axisFormat: "HH:mm",             // 側欄時間
			timeFormat: "HH:mm",             // 事件時間
			formatDate: "MM-dd-yyyy",
			eventBorderColor: "transparent", // 邊框顏色
			eventRender: function(event, element){
				var case_name = event.title;
				element.find(".fc-content").append('<span class="fc-title">'+ event.case_name +'</span>');
				if(event.wai_name != undefined && $(".fc-view").hasClass("fc-month-view") == false){
					element.find(".fc-content").append('<div class="fc-staff">居：'+ event.wai_name +'</div>');
				}
			},
			eventClick: function(event,element){


				var $start            = event.start.format("YYYY-MM-DD HH:mm"),
					$end              = event.end.format("YYYY-MM-DD HH:mm"),
					$body             = $("body"),
					$miss             = $(".miss"),
					$punch            = $(".punch"),
					$nonarrival       = $(".nonarrival"),
					_titleTask        = "任務",
					_topicTask        = "任務名稱",
					_timeStart        = "開始時間",
					_timeEnd          = "結束時間",
					_timeCycle        = "任務週期",
					_taskItme         = "任務項目",
					_attendant        = "服務人員",
					_supervisor       = "督導人員",
					_note             = "其它備註",
					_editEvent        = "修改任務",
					_miss             = "服務未遇",
					_done             = "確定",
					_punch            = "特殊處理",
					_nonarrival       = "服務員未到",
					_titleMeeting     = "會議/職訓",
					_topicEvent       = "事件主題",
					_eventIssue       = "事件議題",
					_location         = "事件地點",
					_join             = "參與人員",
					_lone_care        = "長照案號",
					_case_phone       = "電話",
					_eme_name         = "緊急聯絡",
					_eme_phone        = "聯絡電話",
					_miss_status      = "事件狀態",
					_miss_pay         = "自付金額",
					_miss_subsidy     = "補助金額",
					_miss_note        = "未遇備註",
					_continue         = "繼續服務",
					_gps_err          = "GPS定位異常",
					_wai_arrive       = "到達",
					_wai_leave        = "離開",
					_cost_type        = "費用類別",
					_admin_pp         = "行政計次",
					_drive_pp         = "車程計次",
					_checkin_distance = "打卡距離",
					_checkin_note     = "增加打卡距離備註",
					_checkin_df_text  = "正常",
					_attendant_sign   = "出勤簽到",
					_e_sign           = "電子簽名",
					_e_sign_state_y   = "檢視",
					_e_sign_state_n   = "無電子簽名",
					_save             = "儲存",
					_qr_sing          = "QRCode";
				
				if (event.className[0] == 'eventTask'){

					// task_state	
					var $this = $(this);
					var task_state_text = {
						task_miss     : _miss,
						task_continue : _continue,
						task_punch    : _punch,
						wai_yet       : _nonarrival,
						gps_err       : _gps_err,
					};

					task_state = '';
					for (var key in task_state_text){
						 if($this.hasClass(key)){
							var task_state = '<div class="'+ key +'_title">'+ task_state_text[key] +'</div>';
						}
					}

					// 電話欄位
					var cp_item = "";
					for (var i in event.case_phone) {
						cp_item += event.case_phone[i];
						if((i * 1) + 1 != event.case_phone.length) cp_item += "<br>";
					}

					// 緊急聯絡人
					var eme_item = "";
					for (var j in event.eme) {
						eme_item += event.eme[j].name + " <sapn class='text-info'>("+ event.eme[j].cognate +")</sapn> " + event.eme[j].phone;
						if((j * 1) + 1 != event.eme.length) eme_item += "<br>";	
					}

					// 居服人員
					var wai_item = "";

					for (var k in event.wai) {
						
						var arrive_sign = "",
							leave_sign = "";

						// 依arrive & leave_token判別使用簽到方式，(1)電子簽名(2)QRCode(0)預設為空
						switch ( event.wai[k].arrive_token ) {
							case 1:
								arrive_sign = '<span><a href=' + event.wai[k].arrive_sign + ' target="_blank">'+ _e_sign +'</a></span>';
								break;
							case 2:
								arrive_sign = '<span>'+ _qr_sing +'</span>';
								break;
							default:
								arrive_sign = "";
								break;
						}
						switch ( event.wai[k].leave_token ){
							case 1:
								leave_sign = '<span><a href=' + event.wai[k].leave_sign + ' target="_blank">'+ _e_sign +'</a></span>';
								break;
							case 2:
								leave_sign = '<span>'+ _qr_sing +'</span>';
								break;
							default:
								leave_sign = "";
								break;
						}

						wai_item +=
						'<div class="row">' +
							'<div class="col-md-10">'+
								'<div class="row">'+
									'<div class="col-md-3">'+ event.wai[k].name +'</div>'+
									'<div class="col-md-3"><span class="text-info">'+ _wai_arrive +'</span> '+ event.wai[k].arrive +'</div>'+
									'<div class="col-md-3"><span class="text-info">'+ _wai_leave +'</span> '+ event.wai[k].leave +'</div>'+
									'<div class="col-md-3">&nbsp;</div>'+

									'<div class="col-md-3">&nbsp;</div>'+
									'<div class="col-md-3">'+ arrive_sign +'</div>'+
									'<div class="col-md-3">'+ leave_sign +'</div>'+
									'<div class="col-md-3">&nbsp;</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<hr style="margin-top:8px">';

						// wai_item += event.wai[k].name + "<sapn class='text-info'> " + _wai_arrive + " </sapn>" +  event.wai[k].arrive + "<sapn class='text-info'> " + _wai_leave + " </sapn>" + event.wai[k].leave;
						// if((k * 1) + 1 != event.wai.length) wai_item += "<br>";

					}

					// 打卡距離
					var checkin_distance_txt = "";
					for (var d in event.checkin) {
						checkin_distance_txt += '<a href="'+ event.checkin[0].maps +'" class="text-danger" target="_blank">'+ event.checkin[0].distance +'</a>';
						if ( event.checkin[0].maps == '') checkin_distance_txt = '<span>' + _checkin_df_text + '</span>';
					}

					// 電子簽名
					// var e_sing_link = "";
					// if ( event.e_sign != "" ) {
					// 	e_sing_link = '<a href="'+ event.e_sign +'" class="text-info" target="_blank">'+ _e_sign_state_y +'</a>'
					// } else {
					// 	e_sing_link = '<span class="text-danger">'+ _e_sign_state_n +'</span>'
					// }
					
					var fancyContent = (
						'<div class="modal-header">' +
							'<h4 class="modal-title">'+ _titleTask + task_state +'</h4>' +
						'</div>' +

						'<div class="modal-body">'+
							// 任務名稱
							'<div class="row">'+
								'<label class="col-md-2">'+ _topicTask +'</label>' +
								'<div class="col-md-10">' +
									event.case_name +
								'</div>' +
							'</div>' +

							// 電話 
							'<div class="row form-group case_detail">'+
								'<label class="col-md-2">'+ _case_phone +'</label>' +
								'<div class="col-md-10">'+ cp_item +'</div>' +
							'</div>' +

							// 緊急聯絡
							'<div class="row form-group case_detail">'+
								'<label class="col-md-2">'+ _eme_name +'</label>' +
								'<div class="col-md-10">'+ eme_item +'</div>' +
							'</div>' +

							// 費用類別
							'<div class="row case_detail">'+
								'<label class="col-md-2">'+ _cost_type +'</label>' +
								'<div class="col-md-10">'+ event.cost_type +'</div>' +
							'</div>' +

							// 行政計次
							'<div class="row case_detail">'+
								'<label class="col-md-2">'+ _admin_pp +'</label>' +
								'<div class="col-md-10">'+ event.admin_pp +'</div>' +
							'</div>' +

							// 車程計次
							'<div class="row case_detail">'+
								'<label class="col-md-2">'+ _drive_pp +'</label>' +
								'<div class="col-md-10">'+ event.drive_pp +'</div>' +
							'</div>' +

							// 開始時間
							'<div class="row">'+
								'<label class="col-md-2">'+ _timeStart +'</label>' +
								'<div class="col-md-10">'+ $start +'</div>' +
							'</div>' +

							// 結束時間 
							'<div class="row">'+
								'<label class="col-md-2">'+ _timeEnd +'</label>' +
								'<div class="col-md-10">'+ $end +'</div>' +
							'</div>' +

							// 任務週期
							'<div class="row">'+
								'<label class="col-md-2">'+ _timeCycle +'</label>' +
								'<div class="col-md-10">'+ event.taskCycle +'</div>' +
							'</div>' +

							// 任務項目
							'<div class="row">'+
								'<label class="col-md-2">'+ _taskItme +'</label>' +
								'<div class="col-md-10">'+ event.taskItem +'</div>' +
							'</div>' +

							// 服務人員
							'<div class="row form-group">'+
								'<label class="col-md-2">'+ _attendant +'<br>'+ _attendant_sign +'</label>' +
								'<div class="col-md-10">'+ wai_item +'</div>' +
							'</div>' +

							// 督導人員
							'<div class="row">'+
								'<label class="col-md-2">'+ _supervisor +'</label>' +
								'<div class="col-md-10">'+ event.war_name +'</div>' +
							'</div>' +

							// 打卡距離
							'<div class="row form-group">'+
								'<label class="col-md-2">'+ _checkin_distance +'</label>' +
								'<div class="row col-md-10">'+
									'<div class="col-md-2">'+
										checkin_distance_txt +
									'</div>'+
									'<div class="col-md-8">'+
										'<input type="text" class="form-control" placeholder="'+ _checkin_note +'">' +
									'</div>'+
									'<div class="col-md-2">'+
										'<a href="#" class="btn btn-primary">'+ _save +'</a>' +
									'</div>' +
								'</div>' +
							'</div>' +

							// 電子簽名
							// '<div class="row case_detail">'+
							// 	'<label class="col-md-2">'+ _e_sign +'</label>' +
							// 	'<div class="col-md-10">'+ e_sing_link +'</div>' +
							// '</div>' +

							// 其它備註
							'<div class="row">'+
								'<label class="col-md-2">'+ _note +'</label>' +
								'<div class="row col-md-10">' +
									'<div class="col-md-10">'+
										'<textarea class="form-control" rows="3">'+ event.task_note +'</textarea>' +
									'</div>'+
									'<div class="col-md-2">'+
										'<a href="#" class="btn btn-primary">'+ _save +'</a>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>'+
						'<div class="modal-footer">'+
							'<div class="row">' +
								'<div class="col-md-12">' +
									'<a href="#" class="btn btn-default">'+ _editEvent +'</a>' +
									'<a href="#" class="btn btn-default miss">'+ _miss +'</a>' +
									'<a href="#" class="btn btn-default punch">'+ _punch +'</a>' +
									'<a href="#" class="btn btn-default nonarrival">'+ _nonarrival +'</a>' +
								'</div>' +
							'</div>' +
						'</div>');

						// missTask
						$miss.off('click');
						$body.off("click");

						// btn-punch
						$body.on("click",".punch", function(e){
							var $cont = confirm("您要補打卡 " + event.start.format("YYYY/MM/DD HH:mm") + '-' + event.end.format("HH:mm") + " ?");
							if($cont){
								$.fancybox.close();
								return false;
							}
						});

						// btn-nonarrival
						$body.on("click",".nonarrival", function(e){
							var $cont = confirm("請再次確認您要標註服務員未到 ? ");
							if($cont){
								$.fancybox.close();
								return false;
							}
						});

						// btn-missTask

						$body.on("click", ".miss", function() {
							var fancyContent = (
								'<div class="modal-header">' +
									'<h4 class="modal-title">'+ _miss +'</h4>' +
								'</div>' +
								'<div class="modal-body">' +
									// 長照案號
									'<div class="row">'+
										'<label class="col-md-2">'+ _lone_care +'</label>' +
										'<div class="col-md-10">'+ event.lone_care +'</div>' +
									'</div>' +

									// 任務名稱
									'<div class="row">'+
										'<label class="col-md-2">'+ _topicTask +'</label>' +
										'<div class="col-md-10">'+ event.case_name +'</div>' +
									'</div>' +
									
									// 電話 
									'<div class="row form-group">'+
										'<label class="col-md-2">'+ _case_phone +'</label>' +
										'<div class="col-md-10">'+ cp_item +'</div>' +
									'</div>' +

									// 緊急聯絡
									'<div class="row form-group">'+
										'<label class="col-md-2">'+ _eme_name +'</label>' +
										'<div class="col-md-10">'+ event.eme_name +'</div>' +
									'</div>' +

									// 聯絡電話
									'<div class="row">'+
										'<label class="col-md-2">'+ _eme_phone +'</label>' +
										'<div class="col-md-10">'+ event.eme_phone +'</div>' +
									'</div>' +

									// 服務人員
									'<div class="row">'+
										'<label class="col-md-2">'+ _attendant +'</label>' +
										'<div class="col-md-10">'+ event.wai_name +'</div>' +
									'</div>' +

									// 事件狀態
									'<div class="row">'+
										'<label class="col-md-2">'+ _miss_status +'</label>' +
										'<div class="col-md-10">'+
											'<select class="miss_status"></select>' +
										'</div>' +
									'</div>' +

									// 自付金額
									'<div class="row">'+
										'<label class="col-md-2">'+ _miss_pay +'</label>' +
										'<div class="col-md-10">'+
											'<input type="text" value="' + event.miss_pay +'">' +
										'</div>' +
									'</div>' +

									// 補助金額
									'<div class="row">'+
										'<label class="col-md-2">'+ _miss_subsidy +'</label>' +
										'<div class="col-md-10">'+
											'<input type="text" value="' + event.miss_subsidy +'">' +
										'</div>' +
									'</div>' +

									// 未遇備註
									'<div class="row">'+
										'<label class="col-md-2">'+ _miss_note +'</label>' +
										'<div class="col-md-10">'+
											'<textarea class="form-control" rows="3">'+ event.miss_note +'</textarea>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="modal-footer">'+
									'<div class="row">' +
										'<div class="col-md-6 text-left">' +
											'<a href="#" class="btn btn-default">'+ _continue +'</a>' +
										'</div>' +
										'<div class="col-md-6 text-right">' +
											'<a href="#" class="btn btn-primary">'+ _done +'</a>' +
										'</div>' +
									'</div>' +
								'</div>');
							$.fancybox({
								"minWidth": 600,
								"padding": 0,
								"closeBtn": false,
								"content": fancyContent
							});
							var select = $(".miss_status"),
								myobject = event.miss_status,
								option = '';
							for(index in myobject) {
								option +='<option>'+ myobject[index] +'</option>';
							};
							select.html(option);
						});
				} else {
					var fancyContent = (
						'<div class="modal-header">' +
							'<h4 class="modal-title">'+ _titleMeeting +'</h4>' +
						'</div>' +
						'<div class="modal-body">' +
							'<div class="row">'+
								'<label class="col-md-2">'+ _topicEvent +'</label>' +
								'<div class="col-md-10">'+ event.case_name +'</div>' +
							'</div>' +
							'<div class="row">'+
								'<label class="col-md-2">'+ _eventIssue +'</label>' +
								'<div class="col-md-10">'+ event.issue +'</div>' +
							'</div>' +
							'<div class="row">'+
								'<label class="col-md-2">'+ _location +'</label>' +
								'<div class="col-md-10">'+ event.eventLocation +'</div>' +
							'</div>' +
							'<div class="row">'+
								'<label class="col-md-2">'+ _timeStart +'</label>' +
								'<div class="col-md-10">'+ $start +'</div>' +
							'</div>' +
							'<div class="row">'+
								'<label class="col-md-2">'+ _timeEnd +'</label>' +
								'<div class="col-md-10">'+ $end +'</div>' +
							'</div>' +
							'<div class="row">'+
								'<label class="col-md-2">'+ _join +'</label>' +
								'<div class="col-md-10">'+ event.participants +'</div>' +
							'</div>' +
							'<div class="row">'+
								'<label class="col-md-2">'+ _note +'</label>' +
								'<div class="col-md-10">'+
									'<textarea class="form-control" rows="3">'+ event.task_note +'</textarea>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="modal-footer">'+
							'<div class="row">' +
								'<div class="col-md-6 text-left">' +
									'<a href="#" class="btn btn-default">'+ _editEvent +'</a>' +
								'</div>' +
								'<div class="col-md-6 text-right">' +
									'<a href="#" class="btn btn-primary">'+ _done +'</a>' +
								'</div>' +
							'</div>' +
						'</div>');
				};

				$.fancybox({
					"minWidth": 600,
					"padding": 0,
					"closeBtn": false,
					"content": fancyContent
				});
			},
			events: data_events
			
			//  ajax 介接用

			// events: function(start, end, timezone, callback) {
			// 	$.ajax({
			// 		url: "http://175.98.112.14:8000/api/calendar_out/list",
			// 		async: "false",
			// 		type: "post",
			// 		data: {
			// 			"start": moment(start._d).format("YYYY-MM-DD"),
			// 			"end": moment(end._d).format("YYYY-MM-DD")
			// 		},
			// 		success: function(data_events){
			// 			console.log(data_events);
			// 			callback(data_events);
			// 		},
			// 		error:function(xhr, ajaxOptions, thrownError){ 
			// 			console.log("error");
			// 		}
			// 	});
			// }
		}
		if(input_boolean!= undefined) {
			calendar_init.eventLimit  = input_boolean;
			calendar_init.defaultView = "month";      // 停留頁籤
			if (input_boolean2 != undefined) {
				calendar_init.eventRender = function(event, element) {
					var case_name = event.title;
					element.find(".fc-time").text( event.start.format("HH:mm") + " - " +  event.end.format("HH:mm"));
					element.find(".fc-content").append('<span class="fc-title">'+ event.case_name +'</span>');
				}
			}
		};
		$("#calendar").fullCalendar(calendar_init);
	},
	filterSlide: function(contWrap, contList) {
		var $cont         = $(contWrap),
			$fList        = $(contList),
			$fEvent       = $("#filterEvent"),
			$toolbar      = $(".fc-toolbar"),
			$btnAtt       = $("#btn-attendant"),
			$btnCase      = $("#btn-case"),
			$btnPV        = $(".fc-button-group:eq(0) button"),
			$btnMW        = $(".fc-button-group:eq(1) button"),
			$btnT         = $(".fc-today-button"),
			_attend       = "wrap-cont-attendant",
			_case         = "wrap-cont-case",
			_objContList1 = "#filterBox2",
			_objContList2 = "#filterBox4",
			_blur         = "itemblur",
			_conH         = $cont.outerHeight(),
			_defH         = 0,
			_speed        = 300;

		// 判斷物件外層是否為關閉狀態，依狀態收合內容
		if($cont.is(":hidden")) {
			// 打開比對區塊
			$cont.slideDown(_speed);
			$toolbar.stop().animate({"margin-bottom": _conH},_speed);
			$fEvent.addClass(_blur).find('input[type="checkbox"]').attr("disabled", true);
			$btnPV.addClass(_blur).attr("disabled", true);
			$btnMW.addClass(_blur).attr("disabled", true);
			$btnT.addClass(_blur).attr("disabled", true);
			if($cont.attr("class") === _attend){
				$btnCase.addClass(_blur).off("click");
			} else {
				$btnAtt.addClass(_blur).off("click");
			}
		} else {
			// 收合比對區塊
			$cont.slideUp(_speed);
			$toolbar.stop().animate({"margin-bottom": _defH},_speed);
			$fEvent.removeClass(_blur).find('input[type="checkbox"]').removeAttr("disabled");
			$btnPV.removeClass(_blur).removeAttr("disabled");
			$btnMW.removeClass(_blur).removeAttr("disabled");
			$btnT.removeClass(_blur).removeAttr("disabled");
			// 將開合按鈕狀態設置為致能
			if($cont.attr("class") === _attend){
				// 居服
				$btnCase.removeClass(_blur).on("click", function() {
					hcs_calendar.filterSlide("." + _case, _objContList2);
				});
			} else {
				// 個案
				$btnAtt.removeClass(_blur).on("click", function() {
					hcs_calendar.filterSlide("." + _attend, _objContList1);
				});
			};
		};
	},
	checkContAutoWidth: function() {
		$("#filterBox1,#filterBox2,#filterBox3,#filterBox4").width($("#calendar").width() - 1);
	},
	listContAutoWidth: function(autoObj) {
		var $obj   = $(autoObj).children(":eq(0)"),
			$item  = $obj.children(),
			$oneW  = $item.outerWidth(true),
			$allW  = $item.length * $oneW;

		$obj.width($allW);
	},
	todayTH: function() {
		var $index       = $(".ui-state-highlight").index(),
			$highlightTh = $(".ui-widget-header").find("th"),
			_cur         = "cur";

		if($index >= 0){
			$(".ui-widget-header").find("th").eq($index).addClass(_cur);
		}
	},
	filterEvent: function() {
		var $this   = $(this),
			$evnet  = $this.attr("id"),
			$fcMore = $(".fc-more"),
			$task   = "eventTask",
			$hide   = "eventHide";
		// 將符合取消勾選項目隱藏
		if($this.is(":checked")){
			// 隱藏
			$("." + $evnet).removeClass($hide);
			if($evnet === $task){
				$fcMore.removeClass($hide);
			}
		} else {
			// 顯示
			$("." + $evnet).addClass($hide);
			if($evnet === $task){
				$fcMore.addClass($hide);
			}

		}
	},
	filterUser: function(filterObj, listObj) {
		var $checked   = $(filterObj).find("input[type=checkbox]:checked"),
			$listbox   = $(listObj).children(":eq(0)"),
			$length    = $checked.length,
			$eventtask = $(".eventTask"),
			$c_head    = $(".fc-toolbar"),
			$btnAtt    = $("#btn-attendant"),
			$btnCase   = $("#btn-case"),
			$btnPV     = $(".fc-button-group:eq(0) button"),
			$btnMW     = $(".fc-button-group:eq(1) button"),
			$btnT      = $(".fc-today-button"),
			$hide      = "eventHide",
			_blur      = "itemblur",
			_maxStint  = 10,
			_speed     = 300,
			_listH     = 51,
			_maxNote   = "最多只能勾選比對10個人員",
			_minNote   = "目前無勾選比對人員",
			_filterbgc = ["f-bgc01","f-bgc02","f-bgc03","f-bgc04","f-bgc05","f-bgc06","f-bgc07","f-bgc08","f-bgc09","f-bgc10"];

		if ($length > 0 && $length <= _maxStint){
			var checkName = [],
				listName  = [];

			// 隱藏無勾選到事件
			$eventtask.addClass($hide);

			// 依序以勾選人員樣式名稱，取得需顯示事件樣式名稱
			$checked.each(function(){
				var $this = $(this);
				if ($this.is(":checked")){
					checkName.push($this.prop("className").substr(4));
					listName.push($this.next().text());
				};
			});

			// 依序將需顯示事件新增事件顏色
			for (var key in checkName){
				$("." + checkName[key]).addClass(_filterbgc[key]);
				$("." + checkName[key]).removeClass($hide);
			};

			// 清空勾選顯示列表內容後依序填入勾選者與相符事件顏色，並重整區塊寬度
			$listbox.empty();
			var list = [];
			for (var key2 in listName){
				list[key2] = '<li><div class="listDot '+ _filterbgc[key2] +'"></div>'+ listName[key2] +'</li>'
			}
			$listbox.html(list.join(''));
			hcs_calendar.listContAutoWidth(listObj);

			// 收合進行比對區塊，顯示比對結果並重整篩選區塊高度
			$(filterObj).slideUp(_speed).children().hide();
			$(listObj).slideDown(_speed);
			$c_head.stop().animate({"margin-bottom": _listH},_speed);

			// 將按鈕狀態設置為除能
			$btnAtt.off("click");
			$btnCase.off("click");
			$btnMW.addClass(_blur).attr("disabled", true);

			// 將按鈕狀態設置為致能
			$btnPV.removeClass(_blur).attr("disabled", false);
			$btnT.removeClass(_blur).attr("disabled", false);


		// 判斷勾選比數大小值
		} else if($length > _maxStint){
			alert(_maxNote);
		} else {
			alert(_minNote);
		};
	},
	filterClose: function(contWrap, contList) {
		var $cont         = $(contWrap),
			$fList        = $(contList),
			$toolbar      = $(".fc-toolbar"),
			$btnAtt       = $("#btn-attendant"),
			$btnCase      = $("#btn-case"),
			$fEvent       = $("#filterEvent"),
			$btnMW        = $(".fc-button-group:eq(1) button"),
			_attend       = ".wrap-cont-attendant",
			_case         = ".wrap-cont-case",
			_objContWrap1 = "#filterBox1", // 居服進行比對區塊
			_objContList1 = "#filterBox2", // 居服比對結果區塊
			_objContWrap2 = "#filterBox3", // 個案進行比對區塊
			_objContList2 = "#filterBox4", // 個案比對結果區塊
			_blur         = "itemblur",
			_conH         = $cont.outerHeight(),
			_defH         = 0,
			_speed        = 300;

		// 收合比對結果，還原比對區塊初始狀態
		$fList.slideUp(0);
		$fList.siblings().slideDown(0).children().show().find("input[type=checkbox]").prop("checked", false);
		$cont.slideUp(0);
		$toolbar.stop().animate({"margin-bottom": _defH},_speed);
		$fEvent.removeClass(_blur).find('input[type="checkbox"]').removeAttr("disabled");
		$btnMW.removeClass(_blur).removeAttr("disabled");

		// 將開合按鈕狀態設置為致能
		$btnAtt.removeClass(_blur).on("click", function() {
			hcs_calendar.filterSlide(_attend, _objContList1);
		});
		$btnCase.removeClass(_blur).on("click", function() {
			hcs_calendar.filterSlide(_case, _objContList2);
		});
	},
	runEvent: function() {
		var $checked_a        = $("#filterBox1"),
			$listbox_a        = $("#filterBox2"),
			$checked_c        = $("#filterBox3"),
			$listbox_c        = $("#filterBox4"),
			$btn_af_check     = $("#btn-af-check"),
			$btn_cf_check     = $("#btn-cf-check"),
			$highlight_length = $(".ui-state-highlight").length,
			$checked_a_length = $checked_a.find("input[type=checkbox]:checked").length,
			$checked_c_length = $checked_c.find("input[type=checkbox]:checked").length,
			_speed = 300;

		if($("#filterBox2").is(":visible") && $checked_a_length > 0){
			$("#btn-af-check").click();
		};
		if($listbox_c.is(":visible") && $checked_c_length > 0){
			$btn_cf_check.click();
		};
		if($highlight_length > 0){
			hcs_calendar.todayTH();
		};
	},
	loc_reload: function() {
		$('#calendar').fullCalendar('destroy');
		hcs_calendar.default_setting();
	}
};

// change_supervisor_popup
function change_supervisor_popup() {
	var $cont = $("#change_supervisor_box");
	$.fancybox({
		"minWidth": 600,
		"padding": 0,
		"closeBtn": false,
		'content': $cont
	});
}

// Dom Ready
$(function(){

	var $body                = $("body"),
		$btnAttendant        = $("#btn-attendant"),
		$btnCase             = $("#btn-case"),
		$wrapContAttendant   = $(".wrap-cont-attendant"),
		$wrapContCase        = $(".wrap-cont-case"),
		$btnAfCheck          = $("#btn-af-check"),
		$btnCfCheck          = $("#btn-cf-check"),
		$btnAfClose          = $("#btn-af-close"),
		$btnCfClose          = $("#btn-cf-close"),
		$filterEvent         = $("#filterEvent"),
		$exportExcel         = $("#exportExcel"),
		$filterEventCheckbox = $filterEvent.find('input[type="checkbox"]'),
		_wrapContAttendant   = ".wrap-cont-attendant",
		_wrapContCase        = ".wrap-cont-case",
		_objContWrap1        = "#filterBox1", // 居服進行比對區塊
		_objContList1        = "#filterBox2", // 居服比對結果區塊
		_objContWrap2        = "#filterBox3", // 個案進行比對區塊
		_objContList2        = "#filterBox4", // 個案比對結果區塊
		_defaultH            = 0,
		_speed               = 300;

	hcs_calendar.default_setting();
	hcs_calendar.checkContAutoWidth();

	// resize
	$(window).resize(hcs_calendar.checkContAutoWidth);

	// 行事暦 - prev
	$body.on("click",".fc-prev-button", function() {
		// 月
		if($(".fc-month-button").hasClass("ui-state-active") && $(_wrapContAttendant).is(":visible")) {
			hcs_calendar.filterUser(_objContWrap1, _objContList1);
		// 週
		} else {
			hcs_calendar.runEvent();
		}
	});

	// 行事暦 - next
	$body.on("click",".fc-next-button", function() {
		// 月
		if($(".fc-month-button").hasClass("ui-state-active") && $(_wrapContAttendant).is(":visible")) {
			hcs_calendar.filterUser(_objContWrap1, _objContList1);
		// 週
		} else {
			hcs_calendar.runEvent();
		}
	});

	// 行事暦 - 週
	$body.on("click", ".fc-agendaWeek-button", function() {
		$("#btn-case").show().removeClass("month itemblur").on("click");
		$filterEvent.removeClass("month");
	});

	// 行事暦 - 月
	$body.on("click",".fc-month-button", function() {
		var $checkbox = $filterEvent.find('input[type="checkbox"]'),
			$checkedLength = $filterEvent.find('input[type="checkbox"]:checked').length,
			$checkboxLength = $checkbox.length;

		$(".fc-toolbar").stop().animate({"margin-bottom": _defaultH});
		// $btnAttendant.hide();
		$("#btn-case").hide();

		// 居服、個案進行比對內容頁面關閉
		$wrapContAttendant.slideUp(_speed);
		$wrapContCase.slideUp(_speed);

		$btnCase.addClass("month");
		$filterEvent.addClass("month");

		if($checkedLength < $checkboxLength){
			$checkbox.not(':checked').click();
		}
		hcs_calendar.todayTH();
	});

	// 行事暦 - 今天
	$('.fc-today-button').on("click", hcs_calendar.todayTH);

	// 任務 & 會議 / 職訓 篩選
	$filterEventCheckbox.on("click", hcs_calendar.filterEvent);

	// 個案比對 - 收合
	$btnCase.on("click", function() {
		hcs_calendar.filterSlide(_wrapContCase, _objContList2);
	});

	// 個案比對 > 進行比對 - 確定
	$btnCfCheck.on("click", function() {
		hcs_calendar.filterUser(_objContWrap2, _objContList2);
	});

	// 個案比對 > 比對結果 - 關閉
	$btnCfClose.on("click", function() {
		hcs_calendar.filterClose(_wrapContCase, _objContList2);
		hcs_calendar.loc_reload();
		$filterEvent.find('input[type="checkbox"]').prop("checked", true);
	});

	// 居服員比對 - 收合
	$btnAttendant.on("click", function() {
		hcs_calendar.filterSlide(_wrapContAttendant, _objContList1);
	});

	// 居服員比對 > 進行比對 - 確定
	$btnAfCheck.on("click", function() {
		// 月
		if($(".fc-month-button").hasClass("ui-state-active")) {
			hcs_calendar.filterUser(_objContWrap1, _objContList1);
			var _checked = $("#filterBox1").find('input[type="checkbox"]:checked').length;
			// 比對項目符合則變更月暦基本設定
			if(_checked >= 1 && _checked <= 10) {
				$('#calendar').fullCalendar('destroy');
				hcs_calendar.default_setting(false, true);
				hcs_calendar.filterUser(_objContWrap1, _objContList1);
				$exportExcel.show();

				// total_table
				$("#c_total_tb").addClass("cur");
			}
		// 週
		} else {
			hcs_calendar.filterUser(_objContWrap1, _objContList1);
		}
	});

	// 居服員比對 > 比對結果 - 關閉
	$btnAfClose.on("click", function() {
		hcs_calendar.filterClose(_wrapContAttendant, _objContList1);
		$filterEvent.find('input[type="checkbox"]').prop("checked", true);
		// 月
		if($(".fc-month-button").hasClass("ui-state-active")) {
			$('#calendar').fullCalendar('destroy');
			hcs_calendar.default_setting(true);
			$exportExcel.hide();

			// total_table
			$("#c_total_tb").removeClass("cur");

		// 週
		} else {
			hcs_calendar.loc_reload();
		}
	});
});

// Window load
$(window).load(function(){
	if($(".fc-today-button").prop("disabled")) {
		hcs_calendar.todayTH();
	}
	
});

// 串接datatable ajax用
$(function(){

	$(".datatables_list").DataTable({
		'bLengthChange': false,
		'bInfo': false,
		'order': [[ 3, "desc" ]],
		'oLanguage': {
			'sProcessing': '資料處理中，敬請耐心等待!',
			'sLengthMenu': '顯示 _MENU_ 項結果',
			'sZeroRecords': '沒有匹配結果',
			'sInfo': '共 _TOTAL_ 筆資料。',
			'sInfoEmpty': '顯示第 0 至 0 項結果，共 0 項',
			'sInfoFiltered': '(從 _MAX_ 項結果過濾)',
			'sSearch': '搜索: ',
			'oPaginate': {
				'sFirst': '首頁',
				'sPrevious': '上頁',
				'sNext': '下頁',
				'sLast': '尾頁',
			},
		},
		"processing": true,
		"serverSide": true,

		// "deferRender": true,    // 延載 

		// "deferLoading": 10,     // 預載筆數
		// "bLengthChange": false, // 筆數切換

		// "sPaginationType": "full_numbers", // 完整頁數
		// "iDisplayLength": 10,   // 筆數	

		"ajax": {
			"type": "post",
			"url": "http://localhost:1337/api/capi/capi",
			"dataType": "jsonp",
			"async": "false",
			"data": {
				"case_val": "",
				"start_date": "",
				"finish_date": "",
				"serv_type": "",
				"area_num": ""
			},
			"dataSrc": function ( data ) {
				return data.data;
			},
		},
		"data": function(){
			var info = $('#datatables_list').DataTable().page.info();
		},
		"columns": [
			{
				"data": 'd0'
			},
			{
				"data": 'd1',
				render: function(data, type, row, meta){
					return '<a href="javascript:;">'+ data + '</div>'
				}
			},
			{"data": 'd2'},
			{"data": 'd3'},
			{
				"data": 'd4',
				render: function(data, type, row, meta){
					return '<span>' + data.start + ' ~ </span><br>' + '<span>' + data.end + '</span>'  
				}
			},
			{
				"data": 'd5'
			},
			{"data": 'd6'},
			{"data": 'd7'},
			{"data": 'd8'},
			{"data": 'd9'},
			{"data": 'd10'},
			{"data": 'd11'},
			{"data": 'd12'},
			{"data": 'd13'},
			{"data": 'd14'},
			{"data": 'd15'},
			{"data": 'd16'},
			{"data": 'd17'},
		],

	});

});


// 設定國定假日用
$(function(){

	// 匯入已設定假日
	var holiday_import = {
		datas : [
			[ "2016-01-01", "holiday" , "春節"],
			[ "2016-06-08", "holiday" , "國定假日"],
			[ "2016-07-12", "holiday" , "0712假日"],
			[ "2016-06-22", "weekday" , "工作日"],
			[ "2016-08-22", "holiday" , "01假日"],
		],
		datas_import : function (import_datas){

			$.each(import_datas, function( key ) {
				
				var _date = 0, _type = 1, _name = 2;

				switch (import_datas[key][_type]) {

					case "holiday":
						$(".rc-Day[data^="+ import_datas[key][_date] + "]").addClass("n_holiday").prop("title", import_datas[key][_name]);
						break;

					default:
						break;
				}
			});
		}
	};

	// 將非當年份日期新增反灰樣式
	function re_added_class(input_year){
		$("div[data^="+ input_year + "]").addClass("rc-Day--outside");
	};

	// 本年度周期性假日設定
	$("#btn_filter_weeks_holiday").click(function() {

		var $daytype     = $("#holiday_type").find("option:selected").val(),
			$weekdays    = $(".rc-Week-days"),
			$chose_weeks = $("#filter_weeks_holiday").find("input[type='checkbox']:checked"),
			$weeks_array = [];

		$weekdays.each(function(index) {

			$chose_weeks.each(function() {

				// 選取所有日期欄 (排除非當年度日期欄)
				var $checked_col = $weekdays.eq(index).find(".rc-Day").eq($(this).val()).not(".rc-Day--outside");

				// 依日期類別新增、移除當日樣式
				$daytype == "holiday" ? $checked_col.addClass("n_holiday") : $checked_col.removeClass("n_holiday");

				// 該欄位樣式為當月，則依序回傳所選週期資料[日期, 類別, 名稱]
				var $checked_weeks_array = [$checked_col.attr("data"), $daytype, ""];
				$checked_col.attr("data") != undefined ? $weeks_array.push($checked_weeks_array) : null;
				
			});
		});

		// 取得假日資料
		console.log($weeks_array);

	});

	// 單次假日設定
	$(".rc-Day").click(function(){
		
		var $dialog  = $("#holiday_dialog_days"),
			$d_radio = $dialog.find("input[type=radio]"),
			$d_input = $dialog.find("input[name=holiday_names]"),
			$d_title = $dialog.find(".modal-body h5>span"),
			$this    = $(this),
			$title   = $this.attr("title");

		// dialog 小標題動態日期
		$d_title.text($this.attr("data"));

		// 假日名稱輸入欄預設值
		$d_input.val($title);

		// 依該欄位假日類別，更改 dialog radio 值
		$this.hasClass("n_holiday") ? $d_radio.eq(1).prop("checked", true) : $d_radio.eq(0).prop("checked", true);

		// 該欄位樣式為當月，即補上 dialog attribute
		if ($this.hasClass("rc-Day--outside") == false) {
			$this.attr({"data-toggle":"modal", "data-target":"#holiday_dialog_days"});}

		// 給 dialog 儲存鈕指定樣式用
		$click_today = $this;
	});

	// 單次假日設定 - 泡泡儲存鈕
	$("#btn_holiday_dialog_days").click(function(){
		var $dialog            = $("#holiday_dialog_days"),
			$daytype           = $dialog.find("input[type=radio]:checked").parent().index(),
			$checked_holiday   = $dialog.find("input[type=radio]:eq(1)").prop("checked"),
			$holiday_names     = $dialog.find("input[name=holiday_names]").val(),
			$holiday_day_array = [];

		// 依欄位假日類別，更改樣式及tooltip
		$checked_holiday ? $click_today.addClass("n_holiday").attr("title", $holiday_names) : $click_today.removeClass("n_holiday").attr("title", "");

		// 該欄位樣式為當月，則依序回傳所選週期資料[日期, 類別, 名稱]
		$holiday_day_array.push($click_today.attr("data"), $daytype === 0 ? "weekday" : "holiday" , $checked_holiday ? $holiday_names : "");

		// 關閉 dialog 並設置為除能
		$dialog.modal('hide');
		$(".rc-Day").removeAttr("data-toggle", "data-target");

		// 取得假日資料
		console.log($holiday_day_array);
	});

	// 載入完成
	$(window).load(function(){
		holiday_import.datas_import(holiday_import.datas);
	});

	// 系統設定 / 評鑑訪問 / 新增問卷
	// 第一層題型
	$("#questions_sortable").sortable({
		handle: ".handle",
		// revert: 'invalid',
		placeholder: "span2 well placeholder tile",
		start: function(e, ui) {
			ui.placeholder.height(ui.item.height());
		}
	});

	// 第二層題目元件
	$(".questions_sortable_child").sortable({
		items: ".qs-child-item",
		placeholder: "ui-state-highlight",
		start: function(e, ui) {
			ui.placeholder.height(ui.item.height());
		}
	});

	// 新增radio元件
	$("body").on("click",".qs-added-radio-item",function(){
		var _item_len = $(this).parents(".questions_sortable_child").find(".qs-child-item").length,
			_item_del = "";

		if(_item_len > 1){
			_item_del = '<i class="col-md-1 fa fa-close fa-2x text-right text-muted"></i>'
		}

		var _radio = 
		'<div class="row form-group qs-child-item">' +
			'<i class="col-md-1 fa fa-bars fa-2x text-muted"></i>' +
			'<div class="col-md-10">'+
				'<div class="input-group">' +
					'<span class="input-group-addon">' +
						'<input type="radio" class="qs-component">' +
					'</span>' +
					'<input type="text" class="form-control" placeholder="選項文字">' +
				'</div>' +
			'</div>' +
			_item_del +
		'</div>';
		$(this).parents(".questions_sortable_child>div>div").before(_radio);
		$(this).parents(".qs-type").find(".qs-component").attr("name", $(this).parents(".qs-type").parent().attr("class"));
	});

	// 新增checkbox元件
	$("body").on("click",".qs-added-checkbox-item",function(){

		var _item_len = $(this).parents(".questions_sortable_child").find(".qs-child-item").length,
			_item_del = "";

		if(_item_len > 1){
			_item_del = '<i class="col-md-1 fa fa-close fa-2x text-right text-muted"></i>'
		}

		var _checkbox = 
		'<div class="row form-group qs-child-item">' +
			'<i class="col-md-1 fa fa-bars fa-2x text-muted"></i>' +
			'<div class="col-md-10">'+
				'<div class="input-group">' +
					'<span class="input-group-addon">' +
						'<input type="checkbox" class="qs-component">' +
					'</span>' +
					'<input type="text" class="form-control" placeholder="選項文字">' +
				'</div>' +
			'</div>' +
			_item_del +
		'</div>';
		$(this).parents(".questions_sortable_child>div>div").before(_checkbox);
		$(this).parents(".qs-type").find(".qs-component").attr("name", $(this).parents(".qs-type").parent().attr("class"));
	});

	// 新增說明元件
	$("body").on("click",".qs-added-child-text",function(){
		var _textarea = 
		'<div class="row form-group qs-child-item">' +
			'<i class="col-md-1 fa fa-bars fa-2x text-muted"></i>' +
			'<label class="col-md-10">'+
				'<textarea class="form-control" rows="1" placeholder="說明文字輸入框"></textarea>' +
			'</label>' +
			'<i class="col-md-1 fa fa-close fa-2x text-right text-muted"></i>' +
		'</div>';
		$(this).parents(".questions_sortable_child>div>div").before(_textarea);
	});

	// 刪除題目元件
	$("body").on("click",".qs-child-item .fa-close",function(){
		$(this).parents(".qs-child-item").remove();
	});

	// 刪除題型
	$("body").on("click",".qs-type-del", function(){
		$(this).parents(".qs-type").remove();
	});

	// 新增題型
	$("#btn-add-qs-type").click(function(){

		var $type = $("#add-qs-type").val(),
			$tmp_class = "qs" + Math.floor(Math.random() * 100001),
			$tmp_name  = $("#questions_example").find(".qs-component").attr("name", $tmp_class);
			$html = $("#questions_example").find('div[data-type="'+ $type + '"]').addClass($tmp_class).clone();


		$("#questions_example>div").removeClass();
		$("#questions_sortable").append($html);

		if($type == "qs-type-3" || $type == "qs-type-4") {
			$(".questions_sortable_child").sortable({
				items: ".qs-child-item",
				placeholder: "ui-state-highlight",
				start: function(e, ui) {
					ui.placeholder.height(ui.item.height());
				}
			});			
		}
		if($type == "qs-type-5"){
			$(".datepicker").datepicker({
				format: 'yyyy-mm-dd'
			});
		}
		if($type == "qs-type-6"){
			$('.timepicker').datetimepicker({
				format: 'LT'
			})
		}
	});

	// 題目必填
	$("body").on("click",".qs-required",function(){

		var _t_wrap   = $(this).parents("div[data-type]")
			_type     = _t_wrap.data("type"),
			_checkbox = _t_wrap.find("input[type='checkbox']"),
			_textarea = _t_wrap.find("textarea");

		if($(this).prop("checked")){
			_textarea.prop("required", true);
			if(_type == "qs-type-4"){
				_checkbox.prop("required", true);
			}
		} else {
			_textarea.prop("required", false);
			if(_type == "qs-type-4"){
				_checkbox.prop("required", false);
			}
		}

	});
	
	// 行事曆表頭 blur-easing
	$(".main").scroll(function(){
		var $scrollTop = $(this).scrollTop(),
			opacityVal = ($scrollTop / 72),
			max_blur = 2.3;
		if(opacityVal < max_blur){
			$(".blur-easing").css({
				'filter': 'blur('+ opacityVal +'px)',
				'-webkit-filter': 'blur('+ opacityVal +'px)',
				'-moz-filter': 'blur('+ opacityVal +'px)',
				'-o-filter': 'blur('+ opacityVal +'px)',
				'-ms-filter': 'blur('+ opacityVal +'px)'		
			});
		}
	});

});