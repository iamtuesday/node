/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export const VideoUpload = () => {
  const [file, setFile] = useState<File | undefined>();
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState<boolean>();

  const handleSubmit = async () => {
    const data = new FormData();

    if (!file) return;

    setSubmitting(true);

    data.append("file", file);

    const config: AxiosRequestConfig = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;

        setProgress(percentCompleted);
      },
    };

    try {
      await axios.post("http://localhost:4000/videos", data, config);
    } catch (e: any) {
      console.log(e)
      setError(e.message);
    } finally {
      setSubmitting(false);
      setProgress(0);
    }
  };

  const handleSetFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files)

    if (files?.length) {
      setFile(files[0]);
    }
  };

  return (
    <div>
      {error && <p>{error} </p>}
      {submitting && <p>{progress}</p>}
      <form>
        <label htmlFor="file">Upload Video</label>
        <input type="file" id="file" accept=".mp4" onChange={handleSetFile} />
      </form>
      <button onClick={handleSubmit}>Upload File</button>
    </div>
  );
};

