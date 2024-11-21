const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = { title, tags, body, id, createdAt, updatedAt };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);

  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((note) => note.id === id);

  if (note) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil didapatkan',
      data: {
        note,
      },
    });

    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak didapatkan',
  });
  response.code(404);

  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const isExist = notes.filter((note) => note.id === id).length;

  if (isExist) {
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, title, tags, body, createdAt, updatedAt };
      }
      return note;
    });

    console.log(newNotes);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diubah',
    });

    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);

  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const noteIndex = notes.findIndex((note) => note.id === id);
  console.log(noteIndex);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
      data: [1],
    });

    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ada',
    data: [0],
  });
  response.code(404);

  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
