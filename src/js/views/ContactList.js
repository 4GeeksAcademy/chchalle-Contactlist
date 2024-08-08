import React, {useContext, useEffect} from "react";
import {Context} from"../store/appContext"
import { useNavigate } from "react-router-dom";	
import "../../styles/home.css";


export const ContactList = () => {
	
	const {store, actions}= useContext(Context);
	const navigate=useNavigate();

	useEffect(()=>{
	actions.fetchContactagenda();
	}, []);

	const handleEditClick = (id) => {
        navigate(`/edit-contact/${id}`);
    };

	const deleteContact = (contactId) => {
		fetch(`https://playground.4geeks.com/todo/todos/${contactId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(actions.fetchContactagenda())
			.catch((error) => {
				console.error(error);
			});
	};

	return(
	<div className="text-center mt-5">
		<p>Contact List</p>
		<button
			onClick={()=> navigate("/create")}
		>Create New Contact</button>
		{store.contacts.map((contact)=>(
			<div key={contact.id}>
				<button
				onClick={() => deleteContact(contact.id)}
				>Delete Contact</button>
				<p>Name {contact.name}</p>
				<p>phone: {contact.phone}</p>
				<p>email: {contact.email}</p>
				<p>address: {contact.address}</p>
				<button onClick={() => handleEditClick(contact.id)}>Edit</button>
			</div>
		))}
	</div>

	)

};
