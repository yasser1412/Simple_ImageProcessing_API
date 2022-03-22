import sharp from 'sharp';

const image_process = async (
  input_image_fullpath: string,
  height: number,
  width: number,
  output_image_fullpath: string
) =>
  sharp(input_image_fullpath)
    .resize({ height: height, width: width })
    .toFile(output_image_fullpath)
    .then(function (new_file_info) {
      // newFileInfo holds the output file properties
      console.log(`updatedImage: ${new_file_info}`);
    })
    .catch(function (err) {
      console.log(`error: ${err}`);
    });

export default image_process;
