from PIL import Image
from os import listdir
from os.path import isfile, join


for path in ['apple', 'not_apple']:
    onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
    for id, fp in enumerate(onlyfiles):
        print(str(fp))
        if str(fp)[-4:] != '.jpg' and str(fp)[-4:] != '.JPG':
            continue
        im = Image.open(f'{path}/{str(fp)}')
        width, height = im.size

        crop_rectangle = ((width - height)//2, 0, (width - height)//2 + height, height)
        cropped_im = im.crop(crop_rectangle)

        result = cropped_im.rotate(-90)

        result.save(f'cropped/{path}/{id}.jpeg')