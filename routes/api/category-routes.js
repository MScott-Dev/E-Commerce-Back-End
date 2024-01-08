const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
 try {
  const categoryData = await Category.findAll();
  res.status(200).json(categoryData);
 } catch (err) {
  res.status(500).json(err);
 }
});

router.get('/:id', async (req, res) => {
  try { const categoryData = await Category.findByPK(req.params.id, {
    include: [{model: Category}]
  });

  if (!categoryData) {
    res.status(404).json({mesage: 'No category found with that id!'});
  }

  res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await categoryData.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await categoryData.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await categoryData.destory({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category with that id!'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
