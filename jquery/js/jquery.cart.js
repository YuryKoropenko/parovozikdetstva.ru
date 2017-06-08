$(document).ready(function(){
	$(".cart_form.to_cart").submit(function() {
		var url = "/?mod=products_cart&ajax"; // the script where you handle the form input.
		var product = $(this).closest('article');
		$.ajax({
			type: "POST",
			url: url,
			data: $(this).serialize(), // serializes the form's elements.
			success: function(data)
			{
				$('#short_cart_total_price').text(data['total_price']);
				$('#short_cart_total_count').text(data['total_count']);
				if (data['total_count'] > 0) {
					$('.cart .cart_full').show();
					$('.cart .cart_empty').hide();
				} else {
					$('.cart .cart_full').hide();
					$('.cart .cart_empty').show();
				}
				product.append('<div id="okay_message" style="opacity:0;">Товар добавлен в корзину</div>');
				//product.animate({backgroundColor:'#29166F'}, 300).delay(2000).animate({backgroundColor:'#fff'}, 300);
				$('.cart').animate({color:'#29166F'}, 300).animate({color:'#fff'}, 300);
				$('#okay_message').animate({opacity:1},300).delay(2000).animate({opacity:0},300,function(){$(this).remove()});
			}
		});
		return false; // avoid to execute the actual submit of the form.
	});
	if ($(".cart_form.inside_cart .submit").length > 0) {
		
		function send_single_form(){
			if ($(".cart_form.inside_cart.to_update").length == 0) {
				location.reload();
			} else  {
				var url = "/?mod=products_cart&ajax";
				var current=$(".cart_form.inside_cart.to_update").first();
				current.removeClass('to_update'); 
				$.ajax({
					type: "POST",
					url: url,
					data: current.serialize(), // serializes the form's elements.
					success: function(data)
					{
						send_single_form();
					}
				});
			}
		}
		
		$(".cart_form.inside_cart").change(function() {
			$(this).addClass('to_update');
		});
		$(".cart_form.inside_cart .submit").hide();
		$(".liketable.cart .cart_total").after('<div class="master_submit"><form class="cart_form" id="master_submit"><input class="submit button" type="submit" value="Пересчитать"></form></div>');
		$("#master_submit").submit(function() {
			$("#master_submit .submit").prop('value','Подождите...').prop( "disabled", true );
			send_single_form()
			return false;
		});
	}
});