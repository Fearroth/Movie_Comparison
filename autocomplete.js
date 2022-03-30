const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	root.innerHTML = ` 
	<label><b>Search:</b></label>
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
		const items = await fetchData(event.target.value);
		if (!items.length) {
			dropdown.classList.remove('is-active');
			return;
		}
		dropdown.classList.add('is-active');
		//console.log(movies);
		resultsWrapper.innerHTML = '';
		for (let item of items) {
			const listRow = document.createElement('a');
			listRow.classList.add('dropdown-item');
			listRow.innerHTML = renderOption(item);

			listRow.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = inputValue(item);
				onOptionSelect(item);
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
