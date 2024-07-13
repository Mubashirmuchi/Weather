const express = require('express');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const authenticate = (req, res, next) => {
  // const token = req.cookies?.token;
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.post('/favorite',authenticate, async (req, res) => {
  const { userId, city } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const favorite = await prisma.favorite.create({
            data: {
              userId: req.body.userId,
              city,
            },
          });
          res.status(201).json({ message: 'Favorite city set successfully', favorite });

  } catch (error) {
    console.error('Error setting favorite city:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/favorite', authenticate, async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.userId },
      include: { user: true },
    });
    res.json(favorites);
  } catch {
    res.status(500).json({ error: 'Failed to fetch favorite cities' });
  }
});

module.exports = router;







