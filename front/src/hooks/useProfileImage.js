// useProfileImage.js
import { useEffect, useState } from "react";
import { deleteImage, uploadImage } from "../api/imageAPI";

const useProfileImage = (printInItImage, originalImage) => {
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(printInItImage);

  useEffect(() => {
    setImgSrc(printInItImage);
  }, [printInItImage]);

  // 이미지 업로드시 배경 변경
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("배경변경");
    console.log(file);
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    }
    setFile(file);
  };

  const saveFile = async () => {
    const formData = new FormData();

    // originalImage가 정의되어 있고 null이 아닌지 확인
    if (originalImage && !originalImage.startsWith("http:")) {
      console.log("기존 이미지 파일 삭제");
      try {
        const res = await deleteImage(originalImage);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }

    // 파일이 있는 경우에만 formData에 추가
    if (file) {
      console.log(file);
      formData.append("file", file);
    }

    try {
      const res = await uploadImage(formData);
      console.log("이미지 업로드 성공");
      console.log(formData);
      return res;
    } catch (err) {
      console.error(err);
    }
    console.log(formData);
  };

  return { imgSrc, handleFileChange, saveFile };
};

export default useProfileImage;
