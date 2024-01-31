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
  // const babyBabyCake_image = await loadImage('https://photos.app.goo.gl/9fvcHFD1t3YcGJKw6');
  // const beatlesCake_image = await loadImage('https://photos.app.goo.gl/EkHCY6rBoWRHaNNg7');
  // const candyAisleCake_image = await loadImage('https://photos.app.goo.gl/qdfoh9YZbj4h9rir8');
  // const chocolateStripesCake_image = await loadImage('https://photos.app.goo.gl/v4QJDpemLgATtYz2A');
  // const christmasTrainCakes_image = await loadImage('https://photos.app.goo.gl/r1iPMnKmkM9oghrW7');
  // const coconutCupcake_image = await loadImage('https://photos.app.goo.gl/uq67CDN5t2PFAtuf6');
  // const cupcakeLetters_image = await loadImage('https://photos.app.goo.gl/kXJ4AVvVDjwS37tp8');
  // const earlGreyCupcakes_image = await loadImage('https://photos.app.goo.gl/zQqjcNAq7fZHai6v6');
  // const elmoCupcakes_image = await loadImage('https://photos.app.goo.gl/7CdtpzJbY9De1Z5R9');
  // const fairyCake_image = await loadImage('https://photos.app.goo.gl/yFQPpZ1ojeYTnMzJ7');
  // const flashCake_image = await loadImage('https://photos.app.goo.gl/EceLNka2erToYNwz8');
  // const flowerCake_image = await loadImage('https://photos.app.goo.gl/aDT4SpkNCHhTTVdDA');
  // const flowerpotCupcakes_image = await loadImage('https://photos.app.goo.gl/4KuMjK8rvJzxBfPJ9');
  // const goldBlackCake_image = await loadImage('https://photos.app.goo.gl/GN2aPxHRu1rTXDEw5');
  // const halloweenCupcakes_image = await loadImage('https://photos.app.goo.gl/VVViS3X8tTC6PZUW8');
  // const helloKitty_image = await loadImage('https://photos.app.goo.gl/bUg1hPMbEVRzPyq28');
  // const keylimeCupcakes_image = await loadImage('https://photos.app.goo.gl/jmN4eCRRD5bjPCq68');
  // const maybeImCrazyCake_image = await loadImage('https://photos.app.goo.gl/JhMZ1hGnAafGL7ui9');
  // const mistletoeCake_image = await loadImage('https://photos.app.goo.gl/x6jKVEvZo6b86ftK7');
  // const mountainCake_image = await loadImage('https://photos.app.goo.gl/ZZ7PwaQjq4v19R1w7');
  // const oreoCake_image = await loadImage('https://photos.app.goo.gl/JVwp9EeeCkZLX4GDA');
  // const pooEmoji_image = await loadImage('https://photos.app.goo.gl/HcT6BwDqFRfwi8ra7');
  // const prettyInPinkCupcake_image = await loadImage('https://photos.app.goo.gl/z1wT7mkdLzavbHZk8');
  // const princessCake_image = await loadImage('https://photos.app.goo.gl/F7t4XE7XZRivzZHv5');
  // const rainbowCake_image = await loadImage('https://photos.app.goo.gl/jvJVLn3ukLyvR2aa8');
  // const skittlesCake_image = await loadImage('https://photos.app.goo.gl/Rfx5EBCGW9sPNPBZA');
  // const smallWeddingCake_image = await loadImage('https://photos.app.goo.gl/eWrzRw1wAczrGACF8');
  // const snowHouseCake_image = await loadImage('https://photos.app.goo.gl/7gAteaWMjx2G7zKZ6');
  // const soccerDirtCake_image = await loadImage('https://photos.app.goo.gl/PobgQ529WWHBFuZi7');
  // const thanksgivingCake_image = await loadImage('https://photos.app.goo.gl/fvKtVmTf6ovSMpMc6');
  // const unicornCake_image = await loadImage('https://photos.app.goo.gl/NYY2EHoEHpvgLb1z8');
  // const valentinesDayCake_image = await loadImage('https://photos.app.goo.gl/F2WtRkYry32MH13w5');
  // const weddingCake_image = await loadImage('https://photos.app.goo.gl/TVki5Q84KQsoqREt7');
  // const koalaCake_image = await loadImage('https://photos.app.goo.gl/bbV8n8J69gnMkSG86');


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

    createProduct({ name: 'Baby Baby Cake', price: 425.00, description: "This adorable baby cake can be customized in pink, blue, or as seen here, gender-neutral yellow. The interior can also be customized to pink or blue making a great gender-reveal cake. The cake itself is flavored with Mexican vanilla and a hint of cinnamon.", vip_price:382.5,category:'Special Occasions', productImage: 'https://dl.dropboxusercontent.com/s/3rlqt6vhid1dvg1bpqu7x/baby-baby-cake.jpg?rlkey=jvholqempkqutn9o3dmhm5iqk&dl=0'}),
    createProduct({ name: 'Beatles Cake', price: 200.00, description: 'This Beatles themed cake is perfect for the Beatles fanatic in your life. On the inside, layers of thick chocolate cake are covered with a salted caramel buttercream. On the outside of the cake, you have yummy white chocolate frosting, with carefully piped Beatles decorations.', vip_price:0, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/ylrieaxixmbehzme32kyp/beatles-cake.jpg?rlkey=4342v9xlbz3hq8hrtrf1g22bh&dl=0' }),
    createProduct({ name: 'Cookie Explosion', price: 350.00, description: "This cake is all about the cookies!  Each layer celebrates a different cookie.  At the bottom, there is a chocolate chip cake and frosting layer with pieces of chocolate chip cookies sprinkled on top.  Next is chocolate cake with Oreo frosting and sprinkles.  And last, there is a cinnamon cake with snickerdoodle frosting.  This is then covered with a chocolate ganache drip and topped with each of the three cookies, chocolate chip, Oreo, and snickerdoodles, as well as other chocolates and candies to make a great centerpiece to any cookie lovers’ party.", vip_price:0, category:'Special Occasions', productImage: 'https://dl.dropboxusercontent.com/s/8e4arsxkvxyf34ftigaxr/candy-aisle-cake.jpg?rlkey=vdp9b76hqv1ho3gnjf47vg5zb&dl=0' }),
    createProduct({ name: 'Triple Chocolate Stripes', price: 300.00, description:'The cake is full of stripes both inside and outside. Inside the cake are alternating layers of white and dark chocolate cake.  The frosting also alternates the same tasty white and dark chocolate flavors. Then it is covered in a milk chocolate ganache drip.',vip_price:0,category:'Special Occasions', productImage: 'https://dl.dropboxusercontent.com/s/940oj51diwblclb6lt77f/chocolate-stripes-cake.jpg?rlkey=tmuiq0t68ln171kec7xdc5kim&dl=0' }),
    createProduct({ name: 'Winter Rum Cake', price: 150.00, description:'This cake is perfect for an office Christmas party or bringing to any winter family celebration.  Everyone will have their choice of vanilla or chocolate rum soaked cakes shaped as train cars delivering presents for the holidays.',vip_price:135.00,category:'Holidays', productImage: 'https://dl.dropboxusercontent.com/s/35ez2ut4om96qk8l2ustw/christmas-train-cakes.jpg?rlkey=og0v1yga5hvqqrcqmqyupykaz&dl=0' }),
    createProduct({ name: 'Almond Joy Cupcakes', price: 100.00, description:'This elevated cupcake starts with a chocolate cake drizzled with a rum soak.  The top features a smooth coconut almond frosting sprinkled with toasted coconut for extra crunch.',vip_price: 0,category:'Cupcakes', productImage: 'https://dl.dropboxusercontent.com/s/cz6c6v9et1zlsjvgg4dx7/coconut-cupcake.jpg?rlkey=d786gg7sqdcp5plbcgr3fy2d4&dl=0' }),
    createProduct({ name: 'Pink Champagne Cupcakes', price: 150.00, description:'These cupcakes are perfect for a birthday, shower, or wedding as they can be customized with initials or numbers to match the occasion.  The cake is delicately flavored with strawberries while the frosting has a hint of champagne.',vip_price: 135.00,category:'Cupcakes', productImage: 'https://dl.dropboxusercontent.com/s/jcjfbqqhtcue3r7wuk1ez/cupcake-letters.jpg?rlkey=h3203qt54y2nur287qv1k1w3s&dl=0' }),
    createProduct({ name: 'Earl Grey Cupcakes', price: 75.00, description:'These cupcakes are perfect for the tea lover. The base is steeped in Earl Grey flavor while the frosting is flavored with a gourmet Italian extract called Fiori Di Sicillia.  This extract brings citrus and floral flavors which accentuate the flavors found in Earl Grey tea.', vip_price: 0, category:'Cupcakes', productImage: 'https://dl.dropboxusercontent.com/s/8dkhajdealrzeez4i1m31/earl-grey-cupcakes.jpg?rlkey=za7s57gd77u93l3yny1h64kiy&dl=0' }),
    createProduct({ name: 'Elmo Cupcakes', price: 100.00, description:'These kid-friendly cupcakes come in a mix of chocolate and vanilla cupcake bases.  The colorful frosting is a vanilla buttercream that both parents and kids will love.  The cupcakes can be customized with the age of the birthday boy or girl.', vip_price: 0, category:'Cupcakes', productImage: 'https://dl.dropboxusercontent.com/s/34iz1e6ygnoeppdb8k75t/elmo-cupcakes.jpg?rlkey=q1v01fdyscc479az3293d3k5q&dl=0' }),
    createProduct({ name: 'Woodland Fairy Cake', price: 400.00, description:"This beautiful woodland fairy cake is intricately decorated, from the stone-cut path leading to the entrance of the fairy’s home to the long blades of grass that litter the forest floor. A babbling creek runs alongside the tree-stump house, with detailed cut out windows and colorful flowers spreading luxuriously along the bark. Inside is a rich chocolate cake with decadent dark chocolate frosting, creating a memorable, beautiful, birthday cake.", vip_price: 360.00, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/e5q1nmadaw4y87mw3bfxv/fairy-cake.jpg?rlkey=alhqj8m1llzy4u44ts3ljo6d9&dl=0' }),
    createProduct({ name: 'The Flash Cake', price: 150.00, description:'This fun, Flash themed cake is perfect for the DC comics fan in your life. Inside you have Vanilla cake with a lemon zest buttercream, with a graham cracker crumble giving you the perfect amount of crunch. The outside is appropriately decorated with The Flash themed paraphernalia.', vip_price: 0, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/padr1dnl484bezin44lhl/flash-cake.jpg?rlkey=y86ulkxv9upundcr42hxkyjp8&dl=0' }),
    createProduct({ name: 'Tower of Flowers Cake', price: 200.00, description:'This beautiful blue two-tiered cake is great for weddings or showers.  It is carefully adorned with hundreds of delicate white flowers.  Inside the cake is a lightly lemon-flavored chiffon cake with a lemon mousse sandwiched between the cake layers.', vip_price: 180.00, category:'Special Occasions', productImage: 'https://dl.dropboxusercontent.com/s/fhfvljlj2wgxwf6ecb9gy/flower-cake.jpg?rlkey=scn8ntu15c3oq0zk8wrtur7ux&dl=0' }),
    createProduct({ name: "Mother's Day Bouquet", price: 250.00, description:"This cake is perfect for Valentine's Day, Mother's Day, or anytime you want to send flowers to that special someone.  The cupcakes are a light vanilla sponge cake with a creamy raspberry frosting.", vip_price: 225.00, category:'Holidays', productImage: 'https://dl.dropboxusercontent.com/s/v7p4iyxuu19w3sv2axa62/flower-pot-cupcakes.jpg?rlkey=ezj09h8dv74d7qp3t27q55i8g&dl=0' }),
    createProduct({ name: 'Celebration Cake', price: 150.00, description:'This gold and black accented cake is perfect for special birthday parties or anniversaries.  This can easily be decorated with the topper of your choice.  The frosting is a silky vanilla buttercream layered between rich vanilla pound cake, ensuring it is a delicious cake that everyone will enjoy.', vip_price: 0, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/z0q5v8xrj4r6fm59y8ccw/gold-black-cake.jpg?rlkey=vn1jl0yl0bc7758ktkcxgrsib&dl=0' }),
    createProduct({ name: 'Halloween Cupcakes', price: 150.00, description:'The Halloween Cupcakes come in a variety of flavors and decorations.  The pumpkin design is a pumpkin spice cake topped with a creamy vanilla frosting with just a hint of orange. The ghost design is a red velvet cake with a cream cheese frosting.  The frankenstein cupcake is a chocolate cupcake with vanilla frosting and chocolate sprinkles.  You can mix and match flavors and designs.', vip_price: 0, category:'Holidays', productImage: 'https://dl.dropboxusercontent.com/s/yiqomtfrkvphqs65il64z/halloween-cupcakes.jpg?rlkey=yepbzamf91xf6znj4hidmdynr&dl=0' }),
    createProduct({ name: 'Hello Kitty Cake', price: 200.00, description:'This cute Hello Kitty cake is simply the ONLY gift you will need to give any Hello Kitty fan for their birthday. Inside of the cake fluffy pink velvet cake is layered with succulent strawberry buttercream.', vip_price: 0, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/di4cl3p5u6jnv8kb7ir8l/hello-kitty-cupcake.jpg?rlkey=jiajxc142bt5h2f3e9ub0crku&dl=0' }),
    createProduct({ name: 'Margarita Cupcakes', price: 100.00, description:'This cupcake is a party in a bite.  The base is lightly flavored with lime zest and soaked in premium tequila.  This is topped with a lime and tequila spiked frosting and a small sprinkle of salt.  A sliver of lime and a straw finish off the cupcake with fun flair.', vip_price: 0, category:'Cupcakes', productImage: 'https://dl.dropboxusercontent.com/s/6tn5al33iyj4tq4pncglo/keylime-cupcake.jpg?rlkey=d6mlg4bid7paq4f79w23wq0eb&dl=0' }),
    createProduct({ name: "Maybe I'm Crazy Cake", price: 250.00, description:"This unique cake features unique flavors inside as well. The sponge cake inside is a rich vanilla olive oil cake. The frosting features an interesting blend of rosemary and ricotta making this the perfect cake for that person in your life that you just don't know what to get.", vip_price: 0, category:'Special Occasions', productImage: 'https://dl.dropboxusercontent.com/s/3i0fvz6covkntdiusln2c/maybe-im-crazy-cake.jpg?rlkey=1xdivvg2ebbe4b6oj6cdbgt48&dl=0' }),
    createProduct({ name: 'Mistletoe Cake', price: 300.00, description:'This Impressionist inspired cake is an almond crunch carrot cake perfect for the holidays.', vip_price: 0, category:'Holidays', productImage: 'https://dl.dropboxusercontent.com/s/ib6n59ijw337yny25vpe5/mistletoe-cake.jpg?rlkey=05mav15m65rm9e6079gne43fm&dl=0' }),
    createProduct({ name: 'Mountain View Cake', price: 300.00, description:'The mountain cake is perfect for everyone from the outdoorsman in your life to that outdoor wedding.  The cake is made of a fluffy vanilla cake flavored with real blueberries.  Between the cake layers, there is a light blueberry frosting and a slightly crunchy cinnamon crumble.', vip_price: 0, category:'Special Occasions', productImage: 'https://dl.dropboxusercontent.com/s/0s8nvg0e4i24ch493eerz/mountain-cake.jpg?rlkey=ev4zwagb37i77g93rjzjv862p&dl=0' }),
    createProduct({ name: 'Oreo Delight', price: 150.00, description:'Dense, rich chocolate cake is layered with Oreo buttercream.  Outside, the cake is drizzled with caramel and covered in more buttercream and Oreos for a decadent addition to any party.', vip_price: 0, category:'Special Occasions', productImage: 'https://dl.dropboxusercontent.com/s/svx7ybs8zikepumlty9pn/oreo-cake.jpg?rlkey=pw7nluwdvh679vfiuzld9ahw0&dl=0' }),
    createProduct({ name: 'Emoji Cupcakes', price: 150.00, description:'These whimsical cupcakes are sure to get a smile at any event.  They are made with a chocolate cake and a milk chocolate frosting that will make any chocolate lover happy.', vip_price: 135.00, category:'Cupcakes', productImage: 'https://dl.dropboxusercontent.com/s/mocujjmjx7wlyjxmt2rhi/poo-emoji-cupcakes.jpg?rlkey=k8w9pqc8nxncs6tk83sg7eu0s&dl=0' }),
    createProduct({ name: 'Pretty in Pink Cupcake', price: 150.00, description:'These cupcakes give a triple dose of raspberries.  The vanilla cupcake base is filled with raspberry jam. It is then covered with a creamy raspberry frosting, which is then topped with a white chocolate and raspberry candy shard.', vip_price: 0, category:'Cupcakes', productImage: 'https://dl.dropboxusercontent.com/s/f5ivrwuwx0mgo4x5zgeqn/pretty-in-pink-cupcake.jpg?rlkey=r59k043ufjr5iq2dovtzuvrou&dl=0' }),
    createProduct({ name: 'Pink Princess Cake', price: 250.00, description:"Although it is shown here as a birthday cake, the Pink Princess Cake will delight at any special event, whether it’s a quinceanera or a baby shower.  Inside the cake, you will find layers of checkerboard pink and white cake creating a beautiful surprise when you cut into the cake.", vip_price: 0, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/b8yguzf2q6w1o9p2a1jlr/princess-cake.jpg?rlkey=efw55gy8r8biyru2kvnoawnrt&dl=0' }),
    createProduct({ name: 'Fluffy Rainbow Cake', price: 200.00, description:'This yummy cake has five colorful layers, each flavored to match the corresponding color of the rainbow: cherry, orange, lemon, lime, and grape. It is decorated with a candy rainbow and clouds covered in rainbow Nerds surround the base.', vip_price: 180.00, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/3wv5nsvpo96vmjznp88vp/rainbow-cake.jpg?rlkey=ppb8va15bq4wwysvslkxjazh4&dl=0' }),
    createProduct({ name: 'Skittle Surprise', price: 200.00, description:'This cake is skittles themed, with a colorful, rainbow fruit surprise on the inside. Fluffy vanilla buttercream coats the layered rainbow layered cakes, soaked with a sweet syrup soak to ensure a moist and rich cake.', vip_price: 0, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/c0ypli8t0v8kl4ejsp6qm/skittles-cake.jpg?rlkey=s9qe9ofao2rhde3d0aa5qug92&dl=0' }),
    createProduct({ name: 'Lily Cake', price: 200.00, description:"This small three-layer cake makes a great casual wedding cake or is perfect for Mother's Day. It features a vanilla cake with whip cream frosting. The flowers on top are handpiped and edible.", vip_price: 0, category:'Special Occasions', productImage: 'https://dl.dropboxusercontent.com/s/k631em78xq7x74zrvwg7v/small-wedding-cake.jpg?rlkey=0do7lei4pkg2ni1aiocfqdtye&dl=0' }),
    createProduct({ name: 'Snow House Cake', price: 200.00, description:'This cake is inspired by holiday gingerbread houses. Instead of gingerbread flavors, this cake features a soft cool peppermint flavor in both the cake and the frosting. The cake is then surrounded by vanilla sugar cookies and decorated in whimsical blue and white frosting.', vip_price: 0, category:'Holidays', productImage: 'https://dl.dropboxusercontent.com/s/5ysq0xrs4xklvq7jkp03d/snow-house-cake.jpg?rlkey=y02hapeuf7kvtliu7750dok3c&dl=0' }),
    createProduct({ name: 'Sporty Dirt Cake', price: 200.00, description:"This fun dirt cake is the answer to anyone who can’t decide what to have for dessert: candy or cake?  The chocolate cake is filled with a creamy chocolate pudding and covered in chocolate frosting and Oreo crumbs to create the dirt.  This is then decorated with gummy worms and candy rocks.  The cake is then topped with green vanilla grass and customized with a sports ball of your choice.", vip_price: 0, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/j9p5x80vlhqg7j8r55ck8/soccer-dirt-cake.jpg?rlkey=oz5kb9hxf01udak619ruvc6vr&dl=0' }),
    createProduct({ name: 'Thanksgiving Cake', price: 200.00, description:'This chocolate and pumpkin flavored cake is the perfect centerpiece to your Thanksgiving table.', vip_price: 0, category:'Holidays', productImage: 'https://dl.dropboxusercontent.com/s/qwg9fctbeeqs3vcw0tqlj/thanksgiving-cake.jpg?rlkey=2aa9moxjl26bevynieql6slu8&dl=0' }),
    createProduct({ name: 'Unicorn Cake', price: 200.00, description:'This delightful unicorn cake is cute and yummy! Inside, you will find a plethora of colored vanilla cake layers, ranging from red to purple. Sweet vanilla frosting coats the outside, with adorable unicorn decorations, perfect for the young ones in your life.', vip_price: 0, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/qia7uhvq7sgrl2rzvztxa/unicorn-cake.jpg?rlkey=yix4nenft0uwfbmyoenslbtt2&dl=0' }),
    createProduct({ name: 'Hearts & Flowers', price: 150.00, description:"This heart-shaped cake is perfect for Valentine’s day. Its moist layers of pink velvet cake are alternated with a juicy jam filling. The outside is enveloped in decadent raspberry buttercream, with carefully piped flowers.", vip_price: 135.00, category:'Holidays', productImage: 'https://dl.dropboxusercontent.com/s/zn5epg9nil6gtbzc054n1/valentines-day-cake.jpg?rlkey=xf09v9p1e0xup1nkmrfqi39ds&dl=0' }),
    createProduct({ name: 'Peaches & Cream Wedding Cake', price: 500.00, description:'This two tiered wedding cake is composed of buttermilk cake, peach buttercream, and filled with peach compote.  The outside is covered in a silky French vanilla buttercream.  Delicate handmade flowers wrap around the outside of the cake.', vip_price: 0, category:'Special Occasions', productImage: 'https://dl.dropboxusercontent.com/s/kh5cs961bkfdqq5qd2o5u/wedding-cake.jpg?rlkey=csp11i6yqzrf7vfnt6ewhvg6u&dl=0' }),
    createProduct({ name: 'Koala Cake', price: 250.00, description:'An adorable birthday cake for the young ones in your life, with looks that are most uncanny to a real koala. Is it a koala, or is it cake? No one knows! Rich chocolate cake is topped with a velvety caramel buttercream, finished with koala and flower decorations.', vip_price: 225.00, category:'Birthdays', productImage: 'https://dl.dropboxusercontent.com/s/t4ta9qg1u3fmwrad93kyi/koala-cake.jpg?rlkey=02lhyzyunhk6h7tc0bl1rbxbs&dl=0' })    
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
