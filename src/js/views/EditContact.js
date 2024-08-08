import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export function EditContact() {
    const { store, actions } = useContext(Context);
    const [inputNameValue, setNameValue] = useState("");
    const [inputPhoneValue, setPhoneValue] = useState("");
    const [inputEmailValue, setEmailValue] = useState("");
    const [inputAddressValue, setAddressValue] = useState("");



    const navigate = useNavigate();
    const { id } = useParams(); 

    const adjustContact = () => {

        const updatedContact = {
            name: inputNameValue,
            phone: inputPhoneValue,
            email: inputEmailValue,
            address: inputAddressValue
        };

        fetch(`https://playground.4geeks.com/contact/agendas/chchalle/contacts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedContact),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(navigate("/"))
        .catch((error) => {
            console.log(error);
        });
    };

    const getUserContacts = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/chchalle/contacts/${id}`)
            .then(response => response.json())
            .then((contact) => {
                setNameValue(contact.name);
                setPhoneValue(contact.phone);
                setEmailValue(contact.email);
                setAddressValue(contact.address);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (id) {
            getUserContacts();
        }
    }, [id]);

    return (
        <div>
            <p>
                <input
                    className="col-12"
                    type="text"
                    value={inputNameValue}
                    onChange={(event) => setNameValue(event.target.value)}
                    placeholder="Name"
                />
                <input
                    className="col-12"
                    type="text"
                    value={inputPhoneValue}
                    onChange={(event) => setPhoneValue(event.target.value)}
                    placeholder="Phone Number"
                />
                <input
                    className="col-12"
                    type="text"
                    value={inputEmailValue}
                    onChange={(event) => setEmailValue(event.target.value)}
                    placeholder="Email Address"
                />
                <input
                    className="col-12"
                    type="text"
                    value={inputAddressValue}
                    onChange={(event) => setAddressValue(event.target.value)}
                    placeholder="Home Address"
                />
                <button onClick={adjustContact}>Save Contact Changes</button>
            </p>
        </div>
    );
}
