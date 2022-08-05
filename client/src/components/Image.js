import React from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { Delete } from "../actions/images";

function Image({ id, title, image, path, setImages }) {
  const deleteHandler = (id) => {
    Delete(id, setImages);
  };
  return (
    <div className="col-md-4 mt-4">
      <div className="img-thumbnail head">
        <em>{title}</em>
        <TrashIcon className="trash" onClick={() => deleteHandler(id)} />
      </div>
      <img
        src={path}
        alt={title}
        className="rounded img-thumbnail"
        width="100%"
        height="70px"
      />
    </div>
  );
}

export default Image;
