Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
            <img v-bind:src="image" style="width: 300px; height: 300px;"/>
        </div>

            <div class="product-info">
            <h1>{{ title }}</h1>
            <p>Shipping: {{ shipping }}</p>
            <p v-if="inStock">In Stock</p>
            <p v-else
                :class="{ outOfStock: !inStock }">Out of Stock</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div style="width:20px; height:20px;"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)">
            </div>

            <p> {{ forSale }}</p>

            <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Add to cart</button>

            <button @click="removeFromCart">Remove from cart</button>

            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>

        </div>
        </div>
    `,
    data() {
        return {
            product: "Socks",
            brand: "Vue Mastery",
            selectedVariant: 0,
            onSale: true,
            details: [
                "80% cotton",
                "20% polyester",
                "Gender-neutral"
            ],
            variants: [
                {
                    variantId: 100,
                    variantColor: "green",
                    variantImage: "./assets/greenSocks.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 123,
                    variantColor: "blue",
                    variantImage: "./assets/blueSocks.jpeg",
                    variantQuantity: 0
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },

        removeFromCart() {
            this.cart -= 1;
        },

        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
        },

        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },

        forSale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!';
            }
        },

        shipping() {
            if (this.premium) {
                return "Free";
            }
            else {
                return 2.99;
            }
        }
    }
});

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
});