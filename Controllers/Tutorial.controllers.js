const db = require("../Models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    };

    const data = await Tutorial.create(tutorial);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const title = req.query.title;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const data = await Tutorial.findAll({ where: condition });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Tutorial.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Tutorial with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [num] = await Tutorial.update(req.body, {
      where: { id: id },
    });
    if (num === 1) {
      res.send({
        message: "Tutorial was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Tutorial.destroy({
      where: { id: id },
    });
    if (num === 1) {
      res.send({
        message: "Tutorial was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Tutorial with id=" + id,
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const nums = await Tutorial.destroy({
      where: {},
      truncate: false,
    });
    res.send({ message: `${nums} Tutorials were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all tutorials.",
    });
  }
};

exports.findAllPublished = async (req, res) => {
  try {
    const data = await Tutorial.findAll({ where: { published: true } });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};
