const pool = require("../../config");

module.exports = {
  getarticles: (data, callBack) => {
    pool.query(`SELECT * FROM articles ORDER BY date_time ASC`, [], (error, results, fields) => {
      if (error) {
        return callBack(error, null);
      }
      return callBack(null, results);
    });
  },
  getsinglearticle: (article_id, callBack) => {
    pool.query(
      `SELECT * FROM articles WHERE article_id = ?`,
      [article_id],
      (error, article, fields) => {
        if (error) {
          return callBack(error, null, null);
        } else {
          pool.query(
            `SELECT * FROM article_content WHERE article_id = ? ORDER BY date_time ASC`,
            [article_id],
            (err, content, fields) => {
              if (error) {
                return callBack(err, null, null);
              } else {
                return callBack(null, article[0], content);
              }
            }
          );
        }
      }
    );
  },
  newarticle: (article_id, data, image, callBack) => {
    pool.query(
      `INSERT INTO articles(article_id, author, image, title, content) VALUES(?,?,?,?)`,
      [article_id, data.author, image, data.title, data.description],
      (error) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null);
        }
      }
    );
  },
  addarticlecontent: (article_id, content_id, data, image, callBack) => {
    pool.query(
      `INSERT INTO article_content(article_id, content_id, title, image, content) VALUES(?,?,?,?,?)`,
      [article_id, content_id, data.title, image, data.description],
      (error) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null);
        }
      }
    );
  },
  addcontent: (article_id, content_id, data, callBack) => {
    pool.query(
      `INSERT INTO article_content(article_id, content_id, title, image, content) VALUES(?,?,?,?,?)`,
      [article_id, content_id, data.title, data.image, data.description],
      (error) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null);
        }
      }
    );
  },
  addarticle: (article_id, data, callBack) => {
    pool.query(
      `INSERT INTO articles(article_id, author, image, title, content) VALUES(?,?,?,?,?)`,
      [article_id, data.author, data.image, data.title, data.description],
      (error) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null);
        }
      }
    );
  },
};
