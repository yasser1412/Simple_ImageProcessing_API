# Simple_ImageProcessing_API

## A simple Nodejs API that resizes an image by User demand 

- a User selects a file name and the required new image size, the api resizes the image and shows it on the web

- the Api handels multiple requests by caching the resized images so it wont regenerated again.

```   
```
# EndPoints

1. Home Page:
``` http://localhost:3000/api ```

2. ProcessingImages:
``` http://localhost:3000/api/images ``` 

3. Required Query Parameters:
```api/images?filename={image_name}&width={new-width}&height={new-height}``` 
#
## How To Use:

- Install required modules:
`npm i`

- To Run The Server: 
`npm run start`

- To Run Tests: 
`npm run test`

All you need to do is to hit the endpoint of processingimages by this format: 
``` http://localhost:3000/api/images?filename={image_name}&width={new-width}&height={new-height} ``` 

### It's Required to use the images stored in assets/full directory 