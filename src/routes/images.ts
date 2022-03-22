import express from 'express';
import path from 'path';
import image_process from '../utils/image_processing';
import { existsSync } from 'fs';

const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response) => {
  const input_image = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  const output_image = input_image + `_thumb_w=${width}_h=${height}.jpg`;

  const input_image_fullpath = path.join(
    __dirname + `../../../assets/full/${input_image}.jpg`
  );

  const output_image_fullpath = path.join(
    __dirname + `../../../assets/thumb/${output_image}`
  );

  if (!input_image) {
    res.status(400).send(`<h1>Please enter a file name</h1>`);
    return;
  } else if (!width || !height) {
    res.status(400).send(`<h1>Please enter width and height</h1>`);
    return;
  }

  if (existsSync(output_image_fullpath)) {
    console.log(`pre-stored image is sent`);

    res.status(304).sendFile(output_image_fullpath);
    return;
  } else if (existsSync(input_image_fullpath) && width >= 1 && height >= 1) {
    try {
      await image_process(
        input_image_fullpath,
        width,
        height,
        output_image_fullpath
      );
      console.log(`generated a new image`);

      res.status(200).sendFile(output_image_fullpath);
      return;
    } catch (err) {
      res.status(500).send(`<h1>Something went worng :(</h1>`);
    }
  } else {
    res
      .status(404)
      .send(
        `<h1>Requaired image is not valid, please enter a valid file name</h1>`
      );
    return;
  }
});

export default images;
