const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const allTag = await Tag.findAll({include: [{ model: Product }]})
    if (!allTag) {
      res.status(404).json({ message: `The database currently has no tags.` })
      return
    }
    res.status(200).json(allTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // includes associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {include: [{ model: Product }]})
    if (!oneTag) {
      res.status(404).json({ message: `There are no tags with this ID in the database.` })
      return
    }
    res.status(200).json(oneTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
