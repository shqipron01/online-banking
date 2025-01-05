import React, { Component } from "react"
import {Redirect, Switch} from "react-router-dom"

const useAuth = () => {
	//get item from localstorage

	let user: any

	const _user = localStorage.getItem("user")

	if (_user) {
		user = JSON.parse(_user)
		console.log("user", user)
	}
	if (user) {
		return {
			auth: true,
			role: user.role,
		}
	} else {
		return {
			auth: false,
			role: null,
		}
	}
}

//AuthRoute state
type AuthRouteType = {
	roleRequired?: "ADMIN" | "USER"

}

const AuthRoute = (props: AuthRouteType) => {
	const {auth, role} = useAuth()

	//if the role required is there or not
	if (props.roleRequired) {
		return auth ? (
			props.roleRequired === role ? (
				
				<Switch/>
			) : (
				<Redirect to="/" />
			)
		) : (
			<Redirect to="/" />
		)
	} else {
			
		return auth ? <Switch/> : <Redirect to="/dashboard" />
	}
}

export default AuthRoute;