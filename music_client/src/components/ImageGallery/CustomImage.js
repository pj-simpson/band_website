import React from "react";

// Not currently using, but this could be the basis of a custom image component, see documentation: http://neptunian.github.io/react-photo-gallery/examples/selection.html

function CustomImage({ photo }) {
  return <img {...photo} alt="" />;
}

export default CustomImage;
