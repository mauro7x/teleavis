import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container, useColorModeValue } from '@chakra-ui/react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Pages
import Private from './Private';
import NotFound from './NotFound';
import Home from './Home';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import Tracks from './Tracks';

export default function Router() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <BrowserRouter>
      <NavBar />
      <Container maxW={'full'} bg={bgColor} minHeight={'80vh'}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/study-tracks" element={<Tracks />} />
          <Route path="/my-reviews" element={Private(MyReviews)} />
          <Route path="/create-review" element={Private(CreateReview)} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}
