import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {activateNote} from '../../actions/notes'
import {useForm} from '../../hooks/useForm'
import {NotesAppBar} from './NotesAppBar'

export const NoteScreen = () => {
	const {active} = useSelector((state) => state.notes)
	const {formValues, handleInputChange, reset} = useForm(active)
	let {title, body} = formValues
	const activeId = useRef(active.id)
	const dispacth = useDispatch()
	useEffect(() => {
		if (active.id !== activeId.current) {
			reset(active)
			activeId.current = active.id
		}
	}, [active, reset])

	useEffect(() => {
		dispacth(activateNote(formValues.id, {...formValues}))
	}, [dispacth, formValues])
	return (
		<div className='notes__main-content'>
			<NotesAppBar />

			<div className='notes__content'>
				<input
					type='text'
					name='title'
					onChange={handleInputChange}
					value={title}
					placeholder='Some awesome title'
					className='notes__title-input'
					autoComplete='off'
				/>

				<textarea
					placeholder='What happened today'
					className='notes__textarea'
					name='body'
					value={body}
					onChange={handleInputChange}
				></textarea>
				{active.url && (
					<div className='notes__image'>
						<img src={active.url} alt='imagen' />
					</div>
				)}
			</div>
		</div>
	)
}
