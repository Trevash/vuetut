Vue.component('product-review', {
    template: `
        <div>
            <form class="review-form" @submit.prevent="onSubmit">
                <p>
                    <label for="name">Name: </label>
                    <input id="name" v-model="name" placeholder="name">
                </p>
                <p>
                    <label for="review">Review</label>
                    <textarea id="review" v-model="review"></textarea>
                </p>
                
                <p>
                    <label for="rating">Rating:</label>
                    <select id="rating" v-model.number="rating">
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                    </select>
                </p>
                
                <p>
                    <input type="submit" value="Submit">
                </p>
            </form>
            
            <p v-if="errors.length > 0">
                    <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
        </div>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                };
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
            }
            else {
                if (!this.name) {
                    this.errors.push("Name required.");
                }
                if (!this.review) {
                    this.errors.push("Review required.");
                }
                if (!this.rating) {
                    this.errors.push("Rating required.");
                }
            }

        }
    }
});

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
                
                <div>
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul>
                        <li v-for="review in reviews">
                            <p>{{ review.name }}</p>
                            <p>Rating: {{ review.rating }}</p>
                            <p>{{ review.review }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            reviews: [],
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
                    variantQuantity: 8
                }
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },

        updateProduct(index) {
            this.selectedVariant = index;
        },
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
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },

        removeItem(id) {
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                    break;
                }
            }
        },

        addReview(productReview) {
            this.reviews.push(productReview)
        },
    }
});