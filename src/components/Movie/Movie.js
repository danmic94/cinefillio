import placeholder_hq from "./placeholder_hq.jpg";

function Movie(props) {
  return (
    <div className="card mb-3 movie-card" style={{ maxWidth: "45.25%" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={props.src.length < 10 ? placeholder_hq : props.src}
            className="img-fluid rounded-start"
            alt="movie-poster"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <p className="card-text">
              <small className="text-muted">Year of relase: {props.year}</small>
            </p>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                console.log("test");
              }}
            >
              <i className="bi bi-star"></i>
              <span className="favourites-text">Favourite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
