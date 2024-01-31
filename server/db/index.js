const client = require('./client')
const path = require('path')
const fs=require('fs')

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  updateUser,
  createUser,
  authenticate,
  fetchAllCustomers,
  findUserByToken,
  updateVipStatus,
  resetPassword,
  fetchAddress,
  updateAddress
} = require('./auth');

const {
  fetchLineItems,
  fetchAllLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders,
  fetchAllOrders
} = require('./cart');

const {
  createReview,
  fetchReviews
} = require('./reviews')

const {
  createWishlistItem,
  fetchWishlistItems,  
  deleteWishlistItem
} = require('./wishlist');
const { get } = require('http');

//load product images
const loadImage = (filepath)=>{
  return new Promise((resolve,reject)=>{
    const fullPath=path.join(__dirname,filepath);

    //read file
    fs.readFile(fullPath,'base64',(err,result)=>{
        if(err){
          reject(err) //sends back the error msg
        }else{
          resolve(`data:image/jpg;base64,${result}`) //read file and send back
        }
    })

  })
}

// add price and description into the products table..//add firstname and lastname to users table//add img to Product table
// added vip boolean into the users table
// modified vip boolean to price in the products table

const seed = async()=> {
  const babyBabyCake_image = await loadImage('./images/baby-baby-cake.jpg');
  const beatlesCake_image = await loadImage('./images/beatles-cake.jpg');
  const candyAisleCake_image = await loadImage('./images/candy-aisle-cake.jpg');
  const chocolateStripesCake_image = await loadImage('./images/chocolate-stripes-cake.jpg');
  const christmasTrainCakes_image = await loadImage('./images/christmas-train-cakes.jpg');
  const coconutCupcake_image = await loadImage('./images/coconut-cupcake.jpg');
  const cupcakeLetters_image = await loadImage('./images/cupcake-letters.jpg');
  const earlGreyCupcakes_image = await loadImage('./images/earl-grey-cupcakes.jpg');
  const elmoCupcakes_image = await loadImage('./images/elmo-cupcakes.jpg');
  const fairyCake_image = await loadImage('./images/fairy-cake.jpg');
  const flashCake_image = await loadImage('./images/flash-cake.jpg');
  const flowerCake_image = await loadImage('./images/flower-cake.jpg');
  const flowerpotCupcakes_image = await loadImage('./images/flower-pot-cupcakes.jpg');
  const goldBlackCake_image = await loadImage('./images/gold-black-cake.jpg');
  const halloweenCupcakes_image = await loadImage('./images/halloween-cupcakes.jpg');
  const helloKitty_image = await loadImage('./images/hello-kitty-cake.jpg');
  const keylimeCupcakes_image = await loadImage('./images/keylime-cupcake.jpg');
  const maybeImCrazyCake_image = await loadImage('./images/maybe-im-crazy-cake.jpg');
  const mistletoeCake_image = await loadImage('./images/mistletoe-cake.jpg');
  const mountainCake_image = await loadImage('./images/mountain-cake.jpg');
  const oreoCake_image = await loadImage('./images/oreo-cake.jpg');
  const pooEmoji_image = await loadImage('./images/poo-emoji-cupcakes.jpg');
  const prettyInPinkCupcake_image = await loadImage('./images/pretty-in-pink-cupcake.jpg');
  const princessCake_image = await loadImage('./images/princess-cake.jpg');
  const rainbowCake_image = await loadImage('./images/rainbow-cake.jpg');
  const skittlesCake_image = await loadImage('./images/skittles-cake.jpg');
  const smallWeddingCake_image = await loadImage('./images/small-wedding-cake.jpg');
  const snowHouseCake_image = await loadImage('./images/snow-house-cake.jpg');
  const soccerDirtCake_image = await loadImage('./images/soccer-dirt-cake.jpg');
  const thanksgivingCake_image = await loadImage('./images/thanksgiving-cake.jpg');
  const unicornCake_image = await loadImage('./images/unicorn-cake.jpg');
  const valentinesDayCake_image = await loadImage('./images/valentines-day-cake.jpg');
  const weddingCake_image = await loadImage('./images/wedding-cake.jpg');
  const koalaCake_image = await loadImage('./images/koala-cake.jpg');


  const SQL = `
    DROP TABLE IF EXISTS wishlist;
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS reviews;
    

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      firstname VARCHAR(100) NOT NULL,
      lastname VARCHAR(100) NOT NULL,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL,
      address_line1 VARCHAR(25),
      address_line2 VARCHAR(25),
      city VARCHAR(15),
      state VARCHAR(15),
      zip_code NUMERIC (5),
      phone NUMERIC (10)
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price NUMERIC NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100),
      vip_price NUMERIC DEFAULT 0 NOT NULL,
      product_image TEXT
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      title VARCHAR(255) NOT NULL,
      comments VARCHAR(255) NOT NULL,
      ratings NUMERIC NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CHECK (ratings>0 AND ratings<6)
    );

    CREATE TABLE wishlist(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CONSTRAINT user_and_product_key UNIQUE(user_id, product_id)
    );

  `;
  await client.query(SQL);

  //Added VIP status
  //Added firstname & lastname to columns to table
  const [moe, lucy, ethyl] = await Promise.all([
    createUser({firstname: "Moesha", lastname: "Norwood", username: 'moe', password: '1234', is_admin: false, is_vip: false }),
    createUser({ firstname: "Lucinda", lastname: "Hall", username: 'lucy', password: '1234', is_admin: false, is_vip: true }),
    createUser({ firstname: "Ethyleen", lastname: "Sims", username: 'ethyl', password: '1234', is_admin: true, is_vip: true })
  ]);

  //Added addresses for all current users
  await Promise.all([
    updateAddress({ user_id: moe.id, address_line1: "4482 Lady Bug Dr", city: "Bronx", state: "NY", zip_code: "10458", phone: "3125554892" }),
    updateAddress({ user_id: lucy.id, address_line1: "3730 Hartland Ave", city: "Fond Du Lac", state: "WI", zip_code: "54935", phone: "8155552773" }),
    updateAddress({ user_id: ethyl.id, address_line1: "13 Ersel St", address_line2: "Apt. 5", city: "Smithboro", state: "IL", zip_code: "62284", phone: "6305551024" })
  
  ]);

  //Added price and description
  //Modified VIP booleans to VIP prices
  //Added category to each product
  const [foo, bar, bazz,quq] = await Promise.all([

    createProduct({ name: 'Baby Baby Cake', price: 425.00, description: "This adorable baby cake can be customized in pink, blue, or as seen here, gender-neutral yellow. The interior can also be customized to pink or blue making a great gender-reveal cake. The cake itself is flavored with Mexican vanilla and a hint of cinnamon.", vip_price:382.5,category:'Special Occassions', productImage:babyBabyCake_image}),
    createProduct({ name: 'Beatles Cake', price: 200.00, description: 'This Beatles themed cake is perfect for the Beatles fanatic in your life. On the inside, layers of thick chocolate cake are covered with a salted caramel buttercream. On the outside of the cake, you have yummy white chocolate frosting, with carefully piped Beatles decorations.', vip_price:0, category:'Birthdays', productImage:beatlesCake_image }),
    createProduct({ name: 'Cookie Explosion', price: 350.00, description: "This cake is all about the cookies!  Each layer celebrates a different cookie.  At the bottom, there is a chocolate chip cake and frosting layer with pieces of chocolate chip cookies sprinkled on top.  Next is chocolate cake with Oreo frosting and sprinkles.  And last, there is a cinnamon cake with snickerdoodle frosting.  This is then covered with a chocolate ganache drip and topped with each of the three cookies, chocolate chip, Oreo, and snickerdoodles, as well as other chocolates and candies to make a great centerpiece to any cookie lovers’ party.", vip_price:0, category:'Special Occassions', productImage:candyAisleCake_image }),
    createProduct({ name: 'Triple Chocolate Stripes', price: 300.00, description:'The cake is full of stripes both inside and outside. Inside the cake are alternating layers of white and dark chocolate cake.  The frosting also alternates the same tasty white and dark chocolate flavors. Then it is covered in a milk chocolate ganache drip.',vip_price:0,category:'Special Occassions', productImage: chocolateStripesCake_image }),
    createProduct({ name: 'Winter Rum Cake', price: 150.00, description:'This cake is perfect for an office Christmas party or bringing to any winter family celebration.  Everyone will have their choice of vanilla or chocolate rum soaked cakes shaped as train cars delivering presents for the holidays.',vip_price:135.00,category:'Holidays', productImage: christmasTrainCakes_image }),
    createProduct({ name: 'Almond Joy Cupcakes', price: 100.00, description:'This elevated cupcake starts with a chocolate cake drizzled with a rum soak.  The top features a smooth coconut almond frosting sprinkled with toasted coconut for extra crunch.',vip_price: 0,category:'Cupcakes', productImage: coconutCupcake_image }),
    createProduct({ name: 'Pink Champagne Cupcakes', price: 150.00, description:'These cupcakes are perfect for a birthday, shower, or wedding as they can be customized with initials or numbers to match the occasion.  The cake is delicately flavored with strawberries while the frosting has a hint of champagne.',vip_price: 135.00,category:'Cupcakes', productImage: cupcakeLetters_image }),
    createProduct({ name: 'Earl Grey Cupcakes', price: 75.00, description:'These cupcakes are perfect for the tea lover. The base is steeped in Earl Grey flavor while the frosting is flavored with a gourmet Italian extract called Fiori Di Sicillia.  This extract brings citrus and floral flavors which accentuate the flavors found in Earl Grey tea.', vip_price: 0, category:'Cupcakes', productImage: earlGreyCupcakes_image }),
    createProduct({ name: 'Elmo Cupcakes', price: 100.00, description:'These kid-friendly cupcakes come in a mix of chocolate and vanilla cupcake bases.  The colorful frosting is a vanilla buttercream that both parents and kids will love.  The cupcakes can be customized with the age of the birthday boy or girl.', vip_price: 0, category:'Cupcakes', productImage: elmoCupcakes_image }),
    createProduct({ name: 'Woodland Fairy Cake', price: 400.00, description:"This beautiful woodland fairy cake is intricately decorated, from the stone-cut path leading to the entrance of the fairy’s home to the long blades of grass that litter the forest floor. A babbling creek runs alongside the tree-stump house, with detailed cut out windows and colorful flowers spreading luxuriously along the bark. Inside is a rich chocolate cake with decadent dark chocolate frosting, creating a memorable, beautiful, birthday cake.", vip_price: 360.00, category:'Birthdays', productImage: fairyCake_image }),
    createProduct({ name: 'The Flash Cake', price: 150.00, description:'This fun, Flash themed cake is perfect for the DC comics fan in your life. Inside you have Vanilla cake with a lemon zest buttercream, with a graham cracker crumble giving you the perfect amount of crunch. The outside is appropriately decorated with The Flash themed paraphernalia.', vip_price: 0, category:'Birthdays', productImage: flashCake_image }),
    createProduct({ name: 'Tower of Flowers Cake', price: 200.00, description:'This beautiful blue two-tiered cake is great for weddings or showers.  It is carefully adorned with hundreds of delicate white flowers.  Inside the cake is a lightly lemon-flavored chiffon cake with a lemon mousse sandwiched between the cake layers.', vip_price: 180.00, category:'Special Occassions', productImage: flowerCake_image }),
    createProduct({ name: "Mother's Day Bouquet", price: 250.00, description:"This cake is perfect for Valentine's Day, Mother's Day, or anytime you want to send flowers to that special someone.  The cupcakes are a light vanilla sponge cake with a creamy raspberry frosting.", vip_price: 225.00, category:'Holidays', productImage: flowerpotCupcakes_image }),
    createProduct({ name: 'Celebration Cake', price: 150.00, description:'This gold and black accented cake is perfect for special birthday parties or anniversaries.  This can easily be decorated with the topper of your choice.  The frosting is a silky vanilla buttercream layered between rich vanilla pound cake, ensuring it is a delicious cake that everyone will enjoy.', vip_price: 0, category:'Birthdays', productImage: goldBlackCake_image }),
    createProduct({ name: 'Halloween Cupcakes', price: 150.00, description:'The Halloween Cupcakes come in a variety of flavors and decorations.  The pumpkin design is a pumpkin spice cake topped with a creamy vanilla frosting with just a hint of orange. The ghost design is a red velvet cake with a cream cheese frosting.  The frankenstein cupcake is a chocolate cupcake with vanilla frosting and chocolate sprinkles.  You can mix and match flavors and designs.', vip_price: 0, category:'Holidays', productImage: halloweenCupcakes_image }),
    createProduct({ name: 'Hello Kitty Cake', price: 200.00, description:'This cute Hello Kitty cake is simply the ONLY gift you will need to give any Hello Kitty fan for their birthday. Inside of the cake fluffy pink velvet cake is layered with succulent strawberry buttercream.', vip_price: 0, category:'Birthdays', productImage: helloKitty_image }),
    createProduct({ name: 'Margarita Cupcakes', price: 100.00, description:'This cupcake is a party in a bite.  The base is lightly flavored with lime zest and soaked in premium tequila.  This is topped with a lime and tequila spiked frosting and a small sprinkle of salt.  A sliver of lime and a straw finish off the cupcake with fun flair.', vip_price: 0, category:'Cupcakes', productImage: keylimeCupcakes_image }),
    createProduct({ name: "Maybe I'm Crazy Cake", price: 250.00, description:"This unique cake features unique flavors inside as well. The sponge cake inside is a rich vanilla olive oil cake. The frosting features an interesting blend of rosemary and ricotta making this the perfect cake for that person in your life that you just don't know what to get.", vip_price: 0, category:'Special Occassions', productImage: maybeImCrazyCake_image }),
    createProduct({ name: 'Mistletoe Cake', price: 300.00, description:'This Impressionist inspired cake is an almond crunch carrot cake perfect for the holidays.', vip_price: 0, category:'Holidays', productImage: mistletoeCake_image }),
    createProduct({ name: 'Mountain View Cake', price: 300.00, description:'The mountain cake is perfect for everyone from the outdoorsman in your life to that outdoor wedding.  The cake is made of a fluffy vanilla cake flavored with real blueberries.  Between the cake layers, there is a light blueberry frosting and a slightly crunchy cinnamon crumble.', vip_price: 0, category:'Special Occassions', productImage: mountainCake_image }),
    createProduct({ name: 'Oreo Delight', price: 150.00, description:'Dense, rich chocolate cake is layered with Oreo buttercream.  Outside, the cake is drizzled with caramel and covered in more buttercream and Oreos for a decadent addition to any party.', vip_price: 0, category:'Special Occassions', productImage: oreoCake_image }),
    createProduct({ name: 'Emoji Cupcakes', price: 150.00, description:'These whimsical cupcakes are sure to get a smile at any event.  They are made with a chocolate cake and a milk chocolate frosting that will make any chocolate lover happy.', vip_price: 135.00, category:'Cupcakes', productImage: pooEmoji_image }),
    createProduct({ name: 'Pretty in Pink Cupcake', price: 150.00, description:'These cupcakes give a triple dose of raspberries.  The vanilla cupcake base is filled with raspberry jam. It is then covered with a creamy raspberry frosting, which is then topped with a white chocolate and raspberry candy shard.', vip_price: 0, category:'Cupcakes', productImage: prettyInPinkCupcake_image }),
    createProduct({ name: 'Pink Princess Cake', price: 250.00, description:"Although it is shown here as a birthday cake, the Pink Princess Cake will delight at any special event, whether it’s a quinceanera or a baby shower.  Inside the cake, you will find layers of checkerboard pink and white cake creating a beautiful surprise when you cut into the cake.", vip_price: 0, category:'Birthdays', productImage: princessCake_image }),
    createProduct({ name: 'Fluffy Rainbow Cake', price: 200.00, description:'This yummy cake has five colorful layers, each flavored to match the corresponding color of the rainbow: cherry, orange, lemon, lime, and grape. It is decorated with a candy rainbow and clouds covered in rainbow Nerds surround the base.', vip_price: 180.00, category:'Birthdays', productImage: rainbowCake_image }),
    createProduct({ name: 'Skittle Surprise', price: 200.00, description:'This cake is skittles themed, with a colorful, rainbow fruit surprise on the inside. Fluffy vanilla buttercream coats the layered rainbow layered cakes, soaked with a sweet syrup soak to ensure a moist and rich cake.', vip_price: 0, category:'Birthdays', productImage: skittlesCake_image }),
    createProduct({ name: 'Lily Cake', price: 200.00, description:"This small three-layer cake makes a great casual wedding cake or is perfect for Mother's Day. It features a vanilla cake with whip cream frosting. The flowers on top are handpiped and edible.", vip_price: 0, category:'Special Occassions', productImage: smallWeddingCake_image }),
    createProduct({ name: 'Snow House Cake', price: 200.00, description:'This cake is inspired by holiday gingerbread houses. Instead of gingerbread flavors, this cake features a soft cool peppermint flavor in both the cake and the frosting. The cake is then surrounded by vanilla sugar cookies and decorated in whimsical blue and white frosting.', vip_price: 0, category:'Holidays', productImage: snowHouseCake_image }),
    createProduct({ name: 'Sporty Dirt Cake', price: 200.00, description:"This fun dirt cake is the answer to anyone who can’t decide what to have for dessert: candy or cake?  The chocolate cake is filled with a creamy chocolate pudding and covered in chocolate frosting and Oreo crumbs to create the dirt.  This is then decorated with gummy worms and candy rocks.  The cake is then topped with green vanilla grass and customized with a sports ball of your choice.", vip_price: 0, category:'Birthdays', productImage: soccerDirtCake_image }),
    createProduct({ name: 'Thanksgiving Cake', price: 200.00, description:'This chocolate and pumpkin flavored cake is the perfect centerpiece to your Thanksgiving table.', vip_price: 0, category:'Holidays', productImage: thanksgivingCake_image }),
    createProduct({ name: 'Unicorn Cake', price: 200.00, description:'This delightful unicorn cake is cute and yummy! Inside, you will find a plethora of colored vanilla cake layers, ranging from red to purple. Sweet vanilla frosting coats the outside, with adorable unicorn decorations, perfect for the young ones in your life.', vip_price: 0, category:'Birthdays', productImage: unicornCake_image }),
    createProduct({ name: 'Hearts & Flowers', price: 150.00, description:"This heart-shaped cake is perfect for Valentine’s day. Its moist layers of pink velvet cake are alternated with a juicy jam filling. The outside is enveloped in decadent raspberry buttercream, with carefully piped flowers.", vip_price: 135.00, category:'Holidays', productImage: valentinesDayCake_image }),
    createProduct({ name: 'Peaches & Cream Wedding Cake', price: 500.00, description:'This two tiered wedding cake is composed of buttermilk cake, peach buttercream, and filled with peach compote.  The outside is covered in a silky French vanilla buttercream.  Delicate handmade flowers wrap around the outside of the cake.', vip_price: 0, category:'Special Occassions', productImage: weddingCake_image }),
    createProduct({ name: 'Koala Cake', price: 250.00, description:'An adorable birthday cake for the young ones in your life, with looks that are most uncanny to a real koala. Is it a koala, or is it cake? No one knows! Rich chocolate cake is topped with a velvety caramel buttercream, finished with koala and flower decorations.', vip_price: 225.00, category:'Birthdays', productImage: koalaCake_image })    
  ]);

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  cart.is_cart = false;
  await updateOrder(cart);

   //create review records
   await Promise.all([
    createReview({ title:'Disappointed',comments: 'Cake was very soggy.	', ratings : 1,product_id: foo.id}),
    createReview({ title:'Awesome',comments: 'Oh! Heavenly cake !',ratings : 5,product_id: foo.id }),
    createReview({ title:'Loved it',comments: 'Was a hit at the bday party',ratings : 5,product_id: bar.id }),
    createReview({ title:'Good',comments: 'what a wonderfully dellicious cake.	',ratings : 4 ,product_id: quq.id}),
  ]);

  //Created wishlist items for current users
  await Promise.all([
    createWishlistItem({ user_id: moe.id, product_id: bar.id }),
    createWishlistItem({ user_id: moe.id, product_id: bazz.id }),
    createWishlistItem({ user_id: lucy.id, product_id: bazz.id })
  ]);
  
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  fetchAllLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,  
  findUserByToken,
  seed,
  fetchReviews,
  createUser,
  fetchAllCustomers,
  fetchAllOrders,
  updateUser,
  createWishlistItem,
  fetchWishlistItems,
  deleteWishlistItem,
  updateVipStatus,
  resetPassword,
  fetchAddress,
  updateAddress,
  client
};
