/* eslint-disable react/react-in-jsx-scope */
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import {Redirect} from 'react-router-dom'
const PrivateRouter = ({isAuthenticated, component: Component, ...rest}) => {
	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<Route {...rest}>
			{isAuthenticated ? <Component /> : <Redirect to='/auth/login' />}
		</Route>
	)
}
export default PrivateRouter
PrivateRouter.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired
}
