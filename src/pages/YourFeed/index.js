import React, {useEffect} from 'react'
import useFetch from '../../hooks/useFetch'
import Feed from '../../components/Feed'
import Pagination from '../../components/Pagination'
import {getPaginator, limit} from '../../utils'
import {stringify} from 'query-string'
import PopularTags from '../../components/PopularTags'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import FeedToggler from '../../components/FeedToggler'

const YourFeed = ({location, match}) => {

	const {offset, currentPage} = getPaginator(location.search)
	const stringifiedParams = stringify({
		limit, offset,
	})
	const apiUrl = `/articles/feed?${stringifiedParams}`
	const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
	const url = match.url

	useEffect(() => {
		doFetch()
	}, [doFetch, currentPage])

	return (
		<div className='home-page'>
			<div className='banner'>
				<div className='container'>
					<h1>Medium Clone</h1>
					<p>A place to share knowledge</p>
				</div>
			</div>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-9'>
						<FeedToggler />
						{isLoading && <Loading/>}
						{error && <ErrorMessage/>}
						{response && response.articles.length === 0 && <div className='article-preview'>No articles are here... yet.</div>}
						{!isLoading && response && (
							<>
								<Feed articles={response.articles}/>
								<Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage}/>
							</>
						)}
					</div>
					<div className='col-md-3'>
						<PopularTags/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default YourFeed