import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";



 
function FrequentlyBought({ products }) {

  const images = [
    "Koala Cake",
    "Cookie Explosion",
    "Woodland Fairy Cake",
    "Mother's Day Bouquet",
    "Skittle Surprise",
    "Mountain View Cake",
    "Oreo Delight",    
    "Unicorn Cake",    
  ];

  const favoriteProducts = products?.filter((product) => {
    return images.includes(product.name)
  })
  
  return (
    <Box>
      <Typography variant='h4'>
        Customer Favorites
      </Typography>
      <Container maxWidth="xl" sx={{ height: "25rem" }}>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={5}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {favoriteProducts?.map((product, index) => {
            return (
              <SwiperSlide key={`slide-${index}`}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: "20rem" }}
                    image={product.product_image}
                  />
                  <CardContent>
                    {/* <Typography variant="body2" color="text.secondary">
                      Cake description
                    </Typography> */}
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions> */}
                </Card>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Container>
    </Box>
  )
}

export default FrequentlyBought;