import React, {useEffect, useState, useContext} from 'react'
import ArticleForm from '../../components/ArticleForm'
import useFetch from '../../hooks/useFetch'
import {Redirect} from 'react-router-dom'
import {CurrentUserContext} from '../../context/currentUser'


const CreateArticle = () => {
	const apiUrl = '/articles'
	const [{response, error}, doFetch] = useFetch(apiUrl)
	const [currentUserState] = useContext(CurrentUserContext)
	const initialValues = {
		title: '',
		description: '',
		body: '',
		tagList: [],
	}

	const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)

	const handleSubmit = article => {
		doFetch({
			method: 'post',
			data: {
				article,
			},
		})
	}

	useEffect(() => {
		if (!response) {
			return
		}
		setIsSuccessfulSubmit(true)
	}, [response])

	if (currentUserState.isLoggedIn === false) {
		return <Redirect to='/' />
	}

	if (isSuccessfulSubmit) {
		return <Redirect to={`/articles/${response.article.slug}`}/>
	}

	return (
		<ArticleForm onSubmit={handleSubmit} errors={(error && error.errors) || {}} initialValues={initialValues}/>
	)
}

export default CreateArticle
