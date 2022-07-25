
(function($) {
	$.fn.inputFilter = function(inputFilter) {
		return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
			if (inputFilter(this.value)) {
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			} else if (this.hasOwnProperty("oldValue")) {
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			}
		});
	};
}(jQuery));


$(document).ready(function() {

	$('.multichoice-subscription-type').on('change', function(){
		let v = $(this).val();
		$('#renewList, #upgradeList').css({'display' : 'none'});
		if( v === 'true' ){
			$('#renewList').css({'display' : 'block'});
		}else{
			$('#upgradeList').css({'display' : 'block'});
		}
	});

	$('.getAddonBouquet').on('click', function(){
		let _this = $(this); let code = _this.data('code'); let type = _this.data('servicetype');
		_this.html(`<i class="fas fa-spin fa-spinner"></i> Please wait`);
		$.get( `${base_url}ajax/fetchAddon/?code=${code}&type=${type}`)
			.done(function( response ) {
				console.log( response );
				// load_template( p_val );
				// let count = response.message.length;
				// $('#data-network').append(`<option value="" selected>-- Select Network --</option>`);
				// for( let i = 0; i < count; i++ ){
				// 	$('#data-network').append(`<option &value="${response.message[i].id}" data-percent="${response.message[i].discount}" data-validity="${response.message[i].message}">${response.message[i].title}</option>`);
				// }
			});
	});

	$('#product').on('change', function(){
		$('#data-network').empty();
		$('#inner-div').css({'display': 'none'});
		let p_val = $(this).val();
		if( p_val ){
			// get the network
			$.get( `${base_url}ajax/fetch_networks`, { "product_id": p_val } )
				.done(function( response ) {
					load_template( p_val );
					let count = response.message.length;
					$('#data-network').append(`<option value="" selected>-- Select Network --</option>`);
					for( let i = 0; i < count; i++ ){
						$('#data-network').append(`<option value="${response.message[i].id}" data-percent="${response.message[i].discount}" data-validity="${response.message[i].message}">${response.message[i].title}</option>`);
					}
				});
		}
	});

	function load_template( product_id ){

		$('#inner-div').html();
		let template = '';
		$('#inner-div').css({'display': 'block'});
		if( product_id === '1' ){
			template = `<div class="form-group y-scroll"><label for="data">Please select the data plan you want to buy</label>
\t\t\t\t\t\t\t\t\t\t\t\t<table class="table data-table table-striped table-hover table-bordered" style="font-size: 13px;">
\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody class="data-body">
\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>
\t\t\t\t\t\t\t\t\t\t\t\t</table>
\t\t\t\t\t\t\t\t\t\t\t</div>`;
		}else{
			template = `<div class="form-group">
\t\t\t\t\t\t\t\t\t\t\t\t<label for="amount">Amount</label>
\t\t\t\t\t\t\t\t\t\t\t\t<input type="number" name="amount" class="form-control number" required id="amount" placeholder="Amount" autocomplete="off"/>
\t\t\t\t\t\t\t\t\t\t\t</div>`;
		}
		$('#inner-div').html( template );
	}

	$('.quick-buy').on('click', function(e){
		e.preventDefault();
		let _btn = $(this);
		let phone = $('#recipent').val();
		let plan_id = $("input[name='plan']:checked").val();
		let product_id = $('#product').val();
		let email = $('#email').val();
		let amount = ( product_id === 1 ) ? $("input[name='plan']:checked").data('amount') : $('#amount').val();
		amount = parseInt( amount );
		product_id = parseInt( product_id );
		let network_id = ( product_id === 1 ) ? $('#data-network').val() : $('#network').val();
		console.log( network_id, product_id);
		if( !network_id ){
			sweet_alert('Error', 'You must select the network (MTN, Airtel, Glo or 9mobile) before proceeding', 'error');
			_btn.prop('disabled', false); return false;
		}
		if( product_id === 1 && (plan_id === 'undefined' || plan_id == null ) ){
			sweet_alert('Error', 'Please select a data plan before proceeding', 'error');
			_btn.prop('disabled', false); return false;
		}else if( product_id === 2 ){
			if( amount < 100  ){
				sweet_alert('Error', 'Amount can not be empty or less than N100', 'error');
				_btn.prop('disabled', false); return false;
			}
		}
		if( !phone ){
			sweet_alert('Error', 'The phone number is required, please enter the phone number you are buying to.', 'error');
			_btn.prop('disabled', false); return false;
		}

		if( !email ){
			sweet_alert('Error', 'The Email is required, please enter a valid email ID.', 'error');
			_btn.prop('disabled', false); return false;
		}
		const data = { product_id, phone,email, amount, plan_id, network_id };

		swal({
			title :'Confirm?',
			text : 'Please press "Ok" to confirm that your data are correct.',
			icon: 'warning',
			buttons : true,
			dangerMode: true,
		}).then(( isConfirmed) => {
			if( isConfirmed ){
				toastr.info("Confirming your orders, please wait...");
				_btn.text('Processing... Please wait.');
				let ref = Math.floor(Date.now() / 1000);
				data['ref'] = ref;
				// if( payment_method === 3 ){
					toastr.success("You will be redirected to payment page, please do not refresh page...");
					$.ajax({
						url : base_url + 'home/paystack_payment/',
						method : "POST",
						cache: false,
						data : data,
						success: function (response) {
							if( response.status === 'success' ){
								window.location = response.message;
							}else{
								sweet_alert('Error!', response.message, response.status );
							}
						},
						error : function (response) {
							console.log(response.responseText);
						}
					});
					// buyWithPaystack( data );
				// }

				// else{
				// 	$.ajax({
				// 		url : base_url + 'ajax/quickBuyWallet/',
				// 		method : "POST",
				// 		cache: false,
				// 		data : data,
				// 		success: function (response) {
				// 			if( response.status === 'success' ){
				// 				sweet_alert('Success!', response.message, response.status );
				// 			}else{
				// 				sweet_alert('Error!', response.message, response.status );
				// 			}
				// 			$('.swal-button--confirm').on('click', function () {
				// 				window.location = window.location.href;
				// 			});
				// 		},
				// 		error : function (response) {
				// 			console.log(response.responseText);
				// 		}
				// 	})
				// }
			}
		}).catch( ( error) =>{
			sweet_alert('Error', 'There was an error ' + error , 'error');
		});
	});

	$('.submit-btn').on('click', function () {
		$(this).text('Processing ... Please wait.');
		setTimeout(function () {
			$('#tv-subscription-form').submit();
		}, 500);
	});


	$('#airtime-network, .bills-option').on('change', function(){
		let _this = $(this);
		let icon_url = _this.find(':selected').data('icon-url');
		$('#service-img').attr('src', icon_url);
		let percent = parseFloat(_this.find(':selected').data('percent'));
		let text = " Select a network provider.";
		if( percent ){
			text = ' You receive ' + percent +'% discount for this network.';
		}
		if( percent === 0 ){
			text = ' Become a reseller to get high commission on this service';
		}
		$('.alert-notification').html(`<div class="alert alert-success"><h5><i class="fas fa-info-circle"></i>${text}</h5></div>`);
	});

	$('.airtime-proceed').on('click', function(e){
		e.preventDefault();
		let _btn = $(this);
		$(this).prop('disabled', true);
		let amount = $('#amount').val();
		let network = $('#airtime-network').val();
		let recipent = $('#phone').val();
		let renew = $('#auto-renew').val();
		let ported = $('#ported').is(':checked');

		if( amount === '' || amount < 10 ){
			sweet_alert('Error', 'Sorry amount can not be less than N100', 'error');
			_btn.prop('disabled', false);
			return false;
		}

		if( recipent === '' ){
			sweet_alert('Error', 'Please fill in the phone number', 'error');
			_btn.prop('disabled', false);
			return false;
		}
		if( network === '' ){
			sweet_alert('Error', 'You need to select a network', 'error');
			_btn.prop('disabled', false);
			return false;
		}
		swal({
			title :'Confirm?',
			text : 'Please press "Ok" to confirm that your data are correct.',
			icon: 'warning',
			buttons : true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				// check balance
				setTimeout(function () {
					$.get( `${base_url}ajax/check_balance`, { amount })
						.done(function( r ) {
							if( r.status === 'success' ){
								$.ajax({
									url : base_url + 'ajax/buy_airtime/',
									method: "POST",
									cache : false,
									data: {amount, network, recipent, ported, renew},
									success : function(response){
										if( response.status === 'success' ){
											sweet_alert('Success', response.message, 'success', false);
											$('.swal-button--confirm').on('click', function () {
												window.location = window.location.href;
											})
										}else{
											sweet_alert('Error', response.message, 'error', false);
											_btn.prop('disabled', false);
										}
									},
									error : function(response){
										sweet_alert('Error', 'There was an error with the transaction, please contact us if debited', 'error');
										_btn.prop('disabled', false);
										console.log( response );
									}
								});
							}else{
								sweet_alert('Error', "An error occur, contact support, or try again", 'error', false);
								$('.swal-button--confirm').on('click', function () {
									window.location = window.location.href;
								})
							}
						});
				}, 5);
			}
		});
	});

	$('#data-network').on('change', function () {
		$('.data-btn').removeClass('proceed-btn').prop('disabled', true);
		// $('.data-btn').prop('disabled', true);
		let _this = $(this);
		let _data_notif = $('.data-notification');
		let icon_url = _this.find(':selected').data('icon-url');

		let service_message = _this.find(':selected').data('validity');
		$('#service-img').attr('src', icon_url);
		$('.data-body').empty();

		let sid = _this.val();
		if( sid !== '' ){
			_data_notif.html(`<div class="alert alert-success"><h5><i class="fas fa-spin fa-spinner"></i> Loading data network...</h5></div>`);
			let data_list = ``;
			setTimeout(function () {
				$.get( `${base_url}ajax/fetch_plans`, { "service_id": sid } )
					.done(function( response ) {
						_data_notif.html('');
						$.each(response.message, function ( key, value ) {
							data_list += `<tr><td align="center"><input title="Select ${value.name} for ${format_currency(value.amount)}" type="radio" name="plan" value="${value.id}" data-amount="${value.amount}" required></td><td>${value.name}</td><td>${format_currency(value.amount)}</td></tr>`
						});
						$('.data-body').append(data_list);
					});
			}, 500);
			$('.data-btn').prop('disabled', false);
			$('.data-btn').addClass('proceed-btn');
			$('#inner-div').css('display', 'block');
		}else{
			$('#inner-div').css('display', 'nonepayment-method');
			_data_notif.html(`<div class="alert alert-success"><h5><i class="fas fa-info"></i> Please select data network before proceeding...</h5></div>`);
		}
	});

	$('.proceed-btn').on('click', function(e){
		e.preventDefault();
		$(this).prop('disabled', true);
		let _btn = $(this);
		let plan_id = $("input[name='plan']:checked").val();
		let network = $('#data-network').val();
		let recipent = $('#phone').val();
		let ported = $('#ported').is(':checked');
		let renew = $('#auto-renew').val();

		if( recipent === '') {
			_btn.prop('disabled', false);
			sweet_alert('Error', 'Phone Number field can not be empty', 'error');
			return false;
		}
		if( plan_id === ''){
			_btn.prop('disabled', false);
			sweet_alert('Error', 'Please select a data plan', 'error');
			return false;
		}

		_btn.text('Processing, please wait...');
		swal({
			title :'Confirm?',
			text : 'Please press "Ok" to confirm that your data are correct.',
			icon: 'warning',
			buttons : true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {

				_btn.prop('disabled', true);
				$.ajax({
					url : base_url + 'ajax/data_purchase/',
					method: "POST",
					cache: false,
					data: {network, plan_id, recipent,ported, renew},
					success : function(response){
						if( response.status === 'success' ){
							sweet_alert('Success', response.message, 'success', false);
							$('.swal-button--confirm').on('click', function () {
								window.location = window.location.href;
							})
						}else{
							sweet_alert('Error', response.message, 'error', false);
							_btn.prop('disabled', false);
						}
					}
				});
			}
			$(this).prop('disabled', false);
		});

	});



	$('#electricity-network').on('change', function () {
		let _this = $(this);
		let icon_url = _this.find(':selected').data('icon-url');
		$('#service-img').attr('src', icon_url);
		$('#endpoint_id').val( _this.data('endpoint'));
		$('#validate_id').val( _this.data('validate'));
		$('.verify-notification').css('display', 'none');
	});

	$('.verify-electricity').on('click', function () {
		let number = $('#number').val();
		let verify_notif = $('.verify-notification');
		if( number !== '' ){
			setTimeout(function () {
				verify_notif.html(`<div class="alert alert-success"><h5><i class="fas fa-spin fa-spinner"></i> Please wait... Verifying your Meter number.</h5></div>`);

				$('.verify-electricity , .verify-notification').css('display', 'none');
				$('#electricity_form').submit();
			}, 2000);
		}else{
			verify_notif.html(`<div class="alert alert-danger"><h5><i class="fas fa-info"></i> Please enter valid meter number.</h5></div>`);
			$('#number').focus();
		}
	});

	$('#tv-network').on('change', function () {

		let _this = $(this);
		let icon_url = _this.find(':selected').data('icon-url');
		$('#service-img').attr('src', icon_url);
		let sid = _this.val();
		$('.data-body').empty();
		let _selected = _this.find(':selected').data('network-name');
		if( _selected === 'startimes' ){
			$('#startime_amount_block').css({'display': 'block'})
		}else{
			$('#startime_amount_block').css({'display': 'none'})
		}
		let data_list = ``;
		// setTimeout(function () {
		//     $.get( `${base_url}/ajax/fetch_plans`, { "service_id": sid } )
		//         .done(function( response ) {
		//             $.each(response.message, function ( key, value ) {
		//                 data_list += `<tr><td align="center"><input type="radio" name="plan" value="${value.id}" required></td><td>${value.name} </td><td>${format_currency(value.amount)}</td></tr>`
		//             });
		//             $('.data-body').append(data_list);
		//         });
		// }, 500);
	});

	$('.verify').on('click', function () {
		let number = $('#number').val();
		let verify_notif = $('.verify-notification');
		let sid = $('#tv-network').val();
		let network_name = $('#tv-network').find(':selected').data('network-name');
		$('#network_name').val(network_name);

		if( number !== '' || sid !== '' ){
			verify_notif.html(`<div class="alert alert-success"><h5><i class="fas fa-spin fa-spinner"></i> Please wait... Verifying your smart card number.</h5></div>`);
			setTimeout(function () {
				$('.verify, .verify-notification').css('display', 'none');
				$('#tv-subscription-form').submit();
			}, 500);

			verify_notif.html(`<div class="alert alert-success"><h5><i class="fas fa-spin fa-spinner"></i> Please wait... Verifying your smart card number.</h5></div>`);
		}else{
			verify_notif.html(`<div class="alert alert-danger"><h5><i class="fas fa-info"></i> Please select bill and enter valid smart card number.</h5></div>`);
			$('#number').focus();
		}
	});


	$('.fund-wallet').on('click', function(e){
		e.preventDefault();
		let _this = $(this);
		_this.prop('disabled', true);
		let amount = $('#amount').val();
		let payment_method = $('#payment-method').val();
		let bank = $('#bank').val();
		let notif = $('#notification');
		let page_type = $('#page_type').val();
		if( payment_method === '' ){
			notif.html(`<div class="alert alert-danger"><h5><i class="fas fa-info"></i> Please select a payment method to proceed.</h5></div>`);
			_this.prop('disabled', false);
			return false;
		}
		if( payment_method === '1' && amount < 1000 ){
			notif.html(`<div class="alert alert-danger"><h5><i class="fas fa-info"></i> You can't fund less than N100 using Bank Deposit / Transfer</h5></div>`);
			_this.prop('disabled', false);
			return false;
		}else if( amount < 100){
			notif.html(`<div class="alert alert-danger"><h5><i class="fas fa-info"></i> We can only process a transaction of N500 and above</h5></div>`);
			_this.prop('disabled', false);
			return false;
		}
		if( payment_method === '1' && bank === '' ){
			notif.html(`<div class="alert alert-danger"><h5><i class="fas fa-info"></i> Please select the bank you will be paying into.</h5></div>`);
			_this.prop('disabled', false);
			return false;
		}
		amount = parseInt(amount);
		payment_method = parseInt(payment_method);
		$.ajax({
			url : base_url + 'ajax/fund_wallet/',
			method : "POST",
			data : {
				'payment_method' : payment_method,
				'amount' : amount,
				'bank' : bank,
				'product_id' : ( page_type === 'reseller') ? 12 : 6
			},
			success: function (response) {
				if( response.status === 'success' ){
					if( payment_method === 1 ){
						sweet_alert('Info',
							`Please upload proof of payment after making payment for this transaction on the table below. Your transaction ID is ${response.message}`,
							'info', false);
						$('.swal-button--confirm').on('click', function () {
							window.location = base_url + "dashboard/payment_made/?tid="+response.message;
						});
					}else if( payment_method === 3){
						let charge = 0;
						if( amount < 2500 ){
							charge = (1.55 / 100 ) * amount;
						}else if( amount >=  2500 ){
							charge = ((1.55 / 100) * amount ) + 100;
						}
						amount = (amount + parseFloat(charge));
						let data = {'amount' : amount * 100, 'ref' : response.message, 'page_type' : page_type};
						payWithPaystack( data );
					}else{
						sweet_alert('info','Please select a payment method','error');
					}

				}else{
					sweet_alert('Error!', response.message, response.status );
					console.log(response.message);
					_this.prop('disabled', false);
				}
			},
			error : function (response) {
				console.log(response.responseText);
			}
		});

	});

	$('#amount').on('keyup', function(){
		let amt = $(this).val();
		if( amt !== undefined && amt > 100 ){
			let payAmount = getBtcValue(amt-100);
			$('#btc_value').text(`You will be credited ${payAmount} worth of BTC in NGN.`);
		}else{
			$('#btc_value').text("You will be credited NGN0.00 Enter an amount to proceed.");
		}
	})


	$('#payment-method').on('change', function () {
		$('#monnifyBox').modal('hide');
		$('#bank-details, #providus-block, #crypto-block').css({'display' :'none'});
		$('.fund-wallet').css({'display' :'block'});
		let _this = $(this);
		let _value = _this.val();
		if( _value === '1' ) {
			$('#bank-details').css({'display' :'block'});
		}else if( _value === '6' ){
			$('#crypto-block').css({'display' :'block'});
			// let amt = $('#amount').val();
			// let btc_text = $('#btc_value');
			// if( amt === undefined || amt < 1 ){
			// 	btc_text.text("You will be credited NGN0.00 Enter an amount to proceed.");
			// }else{
			// 	let payAmount = getBtcValue(amt);
			// 	btc_text.text(`You will be credited NGN ${payAmount} worth of BTC.`);
			// }
			$('.fund-wallet, #bank-details').css({'display' :'none'});
		}else if( _value === '5'){
			// value == 5
			let bvn = _this.find(':selected').data('bvn');
			if( bvn === 0){
				$('#monnifyBox').modal('show');
			}
			$('#providus-block').css({'display' :'block'});
			$('.fund-wallet, #crypto-block').css({'display' :'none'});
		}
	});

	$('.updateBvn').on('click', function ( e ){
		let bvn = $('#bvn').val();
		if( !bvn || bvn.length < 11 ){
			sweet_alert('Error', 'Please enter a valid BVN number.');
			return false;
		}
		$.ajax({
			url : base_url + 'ajax/submitbvn/',
			method: 'POST',
			cache: false,
			data : { bvn },
			success : function(response){
				console.log( response );
				if( response.status === 'success' ){
					window.location = window.location.href;
				}else{
					sweet_alert('Error!', response.message, response.status );
				}
			},
			error : function (r) { console.log(r);}
		});
	});

	function getBtcValue( amt ){
		let btc_rate = parseInt($('#btc_rate').val());
		let r = amt - 100;
		return ( r / btc_rate).toFixed(2);
	}

	$('#cryptoPaymentBtn').on('click', function(e){
		e.preventDefault();
		let amount = parseInt($('#amount').val());
		if( amount < 1000 || amount === undefined ){
			sweet_alert('Error', "Crypto funding must be NGN 1,000 and above.");
			return;
		}
		swal({
			title :'Confirm?',
			text : 'Proceed with Bitcoin funding?',
			icon: 'warning',
			buttons : true,
			dangerMode: true,
		}).then((yesProceed) => {
			if (yesProceed) {
				$.ajax({
					url : base_url + 'ajax/initiatecrypto/',
					method: 'POST',
					cache: false,
					data : { amount },
					success : function(response){
						if( response.status === 'success' ){
							window.location = base_url + 'cryptopayment';
						}else{
							sweet_alert('Error!', response.message, response.status );
						}
					},
					error : function (response) {
						console.log(response);
					}
				});
			}
		});

	});

	$('.confirm-reseller-transaction').on('click', function () {
		let tid = $(this).data('tid');
		let _this = $(this);
		let user_id = _this.data('user_id');
		swal({
			title :'Confirm?',
			text : 'You are about confirming this transaction.',
			icon: 'warning',
			buttons : true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				$.ajax({
					url : base_url + 'ajax/confirm_reseller/',
					method: 'POST',
					cache: false,
					data : {'tid' : tid , 'user_id' : user_id },
					success : function(response){
						if( response.status === 'success' ){
							sweet_alert('Success', 'Transaction Confirmed successfully.', 'success');
							$(_this).parents("tr").remove();
						}else{
							sweet_alert('Error!', response.message, response.status );
						}
					},
					error : function (response) {
						console.log(response);
					}
				});
			}
		});
	});

	$('.confirm-transaction').on('click', function () {
		let tid = $(this).data('tid');
		let _this = $(this);
		let amount = _this.data('amount');
		let user_id = _this.data('user_id');
		let name = _this.data('name');
		let user_email = _this.data('email');
		swal({
			title :'Confirm?',
			text : 'You are about confirming this transaction.',
			icon: 'warning',
			buttons : true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				$.ajax({
					url : base_url + 'ajax/confirm_transaction/',
					method: 'POST',
					cache: false,
					data : {tid ,amount ,user_id , name,user_email },
					success : function(response){
						if( response.status === 'success' ){
							sweet_alert('Success', 'Transaction Confirmed successfully.', 'success');
							$(_this).parents("tr").remove();
						}else{
							sweet_alert('Error!', response.message, response.status );
						}
					},
					error : function (response) {
						console.log(response);
					}
				});
			}
		});
	});

	$('.del-transaction').on('click', function () {
		let tid = $(this).data('tid');
		let _this = $(this);
		swal({
			title :'Delete?',
			text : 'You are about deleting this transaction permanently',
			icon: 'warning',
			buttons : true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				$.ajax({
					url : base_url + 'ajax/delete_transaction/',
					method: 'POST',
					cache: false,
					data : {'tid' : tid },
					success : function(response){
						if( response.status === 'success' ){
							sweet_alert('Success', 'Transaction deleted successfully.', 'success');
							$(_this).parents("tr").remove();
						}else{
							sweet_alert('Error!', response.message, response.status );
						}
					},
					error : function (response) {
						console.log(response);
					}
				});
			}
		});
	});

	$(".number").inputFilter(function (value) {
		return /^-?\d*$/.test(value);
	});


	$('.amount').on('keyup', function () {
		let n = $(this).val();
		let resp = addCommas(n);
		$(this).val( resp );
	});

	$('#airtime_pin_network').on('change', function () {
		let icon_url = $(this).find(':selected').data('icon-url');
		$('#service-img').attr('src', icon_url);
	});

	$('#pin_amount, #airtime_pin_network').on('change', function () {
		let pin_amount = $(this).val();
		let network = $('#airtime_pin_network').val();
		let amount = 0;
		if( network !== '' ){
			let rate = 0;
			$('.amount_to_earn').css('display', 'block');
			$.get( `${base_url}ajax/fetch_network_price`, { "network": network } )
				.done(function( response ) {
					rate = parseInt(response.rate);
					$('#receiver').val(response.phone);
					switch (network) {
						case 'mtn':
							amount = (rate/100) * pin_amount;
							$('.to_receive').text(`You will be receiving ${format_currency(amount)}`);
							$('#amount_earned').val(amount);
							break;
						case 'glo':
							amount = (rate/100) * pin_amount;
							$('.to_receive').text(`You will be receiving ${format_currency(amount)}`);
							$('#amount_earned').val(amount);
							break;
						case '9mobile':
							amount = (rate/100) * pin_amount;
							$('.to_receive').text(`You will be receiving ${format_currency(amount)}`);
							$('#amount_earned').val(amount);
							break;
						default:
							amount = (rate/100) * pin_amount;
							$('.to_receive').text(`You will be receiving ${format_currency(amount)}`);
							$('#amount_earned').val(amount);
							break;
					}
				});
		}else{
			$('.amount_to_earn').css('display', 'none');
		}
	});


	$('.transfer-now').on('click', function (e) {
		e.preventDefault();
		let _this = $(this);
		_this.prop('disabled', true);
		let amount = $('#transfer_amount').val();
		let receiver = $('#receiver').val();
		let product_id = $('#transfer_product_id').val();

		if( payment_method === '' ){
			sweet_alert('Error!', 'Please select a payment method.', 'error' );
			_this.removeAttr('disabled');
		}
		if( receiver === '' ){
			sweet_alert('Error!', 'Please enter the receiver number.', 'error' );
			_this.removeAttr('disabled');
		}
		$.ajax({
			url : base_url + 'ajax/fund_wallet/',
			method : "POST",
			data : {'payment_method' : payment_method, 'amount' : amount, 'product_id' : product_id },
			success: function (response) {
				if( response.status === 'success' ){
					console.log(payment_method);
					if( payment_method === '1' ){
						sweet_alert('Info',
							`Please pay to any of our account details, and use the transaction ID as reference ${response.message}.<br />`,
							'info', false);
					}else{

					}
				}else{
					sweet_alert('Error!', response.message, response.status );
					_this.removeAttr('disabled');
				}
			},
			error : function (response) {
				console.log(response.responseText);
			}
		});

	});




	$('#airtime_network').on('change', function () {
		if( $(this).val() ){
			let discount = $(this).find(':selected').data('discount');
			if( discount > 0 ){
				$('.you-pay').text('You will receive '+ discount +'% discount for this transaction.');
			}
		}
	});

	$('#network').on('change', function(e){
		e.preventDefault();
		let service_id = $(this).val();
		$('#smart-card-info').html('');
		$('#smart_card_number').val('');
		let discount = $(this).data('discount');
		if( discount === undefined) discount = $(this).find(':selected').data('discount');

		if( discount > 0 ) {
			$('.you-pay').html('You will receive '+ discount +'% discount for this transaction.');
		}

		$('#network_plan')
			.find('option')
			.remove()
			.end()
			.append('<option value="" selected>--Select Plan --</option>');

		$.ajax({
			url : base_url + 'ajax/fetch_plans/',
			method: "POST",
			data: {'service_id' : service_id },
			success : function(response){

				if( response.status === 'success' ){

					let count = response.message.length;
					for( let i = 0; i < count; i++ ){
						$('#network_plan').append(`<option value="${response.message[i].id}">${response.message[i].name} - ${format_currency(response.message[i].amount)}</option>`);
					}
				}else{
					console.log(response.message);
				}
			}
		})
	});



	$('.delete-service').on('click', function(){
		let id = $(this).data('id');
		let _this = $(this);
		swal({
			title :'Are you sure?',
			text : 'Every associated plans will also be deleted with this plan!',
			icon: 'warning',
			buttons : true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {

				$.ajax({
					url : base_url + 'ajax/delete_service/',
					method: 'POST',
					cache: false,
					data : {'service_id' : id },
					success : function(response){
						if( response.status === 'success' ){
							sweet_alert('Success', 'Service and associated deleted successfully.', 'success');
							$(_this).parents("tr").remove();
						}else{
							sweet_alert('Error!', response.message, response.status );
						}
					},
					error : function (response) {
						console.log(response);
					}
				});
			}else{
				swal("Oops! We're still good :) ");
			}
		});
	});


	$('.delete-plan').on('click', function(){
		let id = $(this).data('id');
		let _this = $(this);
		swal({
			title :'Are you sure?',
			text : 'You are about deleting this plan.',
			icon: 'warning',
			buttons : true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {

				$.ajax({
					url : base_url + 'ajax/delete_plan/',
					method: 'POST',
					cache: false,
					data : {'plan_id' : id },
					success : function(response){
						if( response.status === 'success' ){
							sweet_alert('Success', 'Plan deleted successfully.', 'success');
							$(_this).parents("tr").remove();
						}else{
							sweet_alert('Error!', response.message, response.status );
						}

					},
					error : function (response) {
						console.log(response);
					}
				});
			}else{
				swal("Oops! We're still good :) ");
			}
		});
	});


	$('.update-account').on('click', function(){
		let id = $(this).data('wid');
		swal({
			title :'Are you sure?',
			text : 'You are about updating this user wallet/commission.',
			icon: 'warning',
			buttons : true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				$(`#${id}`).submit();
			}else{
				swal("Huh! Don't be scared... Nothing happens, smile :) ");
			}
		});
	});


	$('.viewRenew').on('click', function(){
		let product = $(this).data('product');
		$('.subscription-list').empty();
		$.get( `${base_url}/ajax/getSubscription`, {product} )
			.done(function( response ) {
				let subscription_list = ``;
				if( response.status === 'success' ){
					if( Array.isArray(response.message) ){
						$.each(response.message, function ( key, v ) {
							subscription_list += `<tr id="${v.id}"><td>${format_currency(v.amount)}</td><td>${v.freq}</td><td>${v.info}</td><td>${v.next}</td><td><button class="btn btn-danger delrenew" data-id="${v.id}" type="button">Delete</button></td></tr>`;
						});
						$('.subscription-list').append(subscription_list);
					}else{
						$('#auto-renew-table').css({display:'none'});
						$('#auto-renew-message')
							.html(`<div class="alert alert-info"><h5><i class="fas fa-info-circle"></i> ${response.message}</h5></div>`);
					}
				}
			});
	});

	$('#amount').on('blur', function(){
		let trim = $(this).val().split('.').join('');
		$(this).val(trim);
	});

	$('#phone').on('blur', function () {
		let phone = $(this).val();
		let trimStr = phone.split(' ').join('');
		let trimStr2 = trimStr.split('.').join('');
		$(this).val(trimStr2);
		$('#save-contact-box').css({'display':'none'});
		$('#save-confirmation').css({'display' : 'none'});
		let phone_number = $(this).val();
		if( phone_number.length === 11 ){
			$('.save-contact-container').css({'display': 'block'});
			$('#save-confirmation').css({'display' : 'block'});
		}
	});

	$('#phone').on('keyup', function () {

		$('.m-scroll').css({'display':'block'});
		$('.contact-body').html(`<tr><td><i class="fas fa-spin fa-spinner"></i> Loading your contact...</h5></td></tr>`);
		let number = $(this).val();
		if( number.length < 11 && number !== '' ){
			$.get( `${base_url}/ajax/getContact`, { "number": number } )
				.done(function( response ) {
					if( response.status === 'success' ){
						$('.contact-body').empty();
						$.each(response.message, function ( key, value ) {
							$('.contact-body').append(`<tr class="contact-detail" title="Select this contact" onclick="setContact(${value.number})"><td>${value.name} - ${value.number}</td></tr>`);
						});
					}
				});
		}else{
			$('.m-scroll').css({'display':'none'});
		}
	});


	$('.save-contact').on('click', function(){
		let contact_name = $('#contact-name').val();
		let phone = $('#phone').val();
		if( phone === '' || phone.length < 11 ){
			toastr.error("The phone number can't be empty or less than 11");
		}else {
			$.ajax({
				url : base_url + 'ajax/saveContact/',
				method : "POST",
				cache: false,
				data : {phone,contact_name },
				success: function (response) {
					if( response.status === 'success' ){
						toastr.success(response.message);
						$('.save-contact-container').css({'display':'none'});
					}else{
						toastr.error("There was an error saving the contact.");
					}
				},
				error : function (response) {
					toastr.error('Network error...');
				}
			});
		}
	});

	$('.requery').on('click', function(){
		// @TODO
		alert('Clicked');
	});

	// Get SMS alert
	$('.get-sms-status').on('click', () => {
		let mid = $(this).data('mid');
		$.get( `${base_url}sms/get_sms_status`, { mid } )
			.done(function( response ) {
				if( response.type === 'refresh' ){
					window.location = window.location.href;
				}else if( response.type === 'redirect'){
					window.location = base_url + '/sms/compose/';
				}else{
					window.location = base_url + '/logout/';
				}
			});
	});

	if ($("#sms-message").val() !== undefined) {
		$("#sms-message").bind('input propertychange', function() {
			$("#sms-message").val();
			// if ($('#MessageMasknumbers').is(':checked')) {
			// 	doMaskNumbers();
			// }
			countPagesChars();
		});
	}


	/*
	* API
	* */
	$('#api-state-mode').on('click', function() {
		let _this = $(this);
		let mode = parseInt(_this.val());
		if( mode === 0 ){
			mode = 1;
		}else{
			mode = 0;
		}
		$.ajax({
			url : base_url + 'ajax/apimodestate/',
			method : "POST",
			cache: false,
			data : { mode },
			success: function (response) {
				if( response.status === 'success' ){
					_this.val(mode);
					$('.state-text').html(mode === 1 ? 'Live Mode &nbsp;' : 'Test Mode &nbsp; ');
					toastr.success('Success', "API Mode updated successfully.");
				}else{
					toastr.success('Error', "There was an error updating the state.");
				}
			},
			error : function (response) {
				console.log(response.responseText);
			}
		});
	});

	$('.generate').on('click', function(){
		let type = $(this).data('type');
		$.get( `${base_url}ajax/generate_token/${type}`)
			.done(function( response ) {
				if( response.status === 'success' ){
					$(`#${type}`).val( response.message );
				}else{
					sweet_alert('Error', 'Error generating the token, please try again or contact support if persist', 'error');
				}
			});
	});

	// Monnify
	$('.getMonnify').on('click', function(){
		$(this).text('Generating your account number...');
		$.get(`${base_url}ajax/get_reserve_account`)
			.done(function( resp ) {
				if( resp.status === 'success'){
					sweet_alert('Success', 'Good! Your auto-funding account has been created.', 'success');
					$('.swal-button--confirm').on('click', function () { window.location = window.location.href;});
					console.log(resp);
				}else{
					sweet_alert('Error', 'There was an error when creating the account. Please try again later or contact support.', 'error');
				}
			});
	})

	// Voucher Function
	$('#voucherCategory').on('change', function(){
		let id = $(this).val();
		if( id === null || id === undefined ){
			sweet_alert('Error', 'You need to select a category to proceed', 'error');
			return false;
		}

		$.get( `${base_url}ajax/getVoucherProduct`, { id } )
			.done(function( response ) {
				let count = response.message.length;
				if( count < 1 ){
					sweet_alert('Error', "There was an error when loading the product. Kindly contact support");
				}else{
					for( let i = 0; i < count; i++ ){
						$('#voucherProduct').append(`<option value="${response.message[i].id}" data-amount="${response.message[i].amount}" data-availability="${response.message[i].availability}">${response.message[i].name} : NGN ${response.message[i].amount}</option>`);
					}
				}
			});
	});

	$('#voucherProduct').on('change', function (){
		let _value = $(this).val();
		if( _value === '4' ){// JAMB
			$('#jambBox').css({'display' : 'block'});
		}else{
			$('#jambBox').css({'display' : 'none'});
		}
		if( _value !== undefined || _value !== '' ) {
			let selected = $(this).find(":selected");
			let amount = selected.data('amount');
			let availability = parseInt(selected.data('availability'));
			$('#qty').append(`<option value="1"> 1 voucher </option>`);
			for( let i = 1; i <= availability; i++ ){
				$('#qty').append(`<option value="${i}"> ${i} vouchers </option>`);
			}
			$('.alert-notification').html(`<div class="alert alert-success"><h5><i class="fas fa-info-circle"></i> The selected product cost NGN ${amount}, remaining ${availability} pin(s)</h5></div>`);
		}
	});
});

