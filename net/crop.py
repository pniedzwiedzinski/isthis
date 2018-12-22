from PIL import Image
from os import listdir
from os.path import isfile, join

def crop(img):
    width, height = img.size
    crop_rectangle = ((width - height)//2, 0, (width - height)//2 + height, height)
    cropped_img = img.crop(crop_rectangle)
    result = cropped_img.rotate(-90)
    return result

if __name__ == "__main__":
    for path in ['apple', 'not_apple']:
        onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
        for id, fp in enumerate(onlyfiles):
            print(str(fp))
            if str(fp)[-4:] != '.jpg' and str(fp)[-4:] != '.JPG':
                continue
            im = Image.open(path+ '/' + str(fp))
            result = crop(im)
            result.save('cropped/' + path + '/' + id + '.jpeg')