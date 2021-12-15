const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{model: Product}]
    })
    if (!categories) {
      res.status(404).json({message: 'The database is empty.'})
      return
    }
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if (!categories) {
      res.status(404).json({message: 'No categories found with this ID.'})
      return
    }
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categories = await Category.create(req.body)
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update(
      {category_name: req.body.category_name},
      {where: {id: req.params.id}})
    if(!categories){
      res.status(404).json({message: 'No categories found with this name.'})
      return
    } 
     res.status(200).json(categories)
   } catch (err) {
     res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({where: {id: req.params.id}})
    if (!categories) {
      res.status(404).json({message: 'Category removed.'})
      return
    }
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
