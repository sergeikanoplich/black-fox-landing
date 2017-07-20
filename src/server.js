import path from 'path';
import fs from 'fs';
import {
  Server
} from 'http';
import Express from 'express';
import React from 'react';
import {
  renderToString
} from 'react-dom/server';
import {
  match,
  RouterContext
} from 'react-router';
import routes from './config/routes';

const manifest = JSON.parse(fs.readFileSync('./dist/manifest.json', 'utf8'));

const app = new Express();
const server = new Server(app);

app.use(Express.static(path.join(__dirname, '../dist/'), {
  index: false,
}));

app.get('*', (req, res) => {
  match({
    routes,
    location: req.url,
  },
  (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    let markup;
    if (renderProps) {
      markup = renderToString(
        <RouterContext {...renderProps} />
      );
    } else {
      res.status(404);
    }

    res.setHeader('Content-Type', 'text/html');
    const renderedHTML = renderToString(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>Black Fox Coffee</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <div
            id="root"
            dangerouslySetInnerHTML={{ __html: markup }}
          />
          <script src={`/${manifest['vendor.js']}`} />
          <script src={`/${manifest['app.js']}`} />
        </body>
      </html>
      );
    res.end(`<!doctype html>\n${renderedHTML}`);
  }
  );
});

const port = 3000;
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port}`);
});
