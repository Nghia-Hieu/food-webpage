import toast from "react-hot-toast";
import Image from "next/image";
export default function EditableImage({
  link,
  setLink,
}: {
  link: any;
  setLink: any;
}) {
  async function handleImageChange(ev: any) {
    const file = ev.target.files;
    if (file?.length === 1) {
      const data = new FormData();
      data.set("file", file[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Something went wrong");
      });
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Image updated!",
        error: "Upload error",
      });
    }
  }
  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={120}
          height={120}
          alt={"avatar"}
        ></Image>
      )}
      {!link && (
        <div className="bg-gray-200 text-center p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}

      <label>
        <input type="file" className="hidden" onChange={handleImageChange} />
        <span className="block border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Edit
        </span>
      </label>
    </>
  );
}
