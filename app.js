const root = document.querySelector('.autocomplete');
root.innerHTML = ` 
	<label><b>Search for a movie</b></label>
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
		const listRow = document.createElement('a');
		listRow.classList.add('dropdown-item');
		const moviePoster = movie.Poster === 'N/A' ? '' : movie.Poster;
		listRow.innerHTML = `
		<img src="${moviePoster}" />
		${movie.Title}
		`;
		resultsWrapper.appendChild(listRow);
	}
};

input1.addEventListener('input', debounce(onInput));
