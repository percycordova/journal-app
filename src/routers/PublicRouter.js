/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types'
import {Redirect, Route} from 'react-router-dom'
import React from 'react'
const PublicRouter = ({isAuthenticated, component: Component, ...rest}) => {
	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<Route {...rest}>
			{!isAuthenticated ? <Component /> : <Redirect to='/' />}
		</Route>
	)
}

export default PublicRouter

PublicRouter.prototype = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired
}
