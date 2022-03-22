import image_process from '../utils/image_processing';
import path from 'path';

import { existsSync } from 'fs';

describe('image process function test', () => {
  const input_image = 'encenadaport';
  const width = 200;
  const height = 200;
  const output_image = input_image + `_thumb_w=${width}_h=${height}.jpg`;
  const input_image_fullpath = path.join(
    __dirname + `../../../assets/full/${input_image}.jpg`
  );
  const output_image_fullpath = path.join(
    __dirname + `../../../assets/thumb/${output_image}`
  );

  it('should generate resized image on valid inputs', async () => {
    await image_process(
      input_image_fullpath,
      width,
      height,
      output_image_fullpath
    );
    expect(existsSync(output_image_fullpath)).toBeTruthy;
  });

  it('should throw an error when passing invalid input image path', async () => {
    expect(
      await image_process(
        'input_image_fullpath',
        width,
        height,
        output_image_fullpath
      )
    ).toThrow;
  });
  it('should throw an error when passing invalid output image path', async () => {
    expect(
      await image_process(
        input_image_fullpath,
        width,
        height,
        'output_image_fullpath'
      )
    ).toThrow;
  });
});