function saveContact(x){
	let y = parseInt(x);
	if( y === 1 ){
		$('#save-contact-box').css({'display':'block'});
		$('#save-confirmation').css({'display' : 'none'});
	}else{
		$('.save-contact-container').css({'display':'none'});
	}
}

function setContact( x ){
	$('#phone').val(`0${x}`);
	$('.m-scroll').css({'display':'none'});
}



function format_currency(str) {
	return '₦' + str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}


function sweet_alert(title, message, type ='error', close = true) {
	const template = (`<strong'>${message}</strong>`);
	swal({
		icon : type,
		title : title,
		closeOnClickOutside: close,
		closeOnEsc: close,
		content :{
			element : 'p',
			attributes : {
				innerHTML : `${template}`
			}
		}
	});
}



function addCommas(nStr) {
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}


function buyWithPaystack( data ){

	var handler = PaystackPop.setup({
		key: pk_key,
		email: user.email,
		amount: data.amount,
		currency: "NGN",
		ref: data.ref,
		metadata: {
			custom_fields: [
				{
					display_name: user.name,
					variable_name: "user",
					value: user.user
				}
			]
		},
		callback: () => {
			toastr.info("Verifying your payment... and processing your order.");
			quickBuyPaystack( data );
		},
		onClose: function(){
			sweet_alert('Info', "You closed the window, and for this reason we couldn't validate your payment", 'info');
		}
	});
	handler.openIframe();
}

// Quick buy process
function quickBuyPaystack( data ){
	$.ajax({
		url : base_url + 'ajax/quickBuyPaystack/',
		method : "POST",
		cache: false,
		data : data,
		success: function (response) {
			if( response.status === 'success' ){

				sweet_alert('Success!', response.message, response.status );
			}else{
				sweet_alert('Error!', response.message, response.status );
			}
			$('.swal-button--confirm').on('click', function () {
				window.location = window.location.href;
			});
		},
		error : function (response) {
			console.log(response.responseText);
		}
	})
}

function payWithPaystack( data ){
	var handler = PaystackPop.setup({
		key: pk_key,
		email: user.email,
		amount: parseInt(0),//data.amount),
		currency: "NGN",
		ref: data.ref,
		metadata: {
			custom_fields: [
				{
					display_name: user.user,
					variable_name: "user",
					value: user.user
				}
			]
		},
		callback: function(response){
			verifyPaystack( response.reference, data.ref, data.page_type );
		},
		onClose: function(){
			sweet_alert('Info', "You closed the window, and for this reason we couldn't validate your payment", 'info');
		}
	});
	handler.openIframe();
}

function verifyPaystack( pref, ref, page_type){
	$.ajax({
		url : base_url + 'ajax/verifyPaystack/',
		method : "POST",
		cache: false,
		data : {'reference' : pref, 'ref' : ref, 'page_type' : page_type },
		success: function (response) {
			console.log(response);
			if( response.status === 'success' ){
				sweet_alert('Success!', response.message, response.status );
				if( page_type === 'reseller' || page_type === 'agents') {
					window.location = base_url + 'dashboard/';
				}
			}else{
				sweet_alert('Error!', response.message, response.status );
			}
			$('.swal-button--confirm').on('click', function () {
				window.location = window.location.href;
			});
		},
		error : function (response) {
			console.log(response.responseText);
		}
	});
}

