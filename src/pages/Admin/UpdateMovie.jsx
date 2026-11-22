import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: "",
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [castInput, setCastInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData({
        ...initialMovieData,
        cast: Array.isArray(initialMovieData.cast) ? initialMovieData.cast : [],
      });
      setCastInput(
        Array.isArray(initialMovieData.cast)
          ? initialMovieData.cast.join(", ")
          : ""
      );
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [deleteMovie, { isLoading: isDeletingMovie }] =
    useDeleteMovieMutation();

  const previewUrl = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
    return movieData.image || null;
  }, [selectedImage, movieData.image]);

  useEffect(() => {
    if (!selectedImage || !previewUrl) return;
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [selectedImage, previewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: name === "year" ? (value === "" ? "" : Number(value)) : value,
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

  const handleClearNewImage = () => {
    setSelectedImage(null);
  };

  const handleUpdateMovie = async (e) => {
    e?.preventDefault();

    try {
      if (
        !movieData.name?.trim() ||
        !movieData.year ||
        !movieData.detail?.trim() ||
        !movieData.cast?.length
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData).unwrap();

        if (uploadImageResponse?.image) {
          uploadedImagePath = uploadImageResponse.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id,
        updatedMovie: {
          ...movieData,
          name: movieData.name.trim(),
          detail: movieData.detail.trim(),
          image: uploadedImagePath,
        },
      }).unwrap();

      toast.success("Movie updated successfully");
      navigate("/movies");
    } catch (error) {
      console.error("Failed to update movie:", error);
      toast.error(error?.data?.message || "Failed to update movie");
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(id).unwrap();
      toast.success("Movie deleted successfully");
      navigate("/movies");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error(
        error?.data?.message || `Failed to delete movie: ${error?.message || ""}`
      );
    }
  };

  const isBusy = isUpdatingMovie || isUploadingImage || isDeletingMovie;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b border-slate-800/80 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Update Movie
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Edit movie metadata, replace poster artwork, or remove this title.
          </p>
        </div>

        <form
          onSubmit={handleUpdateMovie}
          className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl shadow-black/40 backdrop-blur-sm sm:p-8 lg:grid-cols-12"
        >
          {/* Left Column: Movie Details */}
          <div className="space-y-5 lg:col-span-7">
            <div>
              <label
                htmlFor="update-movie-name"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Name
              </label>
              <input
                id="update-movie-name"
                type="text"
                name="name"
                value={movieData.name || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="update-movie-year"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Year
              </label>
              <input
                id="update-movie-year"
                type="number"
                name="year"
                value={movieData.year ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="update-movie-cast"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Cast (comma-separated)
              </label>
              <input
                id="update-movie-cast"
                type="text"
                name="cast"
                value={castInput}
                onChange={handleCastChange}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="update-movie-detail"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Detail
              </label>
              <textarea
                id="update-movie-detail"
                name="detail"
                rows={4}
                value={movieData.detail || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          {/* Right Column: Poster Preview & Actions */}
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
                      alt={movieData.name || "Movie poster"}
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span className="truncate">
                      {selectedImage
                        ? `New file: ${selectedImage.name}`
                        : "Current poster"}
                    </span>
                    {selectedImage && (
                      <button
                        type="button"
                        onClick={handleClearNewImage}
                        className="shrink-0 font-medium text-amber-400 hover:text-amber-300"
                      >
                        Revert image
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/60 text-xs text-slate-500">
                  No poster available
                </div>
              )}

              <label
                htmlFor="update-movie-image"
                className="mt-3 block cursor-pointer"
              >
                <span className="inline-flex w-full items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-amber-500/50 hover:bg-slate-800">
                  {selectedImage ? "Choose Another Image" : "Replace Image"}
                </span>
                <input
                  id="update-movie-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-800/80 pt-5 sm:flex-row">
              <button
                type="submit"
                disabled={isBusy}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-500/25 transition-all duration-200 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUploadingImage
                  ? "Uploading..."
                  : isUpdatingMovie
                  ? "Updating..."
                  : "Update Movie"}
              </button>

              <button
                type="button"
                onClick={handleDeleteMovie}
                disabled={isBusy}
                className="inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeletingMovie ? "Deleting..." : "Delete Movie"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;