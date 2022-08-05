import "./App.css";
import { SwitchVerticalIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useEffect } from "react";
import { Add, FindAll } from "./actions/images";
import Image from "./components/Image";
import { useForm } from "react-hook-form";
import classnames from "classnames";
function App() {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    FindAll(setImages);
  }, []);
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image[0]);
    Add(formData, setImages, setErrors);
  };
  return (
    <div className="App container p-4">
      <div className="form_index">
        <div>
          <button
            className="btn btn-outline-primary sm"
            onClick={() => setShow(!show)}
          >
            <SwitchVerticalIcon style={{ width: "20px" }} />
          </button>
        </div>
        {show ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-goup">
              <input
                type="text"
                {...register("title")}
                className={classnames("form-control mt-4", {
                  "is-invalid": errors.title,
                })}
              ></input>
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <div className="form-goup">
              <input
                type="file"
                {...register("image")}
                className={classnames("form-control mt-4", {
                  "is-invalid": errors.image,
                })}
              ></input>
              {errors.image && (
                <div className="invalid-feedback">{errors.image}</div>
              )}
            </div>
            <button type="" className="btn btn-outline-primary sm mt-4">
              Save
            </button>
          </form>
        ) : (
          ""
        )}
      </div>
      <div className="gallery_index">
        <div className="row">
          {images.map(({ _id, title, image, path }) => (
            <Image
              id={_id}
              title={title}
              image={image}
              path={path}
              setImages={setImages}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
