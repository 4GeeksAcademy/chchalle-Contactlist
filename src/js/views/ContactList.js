import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";


export const ContactList = () => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		actions.fetchContactagenda();
	}, []);

	const handleEditClick = (id) => {
		navigate(`/edit-contact/${id}`);
	};

	const deleteContact = (contactId) => {
		fetch(`https://playground.4geeks.com/contact/agendas/chchalle/contacts/${contactId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(() => actions.fetchContactagenda())
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className="container text-left mt-5">
			<div className="row">
				<h2 className="title col-10">Contact List</h2>
				<button className="col-2 btn btn-success"
					onClick={() => navigate("/create")}
				>Create New Contact</button>
			</div>
			<div className="row">
				{store.contacts.map((contact) => (
					<div key={contact.id} className="contactBox">
						<div className="row">
							<div className="col-2 profilepiccont">
								<img src="https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="circle-image" />
							</div>
							<div className="col-8">
								<p>Name: {contact.name}</p>
								<p>phone: {contact.phone}</p>
								<p>email: {contact.email}</p>
								<p>address: {contact.address}</p>
							</div>
							<div className="col-2 editTrashHolder">
								<button type="button" className="btn" onClick={() => handleEditClick(contact.id)}><BsPencilSquare /></button>
								<button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
									<FaRegTrashCan />
								</button>


								<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h1 className="modal-title fs-5" id="staticBackdropLabel">Are You Sure You Want To Delete</h1>
												<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="modal-body">
												Deleteing contact will make it unrecoverable in the future.  Do you still wish to continue?
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
												<button type="button" className="btn btn-primary" onClick={() => deleteContact(contact.id)} data-bs-dismiss="modal" >Yes</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				))}
			</div>
		</div>

	)

};
