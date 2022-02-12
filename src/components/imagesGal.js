import "./comp.css";

export function ImagesGallery({ images }) {
  return (
    <div className="row pics">
      {images.map((src, index) => (
        <div key={index} className="col-sm-1">
          <div className="card">
            <img src={src} alt="pics" />
          </div>
        </div>
      ))}
    </div>
  );
}
