import express from 'express';
import { Op } from 'sequelize';
import Block from '../models/Block.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const whereClause = search
      ? {
          name: {
            [Op.iLike || Op.like]: `%${search}%`, // fallback for non-Postgres
          },
        }
      : {};

    const { rows: blocks, count: total } = await Block.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    res.json({
      blocks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Fetch blocks failed:', err.message);
    res.status(500).json({ message: 'Failed to fetch blocks.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    if (!block) return res.status(404).json({ message: 'Block not found' });
    res.json(block);
  } catch (err) {
    console.error('Fetch block by ID failed:', err.message);
    res.status(500).json({ message: 'Failed to fetch block.' });
  }
});

export default router;
