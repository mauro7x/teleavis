import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

// Elements
import NavBar from '../components/NavBar';
import Home from './Home';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import Tracks from './Tracks';
import Footer from '../components/Footer';
import { Container, useColorModeValue } from '@chakra-ui/react';

export default function Router() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <BrowserRouter>
      <NavBar />
      <Container maxW={'full'} bg={bgColor} minHeight={'100vh'}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/study-tracks" element={<Tracks />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/create-review" element={<CreateReview />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}
