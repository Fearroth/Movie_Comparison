const createAutoComplete = ({ root }) => {
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
	const input = root.querySelector('.input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	const onInput = async (event) => {
		const movies = await fetchData(event.target.value);
		if (!movies.length) {
			dropdown.classList.remove('is-active');
			return;
		}
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

			listRow.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = movie.Title;
				onMovieSelect(movie);
			});
			resultsWrapper.appendChild(listRow);
		}
	};

	document.addEventListener('click', (event) => {
		if (!root.contains(event.target)) {
			dropdown.classList.remove('is-active');
		}
	});

	input.addEventListener('input', debounce(onInput));
};
