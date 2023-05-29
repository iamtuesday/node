import busboy from "busboy";
import { Request, Response } from "express";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

//busboy is a middleware for handling multipart/form-data, which is primarily used for uploading files.
export const uploadVideoStream = (req: Request, res: Response) => {
  const bb = busboy({ headers: req.headers });

  // Evento 'file' se dispara cuando se encuentra un archivo en la solicitud
  bb.on("file", (_, file, info) => {
    /*_ es el nombre del campo del formulario =>  es una convención para indica
      que el parámetro no se utilizará en el cuerpo de la función. */
    //info => contiene información sobre el archivo como el nombre, tamaño, etc.
    //file => es un stream de lectura que contiene el contenido del archivo.
    const fileName = info.filename;
    const saveTo = `./uploads/${fileName}`;

    //validar que el archivo sea de tipo video => info.mimetype.startsWith("video/")
    if (!fileName.match(/\.(mp4)$/)) {
      res.status(400).send({
        status: "error",
        message: "Only video files are allowed!",
      });
      return;
    }

    // Crea un flujo de escritura para guardar el archivo en el sistema de archivos
    const stream = fs.createWriteStream(saveTo);

    //Manejar errores de escritura en el archivo
    stream.on("error", (error) => {
      console.log("Error saving the file: ", error);
      return res.status(500).send({
        status: "error",
        message: "Error saving the file",
      });
    });

    //Finaliza el flujo de escritura cuando se termina de leer el archivo
    stream.on("close", () => {
      console.log(`File saved as ${fileName}`);
    });

    file.pipe(stream);
  });

  bb.on("close", () => {
    res.writeHead(200, { Connection: "close" });
    res.end(`File uploaded successfully!`);
  });

  return req.pipe(bb);
};

const CHUNK_SIZE_IN_BYTES = 1000000; // 1 mb

export const getVideoStream = (req: Request, res: Response) => {
  const range = req.headers.range;
  console.log("range: ", range);
  if (!range) {
    res.status(400).send("Rang must be provided");
  }

  // Obtener el id del video
  const videoId = req.query.id;
  console.log("videoIdsss: ", videoId);

  // Obtener la ruta del video
  const videoPath = `./uploads/${videoId}.mp4`;
  console.log("videoPath: ", videoPath);

  // Obtener el tamaño del video
  const videoSizeInBytes = fs.statSync(videoPath).size;
  console.log("videoSizeInBytes: ", videoSizeInBytes);

  // Parsear el rango
  const chunkStart = Number(range?.replace(/\D/g, ""));
  console.log("chunkStart: ", chunkStart);

  // Calcular el tamaño del chunk
  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    videoSizeInBytes - 1
  );
  console.log("chunkEnd: ", chunkEnd);

  const headers = {
    "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkEnd - chunkStart + 1,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // Crea un flujo de lectura para leer el archivo del sistema de archivos
  const videoStream = fs.createReadStream(videoPath, {
    start: chunkStart,
    end: chunkEnd,
  });

  // Validar que el video exista
  // if (!fs.existsSync(`./uploads/${videoId}.mp4`)) {
  //   res.status(404).send({
  //     status: "error",
  //     message: "Video not found",
  //   });
  //   return;
  // }

  //Manejar errores de lectura del archivo
  videoStream.on("error", (error) => {
    console.log("Error reading the file: ", error);
    return res.status(500).send({
      status: "error",
      message: "Error reading the file",
    });
  });

  //Finaliza el flujo de lectura cuando se termina de enviar el archivo
  videoStream.on("end", () => {
    console.log(`Stream finished`);
  });

  // Envía el archivo al cliente
  videoStream.pipe(res);
};

export const getAllVideos = (req: Request, res: Response) => {
  const path = "./uploads";
  let files: string[] = [];
  fs.readdir(path, function (err, items) {
    if (err) {
      console.log("Error reading the directory: ", err);
      return res.status(500).send({
        status: "error",
        message: "Error reading the directory",
      });
    }
    for (let i = 0; i < items.length; i++) {
      files.push(items[i]);
    }
    res.send(files);
  });
}