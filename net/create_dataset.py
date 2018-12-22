from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
import os
import random

datagen = ImageDataGenerator(
    rotation_range=40,
    width_shift_range=0.2,
    height_shift_range=0.2,
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

for a in ['train', 'test']:
    for path in ['apple', 'not_apple']:
        for i in range(16):
            while True:
                i = str(random.randint(0, 44))
                if os.path.isfile(os.path.join(f'cropped/{path}/{i}.jpeg')):
                    break
            filename = f'cropped/{path}/{i}.jpeg'
            print(filename)
            img = load_img(filename, target_size=(150, 150))  # this is a PIL image
            x = img_to_array(img)  # this is a Numpy array with shape (3, 150, 150)
            x = x.reshape((1,) + x.shape)  # this is a Numpy array with shape (1, 3, 150, 150)

            # the .flow() command below generates batches of randomly transformed images
            # and saves the results to the `preview/` directory
            i = 0
            for batch in datagen.flow(x, batch_size=1,
                                    save_to_dir=f'data/{a}/{path}', save_prefix='data', save_format='jpeg'):
                i += 1
                if i > 10:
                    break  # otherwise the generator would loop indefinitely
