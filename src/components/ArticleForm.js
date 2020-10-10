import React, {useEffect, useState} from 'react'
import BackendErrorMessages from './BackendErrorMessages'

const ArticleForm = ({onSubmit, errors, initialValues}) => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [description, setDescription] = useState('')
	const [tagList, setTagList] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		const article = {
			title, body, description, tagList
		}
		onSubmit(article)
	}

	useEffect(() => {
		if (!initialValues) {
			return
		}
		setTitle(initialValues.title)
		setBody(initialValues.body)
		setDescription(initialValues.description)
		setTagList(initialValues.tagList.join(' '))
	}, [initialValues])

	return (
		<div className='editor-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-10 offset-md-1 col-xs-12'>
						{errors && <BackendErrorMessages backendErrors={errors}/>}
						<form onSubmit={handleSubmit}>
							<fieldset>
								<fieldset className='form-group'>
									<input type="text" className='form-control form-control-lg' placeholder='Article title'
									       onChange={e => setTitle(e.target.value)} value={title}/>
								</fieldset>
								<fieldset className='form-group'>
									<input type="text" className='form-control form-control-lg' placeholder='What is this article about?'
									       onChange={e => setBody(e.target.value)} value={body}/>
								</fieldset>
								<fieldset className='form-group'>
									<textarea className='form-control form-control-lg' rows='8'
									          placeholder='Write your article (in markdown)'
									          onChange={e => setDescription(e.target.value)} value={description}/>
								</fieldset>
								<fieldset className='form-group'>
									<input type="text" className='form-control form-control-lg' placeholder='Enter tags'
									       onChange={e => setTagList(e.target.value)} value={tagList}/>
								</fieldset>
								<fieldset className='form-group'>
									<button type='submit' className='btn btn-lg pull-xs-right btn-primary'>Publish Article</button>
								</fieldset>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArticleForm
