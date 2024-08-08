const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			contacts: []

		},
		actions: {
			fetchContactagenda: () =>{
				fetch('https://playground.4geeks.com/contact/agendas/chchalle/contacts')
					.then((res)=> res.json())
					.then((agenda)=>{
				const{contacts}=agenda;
				console.log("hello from fetch contact agenda funciton")
				console.log({contacts})
				setStore({contacts})

					})
			}
			},
			createContact: (contactData) => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			
				

				
//				setStore({ demo: demo });
			}
		}


export default getState;
