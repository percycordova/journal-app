import Swal from 'sweetalert2'
import {db} from '../firebase/firebase-config'
import {fileUpLoad} from '../helpers/fileUpload'
import {loadNotes} from '../helpers/loadNotes'
import {types} from '../types/types'

export const startNewNote = () => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime()
		}
		const doc = await db.collection(`${uid}/journal/notes`).add(newNote)

		dispatch(activateNote(doc.id, newNote))
	}
}

export const activateNote = (id, note) => ({
	type: types.notesActive,
	payload: {
		id,
		...note
	}
})

export const startLoadingnotes = (uid) => {
	return async (dispatch) => {
		const notes = await loadNotes(uid)
		dispatch(setNotes(notes))
	}
}

export const setNotes = (notes) => ({
	type: types.notesLoad,
	payload: notes
})

export const startSaveNote = (note) => {
	return async (dispacth, getState) => {
		const {uid} = getState().auth

		if (!note.url) {
			delete note.url
		}
		const noteToFirebase = {...note}
		delete noteToFirebase.id
		await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirebase)
		dispacth(refreshNote(note.id, note))
		Swal.fire('Saved', note.title, 'success')
	}
}

export const refreshNote = (id, note) => ({
	type: types.notesUpdated,
	payload: {
		id,
		note: {
			...note
		}
	}
})

export const startUploading = (file) => {
	return async (dispatch, getState) => {
		const {active: activeNote} = getState().notes
		Swal.fire({
			title: 'Uploading...',
			text: 'Please wait...',
			showConfirmButton: false,
			allowOutsideClick: false,
			willOpen: () => {
				Swal.showLoading()
			}
		})
		const fileUrl = await fileUpLoad(file)
		console.log(fileUrl)
		Swal.close()
		activeNote.url = fileUrl
		dispatch(startSaveNote(activeNote))
	}
}
