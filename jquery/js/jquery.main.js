jQuery(document).ready(function($){
	if ($('.bxslider').length>0){
		$('.bxslider').bxSlider({
			slideWidth: 513,
			moveSlides: 1,
			auto: true,
			pause: 3000
		});
	}
	if ($('.suggest-slider').length>0){
		$('.suggest-slider').bxSlider({
			slideWidth: 145,
			minSlides: 4,
			maxSlides: 4,
			slideMargin: 10,
			pager: false,
			moveSlides: 1
		});
	}
	if ($('.recently-slider').length>0){
		$('.recently-slider').bxSlider({
			slideWidth: 145,
			minSlides: 4,
			maxSlides: 4,
			slideMargin: 10,
			pager: false,
			moveSlides: 1
		});
	}
	if ($('.photo-slider').length>0){
		$('.photo-slider img').first().one("load", function() {
			$('.photo-slider').bxSlider({
				slideWidth: 402,
				pagerCustom: '.photo-slider-pager',
			});
		}).each(function() {
			if(this.complete) $(this).load();
		});
	}
	/*if ($('.gallery').length>0){
		$('.gallery').bxSlider({
			pager: false,
		});
	}*/
	if ($('.easyzoom').length) {
		var $easyzoom = $('.easyzoom').easyZoom();
	}
	
	$('#call_me, .call_me_reguest').click(function(){
		if ($('#callback_form form').length > 0) {
			$.colorbox({html:$('#callback_form').html(), height:255, width: 241, open: true});
			if ($(this).data('product-id')) {
				$('#cboxContent h3').text('Заказать товар «'+$(this).data('product-name')+'»');
				$('#cboxContent form .Topic').val('Заказ товара «'+$(this).data('product-name')+'»');
				$('#cboxContent form .Message').val('Заказ отсутствующего товара «'+$(this).data('product-name')+"»\r\n Cсылка: http://bum76.ru/products/"+$(this).data('product-id')+"/");
			}
			$('#cboxContent form').submit(function(e){
				$.ajax({
					type: "GET",
					url: '/',
					data: $("#cboxContent form").serialize()+'&print=1&utf8=1', // serializes the form's elements.
					success: function(data)
					{
						if (data.indexOf('Неправильно введен защитный код!') >= 0){
							alert('Неправильно введен защитный код!');
							return;
						}
						if (data.indexOf('Ваше сообщение отправлено') >= 0){
							$.colorbox.close();
							alert('Ваше сообщение отправлено, вам перезвонят.');
							return;
						}
						alert('Не удалось отправить сообщение, попробуйте еще раз позднее.');
					}
				});
				return false;
			});
		}
		return false;
	});
	if ($('input.count').length > 0) {
		$('input.count').wrap('<div class="plusminus"></div>');
		$('.plusminus').prepend('<a class="minus button" href="#">-</a>');
		$('.plusminus').append('<a class="plus button" href="#">+</a>');
		$('a.plus').click(function(){
			var count_input = $(this).parent().find('input.count');
			count_input.val(parseInt(count_input.val())+1); 
			count_input.change();
			return false;
		});
		$('a.minus').click(function(){
			var count_input = $(this).parent().find('input.count');
			count_input.val(parseInt(count_input.val())-1); 
			count_input.change();
			return false;
		});
	}
		$('.pager').hide();
		$('.mainbar').jscroll({
			loadingHtml: '<div style="text-align: center;"><img src="/files/spinner.gif" alt="Загрузка" /></div>',
			nextSelector: 'a.nextpage',
			contentSelector: '.mainbar .pager,.mainbar .catalog',
			autoTrigger: true,
			debug: true,
			callback: function(){
				$(this).find('.pager').hide();
			}
		});
});