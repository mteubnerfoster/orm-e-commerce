const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const allTag = await Tag.findAll({include: [{ model: Product }]})
    if (!allTag) {
      res.status(404).json({message: `The database currently has no tags.`})
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
      res.status(404).json({message: `There are no tags with this ID in the database.`})
      return
    }
    res.status(200).json(oneTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } })
    if (!updateTag) {
      res.status(404).json({message: 'Tag does not exist.'})
      return
    }
    res.status(200).json(updateTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({where: { id: req.params.id }})
    if (!deleteTag) {
      res.status(404).json({message: `Entered tag does not exist in the database.`})
      return
    }
    res.status(200).json({message: `Tag deleted from the database.`})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
