const root = document.querySelector('.autocomplete');
root.innerHTML = ` 
	<label><b>search for movie</b></label>
	<input class="input" />
	<div class="dropdown">
		<div class="dropdown-menu"> 
			<div class="dropdown-content results"> 
			</div>
		</div>
	</div>
`;
const input1 = document.querySelector('.input');

const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');
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
	if (response.data.Error) return [];
	return response.data.Search;
};

const onInput = async (event) => {
	const movies = await fetchData(event.target.value);
	dropdown.classList.add('is-active');
	//console.log(movies);
	resultsWrapper.innerHTML = '';
	for (let movie of movies) {
		const div = document.createElement('div');
		const moviePoster = movie.Poster === 'N/A' ? '' : movie.Poster;
		div.innerHTML = `
		<img src="${moviePoster}" />
		<h1>${movie.Title}</h1>
		`;
		resultsWrapper.appendChild(div);
	}
};

input1.addEventListener('input', debounce(onInput));
