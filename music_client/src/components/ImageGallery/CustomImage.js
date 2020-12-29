import React from "react";

function CustomImage (photo) {

  return (
      <div className="tooltip">
        <img {...photo}/>
        <span class="tooltiptext">{photo.credit}</span>
    </div>

  );
};

export default CustomImage;