$(document).ready( function () {
	$('.tables').DataTable({
		"order": [[ 0, "DESC" ]],
		"pageLength" : 100
	});
} );

// SMS Functions

let MX_CHARS = 918;
function countPagesChars() {
	if ($("#sms-message").val() == undefined) {
		return false;
	}
	let message = $('#sms-message').val();
	//counter for number of characters and pages
	let msglen = getSmsLength(message);
	let result = msglen % (MX_CHARS + 1);
	if ((result == 0) && (msglen != 0)) {
		numChars = 0;
	} else {
		numChars = MX_CHARS - result;
	}

	if (msglen > 765) {
		pages = 6;
		$('#character-counter').html('(' + msglen + ' /  ' + '918)');
		$('#page-counter').html('Page Count: ' + pages);
	}
	else if (msglen > 612 && msglen <= 765) {
		pages = 5;
		$('#character-counter').html('(' + msglen + ' /  ' + '765)');
		$('#page-counter').html('Page Count: ' + pages);
	}
	else if (msglen > 459 && msglen <= 612) {
		pages = 4;
		$('#character-counter').html('(' + msglen + ' /  ' + '612)');
		$('#page-counter').html('Page Count: ' + pages);
	}
	else if (msglen > 306 && msglen <= 459) {
		pages = 3;
		$('#character-counter').html('(' + msglen + ' /  ' + '459)');
		$('#page-counter').html('Page Count: ' + pages);
	}
	else if (msglen > 160) {
		pages = 2;
		$('#character-counter').html('(' + msglen + ' /  ' + '306)');
		$('#page-counter').html('Page Count: ' + pages);
	}
	else {
		pages = 1;
		$('#character-counter').html('(' + msglen + ' /  ' + '160)');
		$('#page-counter').html('Page Count: ' + pages);
	}
	return msglen;
}

