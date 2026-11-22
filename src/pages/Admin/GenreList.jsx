import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name: name.trim() }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message || "Creating genre failed, try again."
      );
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updatingName.trim()) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName.trim(),
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message || "Updating genre failed, try again."
      );
    }
  };

  const handleDeleteGenre = async () => {
    if (!selectedGenre?._id) return;

    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name || selectedGenre.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message || "Genre deletion failed. Try again."
      );
    }
  };

  const handleOpenEditModal = (genre) => {
    setSelectedGenre(genre);
    setUpdatingName(genre.name);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedGenre(null);
    setUpdatingName("");
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full shrink-0 md:w-64">
        <Sidebar />
      </aside>
      <div className="min-w-0 flex-1 p-4">
            <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-3 border-b border-slate-800/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Manage Genres
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Create new categories or click an existing genre pill to rename or delete it.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-400">
            <span>Total Genres</span>
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
              {genres?.length ?? 0}
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Create Genre Form */}
          <GenreForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateGenre}
            buttonText="Create Genre"
          />

          {/* Existing Genres List */}
          <section className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold tracking-tight text-white">
                Existing Genres
              </h2>
              <span className="text-xs text-slate-400">
                Click a genre to edit
              </span>
            </div>

            {genres && genres.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {genres.map((genre) => (
                  <button
                    key={genre._id}
                    type="button"
                    onClick={() => handleOpenEditModal(genre)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-950/80 px-4 py-2 text-sm font-medium text-slate-200 transition-all duration-150 hover:-translate-y-0.5 hover:border-amber-500/60 hover:bg-amber-500/10 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  >
                    <span>{genre.name}</span>
                    <span className="text-xs text-slate-500">Edit</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/50 py-10 text-center">
                <p className="text-sm text-slate-400">
                  No genres added yet. Use the form above to create your first genre.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Edit / Delete Modal */}
        <Modal
          isOpen={modalVisible}
          onClose={handleCloseModal}
          title={selectedGenre ? `Edit "${selectedGenre.name}"` : "Edit Genre"}
        >
          <GenreForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
      </div>
    </div>
  );
};

export default GenreList;
