const input1 = document.querySelector('#input1');

const debounce = (func) => {
	let timeoutID;
	return (...args) => {
		if (timeoutID) {
			clearTimeout(timeoutID);
		}
		timeoutID = setTimeout(() => {
			func.apply(null, args);
		}, 1000);
	};
};

const fetchData = async (input) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'efd25046',
			s: input
		}
	});
	return console.log(response.data.Search);
};

const onInput = (event) => {
	fetchData(event.target.value);
};

input1.addEventListener('input', debounce(onInput));
