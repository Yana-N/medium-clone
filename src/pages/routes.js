import React from 'react'
import {Switch, Route} from 'react-router-dom'

import GlobalFeed from './GlobalFeed'
import Article from './Article'
import Authentication from './Authentication/Authentication'
import TagFeed from './TagFeed'
import YourFeed from './YourFeed'
import CreateArticle from './CreateArticle'
import EditArticle from './EditArticle'
import Settings from './Settings'
import UserProfile from './UserProfile'

export default () => {
	return (
		<Switch>
			<Route exact path='/' component={GlobalFeed} />
			<Route path='/profiles/:slug/favorites' component={UserProfile} />
			<Route path='/profiles/:slug' component={UserProfile} />
			<Route path='/settings' component={Settings} />
			<Route path='/feed' component={YourFeed} />
			<Route path='/tags/:slug' component={TagFeed} />
			<Route path='/login' component={Authentication} />
			<Route path='/register' component={Authentication} />
			<Route exact path='/articles/new' component={CreateArticle} />
			<Route exact path='/articles/:slug/edit' component={EditArticle} />
			<Route exact path='/articles/:slug' component={Article} />
		</Switch>
	)
}