function getSmsLength(message) {
	let msglen = 0;
	let strGSMTable = "";
	strGSMTable += "@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞ`ÆæßÉ !\"#¤%&'()*+=,-./0123456789:;<=>?¡";
	strGSMTable += "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ`¿abcdefghijklmnopqrstuvwxyzäöñüà";
	strGSMTable += String.fromCharCode(10) + String.fromCharCode(13);
	let strExtendedTable = "^{}\\[~]|€";
	for (let i = 0; i < message.length; i++) {
		let cmessage = message.charAt(i);

		let intGSMTable = strGSMTable.indexOf(cmessage);
		if (intGSMTable != -1) {
			msglen += 1;
			continue;
		}
		let intExtendedTable = strExtendedTable.indexOf(cmessage);
		if (intExtendedTable != -1) {
			msglen += 2;
		} else {
			msglen += 8;
		}
	}
	return msglen;
}

$(document).on('click', '.delrenew', function(e){
	e.preventDefault();
	let id = $(this).data('id');
	swal({
		title :'Confirm?',
		text : 'Are you sure you want to delete this Auto-renewal?',
		icon: 'warning',
		buttons : true,
		dangerMode: true,
	}).then((willDelete) => {
		if (willDelete) {
			$.ajax({
				url : base_url + 'ajax/delrenew/',
				method: "POST",
				cache : false,
				data: { id },
				success : function(response){
					if( response.status === 'success' ){
						$(`#${id}`).remove();
						toastr.success("Auto Renew plan successfully deleted.");
					}else{
						toastr.error("An error deleting the auto-renew plan");
					}
				},
				error : function(response){
					toastr.error("There was an error performing the action.");
					console.log( response );
				}
			});
		}
	});
});






