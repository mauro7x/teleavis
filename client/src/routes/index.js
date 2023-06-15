import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

// Elements
import NavBar from '../components/NavBar';
import Home from './Home';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import Ranking from './Ranking';

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
