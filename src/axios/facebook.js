import axios from 'axios';


const facebookLogin = (accesstoken) => {
	axios
		.post('https://pokerfilt.com/auth/convert-token', {
			token: accesstoken,
			backend: 'google-oauth2',
			grant_type: 'convert_token',
			client_id: 'ZadQFzvNWYQq5QVylf56iNw4skL834bGnfKoNMS8',
			client_secret:
				'ziri1uM2UAq3OyquCUcfixcU2R0aN0E732u4GhxULto92ZEAadh4PlphRlPiPlInjsrzGeBD3hletzL5pwBOYOLa22QY4Y4UeiGD0KIVTRzjSNtVlWnIebeYqOxJKo1T',
		})
		.then((res) => {
			console.log(res);
			localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
		});
};

export default facebookLogin;