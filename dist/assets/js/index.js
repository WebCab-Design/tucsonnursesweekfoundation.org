document.addEventListener('DOMContentLoaded', function () {
	var amount = document.querySelector('.payment-widget input[name=amount]');
	var paymentWidget = document.querySelector('.payment-widget');
	var showFormButton = document.querySelector('.show-form');
	var ticket = document.querySelector('.ticket');
	var form = document.querySelector('.form');
	var venderSelect = document.querySelector('.vender-select');
	var lunchCheck = document.querySelector('input[name="Lunch"]');
	var total = 0;

	if (showFormButton) {
		showFormButton.addEventListener('click', function () {
			form.style.display = 'block';
		});
	}

	if (ticket) {
		var ticketList = form.querySelector('.ticket-list');
		var ticketFirst = form.querySelector('.ticket-first');
		var ticketLast = form.querySelector('.ticket-last');
		var ticketHidden = form.querySelector('.ticket-hidden');
		var ticketAdd = form.querySelector('.ticket-add');
		var ticketTotal = form.querySelector('.ticket-total');
		var ticketCost = Number(ticketAdd.getAttribute('data-cost')) || 0;
		var ticketFirstDiscount = Number(ticketAdd.getAttribute('data-first-discount')) || 0;

		ticketAdd.addEventListener('click', function () {
			var isFirstTicket = ticketList.children.length === 0;

			if (ticketFirst.value.length !== 0 && ticketLast.value.length !== 0) {
				var li = document.createElement('li');
				var ticket = ticketFirst.value + ' ' + ticketLast.value;

				li.innerText = ticket;
				ticketFirst.value = '';
				ticketLast.value = '';

				if (ticketHidden.value.length === 0) ticketHidden.value = ticket;
				else ticketHidden.value = ticketHidden.value + ', ' + ticket;

				ticketList.appendChild(li);
				total = Number(total) + ticketCost - (isFirstTicket ? ticketFirstDiscount : 0);
				if (ticketTotal) ticketTotal.value = total.toString();
			} else {
				window.alert('First Name and Last Name are required');
			}
		});
	}

	if (form) {
		Astatine.submit({
			query: form,
			method: 'post',
			responseType: 'json',
			action: 'https://www.enformed.io/zpn17s0',
			prepare: function (data, resolve, reject) {
				// data['*default_email'] = 'alex.steven.elias@gmail.com';
				// data['*cc'] = 'aelias@webcabdesign.com';

				if (!data['*default_email']) data['*default_email'] = 'tnwf@live.com';
				// if (!data['*cc']) data['*cc'] = 'jburns@webcabdesign.com';

				if (venderSelect) total = venderSelect.value;
				if (lunchCheck && lunchCheck.checked) total = Number(total) + 45;

				if (paymentWidget) {
					if (total == 0) {
						reject('Requires at least one individual.');
					} else {
						if (ticketHidden) data[ticketHidden.name] = ticketHidden.value;
						if (ticketTotal) data[ticketTotal.name] = ticketTotal.value;
						resolve(data);
					}
				} else {
					resolve(data);
				}
			},
			complete: function (error, success) {
				var response = document.querySelector('.response');
				if (error) {
					if (typeof error === 'string') {
						response.style.color = 'orange';
						response.innerText = error;
					} else {
						console.log(error);
						response.style.color = 'red';
						response.innerText = 'Error Plese See Console';
					}
				} else {
					form.style.display = 'none';
					response.style.color = '#6db4b1';
					response.innerText = 'Form Is Submitted';

					if (paymentWidget) {
						var itemName = document.querySelector('input[name="item_name"]');
						var handlePayment = function () { paymentWidget.style.display = 'none'; };
						var onlineButton = document.querySelector('.online-button');
						var offlineButton = document.querySelector('.offline-button');
						var formName = document.querySelector('input[name="*formname"]');
						itemName.value = formName.value;
						amount.value = total.toString();
						paymentWidget.style.display = 'block';
						onlineButton.addEventListener('click', handlePayment);
						offlineButton.addEventListener('click', handlePayment);
					}
				}
			}
		});
	}
	var bannerAd = document.querySelector('.banner-ad');
	var image = bannerAd.getElementsByTagName('img');
	var x = 0;

	function changeImage (x) {
		for (var i = 0; i < x; i++) {
			image[x].parentNode.classList.toggle('active');
			x++;
			console.log(x);
		}
	}
	setTimeout(changeImage(x), 3000);
});
