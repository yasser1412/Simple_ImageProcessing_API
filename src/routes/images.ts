import express from 'express';
import path from 'path';
import image_process from '../utils/image_processing';
import { existsSync } from 'fs';

const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  // storing query variables
  const input_image = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  // init resized image name
  const output_image = input_image + `_thumb_w=${width}_h=${height}.jpg`;

  // getting the input image full path
  const input_image_fullpath = path.join(
    __dirname + `../../../assets/full/${input_image}.jpg`
  );

  // init resized image full path
  const output_image_fullpath = path.join(
    __dirname + `../../../assets/thumb/${output_image}`
  );

  // checks for empty query parameters 
  if (!input_image) {
    res.status(400).send(`<h1>Please enter a file name</h1>`);
    return;
  } else if (!width || !height) {
    res.status(400).send(`<h1>Please enter width and height</h1>`);
    return;
  }

  // checks if the required process image is already cached on the device 
  if (existsSync(output_image_fullpath)) {

    // no change response
    res.status(304).sendFile(output_image_fullpath);
    return;

    // checks if the input image is in our images collection
    // and checks for valid width and height for the resized image
  } else if (existsSync(input_image_fullpath) && width >= 1 && height >= 1) {
    try {
      // calling the image process function that resizes the image
      await image_process(
        input_image_fullpath,
        width,
        height,
        output_image_fullpath
      );
      res.status(200).sendFile(output_image_fullpath);
      return;

    } catch (err) {
      res.status(500).send(`<h1>Something went worng :(</h1>`);
    }
    // if the input image is not in our collection
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
