const URL = 'https://jsonplaceholder.typicode.com/posts';

async function test() {
	try {
		//DOWNLOADING DATA
		const url = await fetch(URL);
		const data = await url.json();
		//SORTING DATA
		const dataSort = data.slice(0);
		dataSort.sort(function (a, b) {
			const x = a.title.toLowerCase();
			const y = b.title.toLowerCase();
			return x < y ? -1 : x > y ? 1 : 0;
		});
		for (let i = 1; i <= dataSort.length; i++) {
			dataSort[i - 1].id = i;
		}
		let index = 0;
		for (let a = 1; a <= 10; a++) {
			for (let b = 1; b <= 10; b++) {
				dataSort[index].userId = a;
				index++;
			}
		}
		//CREATING PAGINATION
		const ul = document.createElement('ul');
		document.body.appendChild(ul);
		for (let i = 1; i <= 10; i++) {
			const li = document.createElement('li');
			ul.appendChild(li);
			li.textContent = i;
		}
		//DATA ON PAGE LOAD
		const section = document.createElement('section');
		document.body.append(section);
		dataSort.forEach((element) => {
			if (element.userId == 1) {
				const span = document.createElement('span');
				const title = document.createElement('h2');
				const article = document.createElement('p');
				section.append(span);
				span.textContent = element.id + ' - ';
				section.appendChild(title);
				title.textContent = element.title;
				section.appendChild(article);
				article.textContent = element.body;
			}
		});
		//LISTENING FOR PAGINATION CHANGE
		const liItems = document.querySelectorAll('li');
		liItems.forEach((li) => {
			if (li.textContent == 1) {
				li.classList.add('activ');
			}
			li.addEventListener('click', (e) => {
				liItems.forEach((item) => {
					item.classList.remove('activ');
				});
				e.target.classList.add('activ');
				section.innerHTML = '';
				dataSort.forEach((element) => {
					for (let a = 1; a <= 10; a++) {
						if (e.target.textContent == a && element.userId == a) {
							const span = document.createElement('span');
							const title = document.createElement('h2');
							const article = document.createElement('p');
							section.append(span);
							span.textContent = element.id + ' - ';
							section.appendChild(title);
							title.textContent = element.title;
							section.appendChild(article);
							article.textContent = element.body;
						}
					}
				});
			});
		});
	} catch {
		console.error('błąd');
	}
}

test();
