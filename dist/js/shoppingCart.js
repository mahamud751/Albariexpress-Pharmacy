
// shopping
let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
// #sum-prices-> the total price will show into this tag
const cartSumPrice = document.querySelector('#sum-prices');
// show price to subtotal
const prices = document.querySelectorAll('.sum-prices');
// #buyItems -> the selected Item will display into cart sidebar by this tag
const parentElement = document.querySelector('#buyItems');
// product-under -> selects all product item
const products = document.querySelectorAll('.product-under');
// discount - Delivery charge - Grand total
const discountText = document.querySelectorAll('.discount');
const deliCharge = document.querySelector('.d-charge');
const totals = document.querySelectorAll('.total');
const payAmount = document.querySelector('.pay-amount');
const couponApplyBtn = document.querySelector('#coupon-apply');
const discountInput = document.querySelector('#discount-input');

const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return (sum * 10) / 10; // the last to digit will return after decimal
}

const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return ` <li class="buyItem row w-100 mb-4">
                        <div class="col-3 item-img align-items-center">
                            <img src="${product.image}" style="width: 80px; padding-top: 10px">
                        </div>
                        <div class="col-5 item-text pl-3">
                            <h5 class="font-weight-bold">${product.name}</h5>
                            <p class="text-muted mb-0">3 each X 2</p>
                            <div class="count">
                                <button class="button-minus" data-id=${product.id}>-</button>
                                <span class="countOfProduct">${product.count}</span>
                                <button class="button-plus" data-id=${product.id}>+</button> 
                            </div>
                        </div>
                        <div class="col-4 item-cost text-right">
                            <p class="mb-0 font-weight-bold h5">৳ ${(product.price * 10) / 10} </p>
                            <del>৳ 000</del>
                        </div>
                    </li>
                `
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		document.querySelector('.amount').classList.remove('hidden');
		cartSumPrice.innerHTML = '৳ ' + countTheSumPrice();
		prices.forEach(price =>{
			price.innerHTML = '৳ ' + countTheSumPrice();
		})

		let grandTotal = (countTheSumPrice() + parseFloat(deliCharge.innerText) + parseFloat(payAmount.innerText));
		totals.forEach(total =>{
			total.innerHTML = grandTotal.toFixed(1);
		})
		// coupon apply discount - Delivery charge - Grand total calcualation
		let subtotal = countTheSumPrice();
		if(couponApplyBtn){
			couponApplyBtn.addEventListener('click', (e)=>{ //5
				//discount calculation formula 
				let discountPercentage = (parseInt(discountInput.value) / 100);
				let getDiscount = subtotal * discountPercentage;
				discountText.forEach(item =>{
					item.innerText = getDiscount.toFixed(1);
				})
				
				// Grand Total
				let grandTotal = (subtotal + parseFloat(deliCharge.innerText) + parseFloat(payAmount.innerText)) - getDiscount;
				totals.forEach(total =>{
					total.innerText = grandTotal.toFixed(1);
				})
				
			})
		}
		
	}
	else {
		document.querySelector('.amount').classList.add('hidden');
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
		prices.forEach(price =>{
			price.innerHTML = ' ' ;
		})
		totals.forEach(total =>{
			total.innerHTML = ' ';
		})
	}
}

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}

// products = All product-under div. Each 'item' are single product-under div
products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			console.log(productID);
			console.log(e);
			// product name from product-under section
			const productName = item.querySelector('.productName').innerHTML;
			// priceValue from product-summary section
			const productPrice = item.querySelector('.priceValue').innerHTML;
			// productImage from img element of product-under
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();