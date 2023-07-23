import React from "react";
import PropTypes from "prop-types";
import { convertBase64 } from "utils/convertBase64";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import ZoomSlider from "components/ZoomSlider";
import EmptyImage from "assets/images/emptyImage.jpg";

const CreateImage = ({ setItemData,  itemData}) => {

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setItemData((prev) => [...prev, { image: base64, file: file }]);
  };

  return (
    <SoftBox>
      <ZoomSlider
        images={
          (itemData.length !== 0 && itemData) || [
            {
              image: EmptyImage,
            },
          ]
        }
      />
      <SoftBox display="flex" justifyContent="flex-end">
        <input
          style={{ display: "none" }}
          id="contained-button-file"
          onChange={(e) => handleFileRead(e)}
          type="file"
        />
        <SoftButton
          htmlFor="contained-button-file"
          variant="gradient"
          component="label"
          color="info"
        >
          Add Image
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
};


CreateImage.propTypes = {
  setItemData: PropTypes.any,
  itemData: PropTypes.any
};

export default CreateImage;