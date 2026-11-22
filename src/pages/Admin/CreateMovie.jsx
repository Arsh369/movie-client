import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: "",
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [castInput, setCastInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  const previewUrl = useMemo(() => {
    if (!selectedImage) return null;
    return URL.createObjectURL(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (genres?.length) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: prevData.genre || genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "year") {
      setMovieData((prevData) => ({
        ...prevData,
        year: value === "" ? "" : Number(value),
      }));
      return;
    }

    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCastChange = (e) => {
    const raw = e.target.value;
    setCastInput(raw);
    const parsedCast = raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setMovieData((prevData) => ({
      ...prevData,
      cast: parsedCast,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
  };

  const handleCreateMovie = async (e) => {
    e?.preventDefault();

    try {
      if (
        !movieData.name.trim() ||
        !movieData.year ||
        !movieData.detail.trim() ||
        movieData.cast.length === 0 ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedImage);

      const uploadImageResponse = await uploadImage(formData).unwrap();
      const uploadedImagePath = uploadImageResponse?.image;

      if (!uploadedImagePath) {
        console.error("Failed to upload image: ", uploadImageErrorDetails);
        toast.error("Failed to upload image");
        return;
      }

      await createMovie({
        ...movieData,
        name: movieData.name.trim(),
        detail: movieData.detail.trim(),
        image: uploadedImagePath,
      }).unwrap();

      setMovieData({
        name: "",
        year: "",
        detail: "",
        cast: [],
        rating: 0,
        image: null,
        genre: genres?.[0]?._id || "",
      });
      setCastInput("");
      setSelectedImage(null);

      toast.success("Movie Added To Database");
      navigate("/admin/movies-list");
    } catch (error) {
      console.error("Failed to create movie: ", error || createMovieErrorDetail);
      toast.error(
        error?.data?.message ||
          createMovieErrorDetail?.data?.message ||
          "Failed to create movie"
      );
    }
  };

  const isBusy = isCreatingMovie || isUploadingImage;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b border-slate-800/80 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Create Movie
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Add a new title with release year, cast, genre, and poster artwork.
          </p>
        </div>

        <form
          onSubmit={handleCreateMovie}
          className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl shadow-black/40 backdrop-blur-sm sm:p-8 lg:grid-cols-12"
        >
          {/* Left Column: Core Details */}
          <div className="space-y-5 lg:col-span-7">
            <div>
              <label
                htmlFor="movie-name"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Movie Name
              </label>
              <input
                id="movie-name"
                type="text"
                name="name"
                value={movieData.name}
                onChange={handleChange}
                placeholder="e.g. Interstellar"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="movie-year"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Release Year
                </label>
                <input
                  id="movie-year"
                  type="number"
                  name="year"
                  value={movieData.year}
                  onChange={handleChange}
                  placeholder="2024"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="movie-genre"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Genre
                </label>
                <select
                  id="movie-genre"
                  name="genre"
                  value={movieData.genre}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  {isLoadingGenres ? (
                    <option value="">Loading genres...</option>
                  ) : (
                    genres?.map((genre) => (
                      <option key={genre._id} value={genre._id}>
                        {genre.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="movie-cast"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Cast (comma-separated)
              </label>
              <input
                id="movie-cast"
                type="text"
                name="cast"
                value={castInput}
                onChange={handleCastChange}
                placeholder="Actor One, Actor Two, Actor Three"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="movie-detail"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Synopsis / Details
              </label>
              <textarea
                id="movie-detail"
                name="detail"
                rows={4}
                value={movieData.detail}
                onChange={handleChange}
                placeholder="Write a brief plot summary or notes..."
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          {/* Right Column: Poster Upload & Live Preview */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                Poster Artwork
              </span>

              {previewUrl ? (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-xl border border-slate-700/80 bg-slate-950">
                    <img
                      src={previewUrl}
                      alt="Selected movie poster preview"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span className="truncate">{selectedImage?.name}</span>
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="shrink-0 font-medium text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="movie-image"
                  className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/70 px-4 py-6 text-center transition hover:border-amber-500/60 hover:bg-slate-900/80"
                >
                  <span className="text-sm font-semibold text-amber-400">
                    Upload Poster Image
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    PNG, JPG, or WEBP recommended
                  </span>
                </label>
              )}

              <input
                id="movie-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={previewUrl ? "mt-3 block w-full text-xs text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-200 hover:file:bg-slate-700" : "sr-only"}
              />
            </div>

            <div className="border-t border-slate-800/80 pt-5">
              <button
                type="submit"
                disabled={isBusy}
                className="inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-500/25 transition-all duration-200 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUploadingImage
                  ? "Uploading Image..."
                  : isCreatingMovie
                  ? "Creating Movie..."
                  : "Create Movie"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMovie;