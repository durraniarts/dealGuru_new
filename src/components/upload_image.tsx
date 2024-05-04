import React, { useState } from "react";
import ImageUploading from "react-images-uploading";

export function UploadImage({ setImageData }: any) {
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList: any) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setImageData(imageList);
    // console.log(images);
  };

  return (
    <div className="flex flex-col gap-4  ">
      <p className="font-medium text-sm">Image</p>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className=" flex flex-col relative items-end w-full ">
            <button
              className="border border-border w-full h-[150px] rounded-md text-gray-500 font-light text-base"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            {/* <button
              onClick={onImageRemoveAll}
              className="bg-bg_color text-white p-2 rounded-md w-fit "
            >
              Remove all images
            </button> */}
            {imageList.map((image, index) => (
              <div key={index} className=" absolute left-0 p-2 w-full ">
                <div className="flex justify-center w-full h-max ">
                  <img
                    src={image["data_url"]}
                    alt=""
                    width="100"
                    className=" rounded-md h-[135px] w-auto object-scale-down"
                  />
                </div>
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => onImageUpdate(index)}
                    className="p-2 rounded-md bg-bg_color text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onImageRemove(index)}
                    className="p-2 rounded-md bg-bg_color text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
