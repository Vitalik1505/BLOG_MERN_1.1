import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Невдала спроба отримати статті",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Невдала спроба отримати статті",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedDoc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      }
    ).populate('user');

    if (!updatedDoc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json(updatedDoc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndDelete({ _id: postId });

    if (!doc) {
      return res.status(404).json({
        message: "Стаття не знайдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Невдалось видалити статтю",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(','),
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Невдала спроба створити статтю",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(','),
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Невдалось оновити статтю",
    });
  }
};